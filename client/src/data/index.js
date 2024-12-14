const sidebarLinks = [
  {
    name: "Dashboard",
    iconClass: "fas fa-tachometer-alt",
    link: "/hrms",
    childrens: [],
  },
  {
    name: "Employee Management",
    iconClass: "fas fa-user",
    childrens: [
      {
        name: "Employees Detail",
        link: "/hrms/employees",
      },
      {
        name: "Add Employee",
        link: "/hrms/add-employee",
      },
    ],
  },
  {
    name: "Attendance Management",
    iconClass: "fas fa-calendar-check",
    link: "/hrms/attendance-management",
  },
  {
    name: "Dept & Role Management",
    iconClass: "fas fa-user-plus",
    childrens: [],
  },
  {
    name: "Payroll Management",
    iconClass: "fas fa-wallet",
    link: "/hrms/payroll-management",
    childrens: [],
  },
  {
    name: "Leave Management",
    iconClass: "fas fa-calendar-alt",
    childrens: [],
  },
  {
    name: "Complaint Management",
    iconClass: "fas fa-exclamation-circle",
    link: "/hrms/complaint-management",
    childrens: [],
  },
  {
    name: "Feedback Management",
    iconClass: "fas fa-brain",
    link: "/hrms/ai-sentiment-analysis",
    childrens: [],
  },
  {
    name: "Reports & Analytics",
    iconClass: "fas fa-chart-bar",
    link: "/hrms/report",
    childrens: [],
  },
];

export { sidebarLinks };