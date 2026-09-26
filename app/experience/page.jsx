import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";

export const metadata = {
  title: "Experience",
  description:
    "Engineering experience, computer science education, hackathon sprint builds, and technical milestones for Divyansh Chandrakar.",
};

export default function ExperiencePage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <SectionHeader
        number="04"
        title="EXPERIENCE"
        subtitle="ENGINEERING RECORD // MILESTONE TIMELINE"
        description="Structured record of academic foundations, full-stack project execution, competitive hackathons, and technical initiatives."
        badge="FACTUAL RECORD"
      />

      <ExperienceTimeline />
    </div>
  );
}
