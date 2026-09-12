import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Key, X, ArrowRight, CheckCircle2, Eye, EyeOff, Sparkles, UserCheck } from 'lucide-react';

export const SecretAdminModal: React.FC = () => {
  const {
    isSecretAdminModalOpen,
    closeSecretAdminModal,
    unlockAdminAsCoach,
    showNotification
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSecretAdminModalOpen) {
      setPasscode('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSecretAdminModalOpen]);

  if (!isSecretAdminModalOpen) return null;

  const validPasscodes = ['1234', 'gerrardfit', 'admin', 'dawit', '0900450154', 'admin123'];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanInput = passcode.trim().toLowerCase();

    if (!cleanInput) {
      setError('Please enter your coach passcode');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      if (validPasscodes.includes(cleanInput)) {
        setIsVerifying(false);
        unlockAdminAsCoach();
      } else {
        setIsVerifying(false);
        setError('Incorrect passcode. Please try again or use Quick Coach Unlock.');
      }
    }, 400);
  };

  const handleQuickUnlock = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      unlockAdminAsCoach();
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSecretAdminModal}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#070D1E] border border-cyan-500/30 text-white p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle ambient light gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={closeSecretAdminModal}
          id="close-secret-admin-modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#070D1E] rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Restricted Coach Sanctum
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
              Coach Dawit Access Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Secret entrance for GerrardFit administrative command, client rosters, and media control.
            </p>
          </div>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span>Passcode / PIN</span>
              <span className="text-[10px] text-cyan-400 font-mono">Default: 1234</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Key className="w-4 h-4 text-cyan-400" />
              </div>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="Enter coach passcode (e.g. 1234)"
                id="secret-admin-passcode-input"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-medium text-white placeholder-slate-500 outline-hidden transition-colors font-mono tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            id="btn-verify-secret-admin"
            className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-blue-600 via-cyan-500 to-blue-500 hover:opacity-95 active:scale-[0.99] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#070D1E] px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Quick Coach Verification
            </span>
          </div>
        </div>

        {/* One-Tap Unlock Button for Coach Dawit */}
        <button
          type="button"
          onClick={handleQuickUnlock}
          id="btn-quick-coach-unlock"
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <UserCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>Instant One-Tap Unlock (Coach Dawit)</span>
        </button>

        {/* Secret trigger hints footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col gap-1 text-center">
          <p className="text-[11px] text-slate-400">
            <span className="font-bold text-cyan-400">Secret triggers anytime:</span>
          </p>
          <p className="text-[10px] text-slate-500 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Alt + A</kbd> anywhere • Click the subtle lock in footer • Triple-click header logo
          </p>
        </div>
      </div>
    </div>
  );
};
