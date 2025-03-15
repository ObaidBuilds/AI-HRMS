/* 
  - Constants for sidebar, navbar, and button configurations.
  - Manages navigation and filtering (complaints, leave, feedback).
  - Centralizes link/button data for UI consistency.
*/

const sidebarLinks = [
  { name: "Dashboard", iconClass: "far fa-square", link: "/", childrens: [] },
  {
    name: "Employee Management",
    iconClass: "far fa-user",
    childrens: [
      { name: "Employees Details", link: "/employees" },
      { name: "Create Employee", link: "/employee/create" },
    ],
  },
  { name: "Department & Roles", iconClass: "far fa-building", link: "/" },
  {
    name: "Attendance Management",
    iconClass: "far fa-calendar-check",
    childrens: [
      { name: "Mark Attendance", link: "/attendance" },
      { name: "Check Attendances", link: "/attendance/check" },
    ],
  },
  {
    name: "Payroll Management",
    iconClass: "far fa-file-alt",
    link: "/payrolls",
    childrens: [],
  },
  {
    name: "Recruitment Management",
    iconClass: "far fa-address-card",
    childrens: [
      { name: "View Posted Jobs", link: "/recruitment" },
      { name: "View Applications", link: "/recruitment/applications" },
      { name: "Post Applications", link: "/recruitment/create" },
    ],
  },
  {
    name: "Performance Management",
    iconClass: "fas fa-chart-line",
    link: "/performances",
    childrens: [],
  },
  {
    name: "Leave Management",
    iconClass: "far fa-calendar-alt",
    childrens: [
      { name: "Leave Requests", link: "/leaves" },
      { name: "Employees On Leave", link: "/leave/active" },
    ],
  },
  {
    name: "Complaint Management",
    iconClass: "far fa-bell",
    link: "/complaints",
    childrens: [],
  },
  {
    name: "Feedback Management",
    iconClass: "far fa-comments",
    link: "/feedbacks",
    childrens: [],
  },
  {
    name: "Reports & Analytics",
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
    name: "Stay Updated on Leave",
    iconClass: "fa-regular fa-calendar-check",
    link: "/leave",
  },
  {
    name: "Give Valuable Feedback",
    iconClass: "fa-regular fa-comments",
    link: "/feedback",
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
  { label: "Positive Feedbacks", value: "positive", icon: "fa-thumbs-up" },
  { label: "Neutral Feedbacks", value: "neutral", icon: "fa-hand-paper" },
  { label: "Negative Feedbacks", value: "negative", icon: "fa-thumbs-down" },
];

const performanceButtons = [
  { label: "All Metrices", value: "", icon: "fa-globe" },
  { label: "Good metrices", value: "good", icon: "fa-thumbs-up" },
  { label: "Average metrices", value: "average", icon: "fa-hand-paper" },
  { label: "Poort metrices", value: "poor", icon: "fa-thumbs-down" },
];

const payrollButtons = [
  { label: "All Payrolls", value: "", icon: "fa-globe" },
  { label: "Paid payrolls", value: "paid", icon: "fa-thumbs-up" },
  { label: "Pending payrolls", value: "pending", icon: "fa-hand-paper" },
  { label: "Failed payrolls", value: "failed", icon: "fa-thumbs-down" },
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
  { id: "appearance", label: "Appearance", icon: "fas fa-palette" },
  { id: "security", label: "Security", icon: "fas fa-lock" },
];

const employeeSections = [
  { id: "security", label: "Security", icon: "fas fa-lock" },
];

export {
  sidebarLinks,
  navbarLinks,
  complaintButtons,
  leaveRequestButtons,
  employeesOnLeaveButtons,
  feedbackButtons,
  navLinks,
  performanceButtons,
  payrollButtons,
  reports,
  sections,
  employeeSections,
};
