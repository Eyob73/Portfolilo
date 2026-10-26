import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { HeroBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";
import { HeroIllustration } from "@/components/ui/HeroIllustration";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden border-b border-outline-variant/20">
      {/* Subtle Technical Backdrop Decorations */}
      <HeroBackdropDecorations />


      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-primary/30 shadow-[0_0_15px_rgba(20,184,166,0.12)]">
              <span className="font-meta-mono text-meta-mono text-primary font-medium tracking-wide">
                Open to Opportunities
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight leading-tight">
              Hi, I&apos;m Eyob. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-fixed">
                I Build Digital Experiences.
              </span>
            </h1>

            {/* Concise Intro Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {SITE_CONFIG.fullBio}
            </p>

            {/* CTAs & GitHub Handle */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                className="px-6 py-3 rounded-lg bg-primary-container text-surface-container-lowest font-body-md text-body-md font-semibold hover:bg-primary transition-all duration-200 active:scale-95 flex items-center gap-2 group shadow-[0_4px_16px_rgba(20,184,166,0.25)]"
                href="#projects"
              >
                <span>Explore My Projects</span>
                <Icon
                  name="arrow_forward"
                  className="text-[18px] group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                className="px-6 py-3 rounded-lg bg-transparent border border-outline-variant text-on-surface font-body-md text-body-md font-medium hover:border-primary/50 hover:bg-surface-container hover:text-primary transition-all duration-200 active:scale-95"
                href="#contact"
              >
                Contact Me
              </a>

              <a
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40 font-label-mono text-label-mono transition-all"
                href={SITE_CONFIG.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="code" className="text-[18px]" />
                <span>{SITE_CONFIG.githubHandle}</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/30 w-full mt-4">
              {SITE_CONFIG.metrics.map((metric, index) => (
                <div key={index}>
                  <p className="font-meta-mono text-meta-mono text-outline uppercase">
                    {metric.label}
                  </p>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Code & Architecture Terminal Illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
