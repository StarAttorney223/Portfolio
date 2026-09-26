export interface ProfileData {
  name: {
    first: string;
    last: string;
    full: string;
  };
  headline: string;
  subheadline: string;
  shortBio: string;
  systemStatus: {
    code: string;
    label: string;
    availability: string;
    version: string;
  };
  introduction: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    period: string;
    status: string;
    coursework: string[];
  };
  currentFocus: {
    primary: string;
    secondary: string;
    details: string[];
  };
  areasOfInterest: {
    title: string;
    description: string;
    tags: string[];
  }[];
  socials: {
    label: string;
    url: string;
    identifier: string;
    external: boolean;
  }[];
  metadata: {
    location: string;
    timezone: string;
    languages: string[];
  };
}

export const profileData: ProfileData = {
  name: {
    first: "DIVYANSH",
    last: "CHANDRAKAR",
    full: "DIVYANSH CHANDRAKAR",
  },
  headline: "COMPUTER SCIENCE STUDENT",
  subheadline: "FULL-STACK DEVELOPER",
  shortBio:
    "I build web applications, AI-powered tools and interactive experiences.",
  systemStatus: {
    code: "DIVYANSH.EXE",
    label: "SYSTEM: ONLINE",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    version: "v1.0.4",
  },
  introduction: [
    "I am a Computer Science student and software developer focused on architecting resilient web applications, intelligent systems, and interactive digital interfaces.",
    "My work bridges practical full-stack engineering with modern artificial intelligence and visual computing. I believe great software requires both computational precision and a distinctive, intentional user experience.",
  ],
  education: {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "[Institution / University Name - Editable]",
    period: "2022 — Present",
    status: "Undergraduate",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence & Machine Learning",
      "Web Technologies",
    ],
  },
  currentFocus: {
    primary: "Full-Stack Web Systems & AI Integration",
    secondary: "Interactive Web Interfaces & Real-Time Computer Vision",
    details: [
      "Designing distributed full-stack architectures with React, Next.js, and Node.js.",
      "Integrating browser-side AI models using TensorFlow.js and MediaPipe for low-latency visual inference.",
      "Exploring 3D workflows with Blender and WebGL to elevate product interactivity without sacrificing performance.",
    ],
  },
  areasOfInterest: [
    {
      title: "Web Engineering",
      description:
        "Building robust client-server architectures, responsive user interfaces, and scalable REST/WebSocket APIs.",
      tags: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    {
      title: "AI & Machine Learning",
      description:
        "Practical integration of LLM endpoints, computer vision pipelines, and spatiotemporal data modeling.",
      tags: ["TensorFlow.js", "MediaPipe", "LLM APIs", "FLUX", "Computer Vision"],
    },
    {
      title: "Game Development & 3D",
      description:
        "Interactive mechanics, 3D asset modeling, real-time shaders, and spatial user interface design.",
      tags: ["Blender", "3D Modeling", "Game UI", "Animation"],
    },
    {
      title: "Interactive Experiences",
      description:
        "Crafting sensory digital tools, tactile user interfaces, and high-performance browser interactions.",
      tags: ["Framer Motion", "Canvas", "Micro-Interactions", "Solid UI"],
    },
  ],
  socials: [
    {
      label: "GITHUB",
      url: "https://github.com/divyansh-chandrakar", // editable placeholder
      identifier: "@divyansh-chandrakar",
      external: true,
    },
    {
      label: "LINKEDIN",
      url: "https://linkedin.com/in/divyansh-chandrakar", // editable placeholder
      identifier: "in/divyansh-chandrakar",
      external: true,
    },
    {
      label: "EMAIL",
      url: "mailto:divyansh.dev@example.com", // editable placeholder
      identifier: "divyansh.dev@example.com",
      external: false,
    },
  ],
  metadata: {
    location: "India [Editable]",
    timezone: "IST (UTC +5:30)",
    languages: ["TypeScript", "JavaScript", "Python", "C++", "SQL"],
  },
};
