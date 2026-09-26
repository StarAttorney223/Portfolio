"use client";

import React, { useState } from "react";
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
  const emailAddress = emailSocial?.identifier || "divyansh.dev@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Left 2 Cols: Direct Channels & Telemetry */}
      <div className="space-y-6 lg:col-span-2">
        {/* Direct Email Card */}
        <div className="relative space-y-3 border border-[#30302D] bg-[#151515] p-6">
          <CornerBrackets accentCorner="top-left" />

          <div className="flex items-center justify-between gap-4">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#F26A21]">
              STATUS // AVAILABLE
            </span>
            <span className="h-1.5 w-1.5 bg-[#F26A21] animate-system-pulse" />
          </div>
          <h3 className="font-mono text-sm font-bold uppercase text-[#E5E2DA]">
            EMAIL
          </h3>

          <div className="flex items-center justify-between border border-[#30302D] bg-[#101010] p-3 font-mono text-xs">
            <span className="truncate text-[#E5E2DA]">{emailAddress}</span>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="p-1 text-[#89857D] transition-colors hover:text-[#F26A21]"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>

          {copied && (
            <p className="font-mono text-[11px] tracking-wide text-[#F26A21]">
              COPIED TO CLIPBOARD
            </p>
          )}

          <p className="text-xs leading-relaxed text-[#89857D]">
            Direct line for technical opportunities, collaborations, or resume requests.
          </p>
        </div>

        {/* Social Matrix Card */}
        <div className="space-y-4 border border-[#30302D] bg-[#151515] p-6">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#89857D]">
            PUBLIC CHANNELS
          </span>

          <div className="space-y-2 font-mono text-xs">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-[#30302D] bg-[#101010] p-3 text-[#E5E2DA] transition-colors hover:border-[#F26A21] hover:text-[#F26A21]"
              >
                <span className="font-semibold uppercase tracking-wider">
                  {social.label}
                </span>
                <span className="truncate text-[11px] text-[#89857D]">
                  {social.identifier}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="space-y-2 border border-[#30302D] bg-[#101010] p-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#89857D]">STATUS</span>
            <span className="font-bold text-[#F26A21]">ONLINE &amp; ACTIVE</span>
          </div>
          <div className="flex items-center justify-between text-[#89857D]">
            <span>LOCATION</span>
            <span>{profileData.metadata.location}</span>
          </div>
          <div className="flex items-center justify-between text-[#89857D]">
            <span>TIMEZONE</span>
            <span>{profileData.metadata.timezone}</span>
          </div>
        </div>
      </div>

      {/* Right 3 Cols: Form Panel */}
      <div className="relative border border-[#30302D] bg-[#151515] p-6 sm:p-8 lg:col-span-3">
        <CornerBrackets accentCorner="all" />

        <div className="flex items-center justify-between pb-3 border-b border-[#30302D] mb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>DISPATCH TRANSMISSION</span>
          </div>
          <span className="font-mono text-[10px] text-[#F26A21]">SECURE // FORM</span>
        </div>

        {status === "success" ? (
          <div className="py-12 text-center space-y-4 font-mono">
            <CheckCircle2 className="w-10 h-10 text-[#F26A21] mx-auto" />
            <h3 className="text-xl font-bold uppercase text-[#E5E2DA]">
              MESSAGE TRANSMITTED
            </h3>
            <p className="text-xs text-[#89857D] max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. Your transmission has been queued and I will respond to your provided email address shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#101010] border border-[#30302D] text-xs text-[#E5E2DA] uppercase tracking-wider hover:border-[#F26A21] transition-colors"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5 font-mono text-xs">
              <label
                htmlFor="name"
                className="block text-[#89857D] uppercase tracking-wider font-semibold"
              >
                YOUR NAME <span className="text-[#F26A21]">*</span>
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
                className="w-full border border-[#30302D] bg-[#101010] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] transition-all duration-150 focus:scale-[1.01] focus:border-[#F26A21] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 font-mono text-xs">
              <label
                htmlFor="email"
                className="block text-[#89857D] uppercase tracking-wider font-semibold"
              >
                YOUR EMAIL ADDRESS <span className="text-[#F26A21]">*</span>
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
                className="w-full border border-[#30302D] bg-[#101010] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] transition-all duration-150 focus:scale-[1.01] focus:border-[#F26A21] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5 font-mono text-xs">
              <label
                htmlFor="message"
                className="block text-[#89857D] uppercase tracking-wider font-semibold"
              >
                MESSAGE SPECIFICATION <span className="text-[#F26A21]">*</span>
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
                className="w-full resize-y border border-[#30302D] bg-[#101010] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] transition-all duration-150 focus:scale-[1.01] focus:border-[#F26A21] focus:outline-none"
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
                {status === "submitting" ? "TRANSMITTING..." : "SEND MESSAGE"}
              </SolidButton>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
