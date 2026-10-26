import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { SkillsBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const SkillsSection: React.FC = () => {
  return (
    <section className="py-20 border-b border-outline-variant/20 relative overflow-hidden" id="skills">
      <SkillsBackdropDecorations />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[02 // SKILLS]</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Technical Stack &amp; Capabilities
        </h2>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-12">
          A structured overview of technologies, frameworks, and engineering
          methodologies I leverage in daily development.
        </p>

        {/* 4 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.skillsData.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-surface-container border border-outline-variant/40 hover:border-outline hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <Icon name={category.icon} className="text-[24px]" />
                  </span>
                  <span className="font-meta-mono text-meta-mono text-outline uppercase">
                    {category.category}
                  </span>
                </div>

                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  {category.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/40 font-label-mono text-label-mono ${
                      skill.highlighted ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
