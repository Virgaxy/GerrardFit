import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS_DATA } from '../data/mockData';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { openCheckout } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('0900450154');
  const [preferredContact, setPreferredContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 lg:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Access to Coach Dawit</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Connect With GerrardFit <br />
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              In Ethiopia & Globally
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Have questions about package pricing in ETB, in-person training in Bole, or Habesha nutrition? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Contact Info & Hub Locations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Call Card */}
            <div className="rounded-3xl p-6 bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-xl shadow-blue-500/20">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-cyan-200">
                Direct Consultation
              </span>
              <h3 className="font-heading text-2xl font-black mt-0.5">Call Coach Dawit Directly</h3>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                Connect directly with Coach Dawit Solomon to discuss your physique goals, workout schedule, or package details.
              </p>
              <a
                href="tel:0900450154"
                className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Coach: 0900450154</span>
              </a>
            </div>

            {/* Hub Details */}
            <div className="rounded-3xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1D] space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ethiopia Training Hub</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">Bole Atlas & Edna Mall Training Centers</p>
                  <p className="text-xs text-slate-500 mt-0.5">Bole Atlas, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Phone Line</p>
                  <p className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-0.5">0900450154</p>
                  <p className="text-xs text-slate-500 mt-0.5">Mon – Sat, 6:00 AM – 9:00 PM EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Email</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">coaching@gerrardfit.com</p>
                  <p className="text-xs text-slate-500 mt-0.5">Enterprise & VIP inquiries</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1D] shadow-xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-slate-900 dark:text-white">
                    Inquiry Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Coach Dawit Solomon has received your details. We will reach out to you at <strong>{phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Quick Contact Form</span>
                    <h3 className="font-heading text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                      Send a Message to Coach Dawit
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alazar Mengistu"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0900450154"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Telegram / Social (Optional)
                      </label>
                      <input
                        type="text"
                        value={preferredContact}
                        onChange={(e) => setPreferredContact(e.target.value)}
                        placeholder="@your_telegram_username"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Your Inquiry or Fitness Goals
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell Coach Dawit about your target timeline, gym access in Ethiopia, or package questions..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#050811] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry to Coach</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Clarifications</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090E1D] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
