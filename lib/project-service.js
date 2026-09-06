const projects = [
  {
    slug: "emptrakr",
    title: "EmpTrakr",
    category: "Production HRMS Product",
    year: "2026",
    featured: true,
    spotlight: true,
    badge: "Featured product",
    role: "Software Engineer at YoForex",
    description:
      "Contributed to EmpTrakr as a Software Engineer at YoForex, helping deliver a production employee monitoring and HRMS platform with more than 70 registered companies across an integrated web and desktop workflow as of September 2026.",
    evidenceNote: "Company registration figure current as of September 2026.",
    techStack: ["React", "TypeScript", "Electron", "Vite", "REST API Integration", "Windows", "macOS"],
    highlights: [
      "Attendance & time tracking",
      "App & website activity",
      "Idle & screenshot monitoring",
      "Productivity reporting",
    ],
    image: {
      src: "/projects/emptrakr-dashboard-2400.webp",
      alt: "EmpTrakr admin dashboard showing attendance and productivity insights",
      width: 2400,
      height: 1350,
    },
    impact: [
      { value: "70+", label: "Companies registered" },
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
    role: "Software Engineer at YoForex",
    description:
      "Built and delivered Blog Forge for YoForex's digital marketing team, creating a full-stack content operations platform that turns owned keywords into grounded, publish-ready articles and helped improve overall traffic by 30%.",
    evidenceNote: "Traffic result reported for the delivered Blog Forge content workflow.",
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
      width: 1568,
      height: 1003,
    },
    impact: [
      { value: "30%", label: "Overall traffic improvement" },
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
    slug: "rtx5-multi-broker-trading-platform",
    title: "RTX5 Multi-Broker Trading Platform",
    category: "Professional Experience | YoForex",
    year: "2026",
    featured: true,
    spotlight: true,
    badge: "Enterprise platform",
    role: "Software Engineer at YoForex",
    description:
      "Contributed to the React frontend and Go backend services of RTX5, an enterprise-grade multi-broker trading platform that centralizes broker management, licensing, provisioning, market data distribution, trading infrastructure administration, and operational monitoring while supporting scalable, secure communication across multiple trading environments.",
    image: {
      src: "/project-concepts/rtx5-trading-platform-concept.webp",
      alt: "Editorial concept illustration of a secure multi-broker trading platform connecting market operations to distributed server nodes",
      kind: "concept",
      width: 1584,
      height: 990,
    },
    techStack: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
      "Go",
      "REST APIs",
      "JWT",
      "RBAC",
      "PostgreSQL",
      "Redis",
      "DragonflyDB",
      "WebSocket",
      "Market Data Bridge",
      "FIX Protocol",
      "Docker",
      "Nginx",
      "Linux",
      "Multi-Tenant SaaS",
      "Microservices",
      "Audit Logging",
      "Session Management",
    ],
    highlights: [
      "React SuperAdmin dashboards",
      "Broker onboarding & licensing",
      "Go REST API services",
      "JWT & role-based access",
      "Real-time market monitoring",
      "Secure broker provisioning",
      "Signed JWT inter-service security",
      "Database & cache integration",
      "Deployment & production support",
    ],
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: "achiver-fx",
    title: "Achiver FX Website",
    category: "FinTech Web App",
    year: "2026",
    featured: true,
    description:
      "A FinTech website project featuring SEO updates, responsive website development, and performance-focused front-end implementation.",
    image: {
      src: "/project-concepts/achiver-fx-concept.webp",
      alt: "Editorial concept illustration of a responsive fintech product system with secure data nodes and abstract charts",
      kind: "concept",
      width: 1584,
      height: 990,
    },
    techStack: ["HTML", "CSS", "JavaScript","React.js","Next.js","Three.js", "SEO", "Responsive Design"],
    highlights: ["Responsive website", "Website production", "SEO improvements"],
    demoUrl: "https://website-project-achiver-fx-yfl4.vercel.app/",
    repoUrl: "https://github.com/AyanD-coder/Website-project-Achiver-FX-",
  },
  {
    slug: "fullstack-music-player-webapp",
    title: "Fullstack Music Player Web App",
    category: "Full-Stack Web App",
    year: "2026",
    description:
      "Built a full-stack music streaming web app where users can browse and play music while artists can upload and manage tracks and albums through a role-based dashboard.",
    image: {
      src: "/project-concepts/music-player-concept.webp",
      alt: "Editorial concept illustration of a full-stack music platform with an audio waveform, record geometry, and user flow nodes",
      kind: "concept",
      width: 1584,
      height: 990,
    },
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt"],
    highlights: ["JWT auth", "Role-based access", "Artist dashboard"],
    demoUrl: null,
    repoUrl: "https://github.com/AyanD-coder/Fullstack_music_player_webapp",
  },
  {
    slug: "smart-led-bulb",
    title: "Smart LED Bulb",
    category: "IoT Project",
    year: "B.Tech project",
    description:
      "Engineered a voice-activated smart lighting system using Arduino, Bluetooth, and relay logic so users could switch household lights on and off with spoken commands.",
    image: {
      src: "/project-concepts/smart-led-concept.webp",
      alt: "Editorial concept illustration of a connected LED bulb, relay module, and wireless home-control nodes",
      kind: "concept",
      width: 1568,
      height: 1003,
    },
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
    image: {
      src: "/project-concepts/weather-monitor-concept-v2.webp",
      alt: "Editorial concept illustration of an IoT weather station for temperature, humidity, pressure, and cloud-ready data",
      kind: "concept",
      width: 1586,
      height: 992,
    },
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
    image: {
      src: "/project-concepts/python-assistant-concept.webp",
      alt: "Editorial concept illustration of voice input branching into desktop and web automation tasks",
      kind: "concept",
      width: 1568,
      height: 1003,
    },
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

export function getStaticProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectExternalLinks(project) {
  if (project.links?.length) {
    return project.links;
  }

  return [
    project.demoUrl
      ? { label: "Open live project", url: project.demoUrl, kind: "primary" }
      : null,
    project.repoUrl
      ? { label: "View source on GitHub", url: project.repoUrl, kind: "secondary" }
      : null,
  ].filter(Boolean);
}
