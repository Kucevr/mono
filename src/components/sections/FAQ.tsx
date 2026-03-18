import { useState } from "react";
import { cn } from "../../lib/utils";
import { BouncyBottom } from "../ui/BouncyBottom";

const faqs = [
  {
    num: "01",
    question: "What services does your agency offer?",
    answer: "We offer a comprehensive suite of digital services including web design, web development, brand identity, social media management, and data-driven marketing strategies tailored to your specific business needs."
  },
  {
    num: "02",
    question: "How do you determine the right strategy?",
    answer: "We start with a deep dive into your business goals, target audience, and competitive landscape. We then use data and industry insights to craft a tailored strategy that aligns with your specific objectives."
  },
  {
    num: "03",
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A standard website redesign might take 2-4 weeks, while a comprehensive web app or full brand overhaul could take 6-12 weeks."
  },
  {
    num: "04",
    question: "Do you work with businesses in any industry?",
    answer: "Yes! We've worked with startups, tech companies, e-commerce brands, real estate firms, and service providers. Our process is adaptable to fit the needs of different industries and audiences"
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(4); // Initial open like screenshot

  return (
    <section className="relative w-full bg-white text-black py-20 md:py-32 px-4 md:px-8 lg:px-12 z-40 pb-32 md:pb-40">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        
        {/* Header Grid */}
        <div className="w-full flex justify-between items-center mb-10 md:mb-16 text-sm md:text-base font-semibold tracking-tight uppercase">
          <span>(FAQ)</span>
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-2 h-2 bg-black rounded-full hidden md:block" />
        </div>

        {/* FAQ Accordions Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 md:mb-32">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.num} 
                className="bg-[#f4f4f5] rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col h-max overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="bg-white px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-tight shrink-0">
                      {faq.num}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <span className="text-xl md:text-2xl font-light">{isOpen ? "—" : "+"}</span>
                  </div>
                </div>
                
                <div 
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4 md:mt-6" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 font-medium leading-relaxed pr-4 md:pr-8 text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action at the bottom */}
        <div className="flex flex-col items-center text-center max-w-2xl px-4">
          <div className="flex -space-x-4 mb-8">
             {/* Stacking avatars */}
             <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-800 overflow-hidden"><img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="avatar" /></div>
             <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-700 overflow-hidden"><img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100" alt="avatar" /></div>
             <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-600 overflow-hidden"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="avatar" /></div>
             <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-900 overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="avatar" /></div>
          </div>
          
          <span className="text-sm font-bold tracking-tight mb-4">(Looking for more?)</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Expand your scope with marketing, SEO,<br className="hidden md:block"/> or content creation.
          </h2>
          
          <a href="#contact" className="relative overflow-hidden h-7 group cursor-pointer inline-flex items-center text-lg font-semibold mt-2">
            <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
              Contact Us
            </span>
            <span className="absolute left-0 top-full block group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
              Contact Us
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20 origin-left" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </a>
        </div>

      </div>
      <BouncyBottom color="#ffffff" className="z-10" />
    </section>
  );
}