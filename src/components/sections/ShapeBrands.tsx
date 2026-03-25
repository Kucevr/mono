import { PulseButton } from "../ui/PulseButton";
import { BouncyBottom } from "../ui/BouncyBottom";

export function ShapeBrands() {
  return (
    <section className="relative w-full bg-[#e5e5e5] text-black pt-32 pb-40 px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto z-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-span-4 flex flex-col justify-between">
          <span className="text-base font-bold tracking-tight mb-4 md:mb-0">(Who we are)</span>
          <div className="w-4 h-4 bg-black rounded-full mt-auto hidden md:block" />
        </div>
        <div className="md:col-span-8">
          <div className="mb-4">
            <span className="font-bold text-xl">Jōlo™</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[5vw] font-medium tracking-tighter leading-[1.1]">
            We shape brands with focus, intention, and impact.
          </h2>
        </div>
      </div>

      <div className="flex gap-12 sm:gap-24 md:gap-36 mb-16 items-center justify-center">
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="w-2 h-2 bg-black rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="bg-[#1c1c1c] text-white rounded-2xl p-6 sm:p-8 aspect-square sm:aspect-2/1 lg:aspect-auto h-full lg:max-h-87.5 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tighter mb-4">+13</h3>
              <p className="text-xl sm:text-2xl font-medium max-w-50 leading-tight">Team members across the World</p>
            </div>
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-end gap-2">
               <span className="text-sm sm:text-base font-semibold tracking-tight text-white/80">(Team of experts)</span>
               <div className="flex -space-x-2">
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-600 border border-[#1c1c1c]" />
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-500 border border-[#1c1c1c]" />
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-400 border border-[#1c1c1c]" />
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-zinc-700 text-[10px] sm:text-xs font-semibold border border-[#1c1c1c]">+9</div>
               </div>
            </div>
            {/* World Map Background Placeholder */}
            <div className="absolute bottom-0 right-0 w-[80%] h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px', maskImage: 'linear-gradient(to top left, black, transparent)' }} />
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-sm h-full max-h-none lg:max-h-87.5 min-h-87.5">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 gap-4 sm:gap-0">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 via-white to-black shrink-0 animate-gradient-slow bg-[length:200%_200%]" />
                 <span className="font-bold text-lg">Jōlo™</span>
               </div>
               <div className="sm:text-right">
                 <span className="text-sm sm:text-base font-bold tracking-tight block mb-2">(Performance Boost)</span>
                 <p className="font-semibold text-sm sm:text-base">Organic Search +78%,<br/>Conversion Rate +13%</p>
               </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-75 leading-tight mb-8">Pricing with complete transparency</h3>
              <PulseButton href="/#pricing" className="w-max mt-auto">View pricing</PulseButton>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center items-center text-white h-full min-h-125 lg:max-h-180">
          <span className="absolute top-6 sm:top-8 text-sm sm:text-base font-semibold tracking-tight">(Live collaboration)</span>
          
          <div className="w-full sm:w-[80%] bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl relative mt-8 sm:mt-0">
            <span className="block text-center text-xs text-white/70 mb-4">Today 17:01</span>
            
            <div className="flex items-start gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-blue-500 shrink-0" />
              <div className="flex flex-col gap-2">
                <div className="bg-white text-black py-2 px-4 rounded-2xl rounded-tl-sm w-max text-sm font-medium">Hey! The design looks sharp.</div>
                <div className="bg-white text-black py-2 px-4 rounded-2xl rounded-tl-sm w-max text-sm font-medium">Can we refine the gradient?</div>
              </div>
            </div>

            <span className="block text-center text-xs text-white/70 mb-4 mt-6">Today 17:02</span>

            <div className="flex items-end gap-2 mb-4 mr-8 sm:mr-8 flex-col">
              <div className="bg-blue-600 text-white py-2 px-4 rounded-2xl rounded-tr-sm w-max text-xs sm:text-sm font-medium">Absolutely.</div>
              <div className="bg-blue-600 text-white py-2 px-4 rounded-2xl rounded-tr-sm w-max text-xs sm:text-sm font-medium">I'll update the brand palette now.</div>
              <div className="w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-black absolute right-2 sm:right-5 top-[54%] md:top-[52.5%]" />
            </div>

            <div className="flex items-start gap-2 mb-4">
              <div className="w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-blue-500 shrink-0" />
              <div className="flex flex-col gap-2">
                <div className="bg-white text-black py-2 px-4 rounded-2xl rounded-tl-sm w-max text-xs sm:text-sm font-medium">Perfect! Looks much better.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BouncyBottom color="#e5e5e5" />
    </section>
  );
}