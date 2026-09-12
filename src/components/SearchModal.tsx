import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSFORMATIONS_DATA, FAQS_DATA } from '../data/mockData';
import { Search, X, ArrowRight, Flame, Award, Zap, HelpCircle } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    closeSearch,
    setActivePage,
    openCheckout,
    theme,
    packages
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedPackages = trimmed
    ? packages.filter(
        p => p.name.toLowerCase().includes(trimmed) || p.description.toLowerCase().includes(trimmed) || p.features.some(f => f.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedTransformations = trimmed
    ? TRANSFORMATIONS_DATA.filter(
        t => t.clientName.toLowerCase().includes(trimmed) || t.category.toLowerCase().includes(trimmed) || t.story.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedFaqs = trimmed
    ? FAQS_DATA.filter(
        f => f.q.toLowerCase().includes(trimmed) || f.a.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 shadow-2xl border transition-all ${
        theme === 'dark'
          ? 'bg-[#090E1D] border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="w-5 h-5 text-blue-500 absolute left-4" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, transformations, ISSA certificate, or Ethiopian nutrition..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#050811] border border-slate-300 dark:border-slate-800 text-sm focus:outline-hidden focus:border-blue-500"
          />
          <button
            onClick={closeSearch}
            className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!trimmed && (
          <div className="space-y-4 py-4">
            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Quick Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {['Transformation Plan', '1,000 ETB', 'ISSA Certified', 'Injera & Shiro Diet', 'Telebirr Payment', 'Ethiopia Fitness'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-semibold hover:border-blue-500 cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {trimmed && (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            
            {/* Packages */}
            {matchedPackages.length > 0 && (
              <div>
                <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Packages ({matchedPackages.length})
                </p>
                <div className="space-y-2">
                  {matchedPackages.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        closeSearch();
                        openCheckout(pkg);
                      }}
                      className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#050811] border border-slate-200 dark:border-slate-800/80 hover:border-blue-500 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="font-bold text-sm">{pkg.name}</p>
                        <p className="text-xs text-slate-500">{pkg.tagline}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-heading font-black text-sm text-blue-500">{pkg.priceETB} ETB</span>
                        <ArrowRight className="w-4 h-4 ml-auto text-slate-400 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transformations */}
            {matchedTransformations.length > 0 && (
              <div>
                <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <Flame className="w-3 h-3" /> Transformations ({matchedTransformations.length})
                </p>
                <div className="space-y-2">
                  {matchedTransformations.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        closeSearch();
                        setActivePage('journeys');
                      }}
                      className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#050811] border border-slate-200 dark:border-slate-800/80 hover:border-blue-500 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="font-bold text-sm">{t.clientName} — {t.category}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{t.story}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">{t.weightAfter}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {matchedFaqs.length > 0 && (
              <div>
                <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3" /> FAQs & Diet ({matchedFaqs.length})
                </p>
                <div className="space-y-2">
                  {matchedFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#050811] border border-slate-200 dark:border-slate-800/80"
                    >
                      <p className="font-bold text-xs text-blue-400">{faq.q}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedPackages.length === 0 && matchedTransformations.length === 0 && matchedFaqs.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-xs">
                No results found for "{query}". Try searching for "starter", "fat loss", or "ISSA".
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
