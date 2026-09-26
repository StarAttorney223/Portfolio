import React from "react";
import { profileData } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { Badge } from "@/components/ui/Badge";
import { SolidButton } from "@/components/ui/SolidButton";
import { BookOpen, GraduationCap, Target, Compass, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Profile",
  description:
    "Developer profile for Divyansh Chandrakar: Education, current focus, and areas of engineering interest.",
};

export default function ProfilePage() {
  const { education, currentFocus, areasOfInterest, introduction } = profileData;

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Top Header */}
      <SectionHeader
        number="01"
        title="PROFILE"
        subtitle="ENGINEERING PROFILE &amp; ACADEMIC BACKGROUND"
        badge="SYS-ID: DC-CS"
      />

      {/* Main Identity Banner */}
      <div className="relative bg-[#151515] border border-[#30302D] p-6 sm:p-8">
        <CornerBrackets accentCorner="all" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#30302D]">
          <div>
            <span className="font-mono text-xs text-[#F26A21] uppercase tracking-widest block mb-1">
              DEVELOPER SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E5E2DA]">
              {profileData.name.full}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="font-mono text-xs text-[#E5E2DA] uppercase tracking-wider font-semibold">
                {profileData.headline}
              </span>
              <span className="text-[#30302D]">//</span>
              <span className="font-mono text-xs text-[#89857D] uppercase tracking-wider">
                {profileData.subheadline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SolidButton href="/contact" variant="primary" size="md" icon="arrow">
              RECRUITER CONTACT
            </SolidButton>
          </div>
        </div>

        {/* Section 1: Introduction */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <BookOpen className="w-4 h-4 text-[#F26A21]" />
            <span>01 // INTRODUCTION</span>
          </div>

          <div className="space-y-3 text-[#E5E2DA]/90 text-sm sm:text-base leading-relaxed max-w-3xl">
            {introduction.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Education & Current Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 2: Education */}
        <div className="relative bg-[#151515] border border-[#30302D] p-6 flex flex-col justify-between">
          <CornerBrackets accentCorner="top-left" />

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#30302D]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
                <GraduationCap className="w-4 h-4 text-[#F26A21]" />
                <span>02 // EDUCATION</span>
              </div>
              <span className="font-mono text-[10px] text-[#F26A21] bg-[#1D1D1D] px-2 py-0.5 border border-[#30302D]">
                {education.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase text-[#E5E2DA]">
                {education.degree}
              </h3>
              <p className="font-mono text-xs text-[#F26A21] uppercase tracking-wider mt-0.5">
                {education.field}
              </p>
              <p className="text-xs text-[#89857D] mt-2">
                {education.institution}
              </p>
              <p className="font-mono text-[11px] text-[#504E4A] mt-1">
                Timeline: {education.period}
              </p>
            </div>

            <div className="pt-3 border-t border-[#30302D]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#89857D] block mb-2">
                CORE COURSEWORK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <Badge key={course} variant="default" size="sm">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Current Focus */}
        <div className="relative bg-[#151515] border border-[#30302D] p-6 flex flex-col justify-between">
          <CornerBrackets accentCorner="top-right" />

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#30302D]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
                <Target className="w-4 h-4 text-[#F26A21]" />
                <span>03 // CURRENT FOCUS</span>
              </div>
              <span className="font-mono text-[10px] text-[#89857D]">ACTIVE ITERATION</span>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase text-[#E5E2DA]">
                {currentFocus.primary}
              </h3>
              <p className="font-mono text-xs text-[#89857D] uppercase tracking-wider mt-1">
                {currentFocus.secondary}
              </p>
            </div>

            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#89857D] leading-relaxed">
              {currentFocus.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#F26A21] font-mono select-none mt-0.5">▸</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 4: Areas of Interest */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#30302D]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <Compass className="w-4 h-4 text-[#F26A21]" />
            <span>04 // AREAS OF INTEREST</span>
          </div>
          <span className="font-mono text-[10px] text-[#504E4A]">[ DOMAINS ]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {areasOfInterest.map((area, idx) => (
            <div
              key={area.title}
              className="bg-[#151515] border border-[#30302D] p-5 space-y-3 group hover:border-[#F26A21]/40 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#F26A21] font-bold">0{idx + 1}</span>
                <span className="text-[#504E4A]">[ SUB-SYS ]</span>
              </div>

              <h4 className="text-base font-bold uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                {area.title}
              </h4>

              <p className="text-xs text-[#89857D] leading-relaxed">
                {area.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#30302D]">
                {area.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
