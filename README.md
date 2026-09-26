# Divyansh Chandrakar — Developer Portfolio

A production-quality personal portfolio website presenting a professional developer profile through an original premium game-interface aesthetic (black & charcoal surfaces with precise orange accents and solid UI panels).

---

## ⚡ Core Concept

> **"Professional software developer portfolio presented through the interface of a premium modern game."**

- **Balance**: 70% serious developer portfolio / 30% gaming-inspired personality.
- **Design Language**: Solid UI (charcoal & black panels, zero glassmorphism, crisp borders, subtle geometric brackets and crosshairs, warm off-white typography, sparse orange accents).
- **Recruiter Friendly**: Direct, readable case studies, factual experience timelines, and no fake statistics or arbitrary XP bars.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components + Static Page Generation)
- **UI & Components**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Architecture

```
app/
  layout.tsx                  # Root layout, fonts, SEO metadata, and AppShell
  page.tsx                    # Landing page / Game-menu hero
  globals.css                 # Industrial solid styling and color tokens
  profile/
    page.tsx                  # Academic background, current focus & interests
  projects/
    page.tsx                  # Projects archive with category filter
    [slug]/
      page.tsx                # Dynamic case studies (/unravel, /physiogenie, etc.)
  skills/
    page.tsx                  # Visual skill-tree and branch inspector
  experience/
    page.tsx                  # Structured milestones (Education, Projects, Hackathons)
  about/
    page.tsx                  # Engineering perspectives and creative philosophy
  contact/
    page.tsx                  # "LET'S BUILD SOMETHING" contact form & channels

components/
  layout/
    AppShell.tsx              # Shell container with responsive desktop/mobile states
    HeaderStatus.tsx          # Subtle top system telemetry and availability badge
    SidebarNav.tsx            # Persistent desktop left sidebar with active indicator
    MobileNav.tsx             # Responsive mobile top bar and slide-out panel
    Footer.tsx                # Understated minimal footer
  ui/
    Badge.tsx                 # Solid technical chips & tags
    SolidButton.tsx           # Primary orange CTA and secondary solid outline buttons
    SectionHeader.tsx         # Numbered section headings with industrial rules
    GeometricDecorations.tsx  # Corner brackets, crosshairs, and metadata boxes
  projects/
    ProjectCard.tsx           # Solid project card with hover states and tech stack
    ProjectsDirectory.tsx     # Client-side domain category filtering
  skills/
    SkillTree.tsx             # Visual branch node explorer and node inspector
  experience/
    ExperienceTimeline.tsx    # Filterable chronological timeline
  contact/
    ContactForm.tsx           # Validated contact form and direct copy protocol

data/
  profile.ts                  # Bio, education, focus, socials, and availability
  projects.ts                 # Full case studies (Unravel, PhysioGenie, AtmosAlert, Ether)
  skills.ts                   # Categorized engineering branches & nodes
  experience.ts               # Factual timeline milestones & hackathons

lib/
  utils.ts                    # Classname merger (clsx + tailwind-merge)
```

---

## 🎨 Color System & Visual Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Background** | `#0A0A0A` | Deep charcoal / black canvas |
| **Primary Surface** | `#151515` | Solid panel cards and sections |
| **Secondary Surface** | `#1D1D1D` | Card hover state and active elements |
| **Border** | `#30302D` | Crisp industrial framing |
| **Primary Text** | `#E5E2DA` | Warm off-white readable typography |
| **Muted Text** | `#89857D` | Secondary descriptions and metadata |
| **Primary Accent** | `#F26A21` | Active navigation, buttons, and section ticks |
| **Bright Accent** | `#FF7A2F` | Hover accents and active highlights |
| **Dark Accent** | `#B94712` | Active button presses and shadows |

---

## 📝 Updating Your Content

To customize your portfolio details, edit the files in the `data/` directory:

1. **`data/profile.ts`**: Edit name, university/institution, degree, bio, and social links.
2. **`data/projects.ts`**: Add or modify projects, live demo links, repositories, and case studies.
3. **`data/skills.ts`**: Update technical competencies across frontend, backend, AI/ML, and 3D.
4. **`data/experience.ts`**: Add hackathons, academic awards, or project milestones.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 2. Build for Production
```bash
npm run build
npm run start
```
