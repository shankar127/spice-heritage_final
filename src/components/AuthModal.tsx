import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email: string; name: string }, isStaff?: boolean) => void;
  onAddToast?: (msg: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess, onAddToast }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [isStaff, setIsStaff] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      if (onAddToast) {
        onAddToast('Error: Please fill in all fields.');
      }
      return;
    }

    if (tab === 'register' && !name) {
      setError('Please enter your name.');
      if (onAddToast) {
        onAddToast('Error: Please enter your name.');
      }
      return;
    }

    setLoading(true);

    // Simulate successful API authentication response
    setTimeout(() => {
      setLoading(false);
      const userName = tab === 'register' ? name : email.split('@')[0];
      onSuccess({ email, name: userName }, isStaff);
      onClose();
      // Clear fields
      setEmail('');
      setPassword('');
      setName('');
      setIsStaff(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-yellow-400 bg-black p-8 text-yellow-100 shadow-[0_0_50px_rgba(250,204,21,0.15)] z-10"
          >
            {/* Header branding */}
            <div className="text-center mb-8">
              <div className="inline-flex w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 items-center justify-center text-yellow-400 mb-3 animate-pulse">
                {isStaff ? (
                  <LayoutDashboard className="w-6 h-6" />
                ) : (
                  <Sparkles className="w-6 h-6" />
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-yellow-400">
                {isStaff ? "Staff Portal Gateway" : "Spice Heritage Portal"}
              </h3>
              <p className="text-[11px] font-mono uppercase tracking-widest text-yellow-100/50 mt-1">
                {isStaff ? "Royal Management & Operations" : "Access Royal Gastronomy"}
              </p>
            </div>

            {/* Tab switchers */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 mb-4">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError('');
                }}
                className={`py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  tab === 'login'
                    ? 'bg-yellow-400 text-black shadow-lg font-extrabold'
                    : 'text-yellow-100/60 hover:text-yellow-400 hover:bg-zinc-900/60'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setError('');
                }}
                className={`py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  tab === 'register'
                    ? 'bg-yellow-400 text-black shadow-lg font-extrabold'
                    : 'text-yellow-100/60 hover:text-yellow-400 hover:bg-zinc-900/60'
                }`}
              >
                Register
              </button>
            </div>

            {/* Middle role switcher link (Customer / Staff toggle) */}
            <div className="flex justify-center items-center mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsStaff(!isStaff);
                  setError('');
                }}
                className="text-xs font-black font-sans tracking-wider uppercase text-yellow-400 hover:text-white transition-colors duration-300 flex items-center space-x-1.5 cursor-pointer underline underline-offset-4"
              >
                {isStaff ? (
                  <>
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Login & Register</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Staff Login</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs text-center font-medium">
                {error}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-yellow-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-100/40">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Chef Arjun Mehta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-yellow-100 placeholder-yellow-100/20 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-yellow-400">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-100/40">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="guest@spiceheritage.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-yellow-100 placeholder-yellow-100/20 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-yellow-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-100/40">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-yellow-100 placeholder-yellow-100/20 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-sans font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-yellow-400/10 active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {isStaff 
                        ? (tab === 'login' ? 'Confirm Staff Log In' : 'Complete Staff Registration')
                        : (tab === 'login' ? 'Confirm Log In' : 'Complete Registration')
                      }
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Terms reminder */}
            <p className="text-[10px] text-yellow-100/30 text-center mt-6 leading-relaxed font-light">
              By accessing Spice Heritage, you agree to our premium terms of royal service and privacy policy.
            </p>

            {/* Close trigger */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-yellow-100/40 hover:text-yellow-400 hover:bg-zinc-900/60 transition-all focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
