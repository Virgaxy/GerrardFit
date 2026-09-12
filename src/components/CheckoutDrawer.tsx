import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PackageTier, ClientOrder } from '../types';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Instagram,
  Send,
  Dumbbell,
  Clock,
  Target,
  ShieldCheck,
  UserCheck,
  Check
} from 'lucide-react';

export const CheckoutDrawer: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    selectedPackage,
    currentUser,
    addOrder,
    packages
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activePkg, setActivePkg] = useState<PackageTier>(() => selectedPackage || packages[1] || packages[0]);

  // Form states
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('+251 9');
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [instagramUsername, setInstagramUsername] = useState<string>('');
  
  // Goals & Assessment
  const [fitnessGoal, setFitnessGoal] = useState<string>('Fat Loss & Lean Muscle Hypertrophy');
  const [injuriesOrNotes, setInjuriesOrNotes] = useState<string>('');
  const [preferredWorkoutTime, setPreferredWorkoutTime] = useState<string>('Morning (6:00 AM - 9:00 AM)');
  const [workoutLocation, setWorkoutLocation] = useState<'Gym in Ethiopia' | 'Home Workout' | 'Hybrid'>('Gym in Ethiopia');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ClientOrder | null>(null);

  // Auto-fill if user logged in or package selected changed
  useEffect(() => {
    if (selectedPackage) {
      const latest = packages.find(p => p.id === selectedPackage.id) || selectedPackage;
      setActivePkg(latest);
    }
  }, [selectedPackage, packages]);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || '');
      setEmail(currentUser.email || '');
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.telegram) setTelegramUsername(currentUser.telegram);
    }
  }, [currentUser]);

  if (!isCheckoutOpen) return null;

  const handleSubmitRegistration = () => {
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your Full Name and Phone Number to complete registration.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = addOrder({
        clientName: fullName || 'Athlete Client',
        email: email || 'athlete@gerrardfit.com',
        phone: phone,
        telegramUsername: telegramUsername ? (telegramUsername.startsWith('@') || telegramUsername.startsWith('+') ? telegramUsername : `@${telegramUsername}`) : phone,
        instagramUsername: instagramUsername ? (instagramUsername.startsWith('@') ? instagramUsername : `@${instagramUsername}`) : undefined,
        packageId: activePkg.id,
        packageName: activePkg.name,
        priceETB: activePkg.priceETB,
        fitnessGoals: `${fitnessGoal} • Location: ${workoutLocation}`,
        injuriesOrNotes: injuriesOrNotes || 'None reported',
        preferredWorkoutTime: preferredWorkoutTime,
        paymentMethod: 'Direct Registration',
        paymentStatus: 'Registration Received'
      });

      setConfirmedOrder(order);
      setIsSubmitting(false);
      setCurrentStep(3);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCheckout}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#070C1E] text-white shadow-2xl border-l border-cyan-500/30 flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#070C1E]/95 backdrop-blur-xl z-20">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400">
                  GerrardFit Athlete Registration
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Instant Intake
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black mt-1 text-white">
                {currentStep === 3 ? 'Registration Confirmed!' : `Register for ${activePkg.name}`}
              </h3>
            </div>

            <button
              onClick={closeCheckout}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          {currentStep < 3 && (
            <div className="px-6 py-3.5 border-b border-slate-800 bg-[#040815] flex items-center justify-between text-xs font-bold">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-cyan-400' : 'text-slate-500'}`}>
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-black border border-cyan-500/40 shadow-xs">
                  1
                </span>
                <span>Client & Contact Info</span>
              </div>
              <span className="text-slate-700">───</span>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-cyan-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                  currentStep >= 2 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                  2
                </span>
                <span>Fitness Goals & Routine</span>
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8 flex-1 space-y-6">

            {/* STEP 1: Personal & Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Colorful Selected Package Banner */}
                <div className="relative overflow-hidden rounded-2xl p-5 border border-cyan-500/40 bg-linear-to-r from-blue-950/80 via-[#0B1536] to-cyan-950/70 shadow-xl shadow-cyan-950/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {activePkg.category === 'in_person' ? '🏋️ 1 to 1 In-Person' : '🌐 Online Coaching'}
                        </span>
                        {activePkg.badge && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                            {activePkg.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-black text-xl text-white mt-1.5">{activePkg.name}</h4>
                      <p className="text-xs text-slate-300 mt-0.5 max-w-sm">{activePkg.tagline}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="font-heading font-black text-2xl text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400">
                        {new Intl.NumberFormat('en-US').format(activePkg.priceETB)} ETB
                      </span>
                      <p className="text-[11px] text-cyan-400/80 font-bold">{activePkg.period}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Check className="w-3.5 h-3.5" /> No upfront charge to register
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                      <UserCheck className="w-3.5 h-3.5" /> Coach Dawit 1-on-1 Consultation
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-black text-lg text-white">1. Client Contact Details</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Coach Dawit directly reaches out to onboard you, review your goals, and schedule your sessions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dawit Haile"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0900450154"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-mono"
                      required
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Coach Dawit will call or contact this number</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                      Telegram Username (Optional)
                    </label>
                    <input
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder="@your_telegram_username"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                    <span className="text-[10px] text-emerald-400 mt-1 block">Direct athlete Telegram consultation line</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                    Instagram Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={instagramUsername}
                    onChange={(e) => setInstagramUsername(e.target.value)}
                    placeholder="@your_instagram_username"
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">For tag updates & workout form reviews</span>
                </div>
              </div>
            )}

            {/* STEP 2: Goals, Routines & Assessment */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h4 className="font-heading font-black text-lg text-white">2. Fitness Goals & Assessment</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enables Coach Dawit to tailor biomechanics, Habesha nutrition macros, and training volume to you.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5">
                    Primary Physique Goal *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Fat Loss & High Definition', desc: 'Targeted deficit + metabolic conditioning' },
                      { title: 'Lean Muscle Hypertrophy', desc: 'Progressive overload for maximum muscle mass' },
                      { title: 'Athletic Body Recomposition', desc: 'Burn fat and build dense muscle simultaneously' },
                      { title: 'Strength, Mobility & Posture', desc: 'Fix desk-job imbalances & joint resilience' }
                    ].map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setFitnessGoal(item.title)}
                        className={`p-3.5 rounded-xl text-left cursor-pointer transition-all border ${
                          fitnessGoal === item.title
                            ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-md shadow-cyan-500/20'
                            : 'border-slate-700/80 bg-[#0A1128] hover:border-slate-500 text-slate-300'
                        }`}
                      >
                        <p className="font-bold text-xs text-white flex items-center justify-between">
                          <span>{item.title}</span>
                          {fitnessGoal === item.title && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          )}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                    Training Location & Setup *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['Gym in Ethiopia', 'Home Workout', 'Hybrid'] as const).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setWorkoutLocation(loc)}
                        className={`p-3 rounded-xl text-xs font-bold border text-center cursor-pointer transition-all ${
                          workoutLocation === loc
                            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-700 bg-[#0A1128] text-slate-400 hover:text-white'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                    Preferred Workout Time Slot
                  </label>
                  <select
                    value={preferredWorkoutTime}
                    onChange={(e) => setPreferredWorkoutTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white text-sm focus:outline-hidden focus:border-cyan-400"
                  >
                    <option>Morning (6:00 AM - 9:00 AM)</option>
                    <option>Mid-day / Lunchtime (12:00 PM - 2:00 PM)</option>
                    <option>Evening (5:30 PM - 8:30 PM)</option>
                    <option>Flexible / Weekend Schedule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                    Injuries, Medical Notes or Fasting Preferences (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={injuriesOrNotes}
                    onChange={(e) => setInjuriesOrNotes(e.target.value)}
                    placeholder="e.g. Lower back tightness from desk work, previous knee injury, Habesha fasting seasons (Tsom) considerations..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0A1128] text-white text-sm placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
                  ></textarea>
                </div>

                {/* Direct Registration Callout */}
                <div className="p-4 rounded-2xl bg-linear-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 border border-cyan-500/30 flex items-start gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Direct Coach Intake • Zero Online Payment Required</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Your registration is submitted directly to Coach Dawit's client queue. You will receive an onboarding briefing call or SMS message within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Confirmed Registration Screen */}
            {currentStep === 3 && confirmedOrder && (
              <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-400">
                <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/40 ring-4 ring-cyan-400/20">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Registration Successfully Logged
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mt-3">
                    Welcome to the GerrardFit Family!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                    Congratulations <strong>{confirmedOrder.clientName}</strong>, your intake registration for <strong>{confirmedOrder.packageName}</strong> has been transmitted directly to Coach Dawit Solomon.
                  </p>
                </div>

                {/* Confirmed Intake Summary Card */}
                <div className="p-5 rounded-2xl bg-[#0A1128] border border-cyan-500/30 text-left space-y-3 text-xs max-w-md mx-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Athlete Reference ID:</span>
                    <span className="font-mono font-bold text-cyan-400">{confirmedOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Selected Plan:</span>
                    <span className="font-bold text-white">{confirmedOrder.packageName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Monthly Plan Rate:</span>
                    <span className="font-mono font-bold text-emerald-400">{new Intl.NumberFormat('en-US').format(confirmedOrder.priceETB)} ETB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Registered Phone:</span>
                    <span className="font-mono font-bold text-white">{confirmedOrder.phone}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded">Intake Confirmed</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 max-w-md mx-auto pt-2">
                  <a
                    href="tel:0900450154"
                    className="w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Coach Dawit Directly (0900450154)</span>
                  </a>

                  <a
                    href="https://www.instagram.com/p/DbTrB4yOKqK/?stkn=MWFjNWtlcnc5YzA5NQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Connect on Instagram (@gerrardfit)</span>
                  </a>

                  <button
                    onClick={closeCheckout}
                    className="w-full py-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    Close & Return to Platform
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls (Steps 1 & 2) */}
          {currentStep < 3 && (
            <div className="p-6 border-t border-slate-800 bg-[#070C1E]/95 backdrop-blur-xl flex items-center justify-between sticky bottom-0 z-20">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2 border border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!fullName.trim() || !phone.trim()) {
                      alert('Please provide your Full Name and Phone Number to continue.');
                      return;
                    }
                    setCurrentStep(2);
                  }}
                  className="px-7 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-500/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Next: Goals & Routine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitRegistration}
                  className="px-8 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-cyan-400 via-blue-600 to-cyan-500 hover:opacity-95 text-white shadow-xl shadow-cyan-500/40 transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Intake Registration...</span>
                  ) : (
                    <>
                      <span>Complete Athlete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
