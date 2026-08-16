import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Мария Иванова',
      text: 'Поръчах картина за холото и резултатът надмина очакванията ми. Всяко утро се радвам на нея.',
      city: 'София',
    },
    {
      name: 'Петър Димитров',
      text: 'Уникална работа! Картината пристигна перфектно опакована и е още по-красива на живо.',
      city: 'Пловдив',
    },
    {
      name: 'Елена Стоянова',
      text: 'Подарих картина на майка ми за рожден ден. Тя се разчувства. Благодаря ви за емоцията!',
      city: 'Варна',
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Отзиви
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Какво казват хората, които вече имат SveArt картина у дома.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-stone-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-6 right-6 text-stone-200" size={40} />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-stone-800">{t.name}</p>
                <p className="text-stone-500 text-sm">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
