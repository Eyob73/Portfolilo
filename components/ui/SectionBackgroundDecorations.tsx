import React from "react";

export const HeroBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle fine technical grid with radial mask */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-75 dark:opacity-55"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 65% at 65% 35%, black 25%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 65% 35%, black 25%, transparent 85%)",
        }}
      />

      {/* Atmospheric radial gradient meshes */}
      <div className="absolute top-1/4 right-8 w-[540px] h-[540px] rounded-full bg-primary/15 dark:bg-primary/[0.09] blur-[110px]" />
      <div className="absolute -bottom-20 left-8 w-[460px] h-[460px] rounded-full bg-secondary/15 dark:bg-secondary/[0.07] blur-[100px]" />

      {/* Subtle technical telemetry crosshair marks */}
      <div className="absolute top-8 left-10 font-mono text-[10px] text-primary/30 dark:text-primary/20 hidden lg:block tracking-widest">
        + [SYS_INIT // 0x00]
      </div>
      <div className="absolute bottom-6 right-16 font-mono text-[10px] text-secondary/30 dark:text-secondary/20 hidden lg:block tracking-widest">
        ┌ ARCH_DISCIPLINE // KERNEL_LAYER ┐
      </div>
    </div>
  );
};

export const AboutBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Fine technical blueprint matrix */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-35 dark:opacity-20"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 85% 20%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 85% 20%, black 10%, transparent 75%)",
        }}
      />
      {/* Delicate corner crosshairs and telemetry markers */}
      <div className="absolute top-8 right-12 text-[10px] font-mono text-outline/30 hidden lg:block tracking-widest">
        + [LAT: 9.03 // LON: 38.74] • ADDIS ABABA
      </div>
      <div className="absolute bottom-8 left-12 text-[10px] font-mono text-outline/25 hidden lg:block tracking-widest">
        ┌ ARCH_DISCIPLINE // SOLID_01 ┐
      </div>
    </div>
  );
};

export const ProjectsBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-tech-grid opacity-40 dark:opacity-25"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 15%, transparent 80%)",
        }}
      />
      {/* Atmospheric focal glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.06] dark:bg-primary/[0.04] blur-[140px]" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-secondary/[0.06] dark:bg-secondary/[0.04] blur-[120px]" />
    </div>
  );
};

export const ContactBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-tech-grid opacity-40 dark:opacity-20"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 30% 60%, black 10%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 30% 60%, black 10%, transparent 80%)",
        }}
      />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-primary/10 dark:bg-primary/[0.06] blur-[110px]" />
    </div>
  );
};

export const SkillsBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 50% at 20% 40%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 20% 40%, black 10%, transparent 75%)",
        }}
      />
      {/* Delicate telemetry accent */}
      <div className="absolute top-8 left-12 text-[10px] font-mono text-outline/25 hidden lg:block tracking-widest">
        + [TECH_MATRIX // KERNEL_SERVICES]
      </div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/[0.05] dark:bg-secondary/[0.03] blur-[120px]" />
    </div>
  );
};

export const EducationBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-15"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 80% 60%, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 80% 60%, black 10%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-6 right-12 text-[10px] font-mono text-outline/25 hidden lg:block tracking-widest">
        ┌ ACADEMIC_DISCIPLINE // CS_FOUNDATION ┐
      </div>
      <div className="absolute bottom-1/3 left-1/3 w-[380px] h-[380px] rounded-full bg-primary/[0.05] dark:bg-primary/[0.03] blur-[100px]" />
    </div>
  );
};

export const CertificatesBackdropDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-15"
        style={{
          maskImage:
            "radial-gradient(ellipse 65% 50% at 30% 50%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 50% at 30% 50%, black 10%, transparent 75%)",
        }}
      />
      <div className="absolute top-6 left-12 text-[10px] font-mono text-outline/25 hidden lg:block tracking-widest">
        + [CREDENTIALS // VERIFIED_TRAINING]
      </div>
      <div className="absolute top-1/2 right-1/4 w-[360px] h-[360px] rounded-full bg-secondary/[0.06] dark:bg-secondary/[0.03] blur-[110px]" />
    </div>
  );
};

