
- **Employee**  
  - `employeeId`  
  - `name`  
  - `dob`  
  - `email`  
  - `password`  
  - `profilePicture`  
  - `phoneNumber`  
  - `address`  
  - `department` (🔗 Reference to **Department**)  
  - `role` (🔗 Reference to **Role**)  
  - `dateOfJoining`  
  - `gender`  
  - `martialStatus`  
  - `employmentType`  
  - `shift`  
  - `status`  
  - `salary`  
  - `bankDetails`  
  - `emergencyContact`  
  - `leaveBalance`  
  - `admin`  

- **Department**  
  - `name`  
  - `head` (🔗 Reference to **Employee**)  

- **Role**  
  - `name`  
  - `description`

- **Attendance**  
  - `employee` (🔗 Reference to **Employee**)  
  - `date`  
  - `status`  

- **Leave**  
  - `employee` (🔗 Reference to **Employee**)  
  - `leaveType`  
  - `remarks`  
  - `substitute` (🔗 Reference to **Employee**)  
  - `application`  
  - `fromDate`  
  - `toDate`  
  - `duration`  
  - `status`  

- **Complaint**  
  - `employee` (🔗 Reference to **Employee**)  
  - `complainType`  
  - `complainSubject`  
  - `complaintDetails`  
  - `remarks`  
  - `status`  
  - `assignComplaint` (🔗 Reference to **Employee**)  

- **Feedback**  
  - `employee` (🔗 Reference to **Employee**)  
  - `review`  
  - `rating`  
  - `description`  
  - `suggestion`  



```bash
HRMS/
│── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── router/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── .env
│
│── server/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│
│── README.md
│── .gitignore
│── package.json
│── yarn.lock / package-lock.json