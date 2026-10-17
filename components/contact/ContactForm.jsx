"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SolidButton } from "@/components/ui/SolidButton";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { CheckCircle2, Copy, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const emailSocial = profileData.socials.find((s) => s.label === "EMAIL");
  const emailAddress = emailSocial?.identifier || "divyanshchandrakar2005@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nReply to: ${formData.email}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Left 2 Cols: Direct Channels & Telemetry */}
      <div className="space-y-6 lg:col-span-2">
        {/* Direct Email Card */}
        <div className="interactive-panel relative space-y-3 border border-[#484844] bg-[#242424] p-6">
          <CornerBrackets accentCorner="top-left" />

          <div className="flex items-center justify-between gap-4">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#FF852E]">
              STATUS // AVAILABLE
            </span>
            <span className="h-1.5 w-1.5 bg-[#FF852E] animate-system-pulse" />
          </div>
          <h3 className="font-mono text-sm font-bold uppercase text-[#F5F3EE]">
            EMAIL
          </h3>

          <div className="flex items-center justify-between border border-[#484844] bg-[#1C1C1C] p-3 font-mono text-xs">
            <span className="truncate text-[#F5F3EE]">{emailAddress}</span>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="p-1 text-[#B8B5AE] transition-colors hover:text-[#FF852E]"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>

          {copied && (
            <p className="font-mono text-[11px] tracking-wide text-[#FF852E]">
              COPIED TO CLIPBOARD
            </p>
          )}

          <p className="text-xs leading-relaxed text-[#B8B5AE]">
            Direct line for technical opportunities, collaborations, or resume requests.
          </p>
        </div>

        {/* Social Matrix Card */}
        <div className="interactive-panel space-y-4 border border-[#484844] bg-[#242424] p-6">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#B8B5AE]">
            PUBLIC CHANNELS
          </span>

          <div className="space-y-2 font-mono text-xs">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-[#484844] bg-[#1C1C1C] p-3 text-[#F5F3EE] transition-colors hover:border-[#FF852E] hover:text-[#FF852E]"
              >
                <span className="font-semibold uppercase tracking-wider">
                  {social.label}
                </span>
                <span className="truncate text-[11px] text-[#B8B5AE]">
                  {social.identifier}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="space-y-2 border border-[#484844] bg-[#1C1C1C] p-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#B8B5AE]">STATUS</span>
            <span className="font-bold text-[#FF852E]">ONLINE &amp; ACTIVE</span>
          </div>
          <div className="flex items-center justify-between text-[#B8B5AE]">
            <span>LOCATION</span>
            <span>{profileData.metadata.location}</span>
          </div>
          <div className="flex items-center justify-between text-[#B8B5AE]">
            <span>TIMEZONE</span>
            <span>{profileData.metadata.timezone}</span>
          </div>
        </div>
      </div>

      {/* Right 3 Cols: Form Panel */}
      <div className="relative border border-[#484844] bg-[#242424] p-6 sm:p-8 lg:col-span-3">
        <CornerBrackets accentCorner="all" />

        <div className="flex items-center justify-between pb-3 border-b border-[#484844] mb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B8B5AE]">
            <Terminal className="w-3.5 h-3.5 text-[#FF852E]" />
            <span>DISPATCH TRANSMISSION</span>
          </div>
          <span className="font-mono text-[10px] text-[#FF852E]">SECURE // FORM</span>
        </div>

        <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            className="py-12 text-center space-y-4 font-mono"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle2 className="w-10 h-10 text-[#FF852E] mx-auto" />
            <h3 className="text-xl font-bold uppercase text-[#F5F3EE]">
              EMAIL DRAFT READY
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-[#FF852E]">STATUS // EMAIL HANDOFF</p>
            <p className="text-xs text-[#B8B5AE] max-w-sm mx-auto leading-relaxed">
              Finish sending in your email app. If it did not open, copy the email address and send your message directly. Your draft is still available here.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#1C1C1C] border border-[#484844] text-xs text-[#F5F3EE] uppercase tracking-wider hover:border-[#FF852E] transition-colors"
            >
              RETURN TO DRAFT
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Name */}
            <div className="field-group relative space-y-1.5 font-mono text-xs">
              <label
                htmlFor="name"
                className="block text-[#B8B5AE] uppercase tracking-wider font-semibold"
              >
                YOUR NAME <span className="text-[#FF852E]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Alex Morgan"
                className="w-full border border-[#484844] bg-[#1C1C1C] px-3.5 py-2.5 text-[#F5F3EE] placeholder-[#96928B] transition-all duration-150 focus:scale-[1.01] focus:border-[#FF852E] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="field-group relative space-y-1.5 font-mono text-xs">
              <label
                htmlFor="email"
                className="block text-[#B8B5AE] uppercase tracking-wider font-semibold"
              >
                YOUR EMAIL ADDRESS <span className="text-[#FF852E]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. alex@example.com"
                className="w-full border border-[#484844] bg-[#1C1C1C] px-3.5 py-2.5 text-[#F5F3EE] placeholder-[#96928B] transition-all duration-150 focus:scale-[1.01] focus:border-[#FF852E] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div className="field-group relative space-y-1.5 font-mono text-xs">
              <label
                htmlFor="message"
                className="block text-[#B8B5AE] uppercase tracking-wider font-semibold"
              >
                MESSAGE SPECIFICATION <span className="text-[#FF852E]">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Detail the project scope, engineering opportunity, or inquiry..."
                className="w-full resize-y border border-[#484844] bg-[#1C1C1C] px-3.5 py-2.5 text-[#F5F3EE] placeholder-[#96928B] transition-all duration-150 focus:scale-[1.01] focus:border-[#FF852E] focus:outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <SolidButton
                type="submit"
                variant="primary"
                size="lg"
                icon="arrow"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                OPEN EMAIL DRAFT
              </SolidButton>
            </div>
          </motion.form>
        )}
        </AnimatePresence>
      </div>

    </div>
  );
}
