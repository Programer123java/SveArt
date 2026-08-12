import { useState } from 'react';
import { Mail, Phone, Send, Facebook, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const subject = data.get('subject') as string;
    const message = data.get('message') as string;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || 'Грешка при изпращане');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Възникна грешка. Моля, опитайте отново.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            Контакти
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Свържете се с нас
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Имате въпрос за картина или искате да поръчате? Пишете ни.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a
            href="mailto:svetatanasova2@gmail.com"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-amber-50">
              <Mail className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-stone-400 uppercase tracking-wide">
                Имейл
              </p>
              <p className="text-stone-800 font-medium text-xs whitespace-nowrap">svetatanasova2@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+359888534259"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-amber-50">
              <Phone className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">
                Телефон
              </p>
              <p className="text-stone-800 font-medium">+359 888 534 259</p>
            </div>
          </a>

          <a
            href="https://www.facebook.com/share/1DDwfLmKYw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-amber-50">
              <Facebook className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">
                Социална мрежа
              </p>
              <p className="text-stone-800 font-medium">Facebook</p>
            </div>
          </a>
        </div>

        <form
          className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Име
              </label>
              <input
                name="name"
                required
                disabled={status === 'sending'}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800 disabled:opacity-50"
                placeholder="Вашето име"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Имейл
              </label>
              <input
                name="email"
                type="email"
                required
                disabled={status === 'sending'}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Тема
            </label>
            <input
              name="subject"
              disabled={status === 'sending'}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800 disabled:opacity-50"
              placeholder="Запитване за картина / поръчка"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Съобщение
            </label>
            <textarea
              name="message"
              required
              rows={4}
              disabled={status === 'sending'}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800 resize-none disabled:opacity-50"
              placeholder="Коя картина ви интересува?"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 mb-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm">Съобщението е изпратено успешно! Ще се свържем с вас скоро.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-amber-50 font-medium text-sm hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Изпращане...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Изпрати запитване
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
