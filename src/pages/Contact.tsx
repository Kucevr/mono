import { Navbar } from "../components/layout/Navbar";
import { ContactUs } from "../components/sections/ContactUs";
import { MonoFooter } from "../components/sections/MonoFooter";

export function Contact() {
  return (
    <div className="relative min-h-screen bg-[#fcfcfc] text-white">
      <Navbar workCount={4} />
      <div className="pt-24 lg:pt-32">
        <ContactUs />
      </div>
      <MonoFooter />
    </div>
  );
}
