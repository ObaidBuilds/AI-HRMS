/* 
  - Constants for sidebar, navbar, and button configurations.
  - Manages navigation and filtering (complaints, leave, feedback).
  - Centralizes link/button data for UI consistency.
*/


const sidebarLinks = [
  { name: "Dashboard", iconClass: "fas fa-tachometer-alt", link: "/", childrens: [] },
  { name: "Employee Management", iconClass: "fas fa-user", 
    childrens: [
    { name: "Employees Details", link: "/employees" },
    { name: "Create Employee", link: "/employee/create" }
  ] },
  { name: "Department & Roles", iconClass: "fas fa-building", link: "/" },
 { name: "Attendance Management", iconClass: "fas fa-calendar-check", link: "/attendance" },

  { name: "Recruitment Management", iconClass: "fas fa-users-cog", 
    childrens: [
    { name: "View Applications", link: "/recruitment/applications" },
    { name: "Post Applications", link: "/recruitment/create" }
  ] },
  { name: "Payroll Management", iconClass: "fas fa-money-bill-wave", link: "/payroll", childrens: [] },
  { name: "Leave Management", iconClass: "fas fa-calendar-alt", 
    childrens: [
    { name: "Leave Requests", link: "leaves" },
    { name: "Employees On Leave", link: "/leave/active" }
  ] },
  { name: "Performance Management", iconClass: "fas fa-users-cog", link: "/performances", childrens: [] },
  { name: "Complaint Management", iconClass: "fas fa-exclamation-circle", link: "/complaints", childrens: [] },
  { name: "Feedback Management", iconClass: "fas fa-brain", link: "/feedbacks", childrens: [] },
  { name: "Reports & Analytics", iconClass: "fas fa-chart-bar", link: "/reports", childrens: [] },
  { name: "Settings", iconClass: "fas fa-gear", link: "/settings", childrens: [] }
];


const navbarLinks = [
  { name: "Home Page", iconClass: "fa fa-home", link: "/" },
  { name: "Mark Attendance", iconClass: "fa fa-calendar-check", link: "/attendance/mark" },
  { name: "Attendance Tracking", iconClass: "fa fa-calendar-check", link: "/attendance" },
  { name: "Apply for Leave", iconClass: "fa fa-calendar-check", link: "/leave" },
  { name: "Make a Complaint", iconClass: "fa fa-exclamation-circle", link: "/complaint" },
  { name: "Submit Feedback", iconClass: "fa fa-comment", link: "/feedback" },
  { name: "Account Security", iconClass: "fa fa-shield-alt", link: "/security" }
];

const complaintButtons = [
  { label: "Pending Complaints", value: "Pending", icon: "fas fa-hourglass-half" },
  { label: "Resolved Complaints", value: "Resolved", icon: "fas fa-check-circle" },
  { label: "Closed Complaints", value: "Closed", icon: "fas fa-times-circle" }
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

const performanceButtons = [
  { label: "All Metrices", value: "", icon: "fa-globe" },
  { label: "Good metrices", value: "good", icon: "fa-thumbs-up" },
  { label: "Average metrices", value: "average", icon: "fa-hand-paper" },
  { label: "Poort metrices", value: "poor", icon: "fa-thumbs-down" },
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

export {
  sidebarLinks,
  navbarLinks,
  complaintButtons,
  leaveRequestButtons,
  employeesOnLeaveButtons,
  feedbackButtons,
  navLinks,
  performanceButtons
};
