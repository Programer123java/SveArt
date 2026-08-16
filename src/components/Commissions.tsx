import { Check } from 'lucide-react';

export default function Commissions() {
  const steps = [
    {
      num: '01',
      title: 'Свържи се с нас',
      text: 'Разкажи ни какво си представяш — тема, размери, цветове и настроение.',
    },
    {
      num: '02',
      title: 'Създаваме скица',
      text: 'Получаваш предварителна скица за одобрение, преди да започнем реалната работа.',
    },
    {
      num: '03',
      title: 'Рисуваме картината',
      text: 'След одобрение започваме работа. Време за изпълнение: 2–4 седмици.',
    },
    {
      num: '04',
      title: 'Доставка',
      text: 'Картината пристига внимателно опакована и готова за поставяне.',
    },
  ];

  const includes = [
    'Индивидуален дизайн по твоя идея',
    'Избор на техника — масло, акрил или акварел',
    'Размери по твое желание',
    'Скица за одобрение преди работа',
    'Висококачествени материали',
    'Сертификат за автентичност',
  ];

  return (
    <section id="commissions" className="py-20 sm:py-28 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Поръчай картина
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Искаш нещо специално? Създадем картина по твоя идея — точно за твое пространство
            и твое настроение.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-8">
              Как работи процесът
            </h3>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span className="font-serif text-3xl font-bold text-stone-300 flex-shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">{step.title}</h4>
                    <p className="text-stone-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-6">
              Какво включва
            </h3>
            <ul className="space-y-4 mb-8">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center mt-0.5">
                    <Check size={14} />
                  </span>
                  <span className="text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                const el = document.querySelector('#contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors"
            >
              Свържи се с нас
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
