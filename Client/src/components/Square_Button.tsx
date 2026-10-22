// src/components/Square_Button.tsx
import React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href?: string;
  };

export const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60";

export const Square_Button: React.FC<ButtonProps> = ({
  children,
  href,
  className = "",
  type = "button",
  ...rest
}) => {
  const finalClass = `${buttonBaseClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClass} {...rest}>
        {children}
      </Link>
    );
  }

  // Without a link or an action, the button is only a visual label — usually
  // placed inside a <Link>. Render it as a span so we never nest a <button>
  // inside an <a> (invalid HTML and a double tab stop).
  if (!rest.onClick && type === "button") {
    return (
      <span className={finalClass} {...(rest as React.HTMLAttributes<HTMLSpanElement>)}>
        {children}
      </span>
    );
  }

  return (
    <button type={type} className={finalClass} {...rest}>
      {children}
    </button>
  );
};
