import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";

export const Footer: React.FC = () => {
  return (
    <footer className="docked full-width bottom-0 bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-label-mono text-body-md font-semibold text-on-surface">
            EG / dev
          </span>
          <span className="hidden sm:inline text-outline">|</span>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            © 2026 {SITE_CONFIG.name}. Built with
            precision &amp; architectural poise. {SITE_CONFIG.location}.
          </p>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-label-mono font-label-mono active:opacity-80"
            href={SITE_CONFIG.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-label-mono font-label-mono active:opacity-80"
            href={SITE_CONFIG.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-label-mono font-label-mono active:opacity-80"
            href={`mailto:${SITE_CONFIG.email}`}
          >
            Email
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-label-mono font-label-mono active:opacity-80"
            href="#about"
          >
            Resume
          </a>
          <a
            className="p-2 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-colors ml-2"
            href="#"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <Icon name="arrow_upward" className="text-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
};
