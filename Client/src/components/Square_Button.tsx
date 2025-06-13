// src/components/Button.tsx

import React from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Square_Button = ({
  children,
  href,
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseClass =
    "px-4 py-2 border border-gray-300 text-gray-700 text-white hover:text-black bg-blue-800 hover:bg-white hover:border-teal-500 transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 ";

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
