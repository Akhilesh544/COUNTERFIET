import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiShield, FiUser, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, register, loading } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'login') {
      await login({ email: form.email, password: form.password });
      return;
    }
    await register({ name: form.name, email: form.email, password: form.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(135deg,_#081120_0%,_#132238_45%,_#0f172a_100%)] px-4 py-10 text-slate-100">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-950/30 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600/30 via-violet-600/20 to-cyan-500/20 p-10 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.16)_0%,_transparent_60%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              <FiShield /> ScamShield AI
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">Powerful AI defense for scams, fraud, and counterfeit threats.</h1>
            <p className="mt-4 max-w-lg text-base text-slate-300">Analyze text, audio, and images with enterprise-grade intelligence built for modern security teams.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 rounded-[28px] border border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live threat monitoring</p>
                <p className="text-2xl font-semibold text-white">94.8% detection accuracy</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 p-3 text-white">
                <FiShield size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Secure access</p>
              <h2 className="text-3xl font-semibold text-white">{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">
              {mode === 'login' ? 'Login' : 'Register'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FiUser className="text-cyan-400" />
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full bg-transparent outline-none"
                  placeholder="Full Name"
                />
              </label>
            )}

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <FiMail className="text-cyan-400" />
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="Email"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <FiLock className="text-cyan-400" />
              <input
                required
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="Password"
              />
            </label>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-3 font-semibold text-white transition hover:opacity-90">
              {loading ? 'Working...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              <FiArrowRight />
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-semibold text-cyan-400">
                {mode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;