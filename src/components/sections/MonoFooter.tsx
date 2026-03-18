import { PulseButton } from "../ui/PulseButton";
import { Link } from "react-router-dom";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      to={href} 
      className="group relative flex items-center w-fit text-white/80 hover:text-white transition-colors py-1"
    >
      <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white w-1.5 h-1.5 rounded-full" />
      <span className="font-semibold text-base tracking-tight transform transition-transform duration-300 group-hover:translate-x-4">{children}</span>
    </Link>
  );
}

function FooterExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="group relative flex items-center w-fit text-white/80 hover:text-white transition-colors py-1"
    >
      <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white w-1.5 h-1.5 rounded-full" />
      <span className="font-semibold text-base tracking-tight transform transition-transform duration-300 group-hover:translate-x-4">{children}</span>
    </a>
  );
}

export function MonoFooter() {
  return (
    <footer className="w-full bg-[#050505] text-white pt-24 pb-6 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.1] max-w-4xl">
            Crafting visuals. Shaping stories.<br />
            Let's create great work together!
          </h2>
          
          <div className="relative shrink-0 md:mb-2">
            <PulseButton lightShadow className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-white/10 shadow-2xl">
              Let's Collaborate
            </PulseButton>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Left Column (Newsletter & Logo) */}
          <div className="flex flex-col max-w-sm lg:w-[40%]">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-indigo-500 to-cyan-400" />
              <span className="text-xl font-bold tracking-tight">Mōno™</span>
            </div>

            <span className="text-lg font-medium tracking-tight text-white/50 mb-4">(Newsletter)</span>
            <h3 className="text-2xl font-bold tracking-tight mb-8">Be the first to know what's new.</h3>
            
            <div className="relative mb-4">
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors text-lg pr-32"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-black border border-white/20 hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] text-white rounded-full px-6 text-lg font-semibold tracking-tight transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-base text-white/40 flex items-center gap-2">
              <span className="w-1 h-1 bg-white/40 rounded-full" /> No noise. Just curated updates.
            </p>
          </div>

          {/* Right Column (Links) */}
          <div className="flex flex-col gap-16 lg:w-[50%]">
            <div className="flex flex-col gap-8">
              <span className="text-lg font-medium tracking-tight text-white/50">(Pages)</span>
              
              <div className=" grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-8">
                <div className="flex flex-col gap-2">
                  <FooterLink href="/">Home</FooterLink>
                  <FooterLink href="/studio">Studio</FooterLink>
                  <FooterLink href="/#licensing">Licensing</FooterLink>
                </div>
                <div className="flex flex-col gap-2">
                  <FooterLink href="/work">Work</FooterLink>
                </div>
                <div className="flex flex-col gap-2">
                  <FooterLink href="/#blog">Blog</FooterLink>
                </div>
                <div className="flex flex-col gap-2">
                  <FooterLink href="/contact">Contact</FooterLink>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium tracking-tight text-white/50">(New Projects / Business)</span>
                <div className="flex flex-col gap-3">
                  <FooterExternalLink href="mailto:contact@monostudio.io">contact@monostudio.io</FooterExternalLink>
                  <FooterExternalLink href="tel:+1930046720">(+1) 930 046 720</FooterExternalLink>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium tracking-tight text-white/50">(General Inquiries)</span>
                <FooterExternalLink href="mailto:info@monostudio.io">info@monostudio.io</FooterExternalLink>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium tracking-tight text-white/50">(Location)</span>
                <a href="#" className="font-semibold text-base tracking-tight hover:text-white/80 transition-colors max-w-[200px]">Roc Boronat 112, Floor 3 - Door 2<br/>(08018) Barcelona, Spain</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium tracking-tight text-white/50">(Social)</span>
                <div className="flex items-center gap-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12"/></svg>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-2 border-t border-white/10 text-sm text-white/30 tracking-tight gap-4">
          <span>© 2026 Mōno™ Studio - Made by kutsev-studio</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}