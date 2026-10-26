"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { ContactBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot bot protection field
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error once user starts typing again
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "submitting") return;

    // Client-side pre-validation
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName || cleanName.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a message (at least 10 characters).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          subject: formData.subject.trim(),
          message: cleanMessage,
          website: formData.website, // Honeypot field
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Failed to send your message. Please try again or reach out directly via email."
        );
        return;
      }

      // Success
      setStatus("success");
      setSuccessMessage(
        data.message ||
          "Thank you! Your message has been sent successfully. I will get back to you shortly."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage(
        "A network error occurred while sending your message. Please check your connection or email directly."
      );
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
  };

  return (
    <section
      className="py-20 border-b border-outline-variant/20 relative overflow-hidden"
      id="contact"
    >
      <ContactBackdropDecorations />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[07 // CONTACT]</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Have a project or opportunity in mind?
        </h2>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Open to junior developer, software engineer, and IT opportunities.
          Send me a message below or reach out directly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/40 space-y-5">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Direct Channels
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Icon name="mail" className="text-[18px]" />
                </div>
                <div>
                  <p className="font-meta-mono text-meta-mono text-outline uppercase">
                    Email
                  </p>
                  <a
                    className="font-label-mono text-body-md text-on-surface hover:text-primary transition-colors break-all"
                    href={`mailto:${SITE_CONFIG.email}`}
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Icon name="code" className="text-[18px]" />
                </div>
                <div>
                  <p className="font-meta-mono text-meta-mono text-outline uppercase">
                    GitHub
                  </p>
                  <a
                    className="font-label-mono text-body-md text-on-surface hover:text-primary transition-colors"
                    href={SITE_CONFIG.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    github.com/eyob73
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Icon name="location_on" className="text-[18px]" />
                </div>
                <div>
                  <p className="font-meta-mono text-meta-mono text-outline uppercase">
                    Location
                  </p>
                  <p className="font-body-md text-body-md text-on-surface">
                    {SITE_CONFIG.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Response Window Info */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-body-sm text-body-sm">
              <p className="flex items-center gap-2 text-primary font-label-mono text-[12px] mb-1 font-semibold">
                <Icon name="schedule" className="text-[16px]" />
                Response Window
              </p>
              {SITE_CONFIG.responseWindow}
            </div>
          </div>

          {/* Interactive Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div
                className="p-6 md:p-8 rounded-2xl bg-surface-container border border-primary/50 shadow-xl shadow-primary/5 space-y-5 animate-in fade-in duration-300"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Icon name="check_circle" className="text-[28px]" />
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Message Delivered Successfully
                    </h4>
                    <p className="font-label-mono text-xs text-primary mt-0.5">
                      Direct Gmail Notification Triggered
                    </p>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {successMessage ||
                    "Thank you for reaching out! Your message has been sent directly to my inbox via Resend. I will review it and get back to you promptly."}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-lg bg-primary-container text-surface-container-lowest font-body-md text-body-md font-semibold hover:bg-primary transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Send Another Message</span>
                    <Icon name="refresh" className="text-[18px]" />
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/40 space-y-5 shadow-sm"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot anti-spam field (hidden from human visitors) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field blank</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    className="p-3.5 rounded-xl bg-error-container/20 border border-error/50 text-error font-body-sm text-body-sm flex items-start gap-2.5 animate-in fade-in duration-200"
                    role="alert"
                    aria-live="assertive"
                  >
                    <Icon name="error" className="text-[18px] shrink-0 mt-0.5" />
                    <span className="leading-snug">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      className="block font-label-mono text-label-mono text-on-surface mb-2"
                      htmlFor="name"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all disabled:opacity-60"
                      id="name"
                      placeholder="e.g. Your Name"
                      required
                      type="text"
                      maxLength={100}
                      disabled={status === "submitting"}
                      value={formData.name}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      className="block font-label-mono text-label-mono text-on-surface mb-2"
                      htmlFor="email"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all disabled:opacity-60"
                      id="email"
                      placeholder="e.g. you@example.com"
                      required
                      type="email"
                      maxLength={254}
                      disabled={status === "submitting"}
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    className="block font-label-mono text-label-mono text-on-surface mb-2"
                    htmlFor="subject"
                  >
                    Subject <span className="text-outline text-xs">(optional)</span>
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all disabled:opacity-60"
                    id="subject"
                    placeholder="e.g. Full-Stack Developer Opportunity / API Project"
                    type="text"
                    maxLength={200}
                    disabled={status === "submitting"}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    className="block font-label-mono text-label-mono text-on-surface mb-2"
                    htmlFor="message"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all resize-y disabled:opacity-60"
                    id="message"
                    placeholder="Hi, I'd like to discuss an opportunity regarding..."
                    required
                    rows={5}
                    maxLength={5000}
                    disabled={status === "submitting"}
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>

                {/* Submission row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    className="px-6 py-3 rounded-lg bg-primary-container text-surface-container-lowest font-body-md text-body-md font-semibold hover:bg-primary transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group shadow-sm disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                    type="submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-surface-container-lowest border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Icon
                          name="send"
                          className="text-[18px] group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>

                  <p className="font-meta-mono text-meta-mono text-outline">
                    Powered by Resend API delivery &bull; Direct to inbox
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
