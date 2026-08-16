import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-amber-50 mb-3">SveArt</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Галерия с оригинални картини, създадени с любов и страст към изкуството.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-amber-50 mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Галерия', href: '#gallery' },
                { label: 'За нас', href: '#about' },
                { label: 'Поръчки', href: '#commissions' },
                { label: 'Контакт', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-amber-50 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-50 mb-4">Последвайте ни</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-700 hover:bg-stone-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-700 hover:bg-stone-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-6 text-center text-sm text-stone-500">
          <p>&copy; {year} SveArt. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
