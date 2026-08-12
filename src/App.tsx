import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Commissions from '@/components/Commissions';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  function handleAdminClick() {
    if (session) {
      setShowPanel(true);
    } else {
      setShowLogin(true);
    }
  }

  function handleLoginSuccess() {
    setShowLogin(false);
    setShowPanel(true);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header onAdminClick={handleAdminClick} />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Commissions />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {showLogin && (
        <AdminLogin
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {authReady && session && showPanel && (
        <AdminPanel
          onLogout={() => {
            setShowPanel(false);
            setSession(null);
            window.dispatchEvent(new Event('paintings-changed'));
          }}
          onClose={() => {
            setShowPanel(false);
            window.dispatchEvent(new Event('paintings-changed'));
          }}
        />
      )}
    </div>
  );
}
