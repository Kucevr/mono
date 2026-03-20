import { useState, useEffect, useRef } from "react";
import { PulseButton } from "../ui/PulseButton";
import gsap from "gsap";

export function Pricing() {
  const words = ["Pay Less.", "Build Better.", "Pick Smart."];
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [index, words.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Получаем DOM-элементы для всех слов
    const wordElements = containerRef.current.querySelectorAll('.word-container');
    
    wordElements.forEach((wordElement, i) => {
      const chars = wordElement.querySelectorAll('.char');
      gsap.killTweensOf(chars);
      
      if (i === index) {
        // Анимируем появление текущего слова (с небольшой задержкой, чтобы предыдущее успело уйти)
        gsap.fromTo(chars, 
          { y: "120%" },
          {
            y: "0%",
            duration: 0.6,
            delay: 0.2, // добавленная задержка
            stagger: 0.03,
            ease: "power3.out",
            overwrite: true,
          }
        );
      } else if (i === prevIndex) {
        // Анимируем уход предыдущего слова
        gsap.to(chars, {
          y: "-120%",
          duration: 0.4,
          stagger: 0.02,
          ease: "power3.in",
          overwrite: true,
        });
      } else {
        // Остальные слова просто прячем снизу без анимации, чтобы они были готовы
        gsap.set(chars, { y: "120%" });
      }
    });
  }, [index, prevIndex]);

  return (
    <section id="pricing" className="relative w-full bg-white text-black py-40 px-8 lg:px-12 z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-start mb-8">
          <span className="text-base font-medium tracking-tight text-gray-500">(Pricing)</span>
        </div>
        <div 
          ref={containerRef}
          className="relative h-[1.3em] min-h-22.5 sm:min-h-27.5 w-full flex items-center justify-center overflow-hidden mb-4"
        >
          {words.map((word, i) => (
            <h2
              key={i}
              className={`word-container absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap font-bold tracking-tight`}
            >
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} className="inline-block overflow-hidden pb-4 pt-4 px-px">
                  <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
                </span>
              ))}
            </h2>
          ))}
        </div>
        <p className="text-xl font-medium tracking-tight mb-20 text-center">
          Choose the plan that fits you best.
        </p>

        <div className="w-full flex-col md:flex-row flex items-stretch gap-6 mt-2 relative max-w-5xl mx-auto">
          

          {/* Starter Plan */}
          <div className="w-full md:w-1/2 bg-[#f4f4f5] rounded-3xl p-4 lg:p-6 flex flex-col relative z-10 border border-transparent h-full">
            {/* Metallic orb icon placeholder */}
            <div className="absolute top-6 right-10 w-10 h-10 rounded-full bg-linear-to-br from-gray-300 via-gray-400 to-gray-600 shadow-inner" />
            
            <h3 className="text-2xl font-bold tracking-tight mb-4">Starter</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-sm">
              Built for early-stage teams establishing their online presence.
            </p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl lg:text-6xl font-bold tracking-tighter leading-none">$2,000</span>
              <span className="text-sm font-bold tracking-tight">(Project)</span>
            </div>

            <div className="flex flex-col gap-8 mb-12">
              <p className="text-gray-500 font-medium h-6">What's included:</p>
              <ul className="flex flex-col gap-4 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Tailored website layouts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Core SEO configuration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Mobile-first responsive design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Brand-ready UI framework
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Ideal for new launches and rebrands
                </li>
              </ul>
            </div>

            <div className="mt-auto flex justify-between items-end border-t border-gray-200/50 pt-8 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">Timeline:</span>
                <span className="font-semibold">1-2 weeks</span>
              </div>
              <PulseButton href="/#contact">Book a call</PulseButton>
            </div>
          </div>

          {/* Growth Plan */}
          <div className="w-full md:w-1/2 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-4 lg:p-6 flex flex-col relative z-20 border border-gray-100 h-full">
            {/* Colorful orb icon placeholder */}
            <div className="absolute top-6 right-10 w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-indigo-500 to-cyan-400 shadow-lg animate-gradient-slow bg-[length:200%_200%]" />
            
            <h3 className="text-2xl font-bold tracking-tight mb-4">Growth</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-sm">
              Designed for businesses ready to elevate their digital experience.
            </p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl lg:text-6xl font-bold tracking-tighter leading-none">$4,000</span>
              <span className="text-sm font-bold tracking-tight">(Project)</span>
            </div>

            <div className="flex flex-col gap-8 mb-12">
              <p className="text-gray-500 font-medium h-6">What's included:</p>
              <ul className="flex flex-col gap-4 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  High-end design with smooth interactions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Complete on-site SEO setup
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Adaptive layouts for every screen
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  CMS setup for content or case studies
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Performance tuning & optimization
                </li>
              </ul>
            </div>

            <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-8 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">Timeline:</span>
                <span className="font-semibold">2-3 weeks</span>
              </div>
              <PulseButton href="/#contact">Book a call</PulseButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}