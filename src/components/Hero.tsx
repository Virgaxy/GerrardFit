import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseVideoLink } from '../utils/mediaUtils';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  CheckCircle2,
  Zap,
  TrendingUp,
  Calculator,
  X
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { openCheckout, setActivePage, mediaSettings } = useApp();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const videoInfo = parseVideoLink(mediaSettings.videoUrl);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Elite Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>ISSA Certified Personal Trainer • License #40006935</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-slate-900 dark:text-white">
              Transform Your <br />
              <span className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Physique & Mindset
              </span> <br />
              with GerrardFit
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed">
              Ethiopia’s premier science-based personal training platform led by Coach <strong>Dawit Solomon</strong>.
              Custom periodized lifting routines, tailored Ethiopian nutrition, and high-frequency coach accountability designed for permanent results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => openCheckout()}
                id="hero-start-journey-cta"
                className="px-8 py-4 rounded-xl font-heading font-black text-sm uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActivePage('packages');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="hero-explore-packages-cta"
                className="px-7 py-4 rounded-xl font-heading font-bold text-sm uppercase tracking-wider border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Packages (in ETB)</span>
              </button>

              {/* Video Teaser Button */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-4 py-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-blue-500 ml-0.5" />
                </div>
                <span>Watch Story</span>
              </button>

              {/* Instant BMI Calculator Anchor */}
              <a
                href="#calculator"
                className="px-4 py-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator className="w-4 h-4 text-cyan-500" />
                <span>BMI & Fat % Calculator</span>
              </a>
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Habesha-friendly meal plans (Injera & Shiro included)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero-hassle intake & direct coach consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>24/7 direct coach feedback & check-ins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>In-person in Ethiopia or 100% Online</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card with Dawit Solomon + Certificate teaser */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-linear-to-r from-blue-600 via-cyan-400 to-blue-700 opacity-30 blur-lg group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0F1D] shadow-2xl">
                
                {/* Hero Image */}
                <div className="relative h-96 sm:h-[440px] w-full overflow-hidden bg-slate-900">
                  <img
                    src={mediaSettings.coachPhotoUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"}
                    alt="GerrardFit Coach Dawit Solomon Athletic Training"
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#060913] via-[#060913]/30 to-transparent"></div>

                  {/* Top floating badge */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-black/60 border border-white/10 px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Verified ISSA Trainer</span>
                  </div>

                  {/* Floating Telegram direct badge */}
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-blue-600/80 border border-blue-400/30 px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5">
                    <span>⚡ Direct VIP Coaching</span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase font-bold tracking-widest text-cyan-400">Head Coach & Founder</p>
                        <h3 className="font-heading text-2xl font-black">Dawit Solomon (Gerrard)</h3>
                        <p className="text-xs text-slate-300">ISSA CPT • Specialized in Body Recomposition</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                          Ethiopia
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Micro-Stats Ribbon */}
                <div className="p-4 grid grid-cols-3 gap-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070B16]">
                  <div className="text-center p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <p className="font-heading font-black text-xl text-blue-600 dark:text-cyan-400 leading-none">100+</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Trained</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <p className="font-heading font-black text-xl text-blue-600 dark:text-cyan-400 leading-none">98%</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Success Rate</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <p className="font-heading font-black text-xl text-emerald-500 leading-none">12 Wk</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Avg Timeline</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Global Stats Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">100+</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">Clients Transformed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl font-black text-blue-600 dark:text-cyan-400">ISSA #40006935</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">Verified Credential</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">1,000 ETB+</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">Plans Starting From</span>
          </div>
        </div>
      </div>

      {/* Video Testimonial Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0B1120] border border-slate-700 p-6 text-white shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 pr-10">
              <span className="px-2.5 py-1 rounded bg-blue-500/20 text-cyan-400 text-xs font-bold uppercase shrink-0">
                Featured Video
              </span>
              <h3 className="font-heading text-lg font-bold truncate">
                {mediaSettings.videoTitle || '12-Week Transformation Journey with Dawit Solomon'}
              </h3>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              {videoInfo.isEmbed && videoInfo.embedUrl ? (
                <iframe
                  src={videoInfo.embedUrl}
                  title={mediaSettings.videoTitle || 'GerrardFit Video'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : videoInfo.directUrl ? (
                <video
                  src={videoInfo.directUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <div className="text-center p-6">
                  <p className="text-slate-400 text-sm">No video link configured yet.</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-slate-400">Ready to write your own transformation story?</p>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  openCheckout();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase cursor-pointer"
              >
                Join GerrardFit Today
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
