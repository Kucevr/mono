import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    text: `"Working with Mono™ felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in the outcome."`,
    author: "John Doe",
    role: "Head design at Circle®",
    bg: "white",
    color: "black",
  },
  {
    id: 2,
    text: `"We didn't just get a website — we got a solid digital foundation. Mono™ is the kind of partner you want when building something meant to last."`,
    author: "Amantha Doe",
    role: "Founder of Radius®",
    bg: "white",
    color: "black",
  },
  {
    id: 3,
    text: `"Their ability to listen, challenge assumptions, and translate ideas into a clean digital system."`,
    author: "Max Trump",
    role: "Founder of Light Studio®",
    bg: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop')", // Placeholder 3rd background
    color: "white",
  },
  {
    id: 4,
    text: `"What stood out with Mono™ was the balance between design quality and technical execution. Everything was thoughtful, scalable, and built with term use in mind."`,
    author: "Camila Verga",
    role: "Head design at LogoIpsum®",
    bg: "white",
    color: "black",
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);  const sectionRef = useRef<HTMLDivElement>(null);  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Parallax for the door backgrounds to match the bounce entry
    gsap.fromTo(".door-bg", 
      { yPercent: -15 },
      { 
        yPercent: 0, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      }
    );

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // trigger = outer wrapper
        start: "top top",
        end: "+=300%",
        pin: containerRef.current, // pin = inner wrapper, preventing DOM modification conflicts with React
        scrub: 1,
        onUpdate: (self) => {
          // progress from 0 to 1
          // 0 -> 0.25: doors open
          // 0.25 -> 1: cards flip. 
          // We want activeIndex to update based on card flips.
          const cardProgress = Math.max(0, (self.progress - 0.25) / 0.75);
          const totalCards = testimonials.length;
          const newIndex = Math.min(
            totalCards - 1,
            Math.floor(cardProgress * totalCards)
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // 1. Doors opening
    tl.to(leftDoorRef.current, { xPercent: -100, duration: 1, ease: "power2.inOut" }, 0)
      .to(rightDoorRef.current, { xPercent: 100, duration: 1, ease: "power2.inOut" }, 0);

    // Карточки уже видны вначале, скрывать/показывать opacity не нужно
    // Они лежат под дверями (z-index 10 против z-index 50 у дверей)

    // 2. Cards flinging
    cardsRef.current.forEach((card, index) => {
      // Last card doesn't fling away, it stays
      if (!card || index === testimonials.length - 1) return;
      
      // Stagger each card leaving and being "placed" somewhere
      tl.to(card, {
        yPercent: 120,          // Карточка улетает вниз
        xPercent: index % 2 === 0 ? -20 : 20, // Чуть вбок
        rotationZ: index % 2 === 0 ? -15 : 15, // Ротация
        rotationX: 45,          // Эффект "укладывания" на стол
        scale: 0.8,
        duration: 1,
        ease: "power2.inOut"
      }, 0.5 + index); // Начало анимации смахивания пересекается с концом открытия дверей
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative w-full">
      <section ref={containerRef} className="relative w-full h-screen bg-[#e5e5e5] text-black overflow-hidden z-20">
      
      {/* Doors representing the full screen initial photo */}
      <div 
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-1/2 h-full z-50 overflow-hidden"
      >
        <div 
          className="door-bg absolute top-0 left-0 w-screen h-[120%]"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div 
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full z-50 overflow-hidden"
      >
        <div 
          className="door-bg absolute top-0 right-0 w-screen h-[120%]"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Main Content inside the doors */}
      <div ref={contentWrapRef} className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-0 z-10 w-full">
        <div className="text-sm md:text-lg font-medium tracking-tight whitespace-nowrap self-start md:self-auto hidden md:block">(Testimonials)</div>
        
        <div className="w-full flex justify-between items-center mb-6 md:hidden">
          <div className="text-sm font-medium tracking-tight">(Testimonials)</div>
          <div className="text-sm font-bold tracking-tight">
            0{activeIndex + 1} /0{testimonials.length}
          </div>
        </div>

        {/* Stacked Cards */}
        <div className="relative isolate w-full max-w-80 h-90 sm:max-w-87.5 sm:h-112.5 md:max-w-none md:w-105 md:h-125 mt-4 mb-40 md:mt-0 mx-auto md:mx-0">
          {testimonials.map((t, i) => (
            <div 
              key={t.id}
              ref={el => { cardsRef.current[i] = el; }}
              className="absolute inset-0 rounded-3xl p-8 sm:p-10 flex flex-col justify-center shadow-xl md:shadow-2xl border border-black/5 origin-center will-change-transform overflow-hidden"
              style={{
                background: t.bg.startsWith('url') ? t.bg : t.bg,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: t.color,
                zIndex: testimonials.length - i, // Top card has highest z-index
                transform: `translateZ(0) rotate(${i * -2}deg) translate(0, ${i * 5}px)`, // Slight stagger visually
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Optional inner overlay for readable text if bg is an image */}
              {t.bg.startsWith('url') && (
                <div className="absolute inset-0 bg-black/40 rounded-3xl z-0 pointer-events-none" />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-auto">
                    {/* Placeholder for top logo/pattern */}
                    {i === 3 ? (
                        <div className="text-xl font-bold tracking-tighter w-12 text-center leading-none">logo<br/>ipsum</div>
                    ) : (
                        <div className="flex gap-1">
                            <span className="w-8 h-8 rounded-full bg-current opacity-20 block" />
                            <span className="w-8 h-8 rounded-full bg-current opacity-40 block -ml-4" />
                            <span className="w-8 h-8 rounded-full bg-current opacity-60 block -ml-4" />
                        </div>
                    )}
                </div>
                
                <p className="text-lg md:text-xl xl:text-2xl font-bold leading-tight mb-8">
                  {t.text}
                </p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-300 overflow-hidden shrink-0" />
                  <div>
                    <div className="font-bold text-sm">{t.author}</div>
                    <div className="text-xs opacity-70">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm md:text-lg font-bold tracking-tight w-15 text-right hidden md:block">
          0{activeIndex + 1} /0{testimonials.length}
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-base font-medium text-gray-400 opacity-80 z-20 pointer-events-none">
        (Scroll for more)
      </div>
    </section>
    </div>
  );
}