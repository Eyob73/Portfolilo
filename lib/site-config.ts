export interface NavItem {
  label: string;
  href: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface HighlightCard {
  title: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  category: string;
  icon: string;
  description: string;
  skills: { name: string; highlighted?: boolean }[];
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialType: string;
  description: string;
  skills: string[];
  icon: string;
  badge: string;
}

export const SITE_CONFIG = {
  name: "Eyob Getachew",
  role: "Full-Stack Developer | Software Engineer",
  shortBio: "Hi, I'm Eyob. I Build Digital Experiences.",
  fullBio:
    "Early-career Full-Stack Developer & Software Engineer based in Addis Ababa, Ethiopia. Passionate about building practical software solutions, designing user-friendly interfaces, developing reliable backend APIs, and engineering robust database architectures.",
  aboutParagraphs: [
    "I am a Computer Science graduate with a passion for software craftsmanship. My work centers on building software that operates reliably under real-world constraints, pairing well-structured backend architectures with reactive, legible interfaces.",
    "With strong foundations in full-stack architecture, backend engineering, relational database design, and modern frontend frameworks like Angular and React, I prioritize system maintainability over fleeting trends. I care deeply about clean code conventions, domain modeling, and delivering systems that solve tangible real-world business needs.",
    "Whether implementing multi-tenant inventory logic in ASP.NET Core or architecting academic management portals, my goal is always to deliver software that is resilient, intuitive, and built to scale.",
  ],
  location: "Addis Ababa, Ethiopia",
  email: "eyget73@gmail.com",
  github: "https://github.com/eyob73",
  githubHandle: "@eyob73",
  linkedin: "https://linkedin.com",
  status: "Open to Opportunities",
  version: "v2.6",
  responseWindow:
    "Typically active across weekdays (East Africa Time, UTC+3). Available for remote engagements or on-site opportunities in Addis Ababa.",
  metrics: [
    { label: "STACK", value: "Full-Stack" },
    { label: "EDUCATION", value: "BSc CS '26" },
    { label: "FOCUS", value: "C# / React / .NET" },
    { label: "LOCATION", value: "Addis Ababa" },
  ] as MetricItem[],
  aboutHighlights: [
    {
      title: "Full-Stack Focus",
      description: "End-to-end fluency from UI to data persistence.",
      icon: "layers",
    },
    {
      title: "Clean Architecture",
      description: "Decoupled layers, repository patterns & SOLID principles.",
      icon: "architecture",
    },
    {
      title: "Addis Ababa, ET",
      description: "Operating in East Africa time (UTC+3), ready globally.",
      icon: "location_on",
    },
    {
      title: "Ready to Build",
      description: "Open to immediate junior developer roles & teams.",
      icon: "bolt",
    },
  ] as HighlightCard[],
  skillsData: [
    {
      title: "Frontend",
      category: "Client-Side",
      icon: "web",
      description:
        "Engineering modern, responsive user interfaces with type safety and modular components.",
      skills: [
        { name: "Angular" },
        { name: "React" },
        { name: "TypeScript", highlighted: true },
        { name: "JavaScript" },
        { name: "Tailwind CSS" },
        { name: "HTML5 & CSS3" },
      ],
    },
    {
      title: "Backend",
      category: "Server-Side",
      icon: "dns",
      description:
        "Designing secure REST APIs, clean service controllers, and strict authorization layers.",
      skills: [
        { name: "C#", highlighted: true },
        { name: "ASP.NET Core Web API" },
        { name: ".NET 8" },
        { name: "Laravel" },
        { name: "REST API Dev" },
        { name: "JWT & RBAC" },
      ],
    },
    {
      title: "Databases",
      category: "Persistence",
      icon: "database",
      description:
        "Modeling relational schemas, writing high-performance SQL, and optimizing transaction flows.",
      skills: [
        { name: "PostgreSQL", highlighted: true },
        { name: "SQL Server" },
        { name: "Database Design" },
        { name: "SQL Queries" },
        { name: "Query Optimization" },
      ],
    },
    {
      title: "Tools & Practices",
      category: "Workflows",
      icon: "terminal",
      description:
        "Disciplined version control, end-to-end API integration, and clean architecture practices.",
      skills: [
        { name: "Git & GitHub" },
        { name: "API Integration", highlighted: true },
        { name: "Clean Architecture" },
        { name: "Responsive Design" },
        { name: "Full-Stack Dev" },
      ],
    },
  ] as SkillCategory[],
  methodology: [
    {
      number: "01 //",
      title: "Understand Problem & Requirements",
      description:
        "Clarifying core business rules, edge cases, data structures, and user personas before touching code.",
    },
    {
      number: "02 //",
      title: "Design Clear & Accessible Interfaces",
      description:
        "Drafting clean typography, readable hierarchies, and accessible responsive interaction workflows.",
    },
    {
      number: "03 //",
      title: "Build Maintainable APIs & Schemas",
      description:
        "Normalizing relational databases, defining RESTful endpoints, and enforcing authorization policies.",
    },
    {
      number: "04 //",
      title: "Integrate Frontend & Backend End-to-End",
      description:
        "Connecting client-side state managers with server APIs using type-safe contracts and robust error handling.",
    },
    {
      number: "05 //",
      title: "Test, Refine & Continuously Improve",
      description:
        "Benchmarking response latencies, refactoring code readability, and validating real deployment ergonomics.",
    },
  ] as MethodologyStep[],
  education: {
    degree: "Bachelor of Science in Computer Science",
    location: "Addis Ababa, Ethiopia",
    tag: "UNDERGRADUATE DEGREE",
    graduation: "Expected Graduation: 2026",
    focusHeading: "Academic Focus & Coursework",
    description:
      "Core computing principles, algorithms, data structures, relational database management systems (DBMS), software engineering methodologies, computer networks, and object-oriented systems design.",
  },
  certifications: [
    {
      title: "Qiyas Full-Stack Development Training",
      issuer: "Addis Ababa University",
      date: "May 2026 – September 2026",
      credentialType: "Training Program",
      description:
        "Intensive full-stack software development training covering modern web engineering, clean architecture, backend service design, and relational database modeling.",
      skills: ["Full-Stack Dev", "API Integration", "Database Design", "Agile Workflows"],
      icon: "workspace_premium",
      badge: "PROFESSIONAL TRAINING",
    },
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      date: "2024",
      credentialType: "Certificate",
      description:
        "Comprehensive foundations in programming paradigms, and clean code best practices.",
      skills: ["Algorithms", "Data Structures", "Problem Solving", "Clean Code"],
      icon: "terminal",
      badge: "VERIFIED CERTIFICATE",
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      date: "2024",
      credentialType: "Certificate",
      description:
        "Foundational mobile engineering covering Android application architecture, layout design, lifecycle management, and reactive UI development.",
      skills: ["Android SDK", "Mobile Architecture", "UI Design", "App Lifecycle"],
      icon: "smartphone",
      badge: "VERIFIED CERTIFICATE",
    },
  ] as CertificationItem[],
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
};
