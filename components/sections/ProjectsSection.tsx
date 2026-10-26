import React from "react";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectsBackdropDecorations } from "@/components/ui/SectionBackgroundDecorations";

export const ProjectsSection: React.FC = () => {
  return (
    <section
      className="py-20 border-b border-outline-variant/20 bg-surface-container-lowest/40 relative overflow-hidden"
      id="projects"
    >
      <ProjectsBackdropDecorations />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
          <span>[03 // FEATURED WORK]</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Production-Minded Projects
        </h2>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-12">
          Real applications architected with maintainable patterns, secure
          endpoints, and practical business-driven feature sets.
        </p>

        <div className="space-y-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
