const projects = [
  {
    slug: "emptrakr",
    title: "EmpTrakr HRMS Employee Monitoring System",
    category: "Internship SaaS Product",
    year: "2026",
    featured: true,
    description:
      "Developed during my internship, this full-stack Human Resource Management System (HRMS) features real-time employee activity tracking and attendance management. The system includes a React-based web dashboard, a Node.js/Express backend, and an Electron desktop application for monitoring employee activity, idle time, breaks, and application usage. Features clock-in/clock-out, productivity analytics, role-based access control, heartbeat monitoring, auto clock-out, and detailed admin reports. Deployed on AWS EC2 with NGINX for secure and efficient application delivery.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Electron.js", "JWT", "AWS EC2", "NGINX", "REST APIs"],
    highlights: ["Internship", "Real-time activity tracking", "Electron desktop agent", "AWS EC2 & NGINX delivery"],
    demoUrl: "https://emptrakr.com/",
    repoUrl: null,
  },
  {
    slug: "achiver-fx",
    title: "Achiver FX Website",
    category: "Internship Web App",
    year: "2026",
    featured: true,
    description:
      "Built during my internship, this FinTech website project includes SEO updates, responsive website building, and performance-focused front-end implementation.",
    techStack: ["HTML", "CSS", "JavaScript","React.js","Next.js","Three.js", "SEO", "Responsive Design"],
    highlights: ["Internship project", "Website production", "SEO improvements"],
    demoUrl: "https://website-project-achiver-fx-yfl4.vercel.app/",
    repoUrl: "https://github.com/AyanD-coder/Website-project-Achiver-FX",
  },
  {
    slug: "fullstack-music-player-webapp",
    title: "Fullstack Music Player Web App",
    category: "Full-Stack Web App",
    year: "2026",
    description:
      "Built a full-stack music streaming web app where users can browse and play music while artists can upload and manage tracks and albums through a role-based dashboard.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt"],
    highlights: ["JWT auth", "Role-based access", "Artist dashboard"],
    demoUrl: "https://portfolio-ayan-five.vercel.app",
    repoUrl: "https://github.com/AyanD-coder/Fullstack_music_player_webapp",
  },
  {
    slug: "smart-led-bulb",
    title: "Smart LED Bulb",
    category: "IoT Project",
    year: "Third Year",
    description:
      "Engineered a voice-activated smart lighting system using Arduino, Bluetooth, and relay logic so users could switch household lights on and off with spoken commands.",
    techStack: ["Arduino", "Bluetooth Module", "Relay Control", "Voice Control"],
    highlights: ["Hardware integration", "Safety-focused switching", "Automation"],
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: "weather-monitoring-system",
    title: "IoT-Based Weather Monitoring System",
    category: "Final Year Project",
    year: "2025",
    description:
      "Developed an IoT-enabled environmental monitoring system to track real-time climate conditions with high accuracy, displaying temperature, humidity, and atmospheric pressure readings on an LCD.",
    techStack: ["Arduino UNO", "Temperature Sensor", "Humidity Sensor", "Pressure Sensor", "LCD Display"],
    highlights: ["Real-time climate tracking", "LCD readings", "Cloud-ready architecture"],
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: "portfolio-ayan",
    title: "Ayan Dutta Portfolio",
    category: "Next.js Portfolio",
    year: "2026",
    description:
      "Built a personal portfolio website with static pages, server-rendered projects, a local mock projects API, dark/light theme support, SEO metadata, and JSON-LD structured data.",
    techStack: ["Next.js", "React.js", "JavaScript", "CSS", "SSR", "SEO", "JSON-LD"],
    highlights: ["Theme toggle", "SSR projects", "SEO metadata"],
    demoUrl: null,
    repoUrl: "https://github.com/AyanD-coder/Portfolio-Ayan",
  },
  {
    slug: "python-desktop-assistant",
    title: "Python Desktop Assistant",
    category: "Python Automation",
    year: "2025",
    description:
      "Developed a Python-based desktop voice assistant capable of handling system-level and web-based tasks through speech recognition and text-to-speech interaction.",
    techStack: ["Python", "SpeechRecognition", "pyttsx3", "PyAudio", "OS", "Webbrowser"],
    highlights: ["Voice input", "Task automation", "Productivity tooling"],
    demoUrl: null,
    repoUrl: null,
  },
];

export function getStaticProjects() {
  return projects;
}
