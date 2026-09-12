import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Phone, ArrowUp, Flame, X, HelpCircle, ChevronUp } from 'lucide-react';

export const FloatingQuickActions: React.FC = () => {
  const { openCheckout, activePage, setActivePage } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't show floating action widget on Admin dashboard to avoid cluttering admin controls
  if (activePage === 'admin') return null;

  return (
    <aside aria-label="Quick contact and assistance options" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Expanded Quick Options Menu */}
      {isExpanded && (
        <div className="pointer-events-auto rounded-2xl bg-white dark:bg-[#0A1024] border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-3 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-bottom-3 duration-200 mb-1 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800 px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-cyan-300">
              Quick Assistance
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/251900450154?text=Hello%20Coach%20Dawit%2C%20I%20am%20interested%20in%20joining%20the%20GerrardFit%20training%20program%20in%20Ethiopia."
            target="_blank"
            rel="noopener noreferrer"
            id="floating-whatsapp-btn"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="leading-tight">WhatsApp Coach</div>
              <div className="text-[9px] opacity-75 font-normal">Instant response</div>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:0900450154"
            id="floating-phone-btn"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="leading-tight">Call: 0900450154</div>
              <div className="text-[9px] opacity-75 font-normal">Direct Coach Line</div>
            </div>
          </a>

          {/* Select Package & Pricing */}
          <button
            onClick={() => {
              setIsExpanded(false);
              openCheckout();
            }}
            id="floating-pricing-btn"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-95 shadow-md shadow-cyan-500/25 cursor-pointer text-left"
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span>View Packages (ETB)</span>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Buttons */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            id="floating-back-to-top-btn"
            title="Back to Top"
            className="p-3 rounded-full bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700/60 shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Quick Contact Pill */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          id="floating-quick-help-toggle"
          title="Quick Contact & Booking"
          className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="tracking-wide hidden sm:inline">Ask Coach Dawit</span>
          <span className="tracking-wide sm:hidden">Coach</span>
          <MessageCircle className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </aside>
  );
};
