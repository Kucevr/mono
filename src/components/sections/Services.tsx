import { useState } from "react";
import { cn } from "../../lib/utils";
import { PulseButton } from "../ui/PulseButton";
import { BouncyTop } from "../ui/BouncyTop";
import { BouncyBottom } from "../ui/BouncyBottom";

const servicesList = [
  {
    num: "001",
    name: "Web Design",
    desc: "Crafting beautiful and intuitive digital experiences tailored to your brand.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  },
  {
    num: "002",
    name: "Social Media",
    desc: "Building engaging social presence that connects with your audience organically.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
  },
  {
    num: "003",
    name: "Development",
    desc: "Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.",
    img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=600&auto=format&fit=crop"
  },
  {
    num: "004",
    name: "Brand Identity",
    desc: "Creating timeless brand identities that stand out in crowded markets.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
  },
  {
    num: "005",
    name: "Marketing",
    desc: "Data-driven marketing strategies to accelerate growth and maximize ROI.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with 'Development'

  return (
    <section className="relative w-full bg-white text-black py-32 md:py-40 px-4 md:px-8 lg:px-12 z-20">
      <BouncyTop color="#ffffff" />
      
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        
        {/* Left Column: Services List */}
        <div className="w-full lg:w-3/5">
          <div className="flex justify-between items-center mb-16 md:mb-24 text-sm md:text-base font-semibold tracking-tight">
            <span>(Services)</span>
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-2 h-2 bg-black rounded-full hidden md:block" />
          </div>

          <div className="flex flex-col gap-4">
            {servicesList.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={srv.num}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="flex items-start gap-3 md:gap-8 group"
                >
                  <span className="text-xs md:text-sm font-medium tracking-tighter text-gray-300 mt-2 sm:mt-4 md:mt-8 group-hover:text-black transition-colors duration-300">
                    ({srv.num})
                  </span>
                  <h3 className={cn(
                    "text-5xl sm:text-6xl md:text-[7vw] font-medium tracking-tighter transition-colors duration-500 will-change-transform leading-[1.1]",
                    isActive ? "text-black" : "text-gray-200 group-hover:text-gray-400"
                  )}>
                    {srv.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        {/* Right Column: CTA and Image preview */}
        <div className="w-full lg:w-2/5 flex flex-col items-start lg:pl-16 relative mt-16 lg:mt-0">
          <div className="w-full flex justify-start lg:justify-end mb-16 lg:mb-24">
             <PulseButton>Get started</PulseButton>
          </div>

          <div className="w-full mt-auto lg:sticky lg:top-[30vh]">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 mb-6 relative">
              {servicesList.map((srv, idx) => (
                <img 
                  key={srv.num}
                  src={srv.img}
                  alt={srv.name}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out",
                    idx === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>
            
            <div className="relative min-h-[100px]">
              {servicesList.map((srv, idx) => (
                <p 
                  key={srv.num}
                  className={cn(
                    "absolute top-0 left-0 text-lg font-medium leading-snug tracking-tight transition-opacity duration-500",
                    idx === activeIndex ? "opacity-100 relative" : "opacity-0 pointer-events-none"
                  )}
                >
                  {srv.desc}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Middle dot matching vertical line */}
        <div className="hidden md:block w-1 h-4 bg-black rounded-full absolute left-[65%] top-[60%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <BouncyBottom color="#ffffff" />
    </section>
  );
}