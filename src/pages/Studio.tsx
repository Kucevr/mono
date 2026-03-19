import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BouncyTop } from "../components/ui/BouncyTop";
import { BouncyBottom } from "../components/ui/BouncyBottom";
import { PulseButton } from "../components/ui/PulseButton";
import { Navbar } from "../components/layout/Navbar";

gsap.registerPlugin(ScrollTrigger);

const LogoIcons = [
  () => <span className="font-bold text-2xl tracking-tighter flex items-center gap-1"><div className="w-4 h-4 border-2 border-black rotate-45" /> acme</span>,
  () => <div className="w-10 h-10 border-4 border-black rounded-full" />,
  () => <div className="w-12 h-12 flex gap-1"><span className="w-2 bg-black h-full block rounded-full" /><span className="w-2 bg-black h-full block rounded-full transform scale-y-75" /></div>,
  () => <span className="font-extrabold text-2xl italic tracking-wider">Flok</span>,
  () => <span className="font-black text-3xl tracking-tighter flex items-center gap-2"><div className="w-5 h-5 bg-black rounded-full" /> Ollio</span>,
  () => <div className="flex gap-2"><div className="w-6 h-6 border-[3px] border-black rounded-tl-full rounded-br-full" /><div className="w-6 h-6 border-[3px] border-black rounded-tr-full rounded-bl-full" /></div>,
  () => <div className="w-8 h-12 border-2 text-xl font-bold border-black rounded-full flex flex-col items-center justify-center">O</div>,
  () => <span className="font-bold text-4xl">≈</span>,
];

export function Studio() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.partner-card-studio') as HTMLElement[];
    if(!cards.length) return;
    
    // Initialize rotation tracking
    cards.forEach(card => card.dataset.rotation = '0');
    
    const interval = setInterval(() => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      
      // Prevent overlapping animations on the same card
      if (gsap.isTweening(randomCard)) return;

      const currentRotation = parseInt(randomCard.dataset.rotation || '0', 10);
      const newRotation = currentRotation + 180;
      randomCard.dataset.rotation = newRotation.toString();

      gsap.to(randomCard, {
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
  }, { scope: partnersRef });

  useGSAP(() => {
    // Stats counter animation
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach((stat) => {
      const el = stat as HTMLElement;
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.stats-container',
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          el.innerHTML = prefix + Math.round(counter.val);
        }
      });
    });

    // Horizontal scroll logic
    const container = scrollSectionRef.current;
    
    // Animate the container horizontally
    const scrollTween = gsap.to(container, {
      x: () => -(container!.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + container!.offsetWidth,
        invalidateOnRefresh: true,
      }
    });

    // Fade year and text in sync with horizontal scroll
    const panels = gsap.utils.toArray('.history-panel');
    panels.forEach((panel) => {
      const year = (panel as HTMLElement).querySelector('.history-fade-year');
      const text = (panel as HTMLElement).querySelector('.history-fade-text');
      
      if (year && text) {
        gsap.set([year, text], { opacity: 0, y: 50 });
        
        gsap.to([year, text], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel as HTMLElement,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        });
      }
    });
  }, []);

  return (
   <main className="relative min-h-screen z-40 bg-background">
      <Navbar />

      {/* About Mono Header (White) */}
      <section className="relative w-full bg-white text-black pt-32 pb-24 px-4 md:px-8 lg:px-12 z-40">
        <div className="max-w-screen-2xl mx-auto">
           <div className="flex justify-center flex-col items-center text-center">
              <span className="text-sm font-bold tracking-tight mb-6">(Our Studio ©26)</span>
              <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none">About Mōno™</h1>
           </div>
        </div>
        <BouncyBottom color="white" />
      </section>

      {/* History Horizontal Scroll (Black) */}
      <section ref={scrollContainerRef} className="relative w-full overflow-hidden bg-black text-white z-30">
      <div ref={scrollSectionRef} className="w-[400vw] h-screen flex relative">
           {[
             { year: "23", title: "Brand Evolution", desc: "We refined Mōno™ Studio's visual identity and positioned the brand around clarity, minimalism, and precision. Our focus shifted toward high end digital experiences..." },
             { year: "24", title: "Digital Immersive", desc: "Pushing the boundaries of what was possible in the browser, 2024 saw us implementing heavy WebGL experiences and pushing immersive motion design." },
             { year: "25", title: "Global Expansion", desc: "Opening new horizons, we extended our physical presence to key global hubs, collaborating with ambitious enterprise platforms and elevating product architecture." },
             { year: "26", title: "Future Ready", desc: "A culmination of strategic foresight and aesthetic restraint. We establish design systems that form the bedrock of the modern internet. Our best work is yet to come." }
           ].map((item, i) => (
              <div key={item.year} className="history-panel w-screen h-screen shrink-0 relative flex items-center px-12 lg:px-32">
                 <img src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2600&auto=format&fit=crop&sig=${i}`} className="absolute top-0 left-0 w-full h-full object-cover opacity-70" alt={`Year ${item.year}`} />
                 <div className="relative z-10 w-full max-w-xl text-white drop-shadow-2xl">
                    <h2 className="history-fade-year text-[10vw] leading-none font-bold tracking-tighter mb-8 drop-shadow-xl">(©{item.year})</h2>
                    <div className="history-fade-text">
                       <h3 className="text-3xl font-bold tracking-tight mb-4 drop-shadow-md">{item.title}</h3>
                       <p className="text-xl font-bold tracking-tight opacity-90 leading-relaxed drop-shadow-md">
                          {item.desc}
                       </p>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* White Content Section */}
      <section className="relative w-full bg-white text-black pt-32 pb-40 px-4 md:px-8 lg:px-12 z-40">
        <BouncyTop color="white" />
        <div className="max-w-screen-2xl mx-auto">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
              <div className="flex flex-col gap-16">
                 <div>
                    <div className="flex justify-between items-center mb-4 text-base font-bold tracking-tight">
            <span>(Introduction)</span>
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-2 h-2 bg-black rounded-full hidden md:block" />
          </div>
                    <p className="text-xl md:text-3xl font-bold tracking-tighter leading-tight">
                       Mōno™ Studio believes bold, distinctive design has the power to transform how we connect with the world and each other. We craft brands that perform seamlessly across digital and physical spaces — driven by strategy, shaped through collaboration, and executed with uncompromising precision.
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap gap-8 items-center opacity-60">
                    <span className="text-sm font-bold">As seen on</span>
                    <div className="flex gap-4">
                       <b>AWWWARDS</b> <b>FWA</b> <b>CSSDA</b>
                    </div>
                 </div>

                 <div className="mt-8 border-t border-black/10 pt-16">
                    <div className="flex gap-8 items-start">
                       <span className="text-base font-bold tracking-tight block w-1/4 shrink-0">(Approach)</span>
                       <div className="flex flex-col gap-8 w-3/4">
                          <p className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
                             Think clearly.<br/>Design precisely.<br/>Build intelligently.<br/>Refine continuously.
                          </p>
                          <div className="flex justify-col">
                             <PulseButton className="w-max bg-black text-white" lightShadow={false} dark={false}>Begin collaboration</PulseButton>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 border-t border-black/10 pt-16">
                    <span className="text-sm md:text-base font-bold tracking-tight block mb-12">(Stats)</span>
                    <div className="flex flex-col gap-16 stats-container">
                       <div className="flex gap-4 md:gap-8 items-start">
                          <span className="stat-number text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none shrink-0 w-24 md:w-32" data-target="30">0</span>
                          <p className="text-lg md:text-2xl font-medium tracking-tight mt-1 md:mt-2">
                             A multidisciplinary team of designers, engineers, and strategists.
                          </p>
                       </div>
                       <div className="flex gap-4 md:gap-8 items-start">
                          <span className="stat-number text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none shrink-0 w-24 md:w-32" data-target="80">0</span>
                          <p className="text-lg md:text-2xl font-medium tracking-tight mt-1 md:mt-2">
                             From startups to established brands transformed globally.
                          </p>
                       </div>
                       <div className="flex gap-4 md:gap-8 items-start">
                          <span className="stat-number text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none shrink-0 w-24 md:w-32" data-target="7" data-prefix="+">0</span>
                          <p className="text-lg md:text-2xl font-medium tracking-tight mt-1 md:mt-2">
                             Industry recognition for creativity and digital excellence.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-8">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" className="rounded-3xl w-full h-100 object-cover" alt="Keyboard typing" />
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" className="rounded-3xl w-full h-100 object-cover" alt="Man in glasses" />
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" className="rounded-3xl w-full h-100 object-cover" alt="Group of people" />
              </div>
           </div>

           {/* Success stories */}
           <div className="pt-24 border-t border-black/10">
              <span className="text-base font-bold tracking-tight block mb-12 text-center md:text-left">(Success stories)</span>
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
                 <p className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight max-w-4xl text-center md:text-left">
                    "Mōno helped us simplify complexity, bringing our vision to life with an unmatched level of elegance and technical precision."
                 </p>
                 <div className="flex flex-col items-center shrink-0 mt-8 md:mt-0">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" className="w-32 h-32 rounded-full object-cover mb-6" alt="Elena Rossi" />
                    <span className="font-bold text-xl">Elena Rossi</span>
                    <span className="text-base font-medium opacity-60">CEO, Acme Corp</span>
                 </div>
              </div>
           </div>

        </div>
        <BouncyBottom color="white" />
      </section>

      {/* Team Section (Gray) */}
      <section className="relative w-full bg-[#f4f4f5] text-black pt-32 pb-40 px-4 md:px-8 lg:px-12 z-50">
        <BouncyTop color="#f4f4f5" />
        <div className="max-w-screen-2xl mx-auto">
           <h2 className="text-5xl md:text-[6vw] font-bold tracking-tighter leading-none mb-16 text-center">
              Creative Minds <span className="text-2xl text-gray-400 font-semibold tracking-normal align-top">(5)</span>
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 mb-32">
              <div className="flex flex-col gap-8 md:pr-12 md:max-w-xs">
                 <span className="text-base font-bold tracking-tight">(Leadership)</span>
                 <p className="font-bold text-xl leading-tight">
                    A collective of thinkers, makers, and innovators united by precision, creativity, and shared ambition.
                 </p>
                 <PulseButton className="w-max bg-black text-white" lightShadow={false} dark={false}>Join us</PulseButton>
              </div>

              {/* Team Members Grid */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { name: "Adrian Keller", role: "Founder", img: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=600&auto=format&fit=crop" },
                   { name: "Luca Moretti", role: "Lead Product Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
                   { name: "Elena Novak", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
                   { name: "Daniel Hartmann", role: "Webflow Developer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
                   { name: "Maya Laurent", role: "Framer Specialist", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" }
                 ].map((member, i) => (
                    <div key={i} className="flex flex-col gap-4">
                       <div className="w-full aspect-4/5 rounded-3xl overflow-hidden bg-gray-300">
                          <img src={member.img} className="w-full h-full object-cover" alt={member.name} />
                       </div>
                       <div>
                          <div className="font-bold text-lg tracking-tight">{member.name}</div>
                          <div className="text-sm font-medium text-gray-500">({member.role})</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Partners Section (Imported logic) */}
        <div ref={partnersRef} className="max-w-screen-2xl mx-auto pt-24 border-t border-black/10">
           <div className="flex justify-between items-center mb-12 text-base font-semibold tracking-tight">
             <span>(Partners)</span>
             <div className="w-2 h-2 bg-black rounded-full" />
             <span>2011-26©</span>
             <div className="w-2 h-2 bg-black rounded-full" />
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 perspective-[1000px]">
             {LogoIcons.map((Logo, idx) => (
               <div 
                 key={idx} 
                 className="partner-card-studio relative rounded-xl aspect-2/1 flex items-center justify-center transform-style-3d shadow-sm"
                 style={{ transformStyle: 'preserve-3d' }}
               >
                 <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <Logo />
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl backface-hidden rotate-x-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                    <Logo />
                 </div>
               </div>
             ))}
           </div>
        </div>
        <BouncyBottom color="#f4f4f5" />
      </section>

    </main>
  );
}
