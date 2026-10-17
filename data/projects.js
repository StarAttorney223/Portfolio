export const projectsData = [
  {
    "id": "ether",
    "number": "01",
    "title": "ETHER STUDIO",
    "shortDescription": "AI Content Creation Studio unifying multimodal generative models, prompt orchestration, and high-resolution asset management.",
    "category": "Generative AI",
    "featured": true,
    "techStack": [
      "React",
      "Node.js",
      "MongoDB",
      "OpenRouter",
      "HuggingFace FLUX",
      "Cloudinary"
    ],
    "links": {
      "github": "https://github.com/StarAttorney223/ether-studio",
      "demo": "https://ether-studio-ten.vercel.app"
    },
    "overview": "Ether is an integrated AI creative suite designed for digital artists, writers, and software creators. It unites cutting-edge text generation and state-of-the-art FLUX image synthesis into a single cohesive workspace.",
    "problem": "Content creators frequently juggle multiple disparate AI tools with separate subscription tiers, incompatible image formats, and disorganized prompt histories, causing major friction in creative iteration.",
    "solution": "Constructed a unified web studio connecting OpenRouter for diverse LLM reasoning and HuggingFace FLUX for photorealistic and stylistic image synthesis, backed by Cloudinary for asset storage and optimization.",
    "keyFeatures": [
      {
        "title": "Multimodal Studio Workspace",
        "description": "Integrated dual-mode canvas allowing users to alternate between prompt generation, narrative drafting, and visual rendering.",
        "tag": "Studio"
      },
      {
        "title": "FLUX State-of-the-Art Image Synthesis",
        "description": "High-fidelity image generation pipeline supporting aspect ratio control, negative prompt parameters, and guidance scales.",
        "tag": "Diffusion"
      },
      {
        "title": "OpenRouter LLM Orchestration",
        "description": "Dynamic routing across modern open-weights and proprietary models for creative ideation and technical copy.",
        "tag": "LLM"
      },
      {
        "title": "Cloudinary CDN Pipeline & Asset Ledger",
        "description": "Automated cloud transformation, format optimization (WebP/AVIF), and structured tagging in MongoDB.",
        "tag": "Asset Store"
      }
    ],
    "specs": [
      {
        "label": "Image Model",
        "value": "HuggingFace FLUX.1 Pipeline"
      },
      {
        "label": "LLM Gateway",
        "value": "OpenRouter Unified API"
      },
      {
        "label": "Asset Storage",
        "value": "Cloudinary Media CDN with automated caching"
      },
      {
        "label": "Database",
        "value": "MongoDB with structured project collections"
      }
    ],
    "architecture": {
      "frontend": [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide React"
      ],
      "backend": [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose"
      ],
      "aiServices": [
        "OpenRouter API",
        "HuggingFace Inference Endpoints (FLUX)"
      ],
      "infrastructure": [
        "Cloudinary",
        "Render / Vercel"
      ]
    },
    "role": {
      "title": "Full-Stack Engineer & AI Integration Lead",
      "responsibilities": [
        "Built the client-server bridge handling asynchronous generation queues and webhooks from image generation backends.",
        "Integrated Cloudinary SDK for instant image streaming, automated thumbnails, and responsive asset sizing.",
        "Designed the dark-mode studio UI with tactile sliders, prompt tags, and export presets."
      ]
    },
    "screenshots": [
      {
        "title": "Creative Canvas & Generation Controls",
        "caption": "Main studio layout featuring prompt engineering controls, guidance sliders, and aspect ratio selector.",
        "category": "Studio"
      },
      {
        "title": "Asset Gallery & Version Matrix",
        "caption": "Organized media vault with instant Cloudinary CDN download links, prompt history, and model metadata.",
        "category": "Media Vault"
      },
      {
        "title": "LLM Ideation & Prompt Expander",
        "caption": "Split-view assistant interface for iteratively refining descriptive prompts before image synthesis.",
        "category": "Assistant"
      }
    ],
    "resultOutcome": {
      "summary": "Shipped a streamlined creative dashboard that consolidates text and visual generation workflows, eliminating tool-switching while managing assets systematically.",
      "highlights": [
        "Cohesive unified creative workflow reducing iteration cycle time.",
        "Optimized image delivery via Cloudinary CDN with automatic WebP conversion.",
        "Robust token management and error handling across multiple AI provider APIs."
      ]
    }
  },
  {
    "id": "unravel",
    "number": "02",
    "title": "UNRAVEL",
    "shortDescription": "Smart Coding & DSA Platform providing real-time code evaluation, algorithmic challenge tracking, and sandboxed execution.",
    "category": "Full-Stack",
    "featured": true,
    "techStack": [
      "React",
      "Node.js",
      "MongoDB",
      "Judge0",
      "Express",
      "Tailwind CSS"
    ],
    "links": {
      "github": "https://github.com/StarAttorney223/Unravel"
    },
    "overview": "Unravel is an end-to-end coding and algorithmic practice platform engineered to streamline how developers test, benchmark, and strengthen their Data Structures and Algorithms knowledge. It couples a responsive in-browser IDE with isolated code execution engines.",
    "problem": "Learners and competitive programmers often struggle with fragmented platforms that separate problem descriptions, editorial explanations, and reliable execution sandboxes. Many existing setups suffer from slow feedback cycles and insecure client-side evaluation.",
    "solution": "Designed a full-stack platform incorporating the Judge0 execution API with custom orchestration on a Node.js backend. Code is transmitted over secure HTTP payloads, queued, executed against edge test cases in sandbox containers, and verified within milliseconds.",
    "keyFeatures": [
      {
        "title": "Multi-Language Sandboxed Execution",
        "description": "Integration with Judge0 API allowing C++, Java, Python, and JavaScript submission verification against strict memory and CPU runtime constraints.",
        "tag": "Core Engine"
      },
      {
        "title": "Curated Algorithmic Problem Sets",
        "description": "Structured progression path across arrays, trees, dynamic programming, and graphs with tiered difficulty indicators and test case validators.",
        "tag": "Curriculum"
      },
      {
        "title": "Telemetry & Runtime Diagnostics",
        "description": "Detailed execution output displaying memory usage, elapsed runtime, standard error breakdowns, and diff-based output matching.",
        "tag": "Diagnostics"
      },
      {
        "title": "Submission History & Performance Ledger",
        "description": "Persistent tracking of passed test cases, runtime percentiles, and code iteration history stored in MongoDB schemas.",
        "tag": "Data Store"
      }
    ],
    "specs": [
      {
        "label": "Architecture",
        "value": "REST Client-Server + Sandbox Engine"
      },
      {
        "label": "Target Execution Time",
        "value": "< 800ms per test suite"
      },
      {
        "label": "Database Engine",
        "value": "MongoDB with Mongoose ODM"
      },
      {
        "label": "Execution Sandbox",
        "value": "Judge0 Rapid API Containerized"
      }
    ],
    "architecture": {
      "frontend": [
        "React 18",
        "Tailwind CSS",
        "Monaco Code Editor",
        "Axios"
      ],
      "backend": [
        "Node.js",
        "Express.js",
        "JSON Web Tokens",
        "Cors Middleware"
      ],
      "aiServices": [],
      "infrastructure": [
        "Judge0 Engine",
        "MongoDB Atlas",
        "Vercel / Render"
      ]
    },
    "role": {
      "title": "Lead Full-Stack Developer & Engine Integrator",
      "responsibilities": [
        "Architected MongoDB database models for users, problem repositories, test cases, and historical submissions.",
        "Integrated the Judge0 submission pipeline with asynchronous polling and fallback error handling for timeout cases.",
        "Engineered the responsive code editor interface with custom syntax highlighting, input/output tabs, and keyboard shortcuts."
      ]
    },
    "screenshots": [
      {
        "title": "Interactive Code Workspace",
        "caption": "Dual-pane interface featuring problem specification, test cases, and editor with instant compile triggers.",
        "category": "Interface"
      },
      {
        "title": "Execution Telemetry Panel",
        "caption": "Granular breakdown of output streams, return codes, memory allocation, and CPU execution time.",
        "category": "Engine"
      },
      {
        "title": "Algorithmic Archive & Filter Matrix",
        "caption": "Categorized library of DSA challenges filterable by difficulty, topic tags, and completion status.",
        "category": "Navigation"
      }
    ],
    "resultOutcome": {
      "summary": "Engineered a stable, fast algorithmic testing suite capable of running multi-language code submissions with verifiable runtime feedback and clean separation of concerns.",
      "highlights": [
        "Reliable execution across 4+ programming languages with automated test case evaluation.",
        "Low-latency response times with client-side state caching of active problem drafts.",
        "Clean, maintainable modular codebase ready for collaborative contest extensions."
      ]
    }
  },
  {
    "id": "physiogenie",
    "number": "03",
    "title": "PHYSIOGENIE",
    "shortDescription": "AI-Assisted Rehabilitation Platform utilizing real-time pose estimation to analyze physical therapy exercises and provide instant postural corrections.",
    "category": "AI / Vision",
    "featured": true,
    "techStack": [
      "React",
      "TensorFlow.js",
      "MediaPipe",
      "Node.js",
      "Firebase",
      "WebRTC"
    ],
    "links": {},
    "overview": "PhysioGenie is an intelligent computer vision web system designed to make physical therapy guided and measurable at home. Using lightweight, browser-based pose estimation, it evaluates movement angles in real time without requiring dedicated motion capture hardware.",
    "problem": "Patients recovering from musculoskeletal injuries frequently perform prescribed rehabilitation exercises improperly at home. Without direct clinician supervision, incorrect kinematics can exacerbate injury or stall rehabilitation progress.",
    "solution": "Constructed a client-side vision pipeline leveraging Google MediaPipe Pose and TensorFlow.js. The camera stream computes 33 3D skeletal landmarks directly on the client machine, calculating joint angles and comparing them with physiological safety bounds in real time.",
    "keyFeatures": [
      {
        "title": "Client-Side Real-Time Pose Tracking",
        "description": "Zero-server-latency inference via MediaPipe Pose, ensuring user video never leaves the local machine for complete privacy.",
        "tag": "Computer Vision"
      },
      {
        "title": "Dynamic Kinematic Angle Calculator",
        "description": "Trigonometric vector analysis computing joint flexion/extension across shoulders, elbows, hips, and knees at 30+ frames per second.",
        "tag": "Biomechanics"
      },
      {
        "title": "Real-Time Visual & Audio Correction Feedback",
        "description": "Instant visual skeleton overlays with chromatic alerts (green for correct form, orange/red for out-of-bounds deviation).",
        "tag": "Feedback"
      },
      {
        "title": "Session Analytics & Repetition Counting",
        "description": "State-machine repetition detection that increments counts only when full range-of-motion peaks and troughs are satisfied.",
        "tag": "Analytics"
      }
    ],
    "specs": [
      {
        "label": "Vision Framework",
        "value": "MediaPipe BlazePose 33 Landmarks"
      },
      {
        "label": "Inference Target",
        "value": "30+ FPS directly in Chromium/Firefox"
      },
      {
        "label": "Privacy Model",
        "value": "100% on-device video processing"
      },
      {
        "label": "Data Persistence",
        "value": "Firebase Firestore for session records"
      }
    ],
    "architecture": {
      "frontend": [
        "React",
        "HTML5 Canvas API",
        "MediaPipe Pose",
        "TensorFlow.js"
      ],
      "backend": [
        "Node.js",
        "Express",
        "Firebase Admin SDK"
      ],
      "aiServices": [
        "MediaPipe BlazePose",
        "TF.js WebGL Backend"
      ],
      "infrastructure": [
        "Firebase Hosting",
        "Cloud Firestore",
        "Vercel"
      ]
    },
    "role": {
      "title": "Lead Computer Vision & Frontend Engineer",
      "responsibilities": [
        "Implemented the MediaPipe pose tracking pipeline with canvas overlay transformations and smoothing filters.",
        "Programmed the vector angle computation algorithms and repetition state machine for therapeutic exercises.",
        "Designed the clinical session dashboard for logging range-of-motion trajectories over time."
      ]
    },
    "screenshots": [
      {
        "title": "Live Joint Analysis Feed",
        "caption": "Overlay showing 33-point skeletal landmark tracking with real-time degrees-of-freedom indicator.",
        "category": "Vision"
      },
      {
        "title": "Angle Bounds & Form Diagnostics",
        "caption": "Visual feedback illustrating ideal angular boundaries versus user movement trajectory.",
        "category": "Telemetry"
      },
      {
        "title": "Therapy Progress Log",
        "caption": "Aggregated session history tracking total valid repetitions, duration, and range-of-motion improvements.",
        "category": "Dashboard"
      }
    ],
    "resultOutcome": {
      "summary": "Delivered a working browser-based rehabilitation tool that delivers sub-35ms kinematic feedback while guaranteeing 100% video stream privacy on client hardware.",
      "highlights": [
        "Stable 30+ FPS landmark detection in browser via WebGL acceleration.",
        "Zero video upload requirements, ensuring patient compliance and privacy standards.",
        "Deterministic repetition validation based on strict biomechanical angle thresholds."
      ]
    }
  },
  {
    "id": "pixelchat",
    "title": "PIXELCHAT",
    "shortDescription": "Real-time room-based chat with a retro pixel interface, media sharing, message editing, replies, and typing indicators.",
    "category": "Full-Stack",
    "featured": true,
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "WebSocket"
    ],
    "links": {
      "github": "https://github.com/StarAttorney223/PixelChat",
      "demo": "https://pixel-chat-eight.vercel.app"
    },
    "overview": "PixelChat is a multiplayer chat app where people create or join rooms, share a room code, and exchange messages and media in real time.",
    "problem": "Group conversations need an easy way to join a shared room and stay up to date with messages and typing activity.",
    "solution": "A frontend built with HTML, CSS, and JavaScript connects to a Node.js WebSocket server for room-based messaging.",
    "keyFeatures": [
      {
        "title": "Room-Based Chat",
        "description": "Create a room or join one using a shared code."
      },
      {
        "title": "Media Sharing",
        "description": "Send images, videos, and GIFs alongside text."
      },
      {
        "title": "Message Editing & Replies",
        "description": "Edit sent messages and reply to individual messages."
      },
      {
        "title": "Typing Indicators",
        "description": "See when other participants are typing."
      }
    ],
    "specs": [
      {
        "label": "Frontend",
        "value": "HTML, CSS, Vanilla JavaScript"
      },
      {
        "label": "Backend",
        "value": "Node.js + ws"
      },
      {
        "label": "Transport",
        "value": "WebSocket"
      }
    ],
    "architecture": {
      "frontend": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "backend": [
        "Node.js",
        "ws"
      ],
      "infrastructure": [
        "Vercel frontend",
        "WebSocket server"
      ]
    },
    "role": {
      "title": "PROJECT DEVELOPMENT",
      "responsibilities": [
        "Room-based browser chat interface.",
        "Real-time communication through a Node.js WebSocket server.",
        "Media sharing, message edits, replies, and typing indicators."
      ]
    },
    "screenshots": [],
    "resultOutcome": {
      "summary": "A room-based chat application with a responsive retro interface.",
      "highlights": [
        "Shared room codes.",
        "Text and media messaging.",
        "Editing, replies, and typing feedback."
      ]
    },
    "number": "04"
  }
];
