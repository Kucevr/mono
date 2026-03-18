import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BouncyTop({ color = "#ffffff", className = "" }: { color?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Изначально кривая скруглена: Q50,0. Когда мы листаем ниже - выравнивается до Q50,100.
    const curvedPath = "M0,100 Q50,0 100,100 L100,100 L0,100 Z";
    gsap.set(pathRef.current, { attr: { d: curvedPath } });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom", 
      end: "top top",   
      scrub: true,
      onUpdate: (self) => {
        // от 0 до 100
        const yCurve = self.progress * 100;
        const newPath = `M0,100 Q50,${yCurve} 100,100 L100,100 L0,100 Z`;
        gsap.set(pathRef.current, { attr: { d: newPath } });
      }
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`absolute top-0 left-0 w-full h-[180px] md:h-[240px] -translate-y-[100%] overflow-visible z-20 pointer-events-none ${className}`}
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