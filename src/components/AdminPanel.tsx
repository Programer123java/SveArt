import { useState, useEffect } from 'react';
import { supabase, type Painting } from '@/lib/supabase';
import { X, Plus, Trash2, Pencil, LogOut, Image as ImageIcon } from 'lucide-react';

type AdminPanelProps = {
  onLogout: () => void;
  onClose: () => void;
};

export default function AdminPanel({ onLogout, onClose }: AdminPanelProps) {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Painting | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    technique: '',
    dimensions: '',
    status: 'available' as 'available' | 'sold',
  });

  async function loadPaintings() {
    setLoading(true);
    const { data } = await supabase
      .from('paintings')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPaintings(data as Painting[]);
    setLoading(false);
  }

  useEffect(() => {
    loadPaintings();
  }, []);

  function resetForm() {
    setForm({
      title: '',
      description: '',
      price: '',
      image_url: '',
      technique: '',
      dimensions: '',
      status: 'available',
    });
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(p: Painting) {
    setForm({
      title: p.title,
      description: p.description || '',
      price: String(p.price || ''),
      image_url: p.image_url || '',
      technique: p.technique || '',
      dimensions: p.dimensions || '',
      status: p.status,
    });
    setEditing(p);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      price: form.price ? Number(form.price) : 0,
      image_url: form.image_url,
      technique: form.technique,
      dimensions: form.dimensions,
      status: form.status,
    };

    if (editing) {
      await supabase.from('paintings').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('paintings').insert(payload);
    }

    resetForm();
    loadPaintings();
    window.dispatchEvent(new Event('paintings-changed'));
  }

  async function handleDelete(id: string) {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази картина?')) return;
    await supabase.from('paintings').delete().eq('id', id);
    loadPaintings();
    window.dispatchEvent(new Event('paintings-changed'));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  return (
    <div className="fixed inset-0 z-[60] bg-stone-100 overflow-auto">
      <div className="bg-stone-800 text-amber-50 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-serif text-xl font-bold">Админ панел — SveArt</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm hover:text-stone-300 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Изход</span>
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm hover:text-stone-300 transition-colors"
          >
            <X size={18} />
            <span className="hidden sm:inline">Затвори</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl font-bold text-stone-800">Картини</h3>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors"
            >
              <Plus size={18} />
              Нова картина
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-xl font-semibold text-stone-800">
                {editing ? 'Редактиране' : 'Нова картина'}
              </h4>
              <button type="button" onClick={resetForm} className="text-stone-400 hover:text-stone-700">
                <X size={20} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">Заглавие</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">Техника</label>
                <input
                  type="text"
                  value={form.technique}
                  onChange={(e) => setForm({ ...form, technique: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                  placeholder="Масло, акрил..."
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">Размери</label>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                  placeholder="50 × 70 см"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">Цена (лв.)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1 text-sm">URL на изображение</label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1 text-sm">Описание</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1 text-sm">Статус</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as 'available' | 'sold' })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
              >
                <option value="available">Налична</option>
                <option value="sold">Продадена</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors"
            >
              {editing ? 'Запази промените' : 'Добави картина'}
            </button>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
          </div>
        ) : paintings.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <ImageIcon className="mx-auto mb-3 text-stone-300" size={48} />
            <p>Все още няма картини. Добавете първата!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((p) => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[4/5] bg-stone-100 relative">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <span className="text-5xl font-serif">S</span>
                    </div>
                  )}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === 'sold'
                        ? 'bg-stone-800 text-amber-50'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {p.status === 'sold' ? 'Продадена' : 'Налична'}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-lg font-semibold text-stone-800 mb-1">{p.title}</h4>
                  <p className="text-stone-500 text-sm mb-3">
                    {p.technique} · {p.price > 0 ? `${p.price} лв.` : 'По запитване'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors text-sm"
                    >
                      <Pencil size={15} />
                      Редактирай
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center justify-center py-2 px-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
