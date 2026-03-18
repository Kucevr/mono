import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BouncyBottom({ color = "#ffffff", className = "" }: { color?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Изначально кривая натянута вниз: Q50,100.
    // По мере скролла выравнивается к плоскому Q50,0.
    const curvedPath = "M0,0 Q50,100 100,0 L100,0 L0,0 Z";
    gsap.set(pathRef.current, { attr: { d: curvedPath } });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom bottom", 
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // от 100 до 0
        const yCurve = (1 - self.progress) * 100;
        const newPath = `M0,0 Q50,${yCurve} 100,0 L100,0 L0,0 Z`;
        gsap.set(pathRef.current, { attr: { d: newPath } });
      }
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`absolute bottom-0 left-0 w-full h-[180px] md:h-[240px] translate-y-[100%] overflow-visible z-20 pointer-events-none ${className}`}
    >
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        className="w-full h-full block"
      >
        <path ref={pathRef} fill={color} />
      </svg>
    </div>
  );
}