import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  onAdminClick: () => void;
};

export default function Header({ onAdminClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Галерия', href: '#gallery' },
    { label: 'За нас', href: '#about' },
    { label: 'Поръчки', href: '#commissions' },
    { label: 'Отзиви', href: '#testimonials' },
    { label: 'Контакт', href: '#contact' },
  ];

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('#hero')}
          className="font-serif text-2xl font-bold text-stone-800 tracking-wide"
        >
          SveArt
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-stone-700 hover:text-stone-900 font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-800 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={onAdminClick}
            className="text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
            title="Администраторски вход"
          >
            Админ
          </button>
        </nav>

        <button
          className="md:hidden text-stone-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-stone-50 border-t border-stone-200 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-stone-700 hover:text-stone-900 font-medium py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onAdminClick();
            }}
            className="text-left text-stone-500 hover:text-stone-800 text-sm font-medium py-2"
          >
            Админ
          </button>
        </nav>
      )}
    </header>
  );
}
