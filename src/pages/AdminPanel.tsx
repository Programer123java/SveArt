import { useEffect, useRef, useState } from 'react';
import { supabase, type Painting } from '@/lib/supabase';
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Loader2,
  X,
  CheckCircle2,
  ImageIcon,
  Save,
} from 'lucide-react';

type Props = {
  onLogout: () => void;
  onClose: () => void;
};

type EditingState = {
  mode: 'add' | 'edit';
  painting: Painting | null;
};

const EMPTY_FORM = {
  title: '',
  description: '',
  price: '',
  dimensions: '',
  technique: '',
  year: '',
  sold: false,
};

export default function AdminPanel({ onLogout, onClose }: Props) {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Painting | null>(null);

  useEffect(() => {
    loadPaintings();
  }, []);

  async function loadPaintings() {
    setLoading(true);
    const { data } = await supabase
      .from('paintings')
      .select('*')
      .order('created_at', { ascending: false });
    setPaintings(data ?? []);
    setLoading(false);
  }

  function openAdd() {
    setEditing({ mode: 'add', painting: null });
    setShowForm(true);
  }

  function openEdit(p: Painting) {
    setEditing({ mode: 'edit', painting: p });
    setShowForm(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  async function handleDelete(p: Painting) {
    // Try to remove the image from storage (best-effort)
    const path = extractStoragePath(p.image_url);
    if (path) {
      await supabase.storage.from('paintings').remove([path]);
    }
    await supabase.from('paintings').delete().eq('id', p.id);
    setConfirmDelete(null);
    loadPaintings();
  }

  async function toggleSold(p: Painting) {
    await supabase
      .from('paintings')
      .update({ sold: !p.sold })
      .eq('id', p.id);
    loadPaintings();
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-100 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-stone-900 text-amber-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-stone-800">
              <ImageIcon className="w-4 h-4 text-amber-400" />
            </span>
            <div>
              <h1 className="font-serif text-lg leading-tight">
                Админ панел
              </h1>
              <p className="text-xs text-stone-400">SveArt галерия</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-medium bg-stone-800 hover:bg-stone-700 transition-colors"
            >
              Към сайта
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-amber-700 hover:bg-amber-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Изход
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl text-stone-900">
              Картини ({paintings.length})
            </h2>
            <p className="text-sm text-stone-500 mt-0.5">
              Управлявайте наличните произведения
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-amber-50 font-medium text-sm hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Нова картина
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 text-stone-400 animate-spin" />
            <p className="text-stone-500 text-sm">Зареждане…</p>
          </div>
        ) : paintings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-white rounded-2xl border border-stone-200">
            <ImageIcon className="w-12 h-12 text-stone-300" />
            <p className="text-stone-500">
              Няма качени картини. Добавете първата!
            </p>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-amber-50 font-medium text-sm hover:bg-stone-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Нова картина
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className={`w-full h-full object-cover ${
                      p.sold ? 'grayscale-[0.4]' : ''
                    }`}
                  />
                  {p.sold && (
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-xs font-medium">
                      Продадена
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-serif text-base text-stone-900 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-stone-500 mb-3">
                    {Number(p.price).toLocaleString('bg-BG')} €
                  </p>
                  <div className="flex items-center gap-2 mt-auto flex-wrap">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Редактирай
                    </button>
                    <button
                      onClick={() => toggleSold(p)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        p.sold
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {p.sold ? 'Маркирай налична' : 'Маркирай продадена'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-rose-600 hover:bg-rose-100 transition-colors ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && editing && (
        <PaintingForm
          mode={editing.mode}
          painting={editing.painting}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            loadPaintings();
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Изтриване на картина"
          message={`Сигурни ли сте, че искате да изтриете „${confirmDelete.title}"? Това действие е необратимо.`}
          confirmLabel="Изтрий"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

function PaintingForm({
  mode,
  painting,
  onClose,
  onSaved,
}: {
  mode: 'add' | 'edit';
  painting: Painting | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(() => {
    if (painting) {
      return {
        title: painting.title,
        description: painting.description ?? '',
        price: String(painting.price),
        dimensions: painting.dimensions ?? '',
        technique: painting.technique ?? '',
        year: painting.year ? String(painting.year) : '',
        sold: painting.sold,
      };
    }
    return { ...EMPTY_FORM };
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    painting?.image_url ?? null,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError('Заглавието е задължително.');
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Моля, въведете валидна цена.');
      return;
    }

    setSaving(true);

    let imageUrl = painting?.image_url ?? '';

    // Upload new image if a file was selected
    if (file) {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('paintings')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        setError('Грешка при качване на изображението: ' + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('paintings')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    if (mode === 'add' && !imageUrl) {
      setError('Моля, изберете изображение.');
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: priceNum,
      image_url: imageUrl,
      dimensions: form.dimensions.trim() || null,
      technique: form.technique.trim() || null,
      year: form.year ? parseInt(form.year, 10) : null,
      sold: form.sold,
    };

    if (mode === 'add') {
      const { error: insertError } = await supabase
        .from('paintings')
        .insert(payload);
      if (insertError) {
        setError('Грешка при запис: ' + insertError.message);
        setSaving(false);
        return;
      }
    } else if (painting) {
      const { error: updateError } = await supabase
        .from('paintings')
        .update(payload)
        .eq('id', painting.id);
      if (updateError) {
        setError('Грешка при запис: ' + updateError.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-stone-50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm px-6 py-4 border-b border-stone-200 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl text-stone-900">
            {mode === 'add' ? 'Нова картина' : 'Редактиране'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Изображение {mode === 'add' && '*'}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-xl border-2 border-dashed border-stone-300 hover:border-stone-500 transition-colors overflow-hidden aspect-[4/3] bg-stone-100 flex items-center justify-center"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Преглед"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-stone-400">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Кликнете, за да изберете изображение</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            {mode === 'edit' && (
              <p className="text-xs text-stone-400 mt-1.5">
                Оставете празно, за да запазите текущото изображение.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Заглавие *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800"
                placeholder="Име на картината"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Цена (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Година
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Техника
              </label>
              <input
                value={form.technique}
                onChange={(e) =>
                  setForm({ ...form, technique: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800"
                placeholder="Масло, акрил…"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Размери
              </label>
              <input
                value={form.dimensions}
                onChange={(e) =>
                  setForm({ ...form, dimensions: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800"
                placeholder="50x70 см"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Описание
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-colors text-stone-800 resize-none"
                placeholder="Кратко описание на картината…"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer md:col-span-2">
              <input
                type="checkbox"
                checked={form.sold}
                onChange={(e) => setForm({ ...form, sold: e.target.checked })}
                className="w-5 h-5 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
              />
              <span className="text-sm text-stone-700">
                Маркирай като продадена
              </span>
            </label>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-amber-50 font-medium text-sm hover:bg-stone-800 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {mode === 'add' ? 'Добави' : 'Запази'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-stone-300 text-stone-700 font-medium text-sm hover:bg-stone-200 transition-colors"
            >
              Отказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-stone-50 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-4">
          <Trash2 className="w-5 h-5 text-rose-600" />
        </div>
        <h3 className="font-serif text-lg text-stone-900 mb-2">{title}</h3>
        <p className="text-sm text-stone-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-full border border-stone-300 text-stone-700 font-medium text-sm hover:bg-stone-200 transition-colors"
          >
            Отказ
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-full bg-rose-600 text-white font-medium text-sm hover:bg-rose-500 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function extractStoragePath(url: string): string | null {
  try {
    const u = new URL(url);
    const idx = u.pathname.indexOf('/paintings/');
    if (idx === -1) return null;
    return decodeURIComponent(u.pathname.slice(idx + '/paintings/'.length));
  } catch {
    return null;
  }
}
