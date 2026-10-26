export interface Project {
  id: string;
  slug: string;
  title: string;
  categoryTag: string;
  categorySub: string;
  themeColor: "primary" | "secondary";
  description: string;
  highlights: string[];
  technologies: { name: string; highlighted?: boolean }[];
  githubUrl: string;
  mockupType: "stacktrack" | "student-tracker" | "fixmycampus";
  mockupData: Record<string, unknown>;
}

export const PROJECTS: Project[] = [
  {
    id: "stacktrack",
    slug: "stacktrack",
    title: "StackTrack — Inventory and Sales Management System",
    categoryTag: "ENTERPRISE SYSTEM",
    categorySub: "INVENTORY & SALES",
    themeColor: "primary",
    description:
      "A comprehensive business management application designed to help retail businesses seamlessly manage products, inventory, purchases, suppliers, customers, sales, and analytical reports.",
    highlights: [
      "Product & live stock tracking",
      "Sales transaction workflows",
      "Role-based access control (RBAC)",
      "Analytical business reporting",
    ],
    technologies: [
      { name: "Angular" },
      { name: "C#", highlighted: true },
      { name: "ASP.NET Core Web API" },
      { name: "PostgreSQL" },
    ],
    githubUrl: "https://github.com/eyob73",
    mockupType: "stacktrack",
    mockupData: {
      header: "STACKTRACK // DASHBOARD",
      status: "LIVE",
      revenue: "$48,250.00",
      revenueGrowth: "+14.2% this month",
      stockCount: "1,420 SKU",
      stockAlert: "3 items low",
      items: [
        { name: "Logitech MX Master 3S", qty: "42", status: "In Stock", alert: false },
        { name: 'Dell UltraSharp 27"', qty: "04", status: "Low Stock", alert: true },
        { name: "Keychron Q1 Pro", qty: "88", status: "In Stock", alert: false },
      ],
    },
  },
  {
    id: "student-tracker",
    slug: "student-management-performance-tracking",
    title: "Student Management & Performance Tracking System",
    categoryTag: "EDTECH SYSTEM",
    categorySub: "ACADEMIC ANALYTICS",
    themeColor: "secondary",
    description:
      "An academic management platform designed to help educational institutions track students, courses, attendance, grades, and academic performance metrics.",
    highlights: [
      "Student & course lifecycle management",
      "Daily attendance logging",
      "Gradebook calculations & GPA engine",
      "Role-based dashboards (Admin/Faculty/Student)",
    ],
    technologies: [
      { name: "React" },
      { name: "Laravel", highlighted: true },
      { name: "PostgreSQL" },
      { name: "SQL Server" },
    ],
    githubUrl: "https://github.com/eyob73",
    mockupType: "student-tracker",
    mockupData: {
      header: "EDU-PORTAL // COHORT CS-2024",
      avgGpa: "AVG GPA 3.74",
      passRate: "94.8% Pass Rate",
      students: [
        { name: "Abel T. #1042", attendance: "98%", gpa: "3.95" },
        { name: "Bethelhem K. #1089", attendance: "92%", gpa: "3.82" },
        { name: "Dawit M. #1105", attendance: "88%", gpa: "3.60" },
      ],
    },
  },
  {
    id: "fixmycampus",
    slug: "fixmycampus",
    title: "FixMyCampus — Campus Issue Reporting System",
    categoryTag: "FACILITY TECH",
    categorySub: "TICKETING & DISPATCH",
    themeColor: "primary",
    description:
      "A campus maintenance and facility ticketing platform that enables community members to report issues and helps administrators and technicians resolve tickets efficiently.",
    highlights: [
      "Ticket submission with priority levels",
      "Automated technician dispatch & assignment",
      "Live status lifecycle (Reported → In Progress → Resolved)",
      "Comment history & RBAC security",
    ],
    technologies: [
      { name: "Angular" },
      { name: "ASP.NET Core Web API", highlighted: true },
      { name: "SQL Database" },
    ],
    githubUrl: "https://github.com/eyob73",
    mockupType: "fixmycampus",
    mockupData: {
      header: "DISPATCH ENGINE // TICKET #FMC-208",
      status: "IN PROGRESS",
      ticketTitle: "Lab 4B Ethernet Switch Failure",
      priority: "HIGH",
      location: "Building C, 2nd Floor, Room 204. Reported by Dept. IT Coordinator.",
      assignee: "Tech M. Solomon",
      eta: "45 min",
      timeline: [
        { time: "10:15 AM", text: "Ticket Logged & Triaged", completed: true },
        { time: "10:22 AM", text: "Field Technician Dispatched", completed: true },
        { time: "10:40 AM", text: "Hardware Replacement In Progress", completed: false },
      ],
    },
  },
];
