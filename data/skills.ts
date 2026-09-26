export interface SkillNode {
  name: string;
  category: string;
  focusArea?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  skills: SkillNode[];
}

export const skillsCategories: SkillCategory[] = [
  {
    id: "frontend",
    code: "SEC-01",
    title: "FRONTEND",
    subtitle: "Client Systems & UI Engineering",
    description:
      "Developing performant, accessible, and reactive browser applications with strong typography and solid layouts.",
    skills: [
      { name: "React", category: "Core Library", focusArea: "Components, Hooks, State" },
      { name: "Next.js", category: "Framework", focusArea: "App Router, SSR, Server Actions" },
      { name: "TypeScript", category: "Language", focusArea: "Strict Typing, Interfaces, Generics" },
      { name: "Tailwind CSS", category: "Styling", focusArea: "Custom Systems, Responsive Design" },
      { name: "HTML5", category: "Markup", focusArea: "Semantic Web, Accessibility, Canvas" },
      { name: "CSS3", category: "Layout", focusArea: "Grid, Flexbox, Custom Properties" },
    ],
  },
  {
    id: "backend",
    code: "SEC-02",
    title: "BACKEND",
    subtitle: "Services, APIs & Real-Time Comms",
    description:
      "Engineering resilient server-side services, message streaming, authentication, and structured data handling.",
    skills: [
      { name: "Node.js", category: "Runtime", focusArea: "Event Loop, Asynchronous I/O" },
      { name: "Express", category: "Framework", focusArea: "REST APIs, Middleware, Routing" },
      { name: "WebSocket", category: "Real-Time", focusArea: "Bi-Directional Streaming, Events" },
      { name: "REST APIs", category: "Architecture", focusArea: "API Design, Auth, Rate Limiting" },
    ],
  },
  {
    id: "databases",
    code: "SEC-03",
    title: "DATABASES",
    subtitle: "Data Modeling & Persistence",
    description:
      "Structuring relational and document data stores with reliable schemas, indexation, and query optimizations.",
    skills: [
      { name: "MongoDB", category: "Document Store", focusArea: "Aggregation Pipelines, Collections" },
      { name: "PostgreSQL", category: "Relational", focusArea: "Schema Relations, ACID Transactions" },
      { name: "Mongoose", category: "ODM", focusArea: "Validation, Middleware, Virtuals" },
      { name: "Prisma", category: "ORM", focusArea: "Type-Safe Queries, Migrations" },
    ],
  },
  {
    id: "ai-ml",
    code: "SEC-04",
    title: "AI / ML",
    subtitle: "Inference, Vision & Generative AI",
    description:
      "Integrating practical machine learning pipelines, in-browser computer vision models, and LLM orchestration.",
    skills: [
      { name: "TensorFlow.js", category: "Client ML", focusArea: "Browser Inference, WebGL Backend" },
      { name: "Computer Vision", category: "Vision", focusArea: "Pose Estimation, Feature Tracking" },
      { name: "LLMs", category: "Language Models", focusArea: "Prompt Engineering, Context Windows" },
      { name: "Generative AI", category: "Synthesis", focusArea: "Diffusion Pipelines, FLUX, Tooling" },
    ],
  },
  {
    id: "tools-cloud",
    code: "SEC-05",
    title: "TOOLS / CLOUD",
    subtitle: "DevOps, Tooling & Asset Pipelines",
    description:
      "Managing source control, cloud delivery pipelines, automated builds, and scalable asset storage.",
    skills: [
      { name: "Git", category: "Version Control", focusArea: "Branching, Rebasing, History" },
      { name: "GitHub", category: "Collaboration", focusArea: "Actions, Code Review, CI/CD" },
      { name: "Cloudinary", category: "Media CDN", focusArea: "Automated Transformations, Asset Delivery" },
      { name: "AWS", category: "Cloud", focusArea: "S3, Hosting Fundamentals" },
      { name: "Vercel", category: "Deployment", focusArea: "Edge Delivery, Serverless Functions" },
    ],
  },
  {
    id: "game-3d",
    code: "SEC-06",
    title: "GAME / 3D",
    subtitle: "Visual Computing & Spatial Design",
    description:
      "Building 3D models, understanding spatial rendering pipelines, and designing interactive game menus and systems.",
    skills: [
      { name: "Blender", category: "Creation Suite", focusArea: "Hard Surface Modeling, Materials" },
      { name: "3D Modeling", category: "Spatial Assets", focusArea: "Topology, UV Unwrapping, Optimization" },
      { name: "Animation", category: "Motion", focusArea: "Keyframing, Spatial Timing, Rigging Basics" },
    ],
  },
];
