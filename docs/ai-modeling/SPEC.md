# AI System Enhancement Specification
**Multi-Model Architecture**

## Overview
This document outlines the architectural changes required to transition the current static, Gemini-only AI integration into a dynamic, multi-provider and multi-model AI platform. This will allow administrators and users to select their preferred AI provider and switch models at runtime.

---

## 1. Frontend AI Chat Enhancements

### UI Updates
- **Model Selector Dropdown**: Integrate a dropdown in the AI Chat interface allowing users to dynamically select their desired text model (e.g., Gemini 1.5 Pro, GPT-4o, Claude 3.5 Sonnet).
- **Active Model Indicator**: Clearly display the currently active model in the chat header (e.g., *“Using: GPT-4o”*).

### Payload Structure Update
The frontend chat payload must be updated to include the model selection:
```json
{
  "message": "Analyze this data",
  "modelId": "gpt-4o"
}
```

---

## 2. Dashboard Settings Panel

### AI Model Configuration Section
Add a new settings panel (accessible to System Administrators) with the following features:
- **Default System Model**: A dropdown to select the default AI text model for the entire system.
- **User Override Options**: Allow admins to toggle whether individual users can override the default model in their chat interface.
- **Provider & Model Catalog**: Display a list of available active models fetched dynamically from the database, grouped by provider.

---

## 3. Backend Architecture Upgrade: AI Abstraction Layer

The core of this upgrade is replacing direct provider SDK calls with an internal unified **AI Router Layer**.

### Responsibilities
- **Routing**: Accept a normalized request from the frontend and route it to the correct provider adapter based on the `modelId`.
- **Normalization**: Standardize the varied request formats of different SDKs (OpenAI vs. Gemini vs. Anthropic) into a single internal representation.
- **Provider Management**: Handle dynamic initialization of API clients using provider-specific API keys.
- **Fallback Handling**: Gracefully catch provider errors and attempt routing to a fallback model if configured.

---

## 4. Database Changes (Model Registry System)

The existing AI model storage structure will be activated and expanded to handle multiple providers.

### `AI_Models` Collection/Table Schema
```javascript
{
  model_id: { type: String, required: true, unique: true }, // e.g., 'gpt-4o'
  provider: { type: String, enum: ['gemini', 'openai', 'anthropic'], required: true },
  model_name: { type: String, required: true }, // e.g., 'GPT-4 Omni'
  is_active: { type: Boolean, default: true },
  default_for_system: { type: Boolean, default: false }
}
```

### `User` Schema Updates (Optional)
Add fields to store user-specific AI preferences if user overrides are enabled:
```javascript
ai_settings: {
  preferred_model_id: { type: String, ref: 'AI_Models' }
}
```

---

## 5. AI Request Flow (New Architecture)

1. **Client Request**: Frontend sends `{ message, modelId (optional) }` to `/api/ai/chat`.
2. **Context Resolution**: Backend middleware identifies the user.
3. **Model Resolution**: 
   - If `modelId` is passed, validate it against the DB.
   - If not passed, fetch the user's `preferred_model_id`.
   - If the user has no preference, fallback to the system-wide `default_model_id`.
4. **Router Dispatch**: The AI Service Layer identifies the `provider` for the resolved model and dispatches the normalized text payload to the specific **Provider Adapter**.
5. **Response Delivery**: The Adapter returns a normalized response string/stream, which is sent back to the frontend.

---

## 6. Provider Adapter System

Implement the **Adapter Pattern** to encapsulate SDK-specific logic. All adapters must implement a common interface `IAIProviderAdapter`.

### Interface Signature
```typescript
interface IAIProviderAdapter {
  generateResponse(prompt: string, modelId: string): Promise<string>;
}
```

### Adapters
- **`GeminiAdapter`**: Wraps `@google/generative-ai`. Maps the unified prompt to Gemini's text generation format.
- **`OpenAIAdapter`**: Wraps the `openai` SDK. Converts the prompt into OpenAI's text completion/chat structure.
- **`AnthropicAdapter`**: Wraps the `@anthropic-ai/sdk`. Maps inputs to Claude's text message formatting.

---

## 7. Fallback & Reliability System

- **Automatic Fallback**: If an adapter throws a `ProviderUnavailableError` (e.g., 503 from OpenAI) or a rate limit error, the AI Router will check for a configured fallback model in the DB and silently retry the request.
- **Transient Retries**: Implement exponential backoff for 5xx errors from providers.
- **Health Tracking**: Log error rates per provider in the database to trigger alerts if a provider goes down globally.

---

## 8. Security Considerations

- **API Key Management**: Store provider API keys strictly in backend environment variables (e.g., `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`). Never expose these to the frontend.
- **User Isolation**: Ensure that user queries are executed strictly within the context of their own account and chat history.
- **Rate Limiting**: Implement strict API rate limiting on the `/api/ai/*` endpoints. Limit usage per `userId` to prevent abuse and manage API costs.
- **Data Privacy**: Ensure that no cross-user data context is accidentally included in system prompts passed to the AI models.
