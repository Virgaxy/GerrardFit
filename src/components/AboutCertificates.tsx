import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Certificate } from '../types';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Instagram,
  FileText,
  UserCheck,
  Calendar,
  Check,
  Sparkles
} from 'lucide-react';

export const AboutCertificates: React.FC = () => {
  const { certificates, openCheckout, mediaSettings } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate>(certificates[0] || {} as Certificate);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);

  const instagramCertLink = "https://www.instagram.com/p/DbTrB4yOKqK/?stkn=MWFjNWtlcnc5YzA5NQ==";

  return (
    <section id="about-certificates-section" className="py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials & Coach Profile</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About Coach Dawit & <br />
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Verified ISSA Certifications
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Backed by the International Sports Sciences Association (ISSA). Documented credentials, continuous education, and verifiable fitness certifications.
          </p>
        </div>

        {/* Coach Bio & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900">
              <img
                src={mediaSettings.coachPhotoUrl || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"}
                alt="Coach Dawit Solomon in Training"
                className="w-full h-[450px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-[11px] font-bold uppercase tracking-wider">
                  Founder & Head Coach
                </span>
                <h3 className="font-heading text-3xl font-black mt-2">Dawit Solomon</h3>
                <p className="text-xs text-cyan-400 font-semibold">ISSA Certified Trainer #40006935 • Ethiopia</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">The GerrardFit Philosophy</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 mb-4">
              "Fitness Is Not About Starvation. It's Biomechanics & Consistency."
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              I founded <strong>GerrardFit</strong> with a singular mission: to eradicate the misinformation, dangerous fad diets, and cookie-cutter routines that plague gym culture in Ethiopia and worldwide.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              As an internationally certified personal trainer through the <strong>International Sports Sciences Association (ISSA)</strong>, I fuse exercise physiology, metabolic conditioning, and tailored Habesha nutrition. You will never be told to abandon cultural staples like Shiro or Injera; instead, we optimize energy balance, progressive overload, and recovery.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold uppercase">Education</p>
                <p className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-0.5">ISSA Certified</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold uppercase">Location</p>
                <p className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-0.5">Ethiopia</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold uppercase">Specialty</p>
                <p className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-0.5">Recomposition</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openCheckout()}
                className="px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
              >
                Work With Coach Dawit
              </button>
              
              <a
                href={instagramCertLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-pink-600/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>View Certificate on Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* CERTIFICATES TEXT BOXES & VERIFICATION LINK */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1C] p-6 sm:p-8 lg:p-10 shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-extrabold uppercase border border-emerald-500/20">
                  Verified ISSA Credentials
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-500 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Official Registry Record
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                {selectedCert.title || 'ISSA Certified Personal Trainer (CPT)'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Official accreditation issued by the International Sports Sciences Association
              </p>
            </div>

            {/* Cert Switcher Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {certificates.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCert.id === cert.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cert.issuer.includes('ISSA') ? 'ISSA (CPT)' : cert.issuer.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* TEXT BOXES GRID FOR CERTIFICATE CREDENTIALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            
            {/* Box 1: Professional Recipient */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Certified Professional</span>
                <UserCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-lg font-heading font-black text-slate-900 dark:text-white">
                {selectedCert.recipient || 'Dawit Solomon'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Head Coach & Founder of GerrardFit (Ethiopia)
              </p>
            </div>

            {/* Box 2: Certificate ID */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Certificate Number</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-lg font-mono font-black text-cyan-500">
                {selectedCert.credentialId || '40006935'}
              </p>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active in Good Standing
              </p>
            </div>

            {/* Box 3: Accredited Institution */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Accredited Institution</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-lg font-heading font-black text-slate-900 dark:text-white">
                {selectedCert.issuer || 'ISSA - USA'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                International Sports Sciences Association
              </p>
            </div>

            {/* Box 4: Title & Specialization */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Credential Awarded</span>
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-base font-heading font-black text-slate-900 dark:text-white">
                Certified Personal Trainer (CPT)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Biomechanics, Periodization & Conditioning
              </p>
            </div>

            {/* Box 5: Validity Period */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Validity & Standing</span>
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-base font-heading font-black text-slate-900 dark:text-white">
                Through {selectedCert.expirationDate || '07-22-2028'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Signatory: {selectedCert.ceoSignatory || 'Warren Heffelfinger, CEO ISSA'}
              </p>
            </div>

            {/* Box 6: Verified Skills & Competencies */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#060B1E] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Core Competencies</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(selectedCert.skills || [
                  'Resistance Training',
                  'Habesha Macro Nutrition',
                  'Injury Prevention',
                  'Body Recomposition'
                ]).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-[10px] font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* PRIMARY BUTTON LINK TO INSTAGRAM POST */}
          <div className="p-6 rounded-2xl bg-linear-to-r from-purple-950/40 via-[#0A122E] to-pink-950/40 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                <h4 className="font-heading font-black text-lg text-white">
                  Official ISSA Certificate Publication
                </h4>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Inspect Coach Dawit Solomon's authentic ISSA certificate, graduation announcement, and community verification directly on his verified Instagram post.
              </p>
            </div>

            <a
              id="instagram-certificate-button"
              href={instagramCertLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white shadow-xl shadow-pink-600/30 flex items-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
            >
              <Instagram className="w-4 h-4" />
              <span>Open Certificate on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Bottom Secondary Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISSA Verification Reference: ID #40006935 • Dawit Solomon • Ethiopia</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowVerificationModal(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                View Registry Data
              </button>
              <button
                onClick={() => openCheckout()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
              >
                Start Training
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* VERIFICATION MODAL */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090E1C] border border-slate-700 p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Official Registry Check</span>
                <h3 className="font-heading text-xl font-black">ISSA Credential Verification</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050811] border border-emerald-500/30 space-y-3 text-xs mb-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  ACTIVE & CERTIFIED
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Professional Name</span>
                <span className="font-bold text-white">Dawit Solomon</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Certificate ID</span>
                <span className="font-mono font-bold text-cyan-400">40006935</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Title Awarded</span>
                <span className="font-bold text-white">Certified Personal Trainer (CPT)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Location</span>
                <span className="font-bold text-white">Ethiopia</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Expiration</span>
                <span className="font-bold text-slate-200">07-22-2028 (Good Standing)</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={instagramCertLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>View Instagram Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowVerificationModal(false)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
