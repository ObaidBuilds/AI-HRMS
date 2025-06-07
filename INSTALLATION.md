## _Prerequisites_ :
 
- _Node.js and npm must be installed on your machine_
- _You can installed it from Node.js official website_

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

## _Initial Project Setup_ :

- _In the server folder, run the setup command to seed the database with an initial employee_
```bash
npm run setup
```
- _This will create an employee with ID: 000 Password: password_
- _You can use these credentials to log in to the application._

## _Environment Variables_ :

- _In the server and client folder, rename the .env.example file to .env:_

## _Running the Project_ :

- _Start the client and server applications as needed._
```bash
# In client/
npm run dev

# In server/
npm run dev
```