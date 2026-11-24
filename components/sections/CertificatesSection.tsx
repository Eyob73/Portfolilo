"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { CertificatesBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const CertificatesSection: React.FC = () => {
  const { certifications } = SITE_CONFIG;
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    certifications.forEach((item) => {
      if (item.certificateImage) {
        const img = new Image();
        img.src = item.certificateImage;
        img.onerror = () => {
          setMissingImages((prev) => ({ ...prev, [item.certificateImage!]: true }));
        };
      }
    });
  }, [certifications]);

  return (
    <section
      className="py-20 border-b border-outline-variant/20 relative overflow-hidden"
      id="certifications"
    >
      <CertificatesBackdropDecorations />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[06 // TRAINING &amp; CERTIFICATIONS]</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Training &amp; Certifications
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Industry-standard technical certifications and comprehensive professional development
              programs verifying competency in full-stack architecture, software fundamentals, and mobile engineering.
            </p>
          </div>

          <div className="font-label-mono text-xs text-outline hidden md:block">
            <span>{certifications.length} Credentials Verified</span>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((item, index) => {
            const isAAU = item.issuer.includes("Addis Ababa University");
            const isImageMissing = !!(item.certificateImage && missingImages[item.certificateImage]);
            const actionLabel = "Open Certificate";

            return (
              <div
                key={index}
                onClick={(e) => {
                  if (item.credentialUrl && !isImageMissing && !(e.target as HTMLElement).closest("a, button")) {
                    window.open(item.credentialUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className={`p-6 rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 flex flex-col justify-between group relative overflow-hidden ${item.credentialUrl && !isImageMissing ? "cursor-pointer" : ""
                  }`}
              >
                {/* Subtle top card glow effect */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                <div>
                  {/* Header: Icon & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <Icon name={item.icon} className="text-xl" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 tracking-wider uppercase">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline-sm text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug flex items-start justify-between gap-2">
                    <span>{item.title}</span>
                    {item.credentialUrl && !isImageMissing && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-xs text-primary font-mono font-medium shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity"
                        title={`${actionLabel} in a new tab`}
                      >
                        <span>Open</span>
                        <Icon
                          name="north_east"
                          className="text-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    )}
                  </h3>

                  {/* Issuer & Period */}
                  <div className="space-y-1 mt-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                      <Icon name="verified" className="text-xs text-primary" />
                      <span>{item.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-outline">
                      <Icon name="calendar_today" className="text-xs text-outline/70" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed mt-3.5">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Skills tags */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-5 border-t border-outline-variant/20">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-outline border border-outline-variant/30 group-hover:border-primary/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Explicit Action Bar */}
                  {item.credentialUrl ? (
                    <div className="mt-4 pt-3.5 border-t border-outline-variant/25 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-on-surface-variant group-hover:text-primary transition-colors">
                        <Icon name="verified" className="text-[15px] text-primary" />
                        <span className="font-medium">{isAAU ? "Verified Certificate" : "Verified Certificate"}</span>
                      </span>

                      {isImageMissing ? (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-outline font-mono text-xs cursor-not-allowed"
                          title="Certificate image is currently unavailable"
                        >
                          <Icon name="hide_image" className="text-[13px]" />
                          <span>Image Unavailable</span>
                        </span>
                      ) : (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold hover:bg-primary hover:text-surface-container-lowest transition-all duration-200 shadow-sm"
                          title={`${actionLabel} in a new tab`}
                        >
                          <span>{actionLabel}</span>
                          <Icon
                            name="north_east"
                            className="text-[13px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 pt-3.5 border-t border-outline-variant/25 flex items-center justify-between text-xs font-mono text-outline">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="verified" className="text-[15px] text-outline/70" />
                        <span>Curriculum Completed</span>
                      </span>
                      <span className="text-[11px] text-outline/60 italic">
                        Institutional Training
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
