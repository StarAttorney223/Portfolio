"use client";

import React, { useState } from "react";
import { SolidButton } from "@/components/ui/SolidButton";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { CheckCircle2, Copy, Send, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const emailSocial = profileData.socials.find((s) => s.label === "EMAIL");
  const emailAddress = emailSocial?.identifier || "divyansh.dev@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left 3 Cols: Form Panel */}
      <div className="lg:col-span-3 bg-[#151515] border border-[#30302D] p-6 sm:p-8 relative">
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
                className="w-full bg-[#101010] border border-[#30302D] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] focus:border-[#F26A21] focus:outline-none transition-colors"
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
                className="w-full bg-[#101010] border border-[#30302D] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] focus:border-[#F26A21] focus:outline-none transition-colors"
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
                className="w-full bg-[#101010] border border-[#30302D] px-3.5 py-2.5 text-[#E5E2DA] placeholder-[#504E4A] focus:border-[#F26A21] focus:outline-none transition-colors resize-y"
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

      {/* Right 2 Cols: Direct Channels & Telemetry */}
      <div className="lg:col-span-2 space-y-6">
        {/* Direct Email Card */}
        <div className="bg-[#151515] border border-[#30302D] p-6 space-y-3 relative">
          <CornerBrackets accentCorner="top-left" />

          <span className="font-mono text-[10px] uppercase text-[#F26A21] tracking-widest block">
            DIRECT PROTOCOL
          </span>
          <h3 className="font-mono text-sm font-bold uppercase text-[#E5E2DA]">
            ELECTRONIC MAIL
          </h3>

          <div className="bg-[#101010] border border-[#30302D] p-3 flex items-center justify-between font-mono text-xs">
            <span className="text-[#E5E2DA] truncate">{emailAddress}</span>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="text-[#89857D] hover:text-[#F26A21] transition-colors p-1"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {copied && (
            <p className="font-mono text-[11px] text-[#F26A21] tracking-wide">
              ✓ COPIED TO CLIPBOARD
            </p>
          )}

          <p className="text-xs text-[#89857D] leading-relaxed">
            Feel free to email directly for technical opportunities, collaborations, or resume requests.
          </p>
        </div>

        {/* Social Matrix Card */}
        <div className="bg-[#151515] border border-[#30302D] p-6 space-y-4">
          <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest block">
            PUBLIC CHANNELS
          </span>

          <div className="space-y-2 font-mono text-xs">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#101010] border border-[#30302D] hover:border-[#F26A21] text-[#E5E2DA] hover:text-[#F26A21] transition-colors"
              >
                <span className="font-semibold uppercase tracking-wider">
                  {social.label}
                </span>
                <span className="text-[#89857D] text-[11px]">
                  {social.identifier}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="bg-[#101010] border border-[#30302D] p-4 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#89857D]">STATUS</span>
            <span className="text-[#F26A21] font-bold">ONLINE &amp; ACTIVE</span>
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
    </div>
  );
}
