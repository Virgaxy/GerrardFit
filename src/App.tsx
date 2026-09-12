/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BMIWidget } from './components/BMIWidget';
import { Transformations } from './components/Transformations';
import { Packages } from './components/Packages';
import { AboutCertificates } from './components/AboutCertificates';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { SearchModal } from './components/SearchModal';
import { SecretAdminModal } from './components/SecretAdminModal';
import { FloatingQuickActions } from './components/FloatingQuickActions';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, notification } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#060913] text-slate-900 dark:text-white selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Area based on Active Page */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <BMIWidget />
            <Transformations />
            <Packages />
            <AboutCertificates />
            <Contact />
          </>
        )}

        {activePage === 'journeys' && (
          <div className="pt-8">
            <Transformations />
          </div>
        )}

        {activePage === 'packages' && (
          <div className="pt-8">
            <Packages />
          </div>
        )}

        {activePage === 'about' && (
          <div className="pt-8">
            <AboutCertificates />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="pt-8">
            <Contact />
          </div>
        )}

        {activePage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      {activePage !== 'admin' && <Footer />}

      {/* Global Modals & Drawers */}
      <AuthModal />
      <CheckoutDrawer />
      <SearchModal />
      <SecretAdminModal />
      <FloatingQuickActions />

      {/* Global Floating Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm animate-in fade-in slide-in-from-top-3 duration-200">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/50'
              : notification.type === 'error'
              ? 'bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-950/50'
              : 'bg-[#070E24]/90 text-cyan-100 border-cyan-500/40 shadow-cyan-950/50'
          }`}>
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
            <span className="text-xs font-semibold">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
