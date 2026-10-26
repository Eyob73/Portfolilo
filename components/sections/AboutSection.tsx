import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { AboutBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const AboutSection: React.FC = () => {
  return (
    <section
      className="py-20 border-b border-outline-variant/20 bg-surface-container-lowest/50 relative overflow-hidden"
      id="about"
    >
      <AboutBackdropDecorations />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[01 // ABOUT]</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
          Pragmatic Engineering &amp; Practical Problem Solving
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Narrative */}
          <div className="lg:col-span-8 space-y-5 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
            {SITE_CONFIG.aboutParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Right: Metric Highlight Cards (2x2) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SITE_CONFIG.aboutHighlights.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-surface-container border border-outline-variant/40 hover:border-primary/40 transition-all duration-200"
              >
                <Icon
                  name={card.icon}
                  className="text-primary text-[28px] mb-2"
                />
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">
                  {card.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
