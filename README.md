![ER Diagram](https://www.mermaidchart.com/raw/7b1172bf-6ec9-4a9d-ac3d-d7ded23c7e1a?theme=light&version=v0.1&format=svg)


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
│   │   ├── admin/
│   │   ├── app/
│   │   ├── auth/
│   │   ├── axios/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── reducers/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│   ├── .env
│
│── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── gemini/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── predictions/
│   │   ├── routes/
│   │   ├── templates/
│   │   ├── utils/
│   │   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── vercel.json
│
│── .gitignore
│── .nvmrc
│── README.md
│── .SECURITY.md
