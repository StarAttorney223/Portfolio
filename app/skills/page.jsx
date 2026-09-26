import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillTree } from "@/components/skills/SkillTree";

export const metadata = {
  title: "Skills",
  description:
    "Technical skill tree and architectural domains: Frontend, Backend, Databases, AI/ML, Tools & Cloud, and Game/3D design.",
};

export default function SkillsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <SectionHeader
        number="03"
        title="SKILLS"
        subtitle="TECHNICAL DOMAINS // SYSTEM ARCHITECTURE TREE"
        description="Structured engineering competencies across client systems, cloud infrastructure, AI models, and 3D visual environments."
        badge="6 DOMAINS"
      />

      <SkillTree />
    </div>
  );
}
