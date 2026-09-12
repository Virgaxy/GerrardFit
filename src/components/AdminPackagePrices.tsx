import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageTier } from '../types';
import { PACKAGES_DATA } from '../data/mockData';
import {
  Tag,
  Flame,
  Check,
  CheckCircle2,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Save,
  Percent,
  Calendar,
  Layers,
  TrendingUp,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminPackagePrices: React.FC = () => {
  const {
    packages,
    updatePackagePrice,
    updatePackage,
    addPackage,
    deletePackage,
    resetPackages,
    showNotification
  } = useApp();

  // Local draft prices for seamless editing before saving or live instant update
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [draftPrices, setDraftPrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    packages.forEach(p => {
      initial[p.id] = p.priceETB;
    });
    return initial;
  });

  // Modal for adding a brand new tier
  const [isNewTierModalOpen, setIsNewTierModalOpen] = useState(false);
  const [newTierName, setNewTierName] = useState('');
  const [newTierTagline, setNewTierTagline] = useState('');
  const [newTierPrice, setNewTierPrice] = useState(4500);
  const [newTierPeriod, setNewTierPeriod] = useState('per month');
  const [newTierCategory, setNewTierCategory] = useState<'online' | 'in_person' | 'hybrid'>('online');
  const [newTierBadge, setNewTierBadge] = useState('');
  const [newTierDescription, setNewTierDescription] = useState('');
  const [newTierFeatures, setNewTierFeatures] = useState('Custom Training Split\nMacro Meal Guide\nWeekly Check-in Call');

  // Ethiopian Birr formatter helper
  const formatETB = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ETB';
  };

  const handlePriceInputChange = (pkgId: string, val: string) => {
    const numeric = parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
    setDraftPrices(prev => ({ ...prev, [pkgId]: numeric }));
  };

  const handleQuickAdjust = (pkgId: string, delta: number) => {
    setDraftPrices(prev => {
      const current = prev[pkgId] ?? (packages.find(p => p.id === pkgId)?.priceETB || 0);
      const next = Math.max(0, current + delta);
      return { ...prev, [pkgId]: next };
    });
  };

  const handleSetPresetPrice = (pkgId: string, presetAmount: number) => {
    setDraftPrices(prev => ({ ...prev, [pkgId]: presetAmount }));
  };

  const handleSavePrice = (pkg: PackageTier) => {
    const newPrice = draftPrices[pkg.id] ?? pkg.priceETB;
    updatePackagePrice(pkg.id, newPrice);
    setEditingPkgId(null);
  };

  const handleBatchAdjust = (percentage: number) => {
    const factor = 1 + percentage / 100;
    packages.forEach(pkg => {
      const newPrice = Math.max(100, Math.round((pkg.priceETB * factor) / 100) * 100);
      updatePackagePrice(pkg.id, newPrice);
      setDraftPrices(prev => ({ ...prev, [pkg.id]: newPrice }));
    });
    showNotification(`Adjusted all package prices by ${percentage > 0 ? '+' : ''}${percentage}%.`, 'success');
  };

  const handleBatchFixedAdjust = (amount: number) => {
    packages.forEach(pkg => {
      const newPrice = Math.max(100, pkg.priceETB + amount);
      updatePackagePrice(pkg.id, newPrice);
      setDraftPrices(prev => ({ ...prev, [pkg.id]: newPrice }));
    });
    showNotification(`Adjusted all package prices by ${amount > 0 ? '+' : ''}${amount} ETB.`, 'success');
  };

  const handleCreateNewTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTierName.trim()) {
      showNotification('Please enter a name for the coaching tier', 'error');
      return;
    }

    const id = newTierName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `tier-${Date.now()}`;
    const featuresList = newTierFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const newPkg: PackageTier = {
      id,
      name: newTierName.trim(),
      tagline: newTierTagline.trim() || 'Personalized coaching by Dawit Solomon',
      priceETB: Math.max(0, newTierPrice),
      period: newTierPeriod.trim() || 'per month',
      category: newTierCategory,
      badge: newTierBadge.trim() || undefined,
      description: newTierDescription.trim() || 'Comprehensive coaching plan with nutrition and progressive biomechanics.',
      features: featuresList.length > 0 ? featuresList : ['Personalized Training Split', 'Nutrition Calibration'],
      bestFor: 'Clients seeking tailored results'
    };

    addPackage(newPkg);
    setDraftPrices(prev => ({ ...prev, [newPkg.id]: newPkg.priceETB }));
    setIsNewTierModalOpen(false);
    // Reset form
    setNewTierName('');
    setNewTierTagline('');
    setNewTierPrice(4500);
    setNewTierBadge('');
    setNewTierDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Control Center */}
      <div className="rounded-3xl border border-cyan-500/30 bg-linear-to-r from-[#070E28] via-[#091438] to-[#070E28] p-6 shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Coaching Fees & Package Pricing Controller</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white flex items-center gap-3">
              <span>Change Package Prices</span>
              <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live in Ethiopian Birr (ETB)
              </span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Instantly adjust your training fees. Any price modifications you save here immediately update the public packages page, the intake checkout drawer, and client recommendation calculators.
            </p>
          </div>

          {/* Quick Batch Controls & Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsNewTierModalOpen(true)}
              id="admin-add-new-package-btn"
              className="px-4 py-2.5 rounded-xl bg-linear-to-r from-blue-600 via-cyan-500 to-blue-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Package</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Restore all package prices back to original default fees?')) {
                  resetPackages();
                  const defaults: Record<string, number> = {};
                  PACKAGES_DATA.forEach(p => {
                    defaults[p.id] = p.priceETB;
                  });
                  setDraftPrices(defaults);
                }
              }}
              id="admin-reset-prices-btn"
              title="Reset all prices to factory defaults"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Global Batch Adjustment Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">Quick Batch Inflation & Promo Tools:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBatchAdjust(10)}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold transition-colors cursor-pointer"
            >
              +10% All Plans
            </button>
            <button
              onClick={() => handleBatchAdjust(-10)}
              className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-mono text-[11px] font-bold transition-colors cursor-pointer"
            >
              -10% Discount All
            </button>
            <button
              onClick={() => handleBatchFixedAdjust(500)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold transition-colors cursor-pointer"
            >
              +500 ETB All
            </button>
            <button
              onClick={() => handleBatchFixedAdjust(-500)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold transition-colors cursor-pointer"
            >
              -500 ETB All
            </button>
          </div>
        </div>
      </div>

      {/* Package Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map(pkg => {
          const currentDraft = draftPrices[pkg.id] ?? pkg.priceETB;
          const isDirty = currentDraft !== pkg.priceETB;
          const isEditing = editingPkgId === pkg.id;

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 transition-all duration-200 border ${
                isDirty
                  ? 'bg-[#0A1333] border-cyan-400 shadow-xl shadow-cyan-950/50'
                  : 'bg-[#060B1E] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-black text-lg text-white">
                      {pkg.name}
                    </span>
                    {pkg.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {pkg.badge}
                      </span>
                    )}
                    {pkg.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-600/30 text-blue-300 border border-blue-500/40 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-blue-400" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{pkg.tagline}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Current Live Price</div>
                  <div className="text-xl font-black font-heading text-cyan-400">
                    {formatETB(pkg.priceETB)}
                  </div>
                  <div className="text-[11px] text-slate-400">{pkg.period}</div>
                </div>
              </div>

              {/* Price Editor Body */}
              <div className="py-5 space-y-4">
                {/* ETB Price Input Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Price in Ethiopian Birr (ETB)</span>
                    </label>
                    {isDirty && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                        Unsaved Changes
                      </span>
                    )}
                  </div>

                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400 font-mono font-bold text-sm">
                      ETB
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={currentDraft}
                      onChange={e => handlePriceInputChange(pkg.id, e.target.value)}
                      id={`price-input-${pkg.id}`}
                      className="w-full pl-16 pr-24 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-lg font-black font-mono text-white outline-hidden transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleQuickAdjust(pkg.id, -500)}
                        title="Decrease by 500 ETB"
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold font-mono transition-colors cursor-pointer"
                      >
                        -500
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAdjust(pkg.id, 500)}
                        title="Increase by 500 ETB"
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold font-mono transition-colors cursor-pointer"
                      >
                        +500
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Price Preset Chips */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                    Fast Price Presets (1-Tap):
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[1000, 2000, 3000, 4000, 5000, 5500, 7000, 8500].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleSetPresetPrice(pkg.id, amount)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          currentDraft === amount
                            ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {new Intl.NumberFormat('en-US').format(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period & Popular Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>Billing Period</span>
                    </label>
                    <select
                      value={pkg.period}
                      onChange={e => updatePackage(pkg.id, { period: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-white outline-hidden cursor-pointer"
                    >
                      <option value="per month">per month</option>
                      <option value="per 4 weeks">per 4 weeks</option>
                      <option value="per 12 weeks">per 12 weeks</option>
                      <option value="per session">per session</option>
                      <option value="one-time payment">one-time payment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Badge / Tag Label</span>
                    </label>
                    <input
                      type="text"
                      value={pkg.badge || ''}
                      onChange={e => updatePackage(pkg.id, { badge: e.target.value })}
                      placeholder="e.g. Ramadan Special"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-white placeholder-slate-500 outline-hidden"
                    />
                  </div>
                </div>

                {/* Popular Tier Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Flame className={`w-4 h-4 ${pkg.popular ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-semibold text-slate-300">
                      Feature as "Most Popular" on Website
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updatePackage(pkg.id, { popular: !pkg.popular })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      pkg.popular ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        pkg.popular ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Save Price Button */}
                  <button
                    type="button"
                    onClick={() => handleSavePrice(pkg)}
                    id={`save-price-btn-${pkg.id}`}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      isDirty
                        ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:opacity-95'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isDirty ? 'Save New Price' : 'Price Up-to-Date'}</span>
                  </button>

                  {/* Cancel / Revert Changes */}
                  {isDirty && (
                    <button
                      type="button"
                      onClick={() => setDraftPrices(prev => ({ ...prev, [pkg.id]: pkg.priceETB }))}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Revert
                    </button>
                  )}
                </div>

                {/* Delete Plan (if custom plan) */}
                {packages.length > 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove "${pkg.name}" from public tiers?`)) {
                        deletePackage(pkg.id);
                      }
                    }}
                    title="Delete package"
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD NEW CUSTOM PACKAGE TIER */}
      {isNewTierModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsNewTierModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#070D1E] border border-cyan-500/30 text-white p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-white">Create New Coaching Tier</h3>
                  <p className="text-xs text-slate-400">Add a custom package with custom pricing in ETB</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewTierModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewTier} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTierName}
                  onChange={e => setNewTierName(e.target.value)}
                  placeholder="e.g. Student Strength Blueprint"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-semibold text-white placeholder-slate-500 outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Price in ETB *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-mono font-bold text-cyan-400">
                      ETB
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newTierPrice}
                      onChange={e => setNewTierPrice(parseInt(e.target.value, 10) || 0)}
                      className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-mono font-bold text-white outline-hidden focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Billing Period
                  </label>
                  <input
                    type="text"
                    value={newTierPeriod}
                    onChange={e => setNewTierPeriod(e.target.value)}
                    placeholder="per month"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-semibold text-white outline-hidden focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newTierCategory}
                    onChange={e => setNewTierCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-semibold text-white outline-hidden focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="online">Online Remote</option>
                    <option value="in_person">In-Person (Ethiopia)</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Badge Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={newTierBadge}
                    onChange={e => setNewTierBadge(e.target.value)}
                    placeholder="e.g. Student Special"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 outline-hidden focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Catchy Tagline
                </label>
                <input
                  type="text"
                  value={newTierTagline}
                  onChange={e => setNewTierTagline(e.target.value)}
                  placeholder="e.g. High intensity training calibrated for academic routines"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Included Features (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={newTierFeatures}
                  onChange={e => setNewTierFeatures(e.target.value)}
                  placeholder="Custom 4-Week Split&#10;Habesha Meal Plan&#10;Weekly Video Check-In"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-white placeholder-slate-500 outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTierModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 via-cyan-500 to-blue-500 hover:opacity-95 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/30 cursor-pointer"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
