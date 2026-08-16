import { Palette } from 'lucide-react';

export default function Hero() {
  function scrollToGallery() {
    const el = document.querySelector('#gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-stone-800 text-amber-50">
          <Palette size={28} />
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-stone-800 leading-tight mb-6">
          Оригинални картини,<br />създадени с любов
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Галерия SveArt събира уникални произведения на изкуството — масло, акрил и акварел,
          всяко с история и душа. Намерете картината, която говори на вас.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToGallery}
            className="px-8 py-3.5 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-all duration-300 hover:shadow-lg"
          >
            Виж галерията
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('#commissions');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border-2 border-stone-800 text-stone-800 font-medium rounded-lg hover:bg-stone-800 hover:text-amber-50 transition-all duration-300"
          >
            Поръчай картина
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-stone-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
