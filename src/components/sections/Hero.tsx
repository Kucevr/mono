import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../layout/Navbar";
import { PulseButton } from "../ui/PulseButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Входная анимация текста
    const tlIntro = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlIntro.from(".hero-text", { y: -20, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.2 })
           .from(".huge-text", { y: 100, opacity: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.5");

    // Анимация скролла: белая карточка Hero плавно сжимается ИЗ ЦЕНТРА к центру
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=550%", // Длина скролла для эффекта уменьшения
        scrub: true,
      }
    });

    // Карточка сжимается со всех сторон (origin-center по умолчанию, либо flex-center)
    // Убираем y: 3vh, чтобы сжималось ровно к центру по обеим осям
    tlScroll.to(heroCardRef.current, {
      scale: 0.5,
      borderRadius: "40px",
      duration: 1,
      ease: "power2.inOut"
    });

    // Бесконечная плавная анимация галереи на фоне (не зависит от скролла)
    // Первая колонка - едет вверх
    gsap.to(".gallery-col-1", {
      yPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
    // Вторая колонка - едет вниз
    gsap.to(".gallery-col-2", {
      yPercent: 50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });
    // Третья колонка - едет вверх, с другой скоростью
    gsap.to(".gallery-col-3", {
      yPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0e100f]">
      {/* Sticky container держит весь этот "бутерброд" на экране во время скролла */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Gallery Background (черный фон с картинками за белой карточкой) */}
        <div className="absolute inset-0 w-full h-[200%] -top-[50%] flex justify-center gap-4 sm:gap-8 lg:gap-16 px-8 opacity-60 pointer-events-none">
          <div className="gallery-col-1 w-1/4 sm:w-1/3 flex flex-col gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={`c1-${i}`} className="w-full aspect-[4/5] bg-gray-800 rounded-xl overflow-hidden shrink-0"><img src={`https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600&h=800`} alt="project" className="w-full h-full object-cover" /></div>)}
          </div>
          <div className="gallery-col-2 w-1/4 sm:w-1/3 flex flex-col gap-8 -translate-y-[50%]">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={`c2-${i}`} className="w-full aspect-[3/4] bg-gray-700 rounded-xl overflow-hidden shrink-0"><img src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=800`} alt="project" className="w-full h-full object-cover" /></div>)}
          </div>
          <div className="gallery-col-3 w-1/4 sm:w-1/3 flex flex-col gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={`c3-${i}`} className="w-full aspect-[4/5] bg-gray-900 rounded-xl overflow-hidden shrink-0"><img src={`https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=800`} alt="project" className="w-full h-full object-cover" /></div>)}
          </div>
        </div>

        {/* Главная белая карточка Hero */}
        <div ref={heroCardRef} className="relative w-full h-full bg-white text-black flex flex-col justify-between z-10 shadow-2xl overflow-hidden origin-center">
          <Navbar workCount={4} />

          <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 relative w-full h-full pt-2 pb-120">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center h-full max-w-screen-2xl mx-auto w-full relative z-10 mt-20">
              
              {/* Левый список услуг */}
              <div className="flex flex-col gap-[6px] font-semibold text-[15px] lg:text-[17px] tracking-tight w-64 hero-text">
                {["Web Design", "Social Media", "Marketing", "Development", "SEO Optimization"].map((srv) => (
                  <div key={srv} className="hover:text-gray-400 cursor-pointer transition-colors duration-300">
                    {srv}
                  </div>
                ))}
              </div>

              {/* Центральные декоративные точки - выравниваем по центру */}
              <div className="hidden lg:flex gap-[8vw] flex-1 justify-center items-center h-full px-12 hero-text pt-24">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="w-2 h-2 bg-black rounded-full" />
                ))}
              </div>

              {/* Правый текст и кнопка Let's Talk */}
              <div className="flex flex-col items-start lg:items-start w-72 lg:w-[320px] gap-8 hero-text pt-24">
                <p className="text-[17px] lg:text-[19px] font-medium leading-[1.3] text-left">
                  No cookie cutter sites. No empty claims. Only practical tools and smart strategies that drive growth and build brands.
                </p>

                {/* Единый компонент кнопки с тенью */}
                <PulseButton href="/contact" className="mt-2" dark={false}>Let's talk</PulseButton>
              </div>
            </div>

            {/* Огромный текст (Mōno™ Studio) поднятый чтобы не было пустот, как по фото */}
            <div className="absolute bottom-[20vh] md:bottom-[15vh] lg:bottom-[10vh] left-0 w-full px-6 lg:px-12 flex justify-between items-baseline pointer-events-none pb-4 huge-text">
              <h1 className="text-[18vw] leading-[0.75] font-medium tracking-[-0.05em]">
                Mōno<span className="text-[7vw] align-top font-normal -ml-2">™</span>
              </h1>
              <h1 className="text-[18vw] leading-[0.75] font-medium tracking-[-0.05em]">
                Studio
              </h1>
            </div>

            {/* Копирайт */}
            <div className="absolute bottom-[40vh] right-[20%] translate-x-1/2 text-[12px] text-gray-500 font-semibold huge-text hidden lg:block">
              © 2026 Mōno™ Studio
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}