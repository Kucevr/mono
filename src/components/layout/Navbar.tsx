import { useRef, useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Компонент большого меню из фото
function SidebarLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href} className="relative overflow-hidden inline-flex items-center text-4xl lg:text-[4vw] font-medium tracking-[-0.04em] pb-2 group w-max py-2">
      <div className="relative overflow-hidden h-[1.1em] pointer-events-none">
        <span className="block group-hover:-translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">{children}</span>
        <span className="absolute left-0 top-[110%] block group-hover:-translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">{children}</span>
      </div>
      {/* Подчеркивание заливается слева направо */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
    </Link>
  );
}

// Обычные ссылки в навбаре
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href} className="relative overflow-hidden h-6 group cursor-pointer inline-flex items-center text-current">
      <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
        {children}
      </span>
      <span className="absolute left-0 top-full block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
        {children}
      </span>
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-current scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
    </Link>
  );
}

export function Navbar({ workCount = 4 }: { workCount?: number }) {
  const navRef = useRef<HTMLHeadElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useGSAP(() => {
    if (!navRef.current) return;

    // Ensure it starts visible
    gsap.set(navRef.current, { y: 0, opacity: 1 });

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: 0,
      end: "bottom bottom",
      onUpdate: (self) => {
        if (menuOpenRef.current) return;
        const currentScroll = self.scroll();
        // Simple logic: if at the very top, show. If scrolled down, hide.
        if (currentScroll > 50) {
          gsap.to(navRef.current, { y: -100, duration: 0.4, ease: "power2.out", overwrite: true });
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true });
        }
      },
    });

    // Refresh ScrollTrigger on route changes to ensure body height is correct
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, { scope: navRef, dependencies: [window.location.pathname] });

  // Отключаем скролл
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full z-100 px-8 lg:px-12 py-6 lg:py-8 flex items-start justify-between mix-blend-normal transition-colors duration-500",
          menuOpen ? "text-white pointer-events-none" : "text-black"
        )}
      >
        {/* Логотип с ховер-эффектом. */}
        <Link to="/" className="logo-container group flex items-center gap-1.5 cursor-pointer pointer-events-auto">
          {/* Имитация цветного градиентного шарика логотипа */}
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#f953c6] via-[#6B5FFF] to-[#5C90FF] shrink-0" />
          
          <div className="font-bold text-[20px] relative w-25 select-none text-current flex flex-col justify-center h-7.5">
            <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2.5">
              <span className="tracking-[-0.04em] leading-none">Mōno<span className="text-[12px] align-top tracking-normal font-medium ml-px">™</span></span>
            </div>
            <div className="absolute top-[45%] left-0 text-[18px] font-medium tracking-[-0.04em] leading-none text-gray-400 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
              Studio
            </div>
          </div>
        </Link>

        {/* Центральные ссылки на десктопе */}
        <nav className={cn(
          "hidden lg:flex flex-1 justify-center gap-16 text-[16px] font-bold tracking-tight absolute left-1/2 -translate-x-1/2 top-7 lg:top-8.5 transition-opacity duration-300 pointer-events-auto",
          menuOpen ? "opacity-0" : "opacity-100"
        )}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/studio">Studio</NavLink>
          <NavLink href="/work">Work ({workCount})</NavLink>
          <NavLink href="/#news">News</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Бургер-меню (превращается в крестик) */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-3.5 flex flex-col justify-between items-end cursor-pointer group z-100 mt-1 relative pointer-events-auto"
        >
          <span className={cn("w-full h-[1.5px] block transition-transform duration-300 origin-right", menuOpen ? "bg-white -rotate-45" : "bg-current group-hover:w-3/4")} />
          <span className={cn("w-full h-[1.5px] block transition-transform duration-300 origin-right", menuOpen ? "bg-white rotate-45" : "bg-current w-3/4 group-hover:w-full")} />
        </button>
      </header>
      
      {/* Боковая панель меню (как на фото 2: черный блок справа) */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-screen bg-[#090a0f] text-white z-99 flex flex-col justify-between px-12 lg:px-24 py-20 lg:py-32 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] border-l border-white/10",
          menuOpen ? "translate-x-0 pointer-events-auto shadow-[-30px_0_60px_rgba(0,0,0,0.5)]" : "translate-x-full pointer-events-none"
        )}
        style={{ width: 'clamp(320px, 40vw, 550px)' }}
      >
        {/* Центральная кнопка-крестик на границе */}
        <button 
           onClick={() => setMenuOpen(false)}
           className={cn(
              "absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 bg-[#2a2a2a] rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-50",
              menuOpen ? "opacity-100 delay-500" : "opacity-0"
           )}
        >
           <span className="w-3.5 h-[1.5px] bg-white block rotate-45 absolute" />
           <span className="w-3.5 h-[1.5px] bg-white block -rotate-45 absolute" />
        </button>

        <div className="w-full flex flex-col h-full justify-between">
          {/* Верхняя часть панели - Ссылки */}
          <nav className="flex flex-col gap-4 items-start mb-8">
            {[
              { label: "Home", href: "/" },
              { label: "Studio", href: "/studio" },
              { label: "Work", href: "/work" },
              { label: "Contact", href: "/contact" }
            ].map((item, i) => (
              <div 
                key={item.label} 
                style={{ transitionDelay: `${menuOpen ? 300 + i * 80 : 0}ms` }}
                className={cn(
                  "transition-all duration-700 ease-out transform w-full border-b border-white/10 pb-6",
                  menuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                )}
              >
                <SidebarLink href={item.href}>{item.label}</SidebarLink>
              </div>
            ))}
          </nav>

          {/* Нижняя часть панели - Инфо и контакты */}
          <div 
            className={cn(
              "flex flex-col items-start gap-8 transition-all duration-700 delay-500 ease-out transform mb-4",
              menuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}
          >
            <div className="bg-linear-to-r from-purple-800 to-blue-600 rounded-full p-2 pr-6 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shrink-0">
                <img src={`https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80`} alt="Denis" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                 <span className="text-sm font-semibold leading-tight">Talk to Roman</span>
                 <span className="text-[10px] text-green-400 flex items-center gap-1.5 mt-0.5 leading-none">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full relative">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                    </span> 
                    Get in touch
                 </span>
              </div>
            </div>
            
            <div className="flex gap-3">
               {["IG", "X", "✦"].map(soc => (
                 <a key={soc} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] hover:bg-white hover:text-black transition-colors">{soc}</a>
               ))}
            </div>

            <div className="flex gap-4 text-[10px] text-gray-500 uppercase tracking-widest mt-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}