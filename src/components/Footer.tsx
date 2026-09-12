import React from 'react';
import { useApp } from '../context/AppContext';
import { NavPage } from '../types';
import { Dumbbell, ShieldCheck, Send, Instagram, Mail, Phone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, openCheckout, theme, mediaSettings, openSecretAdminModal } = useApp();

  const handleNav = (p: NavPage) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      theme === 'dark'
        ? 'bg-[#04060C] border-slate-800 text-slate-400'
        : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Brand & Certification Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              {mediaSettings.logoUrl ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-white border border-cyan-400/40 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src={mediaSettings.logoUrl}
                    alt="GerrardFit Logo"
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <Dumbbell className="w-5 h-5" />
                </div>
              )}
              <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
                GERRARD<span className="text-blue-500">FIT</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              Elite personal training & 12-week body transformation platform founded by <strong>Dawit Solomon</strong>. Internationally accredited by the International Sports Sciences Association (ISSA License #40006935).
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified ISSA CPT • Ethiopia & Online</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3 text-xs">
            <p className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-500 cursor-pointer">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('journeys')} className="hover:text-blue-500 cursor-pointer">
                  Client Transformations & Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('packages')} className="hover:text-blue-500 cursor-pointer">
                  Coaching Packages (in ETB)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-500 cursor-pointer">
                  About Dawit & Certificates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-500 cursor-pointer">
                  Contact & Bole Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tiers in ETB */}
          <div className="space-y-3 text-xs">
            <p className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Plans in Ethiopian Birr
            </p>
            <ul className="space-y-2 font-medium">
              <li className="flex justify-between">
                <span>Starter Plan</span>
                <strong className="text-slate-900 dark:text-slate-200">1,000 ETB</strong>
              </li>
              <li className="flex justify-between">
                <span>Transformation Plan</span>
                <strong className="text-blue-500">3,000 ETB</strong>
              </li>
              <li className="flex justify-between">
                <span>VIP Elite Plan</span>
                <strong className="text-slate-900 dark:text-slate-200">7,000 ETB</strong>
              </li>
            </ul>

            <button
              onClick={() => openCheckout()}
              className="mt-3 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Order / Register
            </button>
          </div>

          {/* Col 5: Security & Social */}
          <div className="space-y-3 text-xs">
            <p className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Connect & Security
            </p>
            <div className="flex items-center gap-2">
              <a
                href="tel:0900450154"
                className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Phone Consultation (0900450154)"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/p/DbTrB4yOKqK/?stkn=MWFjNWtlcnc5YzA5NQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="GerrardFit Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/gerrardfit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Anti-Screenshot DRM Protected</span>
              </p>
              <p>Ethiopia (Bole Atlas Hub)</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Detailed Copyright & Certification Statement */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center md:justify-start gap-2">
              <span>© {new Date().getFullYear()} GerrardFit. All Rights Reserved.</span>
              {/* Secret discreet button to trigger Coach Dawit Admin Portal */}
              <button
                onClick={openSecretAdminModal}
                id="secret-coach-lock-btn"
                title="Coach Portal"
                aria-label="Coach Dawit Admin Access"
                className="inline-flex items-center justify-center p-1 rounded text-slate-400/40 hover:text-cyan-400 dark:text-slate-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
              </button>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Coach Dawit Solomon • ISSA Certified Personal Trainer (#40006935) • Addis Ababa, Ethiopia.
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-xl">
              All proprietary biomechanical lifting cues, Habesha macronutrient formulas, and athletic transformation protocols are protected by copyright. Unauthorized copying, scraping, or distribution is prohibited.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ISSA Science-Based Conditioning
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Direct Registration & 1-on-1 Coaching
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <a
              id="btn-made-by-holy-digital"
              href="tel:+251967474727"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 dark:bg-purple-500/15 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-600 text-blue-600 dark:text-purple-300 border border-blue-500/30 dark:border-purple-500/30 hover:border-transparent transition-all shadow-xs hover:scale-105 cursor-pointer whitespace-nowrap"
              title="Call HolyDigital: +251967474727"
            >
              <Phone className="w-3 h-3" />
              <span>made by HolyDigital</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
