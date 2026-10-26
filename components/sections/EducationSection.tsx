import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { EducationBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const EducationSection: React.FC = () => {
  const { education } = SITE_CONFIG;

  return (
    <section
      className="py-20 border-b border-outline-variant/20 bg-surface-container-lowest/50 relative overflow-hidden"
      id="education"
    >
      <EducationBackdropDecorations />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[05 // ACADEMICS]</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
          Education &amp; Foundations
        </h2>

        {/* Minimal, clean card */}
        <div className="p-8 rounded-xl bg-surface-container border border-outline-variant/40 max-w-4xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
            <div>
              <span className="font-meta-mono text-meta-mono text-primary">
                {education.tag}
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                {education.degree}
              </h3>
              {education.location && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  {education.location}
                </p>
              )}
            </div>

            <div className="text-left md:text-right">
              <span className="inline-block px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-label-mono text-label-mono">
                {education.graduation}
              </span>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="font-label-mono text-label-mono text-outline uppercase tracking-wider mb-3">
              {education.focusHeading}
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {education.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
