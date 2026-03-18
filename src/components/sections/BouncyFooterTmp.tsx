import { BouncyTop } from "../ui/BouncyTop";

export function BouncyFooter() {
  return (
    <footer className="relative w-full h-[150vh] bg-[#ececec] text-black z-20 flex flex-col items-center justify-center">
      {/* 
        Скругляющийся верх, который привязан к скроллу. 
        Цвет (color) берется такой же, как у фона секции (bg-[#ececec]),
        чтобы он сливался с ней.
      */}
      <BouncyTop color="#ececec" />
      
      <div className="absolute top-[20vh] text-center w-full px-8">
        <h2 className="text-5xl md:text-[6vw] font-bold mb-10 tracking-tight">
          Let's work together.
        </h2>
        <button className="bg-black text-white px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
          Get in touch
        </button>
      </div>
    </footer>
  );
}