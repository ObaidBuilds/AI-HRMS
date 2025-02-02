## 📂 Schemas Relationship

- **👥 Employee**  
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
  - `maritalStatus`  
  - `employmentType`  
  - `shift`  
  - `status`  
  - `salary`  
  - `bankDetails`  
  - `emergencyContact`  
  - `leaveBalance`  
  - `admin`  

- **🏢 Department**  
  - `name`  
  - `head` (🔗 Reference to **Employee**)  

- **🎭 Role**  
  - `name`  
  - `description`

- **📅 Attendance**  
  - `employee` (🔗 Reference to **Employee**)  
  - `date`  
  - `status`  

- **🗓 Leave**  
  - `employee` (🔗 Reference to **Employee**)  
  - `leaveType`  
  - `remarks`  
  - `substitute` (🔗 Reference to **Employee**)  
  - `application`  
  - `fromDate`  
  - `toDate`  
  - `duration`  
  - `status`  

- **📢 Complaint**  
  - `employee` (🔗 Reference to **Employee**)  
  - `complainType`  
  - `complainSubject`  
  - `complaintDetails`  
  - `remarks`  
  - `status`  
  - `assignComplaint` (🔗 Reference to **Employee**)  

- **🗣 Feedback**  
  - `employee` (🔗 Reference to **Employee**)  
  - `review`  
  - `rating`  
  - `description`  
  - `suggestion`
