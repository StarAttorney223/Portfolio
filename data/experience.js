export const experienceCategories = [
  "ALL",
  "EDUCATION",
  "PROJECT EXPERIENCE",
  "HACKATHONS",
  "TECHNICAL EXPERIENCE",
];

export const experienceData = [
  {
    id: "edu-cs",
    category: "EDUCATION",
    title: "Bachelor of Technology in Computer Science & Engineering",
    subtitle: "[University / Institute Name - Editable]",
    period: "2022 — Present",
    location: "India [Editable]",
    description:
      "Pursuing undergraduate studies in Computer Science with emphasis on core systems, algorithm design, software architecture, and artificial intelligence.",
    details: [
      "Rigorous coursework in Data Structures & Algorithms, Object-Oriented Analysis, DBMS, and Operating Systems.",
      "Hands-on laboratory research and software prototyping in web technologies and intelligent computing.",
      "Active participant in technical student clubs and campus hackathons.",
    ],
    techStack: ["C++", "Python", "Data Structures", "Computer Networks", "DBMS"],
  },
  {
    id: "proj-unravel",
    category: "PROJECT EXPERIENCE",
    title: "Full-Stack Engineer & Architect — UNRAVEL",
    subtitle: "Smart Coding & DSA Evaluation Platform",
    period: "2024",
    description:
      "Architected an end-to-end coding platform that integrates isolated code execution engines with structured algorithmic challenges.",
    details: [
      "Integrated Judge0 containerized execution sandbox for secure, multi-language code compilation and verification.",
      "Engineered responsive code workspace featuring syntax highlighting, instant test-suite runs, and runtime telemetry.",
      "Designed resilient MongoDB data models for users, submissions, and test-case verification ledgers.",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Judge0 API"],
    link: {
      label: "View Case Study",
      url: "/projects/unravel",
    },
  },
  {
    id: "proj-physiogenie",
    category: "PROJECT EXPERIENCE",
    title: "Computer Vision Lead — PHYSIOGENIE",
    subtitle: "AI-Assisted Rehabilitation System",
    period: "2024",
    description:
      "Constructed a browser-based physical therapy coaching system that monitors joint kinematics using real-time computer vision.",
    details: [
      "Built client-side pose tracking using MediaPipe BlazePose and TensorFlow.js, guaranteeing zero server video upload for full user privacy.",
      "Programmed mathematical kinematic angle calculations and state-machine repetition detection at 30+ FPS.",
      "Implemented chromatic feedback alerts for out-of-bounds joint angles to guide patient posture.",
    ],
    techStack: ["React", "MediaPipe", "TensorFlow.js", "Firebase", "Node.js"],
    link: {
      label: "View Case Study",
      url: "/projects/physiogenie",
    },
  },
  {
    id: "hackathons-lead",
    category: "HACKATHONS",
    title: "Hackathon Participant & Project Builder",
    subtitle: "Competitive Software & AI Hackathons [Editable]",
    period: "2023 — Present",
    description:
      "Collaborated in rapid 24-48 hour hackathon sprints building functioning prototypes solving practical real-world problems.",
    details: [
      "Rapidly prototyped full-stack web applications and AI wrappers under intense time constraints.",
      "Collaborated across multidisciplinary teams coordinating frontend UI design, API integration, and pitch demos.",
      "Delivered live presentations and architectural breakdowns to judges and mentors.",
    ],
    techStack: ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS", "Git"],
  },
  {
    id: "tech-exp-ai-web",
    category: "TECHNICAL EXPERIENCE",
    title: "Independent Software & Systems Development",
    subtitle: "Open Source, Research & Engineering Prototyping",
    period: "2023 — Present",
    description:
      "Continuous development of full-stack applications, exploratory machine learning workflows, and interactive 3D simulations.",
    details: [
      "Engineered AtmosAlert, exploring spatiotemporal radar nowcasting and micro-climate weather predictions.",
      "Built Ether Studio, a unified multimodal AI generation dashboard interfacing with OpenRouter and HuggingFace FLUX.",
      "Experimented with Blender 3D modeling pipelines to create geometric assets and spatial design systems.",
    ],
    techStack: ["React", "Next.js", "Python", "Blender", "Cloudinary"],
  },
];
