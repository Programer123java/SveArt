import { useState, useEffect } from 'react';
import { supabase, type Painting } from '@/lib/supabase';
import { X, ShoppingCart } from 'lucide-react';

export default function Gallery() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Painting | null>(null);

  async function loadPaintings() {
    setLoading(true);
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPaintings(data as Painting[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPaintings();

    const handler = () => loadPaintings();
    window.addEventListener('paintings-changed', handler);
    return () => window.removeEventListener('paintings-changed', handler);
  }, []);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Галерия
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Разгледайте наличните произведения. Всяка картина е оригинал и едно от рода си.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
          </div>
        ) : paintings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">
              Все още няма добавени картини. Моля, проверете отново скоро.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paintings.map((painting) => (
              <div
                key={painting.id}
                onClick={() => setSelected(painting)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                  {painting.image_url ? (
                    <img
                      src={painting.image_url}
                      alt={painting.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <span className="text-6xl font-serif">S</span>
                    </div>
                  )}
                  {painting.status === 'sold' && (
                    <div className="absolute top-4 right-4 bg-stone-800 text-amber-50 px-3 py-1 rounded-full text-xs font-medium">
                      Продадена
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-stone-800 mb-1">
                    {painting.title}
                  </h3>
                  <p className="text-stone-500 text-sm mb-2">{painting.technique}</p>
                  <p className="text-stone-700 font-medium">
                    {painting.price > 0
                      ? `${painting.price} лв.`
                      : painting.status === 'available'
                        ? 'По запитване'
                        : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              >
                <X size={20} />
              </button>
              <div className="aspect-[4/5] sm:aspect-[16/10] bg-stone-100">
                {selected.image_url ? (
                  <img
                    src={selected.image_url}
                    alt={selected.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <span className="text-8xl font-serif">S</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-stone-800 mb-2">
                    {selected.title}
                  </h3>
                  <p className="text-stone-500">
                    {selected.technique}
                    {selected.dimensions ? ` · ${selected.dimensions}` : ''}
                  </p>
                </div>
                {selected.status === 'sold' ? (
                  <span className="bg-stone-200 text-stone-600 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                    Продадена
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                    Налична
                  </span>
                )}
              </div>
              {selected.description && (
                <p className="text-stone-600 leading-relaxed mb-6">{selected.description}</p>
              )}
              <div className="flex items-center justify-between border-t border-stone-200 pt-6">
                <span className="text-2xl font-serif font-bold text-stone-800">
                  {selected.price > 0 ? `${selected.price} лв.` : 'По запитване'}
                </span>
                {selected.status === 'available' && (
                  <button
                    onClick={() => {
                      const contactEl = document.querySelector('#contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                      setSelected(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Запитай се
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
