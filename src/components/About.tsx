import { Brush, Heart, Sparkles } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brush,
      title: 'Оригинални техники',
      text: 'Масло, акрил и акварел — всяка картина е ръчно изработена с традиционни методи.',
    },
    {
      icon: Heart,
      title: 'Създадено с любов',
      text: 'Всяко произведение носи емоция и история, която остава с вас завинаги.',
    },
    {
      icon: Sparkles,
      title: 'Уникални произведения',
      text: 'Няма копия. Всяка картина е едно от рода си — също както вашата история.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-6">
              За SveArt
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              SveArt е галерия, родена от страст към изкуството и желанието да донесе красота
              в дома на всеки човек. Създаваме оригинални картини, които разказват истории
              и събуждат емоции.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Всяко парно платно е изработено с внимание към детайла и уважение към
              традицията. Независимо дали търсите картина за дома, офиса или подарък —
              при нас ще намерите нещо специално.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-stone-700 mb-3">
                    <f.icon size={22} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-stone-800 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-stone-500 text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-200 via-amber-100 to-rose-100 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-[12rem] text-stone-300/50">S</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-stone-800 text-amber-50 p-6 rounded-xl shadow-xl max-w-xs hidden sm:block">
              <p className="font-serif text-3xl font-bold">10+</p>
              <p className="text-sm text-stone-300">години опит в създаването на изкуство</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
