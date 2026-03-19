import { cn } from "../../lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  lightShadow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function PulseButton({ children, className, dark = false, lightShadow = false, href, ...props }: PulseButtonProps) {
  const btnBg = dark ? "bg-white text-black" : "bg-black text-white";
  const shadowColor = (dark || lightShadow) ? "bg-white/20" : "bg-black/40";
  const content = (
    <>
      {/* Статичная мягкая тень, которая выступает слева-снизу и не имеет ховер эффекта */}
      <div 
        className={cn(
          "absolute top-4 -left-4 w-full h-full rounded-4xl blur-xl pointer-events-none -z-10",
          shadowColor
        )}
      />
      <span className="relative z-10 block tracking-tight leading-none pointer-events-none">
        {/* Split Text эффект со ступенчатой задержкой (stagger) для букв */}
        <span className="relative h-[1.1em] flex items-center overflow-hidden">
          <span className="flex">
            {typeof children === 'string' ? children.split('').map((char, i) => (
              <span 
                key={`top-${i}`} 
                className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                style={{ transitionDelay: `${i * 0.02}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )) : <span className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">{children}</span>}
          </span>
          <span className="absolute left-0 top-[120%] flex">
            {typeof children === 'string' ? children.split('').map((char, i) => (
              <span 
                key={`bot-${i}`} 
                className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                style={{ transitionDelay: `${i * 0.02}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )) : <span className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">{children}</span>}
          </span>
        </span>
      </span>
    </>
  );

  const wrapperClassName = cn("relative group block w-max", href && "cursor-pointer");

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a href={href} className={wrapperClassName} target={props.target} rel={props.rel}>
          <span
            className={cn(
              "px-10 py-5 rounded-4xl text-[16px] font-semibold relative z-10 block tracking-tight leading-none outline-none focus:outline-none appearance-none",
              btnBg,
              className
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {content}
          </span>
        </a>
      );
    }

    return (
      <Link to={href} className={wrapperClassName}>
        <span
          className={cn(
            "px-10 py-5 rounded-4xl text-[16px] font-semibold relative z-10 block tracking-tight leading-none outline-none focus:outline-none appearance-none",
            btnBg,
            className
          )}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {content}
        </span>
      </Link>
    );
  }

  return (
    <div className={wrapperClassName}>
      <button
        {...props}
        className={cn(
          "px-10 py-5 rounded-4xl text-[16px] font-semibold relative z-10 block tracking-tight leading-none outline-none focus:outline-none appearance-none",
          btnBg,
          className
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {content}
      </button>
    </div>
  );
}