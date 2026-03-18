import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BouncyTop } from "../components/ui/BouncyTop";
import { BouncyBottom } from "../components/ui/BouncyBottom";
import { PulseButton } from "../components/ui/PulseButton";
import { Navbar } from "../components/layout/Navbar";

const worksData: Record<string, any> = {
  "forma-digital": {
    title: "Forma Digital",
    intro: "This project wasn't just about design — it was about creating a meaningful tool that drives results. From strategy to execution.",
    challenges: "Creative Impact is a brand built on challenging the norm and redefining expectations. To capture this spirit, we created a bespoke typeface that fuses cutting-edge design with timeless typographic structure.",
    client: "Forma Digital",
    date: "@26",
    services: "Strategy, Concept",
    finalThoughts: "We engineered an advanced weight distribution system designed to minimize pressure points and reduce user fatigue. Integrated passive cooling ensures consistent thermal regulation without added bulk, while our quick-release system enables fast, tool-free adjustments and maintenance.",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2600&auto=format&fit=crop", // Hero
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", // Right 1
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop", // Right 2
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop", // Left 3
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", // Right 4
    ]
  },
  "nero-vision": {
    title: "Nero Vision",
    intro: "Redefining the digital horizon with bold, cinematic web experiences that capture the user's attention instantly.",
    challenges: "Nero Vision required a platform that felt alive. We utilized extensive WebGL treatments to create fluid, continuous motion throughout the journey.",
    client: "Nero LLC",
    date: "@25",
    services: "Web Design, WebGL",
    finalThoughts: "By combining rigorous optimization techniques with high-end graphical fidelity, we achieved a perfect 100 Lighthouse score while maintaining a fully 3D interactive environment.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  "one-step": {
    title: "One Step",
    intro: "Minimalism meets aggressive typography. A conceptual e-commerce store focusing on exclusive sneaker drops.",
    challenges: "The challenge was keeping the user focused on the product amidst high-energy typography and brutalist UI elements.",
    client: "One Step Footwear",
    date: "@24",
    services: "E-Commerce, Branding",
    finalThoughts: "The resulting layout increased conversion rate by forcing a hyper-focused path to purchase, stripped of all unnecessary UI clutter.",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  "bold-moves": {
    title: "Bold Moves",
    intro: "A digital campaign for an extreme sports agency highlighting the raw emotion of movement.",
    challenges: "Video compression and fast loading times were key, as the entire site background consisted of high-resolution action footage.",
    client: "Bold Agency",
    date: "@24",
    services: "Campaign, Motion",
    finalThoughts: "A highly visceral experience that translated perfectly to mobile devices, capturing the adrenaline of the brand.",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop"
    ]
  }
};

export function WorkDetail() {
  const { id } = useParams();
  const work = id && worksData[id] ? worksData[id] : worksData["forma-digital"];
  const totalWorks = Object.keys(worksData).length;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="relative min-h-screen text-black z-40 bg-[#f4f4f5]">
      <Navbar workCount={totalWorks} />
      
      {/* Intro Gray Section */}
      <section className="relative w-full bg-[#f4f4f5] pt-24 pb-20 px-4 md:px-8 lg:px-12 z-30">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
           <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none">{work.title}</h1>
           <div className="max-w-xs md:mb-6">
              <div className="text-sm font-bold tracking-tight mb-2">(Introduction)</div>
              <p className="font-semibold text-lg leading-tight">{work.intro}</p>
           </div>
        </div>
        <BouncyBottom color="#f4f4f5" />
      </section>

      {/* Full Width Hero Photo */}
      <section className="relative w-full h-[60vh] md:h-screen z-20">
         <img 
            src={work.images[0]} 
            alt="Hero"
            className="w-full h-full object-cover"
         />
      </section>

      {/* Main Detail Section (Gray) */}
      <section className="relative w-full bg-[#f4f4f5] text-black pt-32 pb-40 px-4 md:px-8 lg:px-12 z-30">
        <BouncyTop color="#f4f4f5" />
        
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
           
           {/* Cell 1: Sticky Intro Container */}
           <div className="flex flex-col h-full relative">
              <div className="md:sticky top-32 flex flex-col gap-12">
                 <div>
                    <div className="text-sm font-bold tracking-tight mb-4">(Challenges)</div>
                    <p className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                       {work.challenges}
                    </p>
                 </div>

                 <div className="w-full border-t border-black pb-8 pt-4 flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-bold tracking-tight">
                       <span>(Client)</span>
                       <span>{work.client}</span>
                    </div>
                    <div className="w-full h-px bg-gray-300" />
                    <div className="flex justify-between text-sm font-bold tracking-tight">
                       <span>(Data)</span>
                       <span>{work.date}</span>
                    </div>
                    <div className="w-full h-px bg-gray-300" />
                    <div className="flex justify-between text-sm font-bold tracking-tight">
                       <span>(Services)</span>
                       <span>{work.services}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Cell 2: Right Photos 1 & 2 */}
           <div className="flex flex-col gap-12 lg:gap-24">
              <img src={work.images[1]} alt="Detail 1" className="w-full left-auto rounded-3xl" />
              <img src={work.images[2]} alt="Detail 2" className="w-full left-auto rounded-3xl" />
           </div>

           {/* Cell 3: Left Photo 3 */}
           <div className="flex flex-col justify-start h-full">
              <img src={work.images[3]} alt="Detail 3" className="w-full rounded-3xl" />
           </div>

           {/* Cell 4: Right Photo 4 and Final Thoughts */}
           <div className="flex flex-col gap-12 lg:gap-24">
              <img src={work.images[4]} alt="Detail 4" className="w-full left-auto rounded-3xl" />
              <div className="w-full mt-auto">
                  <div className="text-sm font-bold tracking-tight mb-4">(Final thoughts)</div>
                  <p className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-8">
                     {work.finalThoughts}
                  </p>
                  <PulseButton>Live project</PulseButton>
              </div>
           </div>

        </div>

        <BouncyBottom color="#f4f4f5" />
      </section>

      {/* Related Works (Gray instead of black) */}
      <section className="relative w-full bg-[#e5e5e5] text-black pt-40 pb-32 px-4 md:px-8 lg:px-12 z-20">
          <div className="max-w-screen-xl mx-auto flex flex-col items-center">
             <div className="text-sm font-medium tracking-tight mb-4 text-center">(Portfolio 23-26©)</div>
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 text-center">Related Works</h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <Link to="/work/one-step" className="flex flex-col gap-4 group">
                   <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200">
                      <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Related" />
                   </div>
                   <div className="flex justify-between items-center text-sm font-bold tracking-tight">
                      <span>One Step</span>
                      <span>(@24)</span>
                   </div>
                </Link>
                <Link to="/work/bold-moves" className="flex flex-col gap-4 group">
                   <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200">
                      <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Related" />
                   </div>
                   <div className="flex justify-between items-center text-sm font-bold tracking-tight">
                      <span>Bold Moves</span>
                      <span>(@24)</span>
                   </div>
                </Link>
             </div>
          </div>
      </section>

    </main>
  );
}