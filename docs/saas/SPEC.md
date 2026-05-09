# Multi-Tenant SaaS Conversion Specification

## 1. High-Level Concept
This document outlines the transition of the existing single-organization system (MetroHRMS) into a multi-tenant SaaS platform. 
The new architecture will allow multiple organizations to sign up, manage their own isolated environments, and access the application via dedicated subdomains (e.g., `metro.lvh.me`, `acme.lvh.me`).

---

## 2. Architecture Changes

### Frontend (React)
- **Subdomain Awareness:** The frontend app must be aware of the environment it is running on. Instead of hardcoding API endpoints to a single backend URL, it will extract the subdomain from `window.location.hostname` and dynamically attach it to backend requests.
- **App Segregation:** The application will have two distinct entry points based on the host:
  - **Main Domain (`lvh.me`):** Displays the marketing landing page and the SaaS onboarding/registration flow.
  - **Tenant Subdomain (`*.lvh.me`):** Displays the actual HRMS application (Login, Dashboards) specific to that organization.

### Backend (Node/Express)
- **Tenant Context:** A new context layer must be introduced to identify which tenant is making the request. 
- **Organization Model:** A new global collection `Organizations` will be created to keep track of tenant metadata, subscription status, and subdomains.
- **Middleware Injection:** Express middleware will extract the tenant identity (either from headers, origin, or JWT) and inject `req.organizationId` for use in downstream controllers.

---

## 3. Subdomain-Based Multi-Tenancy

### Local Development Setup
- We will use `lvh.me` for local development. `lvh.me` and all its subdomains (e.g., `metro.lvh.me`) automatically resolve to `127.0.0.1` (localhost).
- The frontend will run on a port (e.g., `3000`), accessed via `http://tenant.lvh.me:3000`.
- The backend will configure CORS to allow requests from `*.lvh.me`.

### Tenant Resolution Middleware
1. Frontend extracts the subdomain: `const subdomain = window.location.hostname.split('.')[0];`
2. Frontend sends an HTTP request to the backend with a custom header: `X-Tenant-Subdomain: acme`.
3. Backend middleware intercepts this:
   - Queries the `Organizations` collection for `subdomain: 'acme'`.
   - If missing, returns `404 Tenant Not Found`.
   - If found, sets `req.tenant = organization` and continues.

---

## 4. Database Isolation Strategy

### Approach: Single Database with `organization_id`
Given the stack (Mongoose + MongoDB), a **pooled data architecture** is recommended. All organizations will share the same database and collections, but every document will be strictly tied to an organization.

### Implementation Rules
- Add an `organizationId` reference field to **every** tenant-specific Mongoose schema (`User`, `Employee`, `Payroll`, `Attendance`, `JobOpening`, etc.).
  ```javascript
  organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true // Crucial for performance
  }
  ```
- No query should ever omit the `organizationId`. A Mongoose plugin or `AsyncLocalStorage` should be used to automatically append `{ organizationId: req.user.organizationId }` to every `find`, `findOne`, `update`, and `delete` operation.

---

## 5. Authentication & Organization Context

### Login Flow
1. User navigates to `acme.lvh.me/login`.
2. User submits email and password. The request includes the `acme` subdomain context.
3. Backend finds the Organization by subdomain.
4. Backend finds the User by matching **both** `email` and `organizationId`. 
   *(This ensures `admin@example.com` in Acme has a completely separate account from `admin@example.com` in Metro).*

### JWT Structure
Upon successful login, the generated JWT must carry the organization identity:
```json
{
  "userId": "60d5ecb8b392...",
  "role": "admin",
  "organizationId": "60d5ecb8b393..." // The Tenant ID
}
```

### Authorization Enforcement
The `protect` middleware must verify the JWT, extract the `organizationId`, and attach it to `req.user`. Subsequent controllers and DB queries will exclusively use this `req.user.organizationId` for data retrieval.

---

## 6. Onboarding Flow

To allow self-serve registration, the following flow will be built:

1. **Sign Up Page (`lvh.me/register`):**
   - User provides: `Company Name`, `Desired Workspace URL (Subdomain)`, `Admin Email`, `Password`.
2. **Backend Validation:**
   - Check if the subdomain is reserved, invalid, or already taken.
   - Check if the email is already used within that new subdomain context (not possible on initial setup, but good practice).
3. **Provisioning (`POST /api/onboarding/register`):**
   - Start a MongoDB Transaction.
   - Create the `Organization` document.
   - Create the initial `User` document with the `Admin` role linked to the new `Organization`.
   - Seed any default data needed for a new organization (default leave types, default settings).
   - Commit transaction.
4. **Redirection:**
   - User is successfully registered and automatically redirected to `http://<their-subdomain>.lvh.me/login` to sign in.

---

## 7. Routing & Request Handling

### Frontend Routing
Wrap the main React application in a subdomain checking provider.
```javascript
const host = window.location.hostname;
const isMainDomain = host === 'lvh.me' || host === 'www.lvh.me';

if (isMainDomain) {
    return <SaaSWebsiteRoutes />; // Landing, Pricing, Register
} else {
    return <TenantAppRoutes />; // Login, HRMS Dashboard
}
```

### Backend API Structure
Segregate public APIs from tenant APIs:
- `/api/public/...` -> Open routes (Subdomain availability check, Registration).
- `/api/auth/...` -> Tenant-aware authentication routes (Login).
- `/api/tenant/...` -> Highly protected routes requiring valid JWT and `organizationId` injection.

---

## 8. Security Considerations

- **Data Bleed Prevention:** Use Mongoose Global Query Middleware (or heavily abstracted repository layers) to ensure developers cannot accidentally write a query like `Employee.find()` that fetches employees across all tenants.
- **Storage Isolation:** For file uploads (Cloudinary, Multer), prefix folder paths with the tenant subdomain or ID (e.g., `/acme/profile_pictures/user.jpg`) to prevent accidental cross-tenant asset sharing.
- **Cross-Site Scripting (XSS) / LocalStorage:** Because the app runs on separate subdomains (`acme.lvh.me` vs `metro.lvh.me`), browser security protocols automatically isolate LocalStorage, SessionStorage, and Cookies (unless explicitly set to the root domain). This naturally prevents cross-tenant session hijacking.
- **Rate Limiting:** Implement rate limiting globally, but optionally bucket it by `organizationId` to prevent a single noisy tenant from exhausting backend resources.
