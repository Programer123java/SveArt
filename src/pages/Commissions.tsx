import { Palette, Ruler, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function Commissions() {
  return (
    <section id="commissions" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            Поръчки
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
            Поръчай своя картина
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Искаш ли уникална картина, създадена специално за теб? Избери размер,
            техника и тема, а ние ще създадем произведение на изкуството, което
            ще носи част от твоята история.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-white border border-stone-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                <Palette className="w-5 h-5 text-amber-700" />
              </span>
              <h3 className="font-serif text-xl text-stone-900">Избери тема</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Пейзаж, портрет, абстракция — разкажи ни какво си представяш и
              ние ще го превърнем в изкуство.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                <Ruler className="w-5 h-5 text-amber-700" />
              </span>
              <h3 className="font-serif text-xl text-stone-900">Избери размер</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">
              От малки формати за дома до големи платна за офиса — всякакви
              размери са възможни.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                <Clock className="w-5 h-5 text-amber-700" />
              </span>
              <h3 className="font-serif text-xl text-stone-900">Срок на изпълнение</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">
              В зависимост от сложността и размера, поръчките се изпълняват
              между 2 и 6 седмици.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </span>
              <h3 className="font-serif text-xl text-stone-900">Уникален резултат</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Всяка поръчка е оригинално произведение — няма да съществува
              друга като нея.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 text-amber-50 font-medium text-sm tracking-wide hover:bg-stone-800 transition-all hover:scale-[1.02] shadow-lg shadow-stone-900/10"
          >
            Заяви поръчка
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
