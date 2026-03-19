import { BouncyTop } from "../ui/BouncyTop";
import { PulseButton } from "../ui/PulseButton";

export function BouncyFooter() {
  return (
    <footer className="relative w-full h-[150vh] bg-[#ececec] text-black z-20 flex flex-col items-center justify-center">
      {/* 
        Скругляющийся верх, который привязан к скроллу. 
        Цвет (color) берется такой же, как у фона секции (bg-[#ececec]),
        чтобы он сливался с ней.
      */}
      <BouncyTop color="#ececec" />
      
      <div className="absolute top-[30vh] text-center w-full px-8">
        <h2 className="text-5xl md:text-[6vw] font-bold mb-10 tracking-tight">
          Let's work together.
        </h2>
        
        {/* Используем универсальный плагин-кнопку */}
        <PulseButton href="/contact">Get in touch</PulseButton>
      </div>
    </footer>
  );
}