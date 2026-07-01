import React from "react";

export function BrandLogo({
  variant = "full",
  size = "md",
  className = "",
}: {
  variant?: "full" | "icon" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
  };

  const gapSizes = {
    sm: "gap-2.5",
    md: "gap-3",
    lg: "gap-4",
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-[var(--accent)] shrink-0 ${iconSizes[size]}`}
      aria-hidden="true"
    >
      {/* Flask Lip */}
      <line x1="8" y1="2" x2="16" y2="2" />
      {/* Flask Body */}
      <path d="M14 2L14 6L19 14L15 21L9 21L5 14L10 6L10 2" />
      
      {/* Network Nodes (filled circles) */}
      <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="15" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="15" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
      
      {/* Network Lines */}
      <line x1="12" y1="10" x2="8" y2="15" strokeWidth="1" />
      <line x1="12" y1="10" x2="16" y2="15" strokeWidth="1" />
      <line x1="8" y1="15" x2="12" y2="18" strokeWidth="1" />
      <line x1="16" y1="15" x2="12" y2="18" strokeWidth="1" />
      <line x1="8" y1="15" x2="16" y2="15" strokeWidth="1" />
      
      {/* Evaporating Data Blocks */}
      <rect x="18" y="2" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="22" y="5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
      <rect x="20" y="8" width="1" height="1" fill="currentColor" stroke="none" />
      <rect x="16" y="1" width="1.2" height="1.2" fill="currentColor" stroke="none" />
    </svg>
  );

  const wordmark = (
    <span className={`font-[family-name:var(--font-editorial)] font-medium tracking-tight text-[var(--ink)] ${textSizes[size]}`}>
      Research Data Lab
    </span>
  );

  if (variant === "icon") {
    return <div className={`flex items-center justify-center ${className}`}>{icon}</div>;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center ${gapSizes[size]} ${className}`}>
        {icon}
        {wordmark}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${gapSizes[size]} ${className}`}>
      {icon}
      {wordmark}
    </div>
  );
}
