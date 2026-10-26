import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-label-mono font-label-mono",
    md: "px-4 py-2 text-label-mono font-label-mono font-medium",
    lg: "px-6 py-3 text-body-md font-body-md font-semibold",
  }[size];

  const variantStyles = {
    primary:
      "bg-primary-container text-surface-container-lowest hover:bg-primary shadow-sm hover:shadow-[0_4px_16px_rgba(20,184,166,0.25)]",
    outline:
      "bg-transparent border border-outline-variant text-on-surface hover:border-primary/50 hover:bg-surface-container hover:text-primary",
    ghost:
      "bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40 font-label-mono",
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
