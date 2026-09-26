export interface ProjectFeature {
  title: string;
  description: string;
  tag?: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  title: string;
  caption: string;
  category: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  category: "Full-Stack" | "AI / Vision" | "AI / ML" | "Generative AI";
  featured: boolean;
  techStack: string[];
  links: {
    github: string;
    demo?: string;
  };
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: ProjectFeature[];
  specs: ProjectSpec[];
  architecture: {
    frontend: string[];
    backend: string[];
    aiServices?: string[];
    infrastructure: string[];
  };
  role: {
    title: string;
    responsibilities: string[];
  };
  screenshots: ProjectScreenshot[];
  resultOutcome: {
    summary: string;
    highlights: string[];
  };
}

export const projectsData: Project[] = [
  {
    id: "unravel",
    number: "01",
    title: "UNRAVEL",
    shortDescription:
      "Smart Coding & DSA Platform providing real-time code evaluation, algorithmic challenge tracking, and sandboxed execution.",
    category: "Full-Stack",
    featured: true,
    techStack: ["React", "Node.js", "MongoDB", "Judge0", "Express", "Tailwind CSS"],
    links: {
      github: "https://github.com/divyansh-chandrakar/unravel", // editable placeholder
      demo: "https://unravel-platform.demo.app", // editable placeholder
    },
    overview:
      "Unravel is an end-to-end coding and algorithmic practice platform engineered to streamline how developers test, benchmark, and strengthen their Data Structures and Algorithms knowledge. It couples a responsive in-browser IDE with isolated code execution engines.",
    problem:
      "Learners and competitive programmers often struggle with fragmented platforms that separate problem descriptions, editorial explanations, and reliable execution sandboxes. Many existing setups suffer from slow feedback cycles and insecure client-side evaluation.",
    solution:
      "Designed a full-stack platform incorporating the Judge0 execution API with custom orchestration on a Node.js backend. Code is transmitted over secure HTTP payloads, queued, executed against edge test cases in sandbox containers, and verified within milliseconds.",
    keyFeatures: [
      {
        title: "Multi-Language Sandboxed Execution",
        description:
          "Integration with Judge0 API allowing C++, Java, Python, and JavaScript submission verification against strict memory and CPU runtime constraints.",
        tag: "Core Engine",
      },
      {
        title: "Curated Algorithmic Problem Sets",
        description:
          "Structured progression path across arrays, trees, dynamic programming, and graphs with tiered difficulty indicators and test case validators.",
        tag: "Curriculum",
      },
      {
        title: "Telemetry & Runtime Diagnostics",
        description:
          "Detailed execution output displaying memory usage, elapsed runtime, standard error breakdowns, and diff-based output matching.",
        tag: "Diagnostics",
      },
      {
        title: "Submission History & Performance Ledger",
        description:
          "Persistent tracking of passed test cases, runtime percentiles, and code iteration history stored in MongoDB schemas.",
        tag: "Data Store",
      },
    ],
    specs: [
      { label: "Architecture", value: "REST Client-Server + Sandbox Engine" },
      { label: "Target Execution Time", value: "< 800ms per test suite" },
      { label: "Database Engine", value: "MongoDB with Mongoose ODM" },
      { label: "Execution Sandbox", value: "Judge0 Rapid API Containerized" },
    ],
    architecture: {
      frontend: ["React 18", "Tailwind CSS", "Monaco Code Editor", "Axios"],
      backend: ["Node.js", "Express.js", "JSON Web Tokens", "Cors Middleware"],
      aiServices: [],
      infrastructure: ["Judge0 Engine", "MongoDB Atlas", "Vercel / Render"],
    },
    role: {
      title: "Lead Full-Stack Developer & Engine Integrator",
      responsibilities: [
        "Architected MongoDB database models for users, problem repositories, test cases, and historical submissions.",
        "Integrated the Judge0 submission pipeline with asynchronous polling and fallback error handling for timeout cases.",
        "Engineered the responsive code editor interface with custom syntax highlighting, input/output tabs, and keyboard shortcuts.",
      ],
    },
    screenshots: [
      {
        title: "Interactive Code Workspace",
        caption: "Dual-pane interface featuring problem specification, test cases, and editor with instant compile triggers.",
        category: "Interface",
      },
      {
        title: "Execution Telemetry Panel",
        caption: "Granular breakdown of output streams, return codes, memory allocation, and CPU execution time.",
        category: "Engine",
      },
      {
        title: "Algorithmic Archive & Filter Matrix",
        caption: "Categorized library of DSA challenges filterable by difficulty, topic tags, and completion status.",
        category: "Navigation",
      },
    ],
    resultOutcome: {
      summary:
        "Engineered a stable, fast algorithmic testing suite capable of running multi-language code submissions with verifiable runtime feedback and clean separation of concerns.",
      highlights: [
        "Reliable execution across 4+ programming languages with automated test case evaluation.",
        "Low-latency response times with client-side state caching of active problem drafts.",
        "Clean, maintainable modular codebase ready for collaborative contest extensions.",
      ],
    },
  },
  {
    id: "physiogenie",
    number: "02",
    title: "PHYSIOGENIE",
    shortDescription:
      "AI-Assisted Rehabilitation Platform utilizing real-time pose estimation to analyze physical therapy exercises and provide instant postural corrections.",
    category: "AI / Vision",
    featured: true,
    techStack: ["React", "TensorFlow.js", "MediaPipe", "Node.js", "Firebase", "WebRTC"],
    links: {
      github: "https://github.com/divyansh-chandrakar/physiogenie", // editable placeholder
      demo: "https://physiogenie.demo.app", // editable placeholder
    },
    overview:
      "PhysioGenie is an intelligent computer vision web system designed to make physical therapy guided and measurable at home. Using lightweight, browser-based pose estimation, it evaluates movement angles in real time without requiring dedicated motion capture hardware.",
    problem:
      "Patients recovering from musculoskeletal injuries frequently perform prescribed rehabilitation exercises improperly at home. Without direct clinician supervision, incorrect kinematics can exacerbate injury or stall rehabilitation progress.",
    solution:
      "Constructed a client-side vision pipeline leveraging Google MediaPipe Pose and TensorFlow.js. The camera stream computes 33 3D skeletal landmarks directly on the client machine, calculating joint angles and comparing them with physiological safety bounds in real time.",
    keyFeatures: [
      {
        title: "Client-Side Real-Time Pose Tracking",
        description:
          "Zero-server-latency inference via MediaPipe Pose, ensuring user video never leaves the local machine for complete privacy.",
        tag: "Computer Vision",
      },
      {
        title: "Dynamic Kinematic Angle Calculator",
        description:
          "Trigonometric vector analysis computing joint flexion/extension across shoulders, elbows, hips, and knees at 30+ frames per second.",
        tag: "Biomechanics",
      },
      {
        title: "Real-Time Visual & Audio Correction Feedback",
        description:
          "Instant visual skeleton overlays with chromatic alerts (green for correct form, orange/red for out-of-bounds deviation).",
        tag: "Feedback",
      },
      {
        title: "Session Analytics & Repetition Counting",
        description:
          "State-machine repetition detection that increments counts only when full range-of-motion peaks and troughs are satisfied.",
        tag: "Analytics",
      },
    ],
    specs: [
      { label: "Vision Framework", value: "MediaPipe BlazePose 33 Landmarks" },
      { label: "Inference Target", value: "30+ FPS directly in Chromium/Firefox" },
      { label: "Privacy Model", value: "100% on-device video processing" },
      { label: "Data Persistence", value: "Firebase Firestore for session records" },
    ],
    architecture: {
      frontend: ["React", "HTML5 Canvas API", "MediaPipe Pose", "TensorFlow.js"],
      backend: ["Node.js", "Express", "Firebase Admin SDK"],
      aiServices: ["MediaPipe BlazePose", "TF.js WebGL Backend"],
      infrastructure: ["Firebase Hosting", "Cloud Firestore", "Vercel"],
    },
    role: {
      title: "Lead Computer Vision & Frontend Engineer",
      responsibilities: [
        "Implemented the MediaPipe pose tracking pipeline with canvas overlay transformations and smoothing filters.",
        "Programmed the vector angle computation algorithms and repetition state machine for therapeutic exercises.",
        "Designed the clinical session dashboard for logging range-of-motion trajectories over time.",
      ],
    },
    screenshots: [
      {
        title: "Live Joint Analysis Feed",
        caption: "Overlay showing 33-point skeletal landmark tracking with real-time degrees-of-freedom indicator.",
        category: "Vision",
      },
      {
        title: "Angle Bounds & Form Diagnostics",
        caption: "Visual feedback illustrating ideal angular boundaries versus user movement trajectory.",
        category: "Telemetry",
      },
      {
        title: "Therapy Progress Log",
        caption: "Aggregated session history tracking total valid repetitions, duration, and range-of-motion improvements.",
        category: "Dashboard",
      },
    ],
    resultOutcome: {
      summary:
        "Delivered a working browser-based rehabilitation tool that delivers sub-35ms kinematic feedback while guaranteeing 100% video stream privacy on client hardware.",
      highlights: [
        "Stable 30+ FPS landmark detection in browser via WebGL acceleration.",
        "Zero video upload requirements, ensuring patient compliance and privacy standards.",
        "Deterministic repetition validation based on strict biomechanical angle thresholds.",
      ],
    },
  },
  {
    id: "atmosalert",
    number: "03",
    title: "ATMOSALERT",
    shortDescription:
      "AI-Driven Hyper-Local Weather Nowcasting platform processing atmospheric data and spatiotemporal patterns for rapid micro-climate precipitation forecasting.",
    category: "AI / ML",
    featured: true,
    techStack: ["AI/ML", "Atmospheric Data", "Spatiotemporal Modeling", "Python", "React", "FastAPI"],
    links: {
      github: "https://github.com/divyansh-chandrakar/atmosalert", // editable placeholder
      demo: "https://atmosalert.demo.app", // editable placeholder
    },
    overview:
      "AtmosAlert is an AI-driven meteorological nowcasting application that provides short-term (0–3 hour) hyper-local precipitation and weather predictions. It bridges observational satellite/radar telemetry with spatiotemporal machine learning models.",
    problem:
      "Traditional Numerical Weather Prediction (NWP) models require multi-hour supercomputing simulation cycles, rendering them too slow for rapid-onset convective storm prediction and minute-by-minute local nowcasting.",
    solution:
      "Built a machine learning pipeline using spatiotemporal models trained on atmospheric radar reflectivity grids, surface sensor data, and humidity vectors to forecast radar extrapolation up to 180 minutes in advance.",
    keyFeatures: [
      {
        title: "Spatiotemporal Radar Extrapolation",
        description:
          "Convolutional recurrent architectures trained to predict immediate radar reflectivity movements and storm cell intensity shifts.",
        tag: "Deep Learning",
      },
      {
        title: "Hyper-Local Precipitation Telemetry",
        description:
          "Micro-zone resolution targeting kilometer-scale tiles rather than broad regional forecasts.",
        tag: "Precision",
      },
      {
        title: "Dynamic Atmospheric Map Visualization",
        description:
          "Interactive map layer rendering predicted storm vectors, cloud cover density, and precipitation risk thresholds.",
        tag: "Mapping",
      },
      {
        title: "Early Warning Anomaly Detection",
        description:
          "Automated threshold alarms signaling rapid barometric pressure drops and sudden convective storm formations.",
        tag: "Alerts",
      },
    ],
    specs: [
      { label: "Forecasting Horizon", value: "0 to 180 minutes (Nowcasting)" },
      { label: "Resolution", value: "1km x 1km spatiotemporal grid" },
      { label: "Model Architecture", value: "Spatiotemporal ConvLSTM / UNet" },
      { label: "API Framework", value: "FastAPI / Python asynchronous pipeline" },
    ],
    architecture: {
      frontend: ["React", "Mapbox GL / Leaflet", "Tailwind CSS", "Recharts"],
      backend: ["FastAPI", "Python 3.11", "NumPy", "Pandas", "Uvicorn"],
      aiServices: ["PyTorch / TensorFlow", "Spatiotemporal Grid Modeling"],
      infrastructure: ["Docker", "AWS S3 for Data Ingestion", "Vercel"],
    },
    role: {
      title: "ML Researcher & Data Pipeline Developer",
      responsibilities: [
        "Designed the atmospheric data ingestion scripts for radar telemetry and meteorological observation stations.",
        "Implemented spatiotemporal tensor preprocessing routines including normalization and sequence formatting.",
        "Developed the interactive map interface presenting live and predicted weather radar overlays.",
      ],
    },
    screenshots: [
      {
        title: "Radar Reflectivity Forecast Map",
        caption: "Spatial grid showing interpolated radar echo sequences and nowcasted movement vectors.",
        category: "Map View",
      },
      {
        title: "Precipitation Probability Timeline",
        caption: "Granular 15-minute interval forecast curves depicting rainfall probability and rain intensity.",
        category: "Analytics",
      },
      {
        title: "Atmospheric Telemetry Dashboard",
        caption: "Live sensor feeds showing barometric trendlines, dew point, wind vectors, and humidity metrics.",
        category: "Telemetry",
      },
    ],
    resultOutcome: {
      summary:
        "Developed an operational prototype capable of generating fine-grained nowcasts significantly faster than traditional numerical models with intuitive visual feedback.",
      highlights: [
        "Fast inference cycles producing updated forecasts within seconds of new radar scan data.",
        "High-contrast, industrial data visualization designed for rapid situational comprehension.",
        "Extensible architecture prepared for IoT weather station sensor streams.",
      ],
    },
  },
  {
    id: "ether",
    number: "04",
    title: "ETHER",
    shortDescription:
      "AI Content Creation Studio unifying multimodal generative models, prompt orchestration, and high-resolution asset management.",
    category: "Generative AI",
    featured: true,
    techStack: ["React", "Node.js", "MongoDB", "OpenRouter", "HuggingFace FLUX", "Cloudinary"],
    links: {
      github: "https://github.com/divyansh-chandrakar/ether", // editable placeholder
      demo: "https://ether-studio.demo.app", // editable placeholder
    },
    overview:
      "Ether is an integrated AI creative suite designed for digital artists, writers, and software creators. It unites cutting-edge text generation and state-of-the-art FLUX image synthesis into a single cohesive workspace.",
    problem:
      "Content creators frequently juggle multiple disparate AI tools with separate subscription tiers, incompatible image formats, and disorganized prompt histories, causing major friction in creative iteration.",
    solution:
      "Constructed a unified web studio connecting OpenRouter for diverse LLM reasoning and HuggingFace FLUX for photorealistic and stylistic image synthesis, backed by Cloudinary for asset storage and optimization.",
    keyFeatures: [
      {
        title: "Multimodal Studio Workspace",
        description:
          "Integrated dual-mode canvas allowing users to alternate between prompt generation, narrative drafting, and visual rendering.",
        tag: "Studio",
      },
      {
        title: "FLUX State-of-the-Art Image Synthesis",
        description:
          "High-fidelity image generation pipeline supporting aspect ratio control, negative prompt parameters, and guidance scales.",
        tag: "Diffusion",
      },
      {
        title: "OpenRouter LLM Orchestration",
        description:
          "Dynamic routing across modern open-weights and proprietary models for creative ideation and technical copy.",
        tag: "LLM",
      },
      {
        title: "Cloudinary CDN Pipeline & Asset Ledger",
        description:
          "Automated cloud transformation, format optimization (WebP/AVIF), and structured tagging in MongoDB.",
        tag: "Asset Store",
      },
    ],
    specs: [
      { label: "Image Model", value: "HuggingFace FLUX.1 Pipeline" },
      { label: "LLM Gateway", value: "OpenRouter Unified API" },
      { label: "Asset Storage", value: "Cloudinary Media CDN with automated caching" },
      { label: "Database", value: "MongoDB with structured project collections" },
    ],
    architecture: {
      frontend: ["React", "Tailwind CSS", "Framer Motion", "Lucide React"],
      backend: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
      aiServices: ["OpenRouter API", "HuggingFace Inference Endpoints (FLUX)"],
      infrastructure: ["Cloudinary", "Render / Vercel"],
    },
    role: {
      title: "Full-Stack Engineer & AI Integration Lead",
      responsibilities: [
        "Built the client-server bridge handling asynchronous generation queues and webhooks from image generation backends.",
        "Integrated Cloudinary SDK for instant image streaming, automated thumbnails, and responsive asset sizing.",
        "Designed the dark-mode studio UI with tactile sliders, prompt tags, and export presets.",
      ],
    },
    screenshots: [
      {
        title: "Creative Canvas & Generation Controls",
        caption: "Main studio layout featuring prompt engineering controls, guidance sliders, and aspect ratio selector.",
        category: "Studio",
      },
      {
        title: "Asset Gallery & Version Matrix",
        caption: "Organized media vault with instant Cloudinary CDN download links, prompt history, and model metadata.",
        category: "Media Vault",
      },
      {
        title: "LLM Ideation & Prompt Expander",
        caption: "Split-view assistant interface for iteratively refining descriptive prompts before image synthesis.",
        category: "Assistant",
      },
    ],
    resultOutcome: {
      summary:
        "Shipped a streamlined creative dashboard that consolidates text and visual generation workflows, eliminating tool-switching while managing assets systematically.",
      highlights: [
        "Cohesive unified creative workflow reducing iteration cycle time.",
        "Optimized image delivery via Cloudinary CDN with automatic WebP conversion.",
        "Robust token management and error handling across multiple AI provider APIs.",
      ],
    },
  },
];
