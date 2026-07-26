const projects = [
  {
    slug: "emptrakr",
    title: "EmpTrakr",
    category: "Production Internship Product",
    year: "2026",
    featured: true,
    spotlight: true,
    badge: "Featured internship",
    role: "Software Engineer Intern at Yoforex",
    description:
      "Contributed during my Yoforex internship to EmpTrakr, a production employee monitoring and HRMS platform that brings attendance, time tracking, activity insights, screenshots, and productivity reporting into one web and desktop workflow.",
    techStack: ["React", "TypeScript", "Electron", "Vite", "REST API Integration", "Windows", "macOS"],
    highlights: [
      "Attendance & time tracking",
      "App & website activity",
      "Idle & screenshot monitoring",
      "Productivity reporting",
    ],
    image: {
      src: "/projects/emptrakr-dashboard.webp",
      alt: "EmpTrakr admin dashboard showing attendance and productivity insights",
    },
    impact: [
      { value: "20+", label: "Companies registered" },
      { value: "Web + Desktop", label: "Integrated workflow" },
      { value: "Windows + macOS", label: "Desktop support" },
    ],
    links: [
      {
        label: "Visit live product",
        url: "https://emptrakr.com/",
        kind: "primary",
      },
      {
        label: "Desktop repository",
        url: "https://github.com/YoForex005/Hrms-desktop-new",
        kind: "secondary",
      },
    ],
  },
  {
    slug: "blog-forge",
    title: "Blog Forge",
    category: "Full-Stack AI Content Platform",
    year: "2026",
    featured: true,
    spotlight: true,
    highlighted: true,
    badge: "Flagship AI platform",
    role: "Software Engineer Intern at Yoforex",
    description:
      "Contributed to Blog Forge for Yoforex's digital marketing team, building a full-stack content operations platform that turns owned keywords into grounded, publish-ready articles across connected websites.",
    techStack: ["React", "Vite", "Material UI", "FastAPI", "REST APIs", "PostgreSQL", "Cloudflare R2"],
    highlights: [
      "Keyword ownership & distribution",
      "Grounded AI research",
      "SEO, AEO & GEO quality gates",
      "Post-publish search visibility",
    ],
    image: {
      src: "/projects/blog-forge-dashboard.webp",
      alt: "Blog Forge content operations dashboard with keyword distribution, research, quality gates, internal links, and search visibility panels",
    },
    impact: [
      { value: "SEO + AEO + GEO", label: "Independent readiness gates" },
      { value: "Exa + Tavily", label: "Research discovery" },
      { value: "Multi-provider AI", label: "Grounded generation workflow" },
    ],
    capabilities: [
      {
        title: "Keyword operations",
        summary: "Seed ingestion, ownership, topic clusters, intent, multi-site distribution, backlog tracking, and cannibalization control.",
      },
      {
        title: "Grounded generation",
        summary: "Approved sources, research packs, briefs, outlines, drafting, rechecks, and improvements across multiple AI providers.",
      },
      {
        title: "Quality and publishing",
        summary: "Citation, schema, metadata, answer-block, internal-link, duplicate, scheduling, and publish-readiness checks.",
      },
      {
        title: "Search visibility",
        summary: "Indexing, IndexNow, analytics, ranking readiness, SERP gaps, site health, alerts, and content-refresh workflows.",
      },
    ],
    links: [
      {
        label: "Open live platform · Sign-in required",
        url: "https://blog-generator.yoforex.net/",
        kind: "primary",
      },
    ],
  },
  {
    slug: "achiver-fx",
    title: "Achiver FX Website",
    category: "Internship Web App",
    year: "2026",
    featured: true,
    description:
      "Built during my Yoforex internship, this FinTech website project includes SEO updates, responsive website building, and performance-focused front-end implementation.",
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
    demoUrl: null,
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
      "Built an IoT-enabled environmental monitoring system that tracks temperature, humidity, and pressure, displays readings on an LCD, and supports future cloud logging.",
    techStack: ["Arduino UNO", "Temperature Sensor", "Humidity Sensor", "Pressure Sensor"],
    highlights: ["Real-time monitoring", "Sensor-driven UI", "Scalable architecture"],
    demoUrl: null,
    repoUrl: null,
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
  return [...projects].sort(
    (firstProject, secondProject) =>
      Number(Boolean(secondProject.highlighted)) - Number(Boolean(firstProject.highlighted)),
  );
}
