import React, { useState } from 'react';
import { PackageTier } from '../types';
import { useApp } from '../context/AppContext';
import {
  Check,
  Zap,
  Flame,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CreditCard,
  Building2,
  PhoneCall
} from 'lucide-react';

export const Packages: React.FC = () => {
  const { openCheckout, packages } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'all' | 'in_person' | 'online'>('all');

  // Ethiopian Birr formatter
  const formatETB = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ETB';
  };

  const filteredPackages = packages.filter(pkg => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'in_person') return pkg.category === 'in_person' || pkg.id === 'one-to-one' || pkg.id === 'vip-elite';
    if (activeCategory === 'online') return pkg.category === 'online' || pkg.id === 'online-plan' || pkg.id === 'starter' || pkg.id === 'transformation';
    return true;
  });

  return (
    <section id="packages-section" className="py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Official Coaching Tiers</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Coaching Packages <br />
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Priced in Ethiopian Birr (ETB)
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No hidden fees, no generic PDFs. Direct coaching with ISSA Certified Trainer Dawit Solomon. Simple registration with direct coach onboarding via phone or Telegram.
          </p>

          {/* Controls Container: Category Filter & Duration Toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Category Filter */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Plans ({packages.length})
              </button>
              <button
                onClick={() => setActiveCategory('online')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'online'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🌐 Online Coaching
              </button>
              <button
                onClick={() => setActiveCategory('in_person')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'in_person'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🏋️ 1 to 1 In-Person
              </button>
            </div>

            {/* Commitment Duration Toggle */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'quarterly'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <span>12-Week Protocol</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-[10px] text-white font-extrabold">Save 10%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {filteredPackages.map((pkg) => {
            const isPopular = pkg.popular;
            const price = billingCycle === 'quarterly'
              ? Math.round((pkg.priceETB * 3) * 0.9)
              : pkg.priceETB;
            const periodLabel = billingCycle === 'quarterly' ? 'total / 12 weeks' : pkg.period;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-blue-500 bg-linear-to-b from-blue-900/10 via-slate-900/40 to-slate-950 dark:from-blue-950/40 dark:via-[#0A0F1D] dark:to-[#060913] shadow-2xl shadow-blue-600/20 lg:-translate-y-3'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1C] hover:border-slate-400 dark:hover:border-slate-700 shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md ${
                    isPopular
                      ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-blue-500/40'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}>
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-heading font-black text-2xl text-slate-900 dark:text-white">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{pkg.tagline}</p>
                  </div>

                  {/* Price Tag in ETB */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        {formatETB(price)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block mt-1">
                      {periodLabel}
                    </span>
                    {billingCycle === 'quarterly' && (
                      <span className="text-[11px] text-emerald-500 font-semibold block mt-0.5">
                        ~{formatETB(Math.round(price / 3))} per month effective rate
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Everything Included:</p>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-500 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For & CTA */}
                <div>
                  <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 mb-6 text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-slate-200">Ideal for: </span>
                    {pkg.bestFor}
                  </div>

                  <button
                    onClick={() => openCheckout(pkg)}
                    id={`order-package-${pkg.id}`}
                    className={`w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-cyan-400 dark:hover:text-black shadow-md'
                    }`}
                  >
                    <span>Order Package / Register</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Streamlined Registration Badges Banner */}
        <div className="rounded-2xl border border-cyan-500/30 bg-linear-to-r from-blue-950/40 via-[#070E24] to-cyan-950/40 p-6 text-center shadow-lg">
          <p className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Hassle-Free Client Registration Process</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">✓</span>
              <span>100% Free Initial Registration</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xs">📞</span>
              <span>1-on-1 Consultation With Coach Dawit</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <span>Customized Split & Habesha Nutrition</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
