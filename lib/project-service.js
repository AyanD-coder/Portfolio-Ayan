const projects = [
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
  return projects;
}
