// src/components/Button.tsx
import React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href?: string;
  };

export const Square_Button: React.FC<ButtonProps> = ({
  children,
  href,
  className = "",
  type = "button",
  ...rest
}) => {
  const baseClass =
    "px-4 py-2 border border-gray-300 text-gray-700 text-white hover:text-black bg-blue-800 hover:bg-white hover:border-teal-500 transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50";

  const finalClass = `${baseClass} ${className}`;

 if (href) {
  return (
    <Link href={href} className={finalClass} {...rest}>
      {children}
    </Link>
  );
}

  return (
    <button type={type} className={finalClass} {...rest}>
      {children}
    </button>
  );
};
