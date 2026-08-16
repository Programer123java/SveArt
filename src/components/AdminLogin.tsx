import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Lock, Mail } from 'lucide-react';

type AdminLoginProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AdminLogin({ onClose, onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Грешен имейл или парола.');
      setLoading(false);
    } else {
      onSuccess();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X size={22} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone-800 text-amber-50 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-800">Администраторски вход</h2>
          <p className="text-stone-500 text-sm mt-1">Влезте, за да управлявате галерията.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-stone-700 font-medium mb-2 text-sm">Имейл</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                placeholder="admin@sveart.bg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-stone-700 font-medium mb-2 text-sm">Парола</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-stone-800 text-amber-50 font-medium rounded-lg hover:bg-stone-900 transition-colors disabled:opacity-50"
          >
            {loading ? 'Влизане...' : 'Вход'}
          </button>
        </form>
      </div>
    </div>
  );
}
