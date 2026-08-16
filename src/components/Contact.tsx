import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Моля, попълнете всички полета.');
      return;
    }
    setError('');
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  }

  const contactInfo = [
    { icon: Mail, label: 'Имейл', value: 'hello@sveart.bg' },
    { icon: Phone, label: 'Телефон', value: '+359 88 123 4567' },
    { icon: MapPin, label: 'Адрес', value: 'София, България' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Свържи се с нас
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Имате въпрос или искате да поръчате картина? Напишете ни — отговаряме бързо.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-800 text-amber-50 flex items-center justify-center">
                  <info.icon size={22} />
                </div>
                <div>
                  <p className="text-stone-500 text-sm">{info.label}</p>
                  <p className="text-stone-800 font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <div>
              <label className="block text-stone-700 font-medium mb-2">Име</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                placeholder="Вашето име"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-2">Имейл</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                placeholder="vas@email.com"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-2">Съобщение</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors resize-none"
                placeholder="Разкажете ни какво ви интересува..."
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {sent && (
              <p className="text-green-600 text-sm">
                Благодарим ви! Съобщението е изпратено успешно.
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors"
            >
              <Send size={18} />
              Изпрати
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
