import React from "react";

interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
        <span>{tag}</span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-12">
          {subtitle}
        </p>
      )}
    </div>
  );
};
