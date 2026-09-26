import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Divyansh Chandrakar for software engineering opportunities, internships, collaboration, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <SectionHeader
        number="06"
        title="CONTACT"
        subtitle="COMMUNICATION PROTOCOL // INITIATE TRANSMISSION"
        description="Have an engineering opportunity, collaboration idea, or question? Send a message directly."
        badge="ONLINE"
      />

      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E5E2DA]">
          LET&apos;S BUILD SOMETHING.
        </h2>
        <p className="text-sm sm:text-base text-[#89857D] max-w-2xl leading-relaxed">
          Have a project, opportunity, or idea? I&apos;d be happy to hear from you.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
