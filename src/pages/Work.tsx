import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BouncyTop } from "../components/ui/BouncyTop";
import { BouncyBottom } from "../components/ui/BouncyBottom";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: "forma-digital",
    title: "Forma Digital",
    year: "2026",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "nero-vision",
    title: "Nero Vision",
    year: "2025",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "one-step",
    title: "One Step",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: "bold-moves",
    title: "Bold Moves",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

function WorkCard({ work, className = "", aspect = "4/5" }: { work: typeof works[0], className?: string, aspect?: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const totalImages = work.images.length;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % totalImages);
    }, 2500); // 2.5s per image

    return () => clearInterval(interval);
  }, [totalImages]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className={`flex flex-col mb-16 ${className}`}>
      <Link 
        to={`/work/${work.id}`} 
        className="relative group rounded-3xl overflow-hidden cursor-none bg-gray-100 mb-4"
        style={{ aspectRatio: aspect }}
        onMouseMove={handleMouseMove}
      >
        {work.images.map((img, i) => (
          <img 
            key={i}
            src={img}
            alt={work.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500`}
            style={{ opacity: i === activeImage ? 1 : 0 }}
          />
        ))}

        {/* 3 Progress Bars */}
        <div className="absolute top-4 right-4 bottom-4 flex flex-col gap-2 z-10 w-1">
          {work.images.map((_, i) => (
            <div key={i} className="flex-1 rounded-full bg-white/30 overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 w-full bg-white transition-all ease-linear"
                style={{
                  height: i < activeImage ? '100%' : (i === activeImage ? '100%' : '0%'),
                  transitionDuration: i === activeImage ? '2500ms' : (i < activeImage ? '0ms' : '300ms'),
                  opacity: i > activeImage ? 0 : 1
                }}
              />
            </div>
          ))}
        </div>

        {/* Follow Cursor Hover Button like p31 */}
        <div 
          className="absolute pointer-events-none z-20 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            top: mousePos.y,
            left: mousePos.x,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-black/40 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold tracking-tight uppercase whitespace-nowrap">
            View Work
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center text-sm font-bold tracking-tight text-black">
        <span>{work.title}</span>
        <span>(@{work.year})</span>
      </div>
    </div>
  );
}

import { Navbar } from "../components/layout/Navbar";

export function Work() {
  return (
    <main className="relative bg-[#f4f4f5] min-h-screen text-black z-40">
      <Navbar workCount={works.length} />

      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 text-center pt-32 pb-32 relative z-10 flex flex-col items-center">
        <div className="text-sm font-bold tracking-tight mb-6">(Portfolio 23-26©)</div>
        <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none mb-10">Works <span className="text-3xl md:text-4xl text-gray-400 font-medium align-top">({works.length})</span></h1>
      </div>

      {/* White Section with Works grid */}
      <section className="relative w-full bg-white pt-32 pb-40 px-4 md:px-8 lg:px-12 z-20">
        <BouncyTop color="white" />
        
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16 md:gap-32">
          
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
            {/* Work 1: Large left */}
            <div className="w-full md:w-[60%]">
               <WorkCard work={works[0]} aspect="4/3" />
            </div>
            {/* Work 2: Small right, pushed down */}
            <div className="w-full md:w-[35%] md:mt-32">
               <WorkCard work={works[1]} aspect="3/4" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
            {/* Work 3: Small left */}
            <div className="w-full md:w-[35%]">
               <WorkCard work={works[2]} aspect="4/5" />
            </div>
            {/* Work 4: Large right, pulled up a bit */}
            <div className="w-full md:w-[60%] md:-mt-32">
               <WorkCard work={works[3]} aspect="16/9" />
            </div>
          </div>

        </div>

        <BouncyBottom color="white" className="z-10" />
      </section>

    </main>
  );
}