/* 
  - Constants for sidebar, navbar, and button configurations.

*/

const sidebarLinks = [
  { name: "Dashboard", iconClass: "far fa-square", link: "/", childrens: [] },
  {
    name: "Employee Management",
    iconClass: "far fa-user",
    childrens: [
      { name: "Employee Directory", link: "/employees" },
      { name: "Add New Employee", link: "/employee/create" },
    ],
  },
  {
    name: "Departments & Roles",
    iconClass: "far fa-building",
    link: "/department",
  },
  {
    name: "Attendance Tracking",
    iconClass: "far fa-calendar-check",
    childrens: [
      { name: "Daily Attendance Log", link: "/attendance" },
      { name: "Attendance Reports", link: "/attendance/check" },
    ],
  },
  {
    name: "Leave & Time-Off",
    iconClass: "far fa-calendar-alt",
    childrens: [
      { name: "Leave Requests", link: "/leaves" },
      { name: "On-Leave Employees", link: "/leave/active" },
    ],
  },
  {
    name: "Payroll Processing",
    iconClass: "far fa-file-alt",
    link: "/payrolls",
    childrens: [],
  },
  {
    name: "Performance Reviews",
    iconClass: "fas fa-chart-line",
    link: "/performances",
    childrens: [],
  },
  {
    name: "Recruitment & Hiring",
    iconClass: "far fa-address-card",
    childrens: [
      { name: "Job Openings", link: "/recruitments" },
      { name: "Post New Job", link: "/recruitment/create" },
    ],
  },
  // {
  //   name: "Employee Communication",
  //   iconClass: "far fa-envelope",
  //   link: "/mails",
  //   childrens: [],
  // },
  {
    name: "Complaint Handling",
    iconClass: "far fa-bell",
    link: "/complaints",
    childrens: [],
  },
  {
    name: "Employee Feedback",
    iconClass: "far fa-comments",
    link: "/feedbacks",
    childrens: [],
  },
  {
    name: "HR Analytics & Reports",
    iconClass: "far fa-chart-bar",
    link: "/reports",
    childrens: [],
  },
];

const navbarLinks = [
  { name: "Dashboard Overview", iconClass: "far fa-square", link: "/" },
  {
    name: "Mark Daily Attendance",
    iconClass: "fa-regular fa-calendar-check",
    link: "/attendance/mark",
  },
  {
    name: "View Attendance History",
    iconClass: "fa-regular fa-clock",
    link: "/attendance",
  },
  {
    name: "Apply Leave Requests",
    iconClass: "fa-regular fa-calendar-minus",
    link: "/leave",
  },
  {
    name: "Report Workplace Issues",
    iconClass: "fas fa-circle-exclamation",
    link: "/complaint",
  },
  {
    name: "Give Valuable Feedback",
    iconClass: "fa-regular fa-comments",
    link: "/feedback",
  },
  {
    name: "Stay Updated or Notices",
    iconClass: "fa-regular fa-calendar-check",
    link: "/update",
  },
];

const complaintButtons = [
  {
    label: "Pending Complaints",
    value: "Pending",
    icon: "fas fa-hourglass-half",
  },
  {
    label: "Resolved Complaints",
    value: "Resolved",
    icon: "fas fa-check-circle",
  },
  { label: "Closed Complaints", value: "Closed", icon: "fas fa-times-circle" },
];

const leaveRequestButtons = [
  { label: "Pending Leaves", value: "Pending", icon: "fas fa-hourglass-half" },
  { label: "Approved Leaves", value: "Approved", icon: "fas fa-check-circle" },
  { label: "Rejected Leaves", value: "Rejected", icon: "fas fa-times-circle" },
];

const employeesOnLeaveButtons = [
  { label: "Yesterday Leaves", value: "Yesterday", icon: "fa-arrow-left" },
  { label: "Present Leaves", value: "Present", icon: "fa-calendar-check" },
  { label: "Tommorow Leaves", value: "Tomorrow", icon: "fa-arrow-right" },
];

const feedbackButtons = [
  { label: "All Feedbacks", value: "", icon: "fa-globe" },
  { label: "Positive Feedbacks", value: "Positive", icon: "fa-thumbs-up" },
  { label: "Neutral Feedbacks", value: "Neutral", icon: "fa-hand-paper" },
  { label: "Negative Feedbacks", value: "Negative", icon: "fa-thumbs-down" },
];

const recruitmentButtons = [
  { label: "All Recuitments", value: "", icon: "fa-solid fa-briefcase" },
  { label: "Open Recuitments", value: "Open", icon: "fa-solid fa-door-open" },
  { label: "Closed Recuitments", value: "Closed", icon: "fa-solid fa-lock" },
  { label: "Paused Recuitments", value: "Paused", icon: "fa-solid fa-pause" },
];

const applicantsButtons = [
  {
    label: "All Applicants",
    value: "",
    icon: "fa-solid fa-users",
  },
  {
    label: "Interviewed Applicants",
    value: "Interview",
    icon: "fa-solid fa-handshake",
  },
  {
    label: "Hired Applicants",
    value: "Hired",
    icon: "fa-solid fa-user-tie",
  },
  {
    label: "Rejected Applicants",
    value: "Rejected",
    icon: "fa-solid fa-user-xmark",
  },
];
const performanceButtons = [
  { label: "All Metrices", value: "", icon: "fa-globe" },
  { label: "Good metrices", value: "Good", icon: "fa-thumbs-up" },
  { label: "Average metrices", value: "Average", icon: "fa-hand-paper" },
  { label: "Poort metrices", value: "Poor", icon: "fa-thumbs-down" },
];

const payrollButtons = [
  { label: "All Payrolls", value: "", icon: "fa-globe" },
  { label: "Paid payrolls", value: "Paid", icon: "fa-thumbs-up" },
  { label: "Pending payrolls", value: "Pending", icon: "fa-hand-paper" },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/attendance/mark", label: "Mark" },
  { to: "/security", label: "Security" },
  { to: "/attendance", label: "Attendance" },
  { to: "/leave", label: "Leave" },
  { to: "/complaint", label: "Complaint" },
  { to: "/feedback", label: "Feedback" },
];

const reports = [
  {
    title: "Attendance Report",
    icon: "fas fa-clipboard-list",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    title: "Recruitment Report",
    icon: "fas fa-user-plus",
    gradient: "bg-gradient-to-r from-green-500 to-green-700",
  },
  {
    title: "Leave Report",
    icon: "fas fa-plane-departure",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-700",
  },
  {
    title: "Performance Report",
    icon: "fas fa-chart-line",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
  },
];

const sections = [
  { id: "profile", label: "Profile", icon: "fas fa-user-circle" },
  { id: "security", label: "Security", icon: "fas fa-lock" },
  { id: "appearance", label: "Appearance", icon: "fas fa-palette" },
];

const employeeSections = [
  { id: "profile", label: "Profile", icon: "fas fa-user-circle" },
  { id: "security", label: "Security", icon: "fas fa-lock" },
];

const colors = [
  { bg: "bg-blue-500", darkBg: "dark:bg-blue-600" },
  { bg: "bg-purple-500", darkBg: "dark:bg-purple-600" },
  { bg: "bg-yellow-500", darkBg: "dark:bg-yellow-600" },
  { bg: "bg-indigo-500", darkBg: "dark:bg-indigo-600" },
  { bg: "bg-pink-500", darkBg: "dark:bg-pink-600" },
  { bg: "bg-teal-500", darkBg: "dark:bg-teal-600" },
  { bg: "bg-red-500", darkBg: "dark:bg-red-600" },
  { bg: "bg-green-500", darkBg: "dark:bg-green-600" },
];

const checkAttendanceHead = [
  "EMP ID",
  "Name",
  "Department",
  "Position",
  "Date",
  "Status",
];

const complaintHead = [
  "Emp ID",
  "Name",
  "Department",
  "Position",
  "Complaint Type",
  "Complaint Details",
  "Date",
  "Actions",
];

const empoyeeHead = [
  "Employee ID",
  "Name",
  "Department",
  "Position",
  "Status",
  "Contact Info",
  "Actions",
];

const feedbackHead = [
  "Emp ID",
  "Name",
  "Department",
  "Position",
  "AI Review",
  "Description",
  "Date",
  "Rating",
];

const payrollHead = [
  "EMP ID",
  "Name",
  "Date",
  "Base Salary",
  "Allowances",
  "Detuctions",
  "Bonuses",
  "Net Salary",
  "Payment Status",
  "Payment Date",
  "Actions",
];

const perfromceHead = [
  "Name",
  "Position",
  "Attendance",
  "Rating",
  "Feedback",
  "KPI Score",
  "Last Updated",
  "Actions",
];

const jobApplicationHead = [
  "Name",
  "Email",
  // "Phone",
  "Resume",
  "Cover letter",
  "Status",
  "Applied At",
  "Action",
];

const jobOpeningHead = [
  "Title",
  "Position",
  "Salary",
  "Type",
  "Description",
  "Deadline",
  "Applicants",
  "Status",
  "Action",
];

const leaveHead = [
  "Emp ID",
  "Name",
  "Department",
  // "Position",
  "Leave Type",
  "Description",
  "From Date",
  "To Date",
  "Duration",
  "Actions",
];

const leaveEmpoyeeHead = [
  "Emp ID",
  "Name",
  "Substitute",
  "Leave Type",
  "From",
  "To",
  // "Duration",
  "Action",
];

const updateHead = [
  "Emp ID",
  "Name",
  "Department",
  // "Position",
  "Type",
  "Status",
  "Remarks",
  "Date"
];

const complaintTypes = [
  { value: "", label: "--- Select Complaint Type ---" },
  { value: "Workplace", label: "Workplace Issue" },
  { value: "Payroll", label: "Payroll Issue" },
  { value: "Harassment", label: "Harassment" },
  { value: "Leave", label: "Leave Dispute" },
  { value: "Scheduling", label: "Scheduling Issue" },
  { value: "Misconduct", label: "Employee Misconduct" },
];

const leaveTypes = [
  { value: "", label: "--- Select Leave Type ---" },
  { value: "Sick", label: "Sick Leave" },
  { value: "Casual", label: "Casual Leave" },
  { value: "Vacation", label: "Vacation Leave" },
  { value: "Unpaid", label: "Unpaid Leave" },
];

const months = [
  { value: "1", name: "January" },
  { value: "2", name: "February" },
  { value: "3", name: "March" },
  { value: "4", name: "April" },
  { value: "5", name: "May" },
  { value: "6", name: "June" },
  { value: "7", name: "July" },
  { value: "8", name: "August" },
  { value: "9", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

const jobStatus = [
  { value: "", label: "--- Select Status ---" },
  { value: "Applied", label: "Applied" },
  { value: "Under Review", label: "Under Review" },
  { value: "Interview", label: "Interview" },
  { value: "Rejected", label: "Rejected" },
  { value: "Hired", label: "Hired" },
];

const statuses = ["Active", "Inactive", "Leave"];

export {
  colors,
  months,
  reports,
  navLinks,
  sections,
  statuses,
  jobStatus,
  leaveHead,
  leaveTypes,
  updateHead,
  payrollHead,
  empoyeeHead,
  navbarLinks,
  sidebarLinks,
  feedbackHead,
  perfromceHead,
  complaintHead,
  payrollButtons,
  jobOpeningHead,
  complaintTypes,
  feedbackButtons,
  complaintButtons,
  leaveEmpoyeeHead,
  employeeSections,
  applicantsButtons,
  recruitmentButtons,
  performanceButtons,
  leaveRequestButtons,
  jobApplicationHead,
  checkAttendanceHead,
  employeesOnLeaveButtons,
};
