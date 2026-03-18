import { cn } from "../../lib/utils";
import React from "react";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  lightShadow?: boolean;
}

export function PulseButton({ children, className, dark = false, lightShadow = false, ...props }: PulseButtonProps) {
  const btnBg = dark ? "bg-white text-black" : "bg-black text-white";
  const shadowColor = (dark || lightShadow) ? "bg-white/30" : "bg-black/40";

  return (
    <div className="relative group block w-max">
      {/* Статичная мягкая тень, которая выступает слева-снизу и не имеет ховер эффекта */}
      <div 
        className={cn(
          "absolute top-4 -left-4 w-[100%] h-[100%] rounded-[2rem] blur-[16px] pointer-events-none z-0 rotate-0",
          shadowColor
        )}
        style={{ transform: "translateZ(0)" }}
      />
      <button
        {...props}
        className={cn(
          "px-10 py-5 rounded-[2rem] text-[16px] font-semibold relative z-10 block tracking-tight leading-none outline-none focus:outline-none appearance-none",
          btnBg,
          className
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Split Text эффект со ступенчатой задержкой (stagger) для букв */}
        <div className="relative h-[1.1em] flex items-center overflow-hidden">
          <div className="flex">
            {typeof children === 'string' ? children.split('').map((char, i) => (
              <span 
                key={`top-${i}`} 
                className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                style={{ transitionDelay: `${i * 0.02}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )) : <span className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">{children}</span>}
          </div>
          <div className="absolute left-0 top-[120%] flex">
            {typeof children === 'string' ? children.split('').map((char, i) => (
              <span 
                key={`bot-${i}`} 
                className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                style={{ transitionDelay: `${i * 0.02}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )) : <span className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">{children}</span>}
          </div>
        </div>
      </button>
    </div>
  );
}