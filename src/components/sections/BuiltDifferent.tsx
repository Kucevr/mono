import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SplitChars = ({ text, className, id }: { text: string; className?: string; id: string }) => {
  return (
    <div className={cn("perspective-[1000px] flex items-center justify-center font-medium", className)} style={{ transformStyle: 'preserve-3d' }}>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`char-${id} inline-block leading-none`}
          style={{ 
            backfaceVisibility: "hidden",
            transformOrigin: "50% 50% -8vw",
            // Изначально всё, кроме первой фразы, повернуто
            transform: id === "1" ? "rotateX(0deg)" : "rotateX(-90deg)"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export function BuiltDifferent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Timeline для скролла
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // Фиксируем на 3 экрана
        scrub: 1, // Мягкий scrub для плавности
        pin: true,
      }
    });

    // 1. Убираем первую фразу ("Design with purpose")
    tl.to(".char-1", {
      rotateX: 90,
      stagger: 0.05,
      duration: 1,
      ease: "none"
    }, 0);

    // 2. Показываем вторую фразу ("Design with intent")
    tl.to(".char-2", {
      rotateX: 0,
      stagger: 0.05,
      duration: 1,
      ease: "none"
    }, 0.5); // Начинаем чуть раньше окончания первой

    // 3. Убираем вторую фразу
    tl.to(".char-2", {
      rotateX: 90,
      stagger: 0.05,
      duration: 1,
      ease: "none"
    }, 2); // Пауза перед скрытием

    // 4. Показываем третью фразу и картинку
    tl.to(".char-3", {
      rotateX: 0,
      stagger: 0.05,
      duration: 1,
      ease: "none"
    }, 2.5);


  }, { scope: containerRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#1c1c1c] text-white z-10 overflow-hidden">
      <div 
        ref={containerRef} 
        className="w-full h-full flex flex-col items-center justify-center relative"
      >
        {/* Верхняя надпись */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-tight text-white/50">
          (Our Vision)
        </div>

        {/* Контейнер для всех фраз */}
        <div className="relative flex items-center justify-center w-full h-full text-[10vw] sm:text-7xl md:text-[9vw] tracking-tighter">
          {/* Фраза 1 */}
          <div className="absolute top-1/2 left-1/2 w-full max-w-[100vw] -translate-x-1/2 -translate-y-1/2 flex justify-center flex-wrap">
            <SplitChars id="1" text="Design with purpose" className="flex-wrap" />
          </div>
          
          {/* Фраза 2 */}
          <div className="absolute top-1/2 left-1/2 w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex justify-center flex-wrap">
            <SplitChars id="2" text="Design with intent" className="flex-wrap" />
          </div>

          {/* Фраза 3 (Текст и картинка) */}
          <div className="absolute top-1/2 left-1/2 w-full max-w-[100vw] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6 flex-wrap">
            <SplitChars id="3" text="Design always stays" className="z-10 flex-wrap" />
            
          </div>
        </div>

        {/* Горизонтальная линия посередине для эстетики */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />

        {/* Нижняя надпись */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-tight text-white/50">
          (Scroll for more)
        </div>
      </div>
    </section>
  );
}