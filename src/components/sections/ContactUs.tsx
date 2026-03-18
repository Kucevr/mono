export function ContactUs() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-end">
      {/* Background Image & Grain effect */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2600&auto=format&fit=crop" 
          alt="People looking down" 
          className="w-full h-full object-cover object-center"
        />
        {/* Grain overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <div className="w-full max-w-[450px]">
          {/* Glass panel */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            
            <div className="relative z-10">
              <span className="text-sm font-medium tracking-tight mb-2 inline-block opacity-80">(Contact us)</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent pb-1">Let's talk.</h2>
              
              <form className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/5 transition-all text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/5 transition-all text-sm"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/5 transition-all text-sm"
                />

                <button 
                  type="button"
                  className="w-full bg-black text-white hover:bg-black/80 font-semibold py-4 rounded-xl mt-4 transition-colors tracking-tight text-sm"
                >
                  Contact us
                </button>
                <p className="text-xs text-white/40 mt-4 leading-relaxed tracking-tight">
                  By contacting us, you accept our <a href="#" className="underline hover:text-white transition-colors">Terms</a> and <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
                </p>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}