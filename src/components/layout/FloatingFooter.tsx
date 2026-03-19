import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Обычные ссылки в навбаре (как наверху)
function FooterLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={href} className={cn("relative overflow-hidden h-6 group cursor-pointer inline-flex items-center", className)}>
      <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
        {children}
      </span>
      <span className="absolute left-0 top-full block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
        {children}
      </span>
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
    </Link>
  );
}

export function FloatingFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hide initially via GSAP
    gsap.set(footerRef.current, { y: 150, opacity: 0 });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        const direction = self.direction; // 1 for down, -1 for up
        const threshold = window.innerHeight * 0.8; 
        
        const isScrollingUp = direction === -1;
        const pastThreshold = currentScroll > threshold;

        if (pastThreshold) {
          if (isScrollingUp) {
            // Show when scrolling up
            gsap.to(footerRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true });
          } else {
            // Hide when scrolling down
            gsap.to(footerRef.current, { y: 150, opacity: 0, duration: 0.4, ease: "power2.out", overwrite: true });
          }
        } else {
          // Hide if not past threshold
          gsap.to(footerRef.current, { y: 150, opacity: 0, duration: 0.4, ease: "power2.out", overwrite: true });
        }
      },
    });
  }, { scope: footerRef });

  return (
    <div
      ref={footerRef}
      className={cn(
        "fixed bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 z-9999 pointer-events-none w-[95%] sm:w-auto",
      )}
    >
      <div className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 pointer-events-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-6 font-semibold text-xs sm:text-base overflow-hidden">
        <FooterLink href="/">Home</FooterLink>
        <FooterLink href="/work" className="hidden sm:inline-flex">Work (4)</FooterLink>
        <FooterLink href="/work" className="sm:hidden">Work</FooterLink>
        
        <Link to="/" className="flex items-center gap-1.5 md:gap-2 px-1 md:px-2 group whitespace-nowrap">
          {/* Logo dot */}
          <div className="w-5 h-5 md:w-7 md:h-7 shrink-0 rounded-full bg-linear-to-tr from-[#f953c6] via-[#6B5FFF] to-[#5C90FF] group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-sm md:text-base tracking-tight">Mōno™</span>
        </Link>

        <FooterLink href="/studio">Studio</FooterLink>
        <FooterLink href="/contact" className="hidden xs:inline-flex">Contact</FooterLink>
      </div>
    </div>
  );
}