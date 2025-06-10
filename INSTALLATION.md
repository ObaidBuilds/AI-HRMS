<div>
    <a href="https://metrohrms.netlify.app">
  <img src="https://metrohrms.netlify.app/metro.png" width="128px" />
    </a>
</div>

## _Prerequisites_ :
 
- _Node.js and npm must be installed on your machine_
- _You can install them from the [Node.js Official Website](https://nodejs.org/)_

## _Installation Steps_ :

- _Clone the repository to your local machine:_
```bash
git clone https://github.com/WhatsWrongOB/AI-HRMS.git
```
- _Navigate to the project’s client folder and install dependencies:_
```bash
cd client
npm install
```

- _Navigate to the project’s server folder and install dependencies:_
```bash
cd server
npm install
```

## _Environment Variables_ :

- _In the server and client folder, rename the .env.example file to .env:_
- _Fill in all the required environment variables for proper configuration._
```bash
# In client .env
VITE_URL=
VITE_ENV=

# In server .env
PORT=
JWTSECRET=
CLIENT_URL=
SERVER_URL=
MONGO_URI=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
GEMINI=
LATITUDE=
LONGITUDE=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## _Initial Project Setup_ :

- _In the server folder, run the setup command to seed the database with an initial data_
```bash
npm run setup
```
- _This will create an employee with ID: 000 & Password: password_
- _You can use these credentials to log in to the hrms application._

## _Running the Project_ :

- _Start the client and server of the application as needed._
```bash
# In client/
npm run dev

# In server/
npm run dev
```
