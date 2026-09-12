import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PackageTier } from '../types';
import {
  Calculator,
  Activity,
  Zap,
  ArrowRight,
  TrendingDown,
  Flame,
  Dumbbell,
  CheckCircle2,
  RefreshCw,
  Scale,
  Sparkles,
  Info
} from 'lucide-react';

export const BMIWidget: React.FC = () => {
  const { openCheckout, packages } = useApp();

  // Unit System
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Basic inputs
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(27);
  
  // Metric values
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(78);
  
  // Imperial values
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(172);

  // Optional circumference for Navy Body Fat calculation
  const [useNavyMethod, setUseNavyMethod] = useState<boolean>(false);
  const [waistCm, setWaistCm] = useState<number>(84);
  const [neckCm, setNeckCm] = useState<number>(39);
  const [hipCm, setHipCm] = useState<number>(98); // only for females

  // Activity level for TDEE calculation
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // 1.2 = Sedentary, 1.375 = Light, 1.55 = Moderate, 1.725 = Very Active

  // Synchronize metric & imperial values on unit toggle
  const handleUnitToggle = (system: 'metric' | 'imperial') => {
    if (system === 'imperial' && unitSystem === 'metric') {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(totalInches % 12);
      setWeightLbs(Math.round(weightKg * 2.20462));
    } else if (system === 'metric' && unitSystem === 'imperial') {
      const totalCm = Math.round(((heightFt * 12) + heightIn) * 2.54);
      setHeightCm(totalCm);
      setWeightKg(Math.round(weightLbs / 2.20462));
    }
    setUnitSystem(system);
  };

  // Calculations
  const effectiveHeightM = useMemo(() => {
    if (unitSystem === 'metric') {
      return heightCm / 100;
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      return (totalInches * 2.54) / 100;
    }
  }, [unitSystem, heightCm, heightFt, heightIn]);

  const effectiveWeightKg = useMemo(() => {
    if (unitSystem === 'metric') {
      return weightKg;
    } else {
      return weightLbs / 2.20462;
    }
  }, [unitSystem, weightKg, weightLbs]);

  // BMI Formula: weight (kg) / [height (m)]^2
  const bmi = useMemo(() => {
    if (!effectiveHeightM || effectiveHeightM <= 0) return 22.0;
    const val = effectiveWeightKg / (effectiveHeightM * effectiveHeightM);
    return Math.round(val * 10) / 10;
  }, [effectiveWeightKg, effectiveHeightM]);

  // Body Fat % estimation
  const bodyFat = useMemo(() => {
    if (useNavyMethod) {
      // US Navy tape formula
      const heightInches = effectiveHeightM * 39.3701;
      const waistInches = waistCm / 2.54;
      const neckInches = neckCm / 2.54;
      
      if (gender === 'male') {
        if (waistInches <= neckInches) return 12;
        const bf = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
        return Math.min(Math.max(Math.round(bf * 10) / 10, 4), 50);
      } else {
        const hipInches = hipCm / 2.54;
        if ((waistInches + hipInches) <= neckInches) return 20;
        const bf = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
        return Math.min(Math.max(Math.round(bf * 10) / 10, 8), 55);
      }
    } else {
      // Deurenberg Adult Body Fat Formula: (1.20 * BMI) + (0.23 * Age) - (10.8 * sex) - 5.4 where sex=1 for male, 0 for female
      const sexFactor = gender === 'male' ? 1 : 0;
      const bf = (1.20 * bmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4;
      return Math.min(Math.max(Math.round(bf * 10) / 10, 5), 50);
    }
  }, [useNavyMethod, gender, waistCm, neckCm, hipCm, effectiveHeightM, bmi, age]);

  // Lean mass and fat mass
  const fatMassKg = useMemo(() => {
    return Math.round((effectiveWeightKg * (bodyFat / 100)) * 10) / 10;
  }, [effectiveWeightKg, bodyFat]);

  const leanMassKg = useMemo(() => {
    return Math.round((effectiveWeightKg - fatMassKg) * 10) / 10;
  }, [effectiveWeightKg, fatMassKg]);

  // BMR (Mifflin-St Jeor equation)
  const bmr = useMemo(() => {
    const s = gender === 'male' ? 5 : -161;
    const val = (10 * effectiveWeightKg) + (6.25 * (effectiveHeightM * 100)) - (5 * age) + s;
    return Math.round(val);
  }, [gender, effectiveWeightKg, effectiveHeightM, age]);

  // TDEE (Total Daily Energy Expenditure)
  const tdee = useMemo(() => {
    return Math.round(bmr * activityLevel);
  }, [bmr, activityLevel]);

  // Daily Protein target (g): 2.0g per kg of lean body mass
  const dailyProteinGrams = useMemo(() => {
    return Math.round(leanMassKg * 2.1);
  }, [leanMassKg]);

  // BMI Category determination
  const bmiCategory = useMemo(() => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-sky-400', bg: 'bg-sky-500', range: '< 18.5', percentage: 15 };
    if (bmi < 25.0) return { label: 'Normal / Healthy', color: 'text-emerald-400', bg: 'bg-emerald-500', range: '18.5 – 24.9', percentage: 45 };
    if (bmi < 30.0) return { label: 'Overweight', color: 'text-amber-400', bg: 'bg-amber-500', range: '25.0 – 29.9', percentage: 75 };
    return { label: 'Obese / High Risk', color: 'text-rose-400', bg: 'bg-rose-500', range: '≥ 30.0', percentage: 95 };
  }, [bmi]);

  // Body Fat Category determination
  const bodyFatCategory = useMemo(() => {
    if (gender === 'male') {
      if (bodyFat < 8) return { label: 'Essential Fat', status: 'Very Lean' };
      if (bodyFat < 14) return { label: 'Athletic / Shredded', status: 'Elite Physique' };
      if (bodyFat < 18) return { label: 'Fitness & Defined', status: 'Optimal Health' };
      if (bodyFat < 25) return { label: 'Average Body Fat', status: 'Recomposition Recommended' };
      return { label: 'Elevated Body Fat', status: 'Fat Loss Protocol Advised' };
    } else {
      if (bodyFat < 14) return { label: 'Essential Fat', status: 'Very Lean' };
      if (bodyFat < 21) return { label: 'Athletic', status: 'Elite Physique' };
      if (bodyFat < 25) return { label: 'Fitness & Toned', status: 'Optimal Health' };
      if (bodyFat < 32) return { label: 'Average Body Fat', status: 'Recomposition Recommended' };
      return { label: 'Elevated Body Fat', status: 'Fat Loss Protocol Advised' };
    }
  }, [gender, bodyFat]);

  // Prescription / Coaching Plan Recommendation
  const coachingPlan = useMemo(() => {
    if (bmi >= 27 || bodyFat >= 22) {
      const pkg = packages.find(p => p.id === 'one-to-one') || packages[1] || packages[0];
      return {
        protocol: 'Accelerated Fat Loss & Metabolic Reconditioning',
        description: 'Targeted caloric deficit with progressive resistance training to incinerate stubborn fat while preserving metabolic lean muscle.',
        recommendedPkg: pkg,
        ctaText: 'Claim 1 to 1 In-Person Protocol'
      };
    } else if (bmi < 20 || (gender === 'male' && bodyFat < 10) || (gender === 'female' && bodyFat < 16)) {
      const pkg = packages.find(p => p.id === 'online-plan') || packages[0] || packages[1];
      return {
        protocol: 'Hypertrophy & Clean Mass Surge Protocol',
        description: 'Structured progressive overload with Habesha-adapted caloric surplus and high bioavailable protein for dense, sculpted muscle growth.',
        recommendedPkg: pkg,
        ctaText: 'Claim Online Coaching Plan'
      };
    } else {
      const pkg = packages.find(p => p.id === 'transformation') || packages[2] || packages[0];
      return {
        protocol: '12-Week Elite Physique Recomposition',
        description: 'Synchronized muscle building and abdominal fat trimming with custom weekly check-ins and macronutrient periodization.',
        recommendedPkg: pkg,
        ctaText: 'Claim 12-Week Transformation Plan'
      };
    }
  }, [bmi, bodyFat, gender, packages]);

  // Preset Handlers
  const applyPreset = (preset: 'fit_male' | 'cut_male' | 'female_recomp') => {
    setUnitSystem('metric');
    if (preset === 'fit_male') {
      setGender('male');
      setAge(26);
      setHeightCm(180);
      setWeightKg(82);
      setWaistCm(83);
      setNeckCm(40);
    } else if (preset === 'cut_male') {
      setGender('male');
      setAge(31);
      setHeightCm(174);
      setWeightKg(91);
      setWaistCm(96);
      setNeckCm(41);
    } else {
      setGender('female');
      setAge(25);
      setHeightCm(166);
      setWeightKg(63);
      setWaistCm(74);
      setNeckCm(34);
      setHipCm(96);
    }
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#070B16] transition-colors relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Fitness Analytics Engine</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive BMI & Body Fat <br />
            <span className="bg-linear-to-r from-blue-600 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Composition Calculator
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Calculate your real-time body mass index, estimated body fat percentage, and daily caloric & protein targets to unlock Coach Dawit's customized fitness roadmap.
          </p>

          {/* Quick Preset Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Presets:</span>
            <button
              onClick={() => applyPreset('fit_male')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors cursor-pointer"
            >
              🏃 Athletic Male (82kg)
            </button>
            <button
              onClick={() => applyPreset('cut_male')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors cursor-pointer"
            >
              🔥 Fat Loss Client (91kg)
            </button>
            <button
              onClick={() => applyPreset('female_recomp')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors cursor-pointer"
            >
              ⚡ Female Recomp (63kg)
            </button>
          </div>
        </div>

        {/* Main 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-6 bg-white dark:bg-[#090E1D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Top Controls: Gender & Unit Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              {/* Gender Toggle */}
              <div className="w-full sm:w-auto flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Female
                </button>
              </div>

              {/* Unit System Toggle */}
              <div className="w-full sm:w-auto flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('metric')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === 'metric'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Metric (kg / cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('imperial')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === 'imperial'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Imperial (lbs / ft)
                </button>
              </div>
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Age (Years)
                </label>
                <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400">
                  {age} yrs
                </span>
              </div>
              <input
                type="range"
                min="16"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Height Controls */}
            {unitSystem === 'metric' ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Height (cm)
                  </label>
                  <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400">
                    {heightCm} cm ({((heightCm) / 100).toFixed(2)} m)
                  </span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Height (Feet & Inches)
                  </label>
                  <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400">
                    {heightFt} ft {heightIn} in
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Feet</span>
                    <input
                      type="number"
                      min="4"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Inches</span>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Weight Controls */}
            {unitSystem === 'metric' ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Body Weight (kg)
                  </label>
                  <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400">
                    {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Body Weight (lbs)
                  </label>
                  <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400">
                    {weightLbs} lbs ({Math.round(weightLbs / 2.20462)} kg)
                  </span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )}

            {/* Activity Level Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Daily Activity & Workout Frequency
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Sedentary', desc: 'Desk job, little exercise', val: 1.2 },
                  { label: 'Light Exercise', desc: '1–2 gym sessions/wk', val: 1.375 },
                  { label: 'Moderate Training', desc: '3–5 days active workout', val: 1.55 },
                  { label: 'Heavy Athlete', desc: '6+ hard sessions/wk', val: 1.725 },
                ].map((act) => (
                  <button
                    key={act.label}
                    type="button"
                    onClick={() => setActivityLevel(act.val)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      activityLevel === act.val
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    <p className="font-bold text-xs">{act.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{act.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* US Navy Tape Toggle for High Precision Body Fat */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="navy-toggle"
                    checked={useNavyMethod}
                    onChange={(e) => setUseNavyMethod(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="navy-toggle" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Enable High-Precision Tape Measurements (US Navy Method)
                  </label>
                </div>
                <span className="text-[10px] uppercase font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">
                  Optional
                </span>
              </div>

              {useNavyMethod && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-[11px] text-slate-400">
                    Enter circumferences in cm for clinical-grade body fat evaluation.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">Waist Circumference (cm)</span>
                      <input
                        type="number"
                        min="50"
                        max="160"
                        value={waistCm}
                        onChange={(e) => setWaistCm(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black font-mono text-sm"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">Neck Circumference (cm)</span>
                      <input
                        type="number"
                        min="25"
                        max="60"
                        value={neckCm}
                        onChange={(e) => setNeckCm(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black font-mono text-sm"
                      />
                    </div>
                    {gender === 'female' && (
                      <div className="col-span-2">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Hip Circumference (cm)</span>
                        <input
                          type="number"
                          min="60"
                          max="160"
                          value={hipCm}
                          onChange={(e) => setHipCm(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black font-mono text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Real-Time Metrics & Custom Coaching Prescription */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Metrics Dashboard Card */}
            <div className="bg-white dark:bg-[#090E1D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                    Live Physique Analytics
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  ISSA Body Comp Model
                </span>
              </div>

              {/* Top 2 Big Numbers: BMI & Body Fat % */}
              <div className="grid grid-cols-2 gap-4 my-6">
                
                {/* BMI Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060913] border border-slate-200 dark:border-slate-800 relative">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Body Mass Index
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
                      {bmi}
                    </span>
                    <span className="text-xs font-bold text-slate-400">kg/m²</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800">
                    <span className={`w-2 h-2 rounded-full ${bmiCategory.bg}`}></span>
                    <span className={bmiCategory.color}>{bmiCategory.label}</span>
                  </div>
                </div>

                {/* Body Fat % Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060913] border border-slate-200 dark:border-slate-800 relative">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Estimated Body Fat
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-blue-600 dark:text-cyan-400">
                      {bodyFat}%
                    </span>
                    <span className="text-xs font-bold text-slate-400">Fat %</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-cyan-400">
                    <Sparkles className="w-3 h-3" />
                    <span>{bodyFatCategory.label}</span>
                  </div>
                </div>

              </div>

              {/* BMI Scale Visual Indicator Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>Underweight (&lt;18.5)</span>
                  <span>Normal (18.5-24.9)</span>
                  <span>Overweight (25-29.9)</span>
                  <span>Obese (30+)</span>
                </div>
                <div className="h-3.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative flex">
                  <div className="w-[18.5%] bg-sky-400 opacity-80"></div>
                  <div className="w-[30%] bg-emerald-500 opacity-80"></div>
                  <div className="w-[25%] bg-amber-500 opacity-80"></div>
                  <div className="w-[26.5%] bg-rose-500 opacity-80"></div>
                  
                  {/* Current Needle Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-black dark:bg-white shadow-md transition-all duration-300 -translate-x-1/2"
                    style={{
                      left: `${Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 3), 97)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Body Composition Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Lean Muscle</p>
                  <p className="font-mono text-sm font-bold text-emerald-500 mt-0.5">{leanMassKg} kg</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Fat Mass</p>
                  <p className="font-mono text-sm font-bold text-amber-500 mt-0.5">{fatMassKg} kg</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Daily TDEE</p>
                  <p className="font-mono text-sm font-bold text-blue-500 mt-0.5">{tdee} kcal</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Protein Target</p>
                  <p className="font-mono text-sm font-bold text-cyan-400 mt-0.5">{dailyProteinGrams}g / day</p>
                </div>
              </div>

            </div>

            {/* Coach Dawit's Tailored Prescription Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-linear-to-br from-blue-600 via-blue-700 to-cyan-700 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-cyan-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Coach Dawit's Custom Diagnosis</span>
                  </div>
                  <span className="text-xs font-bold text-blue-100">
                    Metrics-Driven Prescription
                  </span>
                </div>

                <div>
                  <h4 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                    {coachingPlan.protocol}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                    {coachingPlan.description}
                  </p>
                </div>

                {/* Plan Highlights */}
                <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Recommended Plan:</span>
                    <strong className="font-bold text-white">{coachingPlan.recommendedPkg.name}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Investment:</span>
                    <span className="font-mono font-black text-cyan-300">
                      {new Intl.NumberFormat('en-US').format(coachingPlan.recommendedPkg.priceETB)} ETB ({coachingPlan.recommendedPkg.period})
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-blue-200">Habesha Diet Integration:</span>
                    <span className="text-emerald-300 font-bold">100% Custom Macros Included</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => openCheckout(coachingPlan.recommendedPkg)}
                  className="w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-white text-blue-700 hover:bg-blue-50 shadow-xl shadow-black/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>{coachingPlan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
