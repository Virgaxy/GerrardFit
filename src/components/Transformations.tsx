import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA, VIDEO_TESTIMONIALS, TIMELINE_STEPS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  Flame,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Star,
  Play,
  CheckCircle2,
  Calendar,
  Sparkles,
  Sliders
} from 'lucide-react';

export const Transformations: React.FC = () => {
  const { openCheckout } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTransformationIndex, setActiveTransformationIndex] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  const categories = ['All', 'Fat Loss', 'Muscle Hypertrophy', 'Athletic Recomp'];

  const filteredTransformations = selectedCategory === 'All'
    ? TRANSFORMATIONS_DATA
    : TRANSFORMATIONS_DATA.filter(t => t.category === selectedCategory);

  const activeItem = TRANSFORMATIONS_DATA[activeTransformationIndex] || TRANSFORMATIONS_DATA[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  return (
    <section id="transformations-section" className="py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Proven Body & Mind Recomposition</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Real Transformations. <br />
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Zero Generic Templates.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Slide through real client outcomes trained in Ethiopia and online. Every protocol is calibrated to the client's biomechanics, lifestyle, and Ethiopian culinary preferences.
          </p>
        </div>

        {/* INTERACTIVE BEFORE/AFTER SLIDER SHOWCASE */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1C] p-6 sm:p-8 lg:p-10 shadow-2xl mb-20">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Interactive Visual Proof</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {activeItem.clientName} ({activeItem.age} yrs) — {activeItem.category}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Completed {activeItem.durationWeeks}-Week GerrardFit Transformation Protocol
              </p>
            </div>

            {/* Quick Switcher Between Featured Transformations */}
            <div className="flex items-center gap-2 flex-wrap">
              {TRANSFORMATIONS_DATA.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTransformationIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTransformationIndex === idx
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.clientName} ({item.category.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Draggable Comparison Slider Canvas */}
            <div className="lg:col-span-7">
              <div
                className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-300 dark:border-slate-700 shadow-inner group"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                id="before-after-slider-container"
              >
                {/* AFTER IMAGE (Base Layer) */}
                <img
                  src={activeItem.afterImage}
                  alt="Transformation After"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
                
                {/* AFTER Label */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg bg-blue-600/90 text-white font-heading font-black text-xs uppercase tracking-wider backdrop-blur-md shadow-md">
                  AFTER ({activeItem.weightAfter} • {activeItem.bodyFatAfter})
                </div>

                {/* BEFORE IMAGE (Clipped Layer) */}
                <div
                  className="absolute inset-0 overflow-hidden select-none pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeItem.beforeImage}
                    alt="Transformation Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none select-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* BEFORE Label */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-black/80 text-slate-200 font-heading font-black text-xs uppercase tracking-wider backdrop-blur-md shadow-md">
                    BEFORE ({activeItem.weightBefore} • {activeItem.bodyFatBefore})
                  </div>
                </div>

                {/* Slider Divider Bar */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white dark:bg-cyan-400 shadow-lg z-30 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Handle Icon */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-xl shadow-blue-600/50">
                    <Sliders className="w-4 h-4 transform rotate-90" />
                  </div>
                </div>

                {/* Micro instruction hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white font-medium pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  ← Drag or swipe slider to compare Before & After →
                </div>
              </div>
            </div>

            {/* Transformation Dossier / Results Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      <span>Body Weight</span>
                      <TrendingDown className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm line-through text-slate-400">{activeItem.weightBefore}</span>
                      <span className="font-heading text-2xl font-black text-blue-600 dark:text-cyan-400">{activeItem.weightAfter}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      <span>Body Fat</span>
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm line-through text-slate-400">{activeItem.bodyFatBefore}</span>
                      <span className="font-heading text-2xl font-black text-emerald-500">{activeItem.bodyFatAfter}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Key Wins & PRs</h4>
                  <ul className="space-y-2">
                    {activeItem.keyWins.map((win, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Quote Callout */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 mb-6">
                  <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300">
                    "{activeItem.quote}"
                  </p>
                  <p className="text-xs font-bold text-blue-600 dark:text-cyan-400 mt-2">— {activeItem.clientName}</p>
                </div>
              </div>

              <button
                onClick={() => openCheckout()}
                className="w-full py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get a Similar 12-Week Transformation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 12-WEEK ROADMAP TIMELINE */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">The GerrardFit Protocol</span>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Your 12-Week Transformation Journey
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              A structured, phase-by-phase roadmap engineered for peak muscle retention, fat oxidation, and metabolic resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="relative rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0F1D] flex flex-col justify-between hover:border-blue-500/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-3xl text-blue-500/30 dark:text-cyan-400/20 group-hover:text-blue-500 transition-colors">
                      {step.step}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
                      {step.duration}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Deliverable</span>
                  <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">{step.deliverable}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIDEO TESTIMONIALS OVERLAY GRID */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Live Feedback</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Client Video Testimonials
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified reviews from professionals and athletes across Ethiopia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0F1D] cursor-pointer hover:border-blue-500/60 transition-all shadow-md hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={item.thumbnail}
                    alt={item.clientName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 text-[11px] font-bold text-white">
                    {item.videoDuration}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">{item.occupation} • {item.achievement}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-3 line-clamp-2">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0A0F1D] border border-slate-700 p-6 text-white shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="font-heading text-xl font-bold mb-1">{selectedVideo.clientName} ({selectedVideo.occupation})</h3>
            <p className="text-xs text-cyan-400 mb-4">{selectedVideo.achievement}</p>
            
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={selectedVideo.thumbnail}
                alt=""
                className="w-full h-full object-cover filter brightness-60"
              />
              <div className="absolute text-center p-6">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <p className="text-sm italic max-w-md">"{selectedVideo.quote}"</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-400">Authentic Client Testimonial • GerrardFit</span>
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  openCheckout();
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase cursor-pointer hover:bg-blue-500"
              >
                Start My Transformation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
