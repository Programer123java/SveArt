import { Palette, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-stone-900 text-amber-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3">
            За нас
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Историята зад SveArt
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
            SveArt е място, където изкуството среща емоцията. Всяка картина е
            оригинално произведение, създадено с внимание към детайла и
            страст към цветовете.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-700/20 mb-5">
              <Palette className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl mb-2">Оригинални творби</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Всяка картина е уникална и създадена на ръка — без репродукции и
              копия.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-700/20 mb-5">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl mb-2">Различни техники</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Масло, акрил, акварел — разнообразие от стилове и техники за
              всеки вкус.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-700/20 mb-5">
              <Heart className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl mb-2">С любов</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Изкуството е наша страст. Всяко платно носи част от душата на
              художника.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
