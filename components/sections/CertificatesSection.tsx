import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { CertificatesBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const CertificatesSection: React.FC = () => {
  const { certifications } = SITE_CONFIG;

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
          {certifications.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top card glow effect */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all">
                    <Icon name={item.icon} className="text-xl" />
                  </div>

                  <span className="font-mono text-[9px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline-sm text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {item.title}
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

              {/* Skills footer */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
