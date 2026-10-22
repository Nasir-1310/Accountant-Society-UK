// src/components/Rounded_Button.tsx
import React from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Rounded_Button = ({
  children,
  href,
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700";

  const finalClass = `${baseClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={finalClass}>
      {children}
    </button>
  );
};
