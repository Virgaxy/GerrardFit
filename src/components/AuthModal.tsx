import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    login,
    theme
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(authModalMode || 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleStandardAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setResetSent(true);
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0] || 'Athlete'),
      email: email || 'athlete@gerrardfit.com',
      role: email.toLowerCase().includes('admin') || email.toLowerCase().includes('dawit') ? 'admin' : 'client',
      provider: 'email',
      telegram: telegram || undefined,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    login(newUser);
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    const oauthUser: User = {
      id: `oauth-${provider}-${Date.now()}`,
      name: provider === 'google' ? 'Kidus Yohannes' : 'Dev Yohannes',
      email: provider === 'google' ? 'kidusyohannes2552@gmail.com' : 'kidus@github.com',
      avatar: provider === 'google'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'client',
      provider: provider,
      telegram: '@kidus_fit'
    };
    login(oauthUser);
  };

  const handleAdminDemoLogin = () => {
    const adminUser: User = {
      id: 'admin-dawit-solomon',
      name: 'Dawit Solomon (Coach Gerrard)',
      email: 'dawit@gerrardfit.com',
      avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80',
      role: 'admin',
      provider: 'email',
      telegram: '@gerrardfit_coach'
    };
    login(adminUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
        theme === 'dark'
          ? 'bg-[#090E1D] border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
            GerrardFit Account Access
          </span>
          <h3 className="font-heading text-2xl font-black mt-1">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Create Athlete Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'signin' && 'Access your personalized training routines and coaching history.'}
            {mode === 'signup' && 'Join the premier 12-week transformation platform in Ethiopia.'}
            {mode === 'forgot' && 'Enter your registered email to receive a recovery link.'}
          </p>
        </div>

        {/* OAuth Buttons */}
        {mode !== 'forgot' && (
          <div className="space-y-2.5 mb-6">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-bold text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              {/* Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 20.4 7.5 23 12 23z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-bold text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              {/* GitHub SVG Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-300 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-[#090E1D] px-3 text-[10px] uppercase font-bold text-slate-400 shrink-0">
                Or with Email & Password
              </span>
            </div>
          </div>
        )}

        {/* Standard Form */}
        {resetSent ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm">Password Reset Dispatched</h4>
            <p className="text-xs text-slate-400">
              Check your email inbox for instructions to reset your GerrardFit credentials.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                setMode('signin');
              }}
              className="mt-2 text-xs font-bold text-blue-500 underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleStandardAuth} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kidus Yohannes"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Telegram Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="@your_telegram_username"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {mode === 'signin' && 'Sign In to Account'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Password Reset'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode Switcher */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
          {mode === 'signin' ? (
            <p className="text-slate-500 dark:text-slate-400">
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-blue-500 font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-blue-500 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Demo Admin Quick Login for testing */}
        <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-slate-500 dark:text-slate-300 font-medium">Test Coach Portal:</span>
          </div>
          <button
            onClick={handleAdminDemoLogin}
            className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            Log in as Coach Dawit
          </button>
        </div>

      </div>
    </div>
  );
};
