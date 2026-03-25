import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PulseButton } from "../ui/PulseButton";
import { BouncyBottom } from "../ui/BouncyBottom";
import { BouncyTop } from "../ui/BouncyTop";

gsap.registerPlugin(ScrollTrigger);

// Декоративные компоненты для логотипов реальных брендов (стилизованный текст/иконки)
const partnerPairs = [
  { 
    front: () => <span className="font-bold text-2xl tracking-tighter">NIKE</span>, 
    back: () => <span className="font-extrabold text-2xl italic tracking-wider">adidas</span> 
  },
  { 
    front: () => <span className="font-medium text-2xl tracking-tight flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-black"></div> Apple</span>, 
    back: () => <span className="font-semibold text-2xl tracking-tighter">Microsoft</span> 
  },
  { 
    front: () => <span className="font-medium text-2xl tracking-tight">Google</span>, 
    back: () => <span className="font-bold text-2xl tracking-tighter">Meta</span> 
  },
  { 
    front: () => <span className="font-bold text-2xl tracking-[0.2em] uppercase">Tesla</span>, 
    back: () => <span className="font-semibold text-2xl tracking-widest uppercase">Rivian</span> 
  },
  { 
    front: () => <span className="font-black text-2xl text-red-600 tracking-tighter uppercase">NETFLIX</span>, 
    back: () => <span className="font-bold text-2xl flex items-center gap-1"><div className="w-5 h-5 rounded-full border-4 border-black"></div> Spotify</span> 
  },
  { 
    front: () => <span className="font-serif italic text-3xl font-bold tracking-tighter">SONY</span>, 
    back: () => <span className="font-bold text-2xl tracking-widest uppercase">Samsung</span> 
  },
  { 
    front: () => <span className="font-bold text-2xl tracking-tighter">amazon</span>, 
    back: () => <span className="font-bold text-2xl flex items-center gap-1"><div className="w-4 h-4 bg-green-600 rounded-sm"></div> Shopify</span> 
  },
  { 
    front: () => <span className="font-medium text-3xl tracking-tighter">Uber</span>, 
    back: () => <span className="font-bold text-2xl text-[#FF5A5F] tracking-tighter">airbnb</span> 
  },
];

export function PartnersAndWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringWork, setIsHoveringWork] = useState(false);

  // Логика рандомного переворота карточек
  useGSAP(() => {
    const cards = gsap.utils.toArray('.partner-card') as HTMLElement[];
    if(!cards.length) return;
    
    // Инициализируем baseline
    cards.forEach(card => card.dataset.rotation = "0");

    let availableIndices: number[] = [];

    const getNextCardIndex = () => {
      if (availableIndices.length === 0) {
        // Наполняем мешок всеми индексами и перемешиваем (чтобы каждая карточка перевернулась ровно один раз за цикл)
        availableIndices = cards.map((_, i) => i);
        for (let i = availableIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
        }
      }
      return availableIndices.pop();
    };

    const interval = setInterval(() => {
      const idx = getNextCardIndex();
      if (idx === undefined) return;
      
      const card = cards[idx];
      
      if (gsap.isTweening(card)) return;

      const currentRotation = parseInt(card.dataset.rotation || "0", 10);
      const newRotation = currentRotation + 180;
      card.dataset.rotation = String(newRotation);

      gsap.to(card, {
        rotateX: newRotation,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      cards.forEach(card => gsap.killTweensOf(card));
    };
  }, { scope: containerRef });

  // Логика кастомного курсора (optimised with quickTo)
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  useGSAP(() => {
    if (!cursorRef.current) return;
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });
  }, { scope: containerRef });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (isHoveringWork && xTo.current && yTo.current) {
         xTo.current(e.clientX);
         yTo.current(e.clientY);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isHoveringWork]);

  // Логика сжатия липких карточек
  useGSAP(() => {
    const cards = gsap.utils.toArray('.work-card');
    cards.forEach((card: any, i) => {
      // Исключаем 4-ю карточку (последнюю)
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top 20%",
        endTrigger: ".works-container",
        end: "bottom bottom",
        scrub: true,
        animation: gsap.to(card, {
          scale: 0.55, // только уменьшение
          ease: "none"
        })
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#e5e5e5] text-black z-20 works-container" id="work">
      <BouncyTop color="#e5e5e5" />
      
      {/* Кастомный курсор для работ */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center transition-opacity duration-300"
        style={{
          opacity: isHoveringWork ? 1 : 0,
        }}
      >
        <div 
          className="bg-black/40 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold tracking-tight uppercase whitespace-nowrap transition-transform duration-300"
          style={{
            transform: `scale(${isHoveringWork ? 1 : 0.8})`
          }}
        >
           View Work
        </div>
      </div>

      {/* ===== PARTNERS SECTION ===== */}
      <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24 pb-20 md:pb-32 max-w-screen-2xl mx-auto border-b border-black/10">
        <div className="flex justify-between items-center mb-12 text-sm md:text-base font-bold tracking-tight">
          <span>(Partners)</span>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" />
          <span>2011-26©</span>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" />
        </div>

        {/* ГРИД ПАРТНЕРОВ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 perspective-[1000px]">
          {partnerPairs.map(({ front: FrontLogo, back: BackLogo }, idx) => (
            <div 
              key={idx} 
              className="partner-card bg-white rounded-xl aspect-[2/1] flex items-center justify-center transform-style-3d shadow-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Лицевая сторона */}
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                <FrontLogo />
              </div>
              {/* Обратная сторона (другой бренд) */}
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl backface-hidden rotate-x-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                <BackLogo />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== WORKS SECTION ===== */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 flex flex-col md:flex-row relative">
        
        {/* Левая колонка - прилипает при скролле */}
        <div className="w-full md:w-1/3 relative">
          {/* Бургер-меню (превращается в крестик) */}
          <div className="md:sticky md:top-[20vh] flex flex-col gap-12 md:gap-32">
            <div>
              <p className="text-sm md:text-base font-bold tracking-tight mb-4">(Portfolio 26©)</p>
              <h2 className="text-5xl sm:text-6xl lg:text-[7vw] font-bold tracking-tighter leading-none">
                Work<span className="text-lg md:text-xl align-top text-gray-400 ml-2 font-semibold tracking-normal">(4)</span>
              </h2>
            </div>
            
            <div className="hidden md:block w-2 h-2 bg-black rounded-full" />

            <Link to="/work" className="inline-block mt-auto w-max mb-12 md:mb-0">
              <PulseButton>View all work</PulseButton>
            </Link>
          </div>
        </div>

        {/* Правая колонка - карточки накладываются друг на друга */}
        <div className="w-full md:w-2/3 flex flex-col gap-[10vh] pb-[50vh] mt-24 md:mt-0 relative works-container">
          {/* Каждая карточка липнет */}
          {[
            { id: "forma-digital", title: "Forma Digital" },
            { id: "nero-vision", title: "Nero Vision" },
            { id: "one-step", title: "One Step" },
            { id: "bold-moves", title: "Bold Moves" }
          ].map((project) => (
            <Link 
              to={`/work/${project.id}`}
              key={`work-${project.id}`} 
              className="block work-card w-full aspect-[16/9] bg-zinc-900 rounded-2xl sticky top-[20vh] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-none"
              onMouseEnter={() => setIsHoveringWork(true)}
              onMouseLeave={() => setIsHoveringWork(false)}
            >
              <img 
                src={`/photo/work/${project.id.replace("-", "")}/main.webp`}
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute font-semibold bottom-6 right-6 text-white text-xl z-10 select-none pointer-events-none drop-shadow-lg">
                {project.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BouncyBottom color="#e5e5e5" />
    </section>
  );
}