import React from "react";
import { Project } from "@/lib/projects";
import { Icon } from "@/components/ui/Icon";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isPrimary = project.themeColor === "primary";
  const badgeThemeClasses = isPrimary
    ? "bg-primary/10 border-primary/30 text-primary"
    : "bg-secondary/10 border-secondary/30 text-secondary";

  return (
    <div className="p-6 md:p-8 rounded-xl bg-surface-container border border-outline-variant/40 hover:border-outline transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded border font-meta-mono text-meta-mono ${badgeThemeClasses}`}
            >
              {project.categoryTag}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="font-meta-mono text-meta-mono text-on-surface-variant">
              {project.categorySub}
            </span>
          </div>

          <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {project.description}
          </p>

          {/* Architectural Highlights */}
          <div className="space-y-2 py-2">
            <p className="font-meta-mono text-meta-mono text-outline uppercase tracking-wider">
              Key Architectural Features
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant font-body-sm text-body-sm">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon
                    name="check_circle"
                    className="text-primary text-[16px] shrink-0"
                  />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges & Link */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/40 font-label-mono text-label-mono ${
                  tech.highlighted ? "text-primary" : "text-on-surface"
                }`}
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <a
              className="inline-flex items-center gap-2 font-label-mono text-label-mono text-primary hover:underline group"
              href={project.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>View Project on GitHub</span>
              <Icon
                name="arrow_forward"
                className="text-[16px] group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Right Mockup Screen */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-lg border border-outline-variant/40 p-4 font-label-mono text-[11px] shadow-inner">
          {project.mockupType === "stacktrack" && (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 text-outline">
                <span>STACKTRACK // DASHBOARD</span>
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                  LIVE
                </span>
              </div>

              {/* Mock KPIs */}
              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="p-2.5 rounded bg-surface-container border border-outline-variant/30">
                  <div className="text-outline text-[10px]">TOTAL REVENUE</div>
                  <div className="text-on-surface text-headline-sm font-headline-sm mt-0.5">
                    $48,250.00
                  </div>
                  <div className="text-primary text-[10px] mt-1">
                    ↑ +14.2% this month
                  </div>
                </div>
                <div className="p-2.5 rounded bg-surface-container border border-outline-variant/30">
                  <div className="text-outline text-[10px]">ITEMS IN STOCK</div>
                  <div className="text-on-surface text-headline-sm font-headline-sm mt-0.5">
                    1,420 SKU
                  </div>
                  <div className="text-amber-400 text-[10px] mt-1">
                    ⚠ 3 items low
                  </div>
                </div>
              </div>

              {/* Mock Stock Table Preview */}
              <div className="rounded border border-outline-variant/30 overflow-hidden bg-surface-container/50">
                <div className="grid grid-cols-3 p-2 bg-surface-container text-outline text-[10px] uppercase">
                  <span>Item Name</span>
                  <span>Qty</span>
                  <span className="text-right">Status</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Logitech MX Master 3S</span>
                  <span>42</span>
                  <span className="text-right text-primary">In Stock</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Dell UltraSharp 27&quot;</span>
                  <span>04</span>
                  <span className="text-right text-amber-400">Low Stock</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Keychron Q1 Pro</span>
                  <span>88</span>
                  <span className="text-right text-primary">In Stock</span>
                </div>
              </div>
            </div>
          )}

          {project.mockupType === "student-tracker" && (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 text-outline">
                <span>EDU-PORTAL // COHORT CS-2024</span>
                <span className="text-primary font-bold">AVG GPA 3.74</span>
              </div>

              {/* Grade Distribution Visual Bar */}
              <div className="my-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-on-surface-variant">
                  <span>Grade Distribution</span>
                  <span>94.8% Pass Rate</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full flex overflow-hidden">
                  <div className="bg-primary h-full w-[45%]" title="Grade A"></div>
                  <div
                    className="bg-secondary h-full w-[35%]"
                    title="Grade B"
                  ></div>
                  <div
                    className="bg-surface-bright h-full w-[15%]"
                    title="Grade C"
                  ></div>
                  <div className="bg-error h-full w-[5%]" title="Grade F"></div>
                </div>
              </div>

              {/* Student Roster Snippet */}
              <div className="rounded border border-outline-variant/30 overflow-hidden bg-surface-container/50">
                <div className="grid grid-cols-3 p-2 bg-surface-container text-outline text-[10px] uppercase">
                  <span>Student</span>
                  <span>Attendance</span>
                  <span className="text-right">Term GPA</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Abel T. #1042</span>
                  <span>98%</span>
                  <span className="text-right text-primary font-bold">3.95</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Bethelhem K. #1089</span>
                  <span>92%</span>
                  <span className="text-right text-primary font-bold">3.82</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-outline-variant/20 text-on-surface-variant">
                  <span>Dawit M. #1105</span>
                  <span>88%</span>
                  <span className="text-right text-primary font-bold">3.60</span>
                </div>
              </div>
            </div>
          )}

          {project.mockupType === "fixmycampus" && (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 text-outline">
                <span>DISPATCH ENGINE // TICKET #FMC-208</span>
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                  IN PROGRESS
                </span>
              </div>

              <div className="my-3 p-3 rounded bg-surface-container border border-outline-variant/30 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-on-surface font-semibold">
                    Lab 4B Ethernet Switch Failure
                  </span>
                  <span className="px-2 py-0.5 rounded bg-error-container/40 text-error text-[10px] font-bold shrink-0">
                    HIGH
                  </span>
                </div>
                <p className="text-outline text-[11px]">
                  Building C, 2nd Floor, Room 204. Reported by Dept. IT Coordinator.
                </p>
                <div className="flex items-center justify-between pt-2 text-[10px] text-on-surface-variant border-t border-outline-variant/20">
                  <span>Assignee: Tech M. Solomon</span>
                  <span>ETA: 45 min</span>
                </div>
              </div>

              {/* Timeline status steps */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-primary text-[10px]">
                  <Icon name="check" className="text-[14px]" />
                  <span>10:15 AM - Ticket Logged &amp; Triaged</span>
                </div>
                <div className="flex items-center gap-2 text-primary text-[10px]">
                  <Icon name="check" className="text-[14px]" />
                  <span>10:22 AM - Field Technician Dispatched</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface text-[10px]">
                  <span className="w-3.5 h-3.5 rounded-full border border-primary flex items-center justify-center text-[8px] text-primary">
                    ●
                  </span>
                  <span>10:40 AM - Hardware Replacement In Progress</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
