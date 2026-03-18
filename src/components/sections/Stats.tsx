import { BouncyTop } from "../ui/BouncyTop";
import { BouncyBottom } from "../ui/BouncyBottom";
import { PulseButton } from "../ui/PulseButton";


const stats = [
  {
    id: 1,
    tag: "(Value created)",
    value: "$174M",
    desc: "Empowering growth through strategic solutions.",
    backTag: "(001)",
    backStats: "ROI: 320% -> 450%",
    backQuote: "\"The valuation speaks for itself. True partners in scale.\"",
    backAuthor: "James Wright",
    marginTop: "0",
  },
  {
    id: 2,
    tag: "(Return client rate)",
    value: "92%",
    desc: "Building lasting partnerships built on trust.",
    backTag: "(002)",
    backStats: "LTV: +45%",
    backQuote: "\"We keep coming back because the quality never drops.\"",
    backAuthor: "Sarah Chen",
    marginTop: "20vh",
  },
  {
    id: 3,
    tag: "(Projects delivered)",
    value: "+320",
    desc: "Driving successful outcomes across industries.",
    backTag: "(003)",
    backStats: "CRI: 1.7% -> 2.6%",
    backQuote: "\"The new site finally matches our product. Cleaner UX, better messaging, and results we can actually measure.\"",
    backAuthor: "Marcus Reed",
    marginTop: "40vh",
  },
  {
    id: 4,
    tag: "(Client retention)",
    value: "88%",
    desc: "Optimized journeys that turn traffic into growth.",
    backTag: "(004)",
    backStats: "Churn: -15%",
    backQuote: "\"Our user base has never been more engaged and loyal.\"",
    backAuthor: "Emily Willis",
    marginTop: "60vh",
  }
];

export function Stats() {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white z-40 mt-[-100px]">
      <BouncyTop color="#0a0a0a" />
      
      {/* Intro Header */}
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center text-center">
        <p className="text-base font-medium mb-6 tracking-tight">(Stats)</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl leading-tight">
          <span className="inline-block w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-pink-500 via-indigo-500 to-cyan-400 align-middle mr-2 sm:mr-4 shadow-lg shadow-cyan-500/20" />
          Mōno™ stands behind the data.
        </h2>
        <p className="text-gray-400 font-medium max-w-xl text-base sm:text-lg mb-10 px-4">
          Our success is reflected in the numbers we achieve for our clients. Every project is designed with measurable growth at its core.
        </p>
        <PulseButton lightShadow className="bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#2a2a2a] shadow-2xl">
          Let's talk
        </PulseButton>
      </div>



      {/* Cards Scroll Section */}
      {/* The container has extra height to allow scrolling. Each card is sticky and pushed down by margin. */}
      <div 
        className="w-full px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6 md:gap-4 mt-8 md:mt-20 pb-16 md:pb-[15vh]"
      >
        {stats.map((stat) => (
          <div 
            key={stat.id}
            className="w-full md:w-1/4 sticky top-[15vh]"
            style={{ marginTop: typeof window !== 'undefined' && window.innerWidth >= 768 ? stat.marginTop : '0' }}
          >
            <div className="relative w-full aspect-square group [perspective:1000px]">
              <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front */}
                <div className="absolute inset-0 bg-[#141414] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden]">
                  <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 font-medium">
                    {stat.tag}
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                    </div>
                  </div>
                  <div>
                    <div className="text-5xl sm:text-6xl xl:text-6xl font-bold tracking-tighter mb-4">{stat.value}</div>
                    <p className="text-xs sm:text-sm xl:text-base text-gray-400 font-medium leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-white text-black border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex justify-between items-center text-xs md:text-sm font-medium">
                    {stat.backTag}
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="font-bold text-lg">{stat.backStats}</div>
                    <div className="flex gap-1 text-black">
                      {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                    </div>
                    <p className="text-sm font-bold leading-snug">
                      {stat.backQuote}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                       <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden" />
                       <span className="text-xs font-bold">{stat.backAuthor}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success stories bottom block */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 pb-16 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
          
          <div className="w-full lg:w-[45%] bg-[#141414] rounded-3xl overflow-hidden relative aspect-square lg:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop" 
              alt="Fashion model" 
              className="w-full h-full object-cover"
            />
            {/* Overlay logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                 <span className="text-white font-bold text-2xl tracking-tighter mix-blend-overlay">Mō</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[55%] bg-[#141414] rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col justify-between aspect-square md:aspect-auto">
            <div className="text-sm text-gray-500 font-medium mb-8 md:mb-12">(Success stories)</div>
            
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-8 md:mb-12">
                "Mōno™ helped us simplify complexity. They streamlined our product narrative, improved performance, and delivered a digital experience that truly reflects our brand. The results were immediate — higher engagement."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Elena Rossi" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Elena Rossi</span>
                  <span className="text-xs text-gray-400">Marketing Director at Auralis®</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <BouncyBottom color="#0a0a0a" />
    </section>
  );
}