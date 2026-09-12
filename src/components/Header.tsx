import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { NavPage } from '../types';
import {
  Dumbbell,
  Sun,
  Moon,
  Search,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  Flame,
  Award,
  LogOut,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    activePage,
    setActivePage,
    currentUser,
    logout,
    openAuthModal,
    openSearch,
    openCheckout,
    mediaSettings,
    openSecretAdminModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const logoClickCountRef = useRef(0);
  const logoClickTimerRef = useRef<any>(null);

  const handleLogoClick = () => {
    logoClickCountRef.current += 1;
    if (logoClickTimerRef.current) {
      clearTimeout(logoClickTimerRef.current);
    }

    // Secret: 3 fast clicks on the GerrardFit logo opens the Secret Coach Gateway!
    if (logoClickCountRef.current >= 3) {
      logoClickCountRef.current = 0;
      openSecretAdminModal();
      return;
    }

    logoClickTimerRef.current = setTimeout(() => {
      logoClickCountRef.current = 0;
    }, 600);

    handleNavClick('home');
  };

  const navLinks: { label: string; page: NavPage; icon?: React.ReactNode }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Client Journeys', page: 'journeys' },
    { label: 'Packages (ETB)', page: 'packages' },
    { label: 'About & Certificates', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: NavPage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#060913]/90 border-b border-white/10 text-white backdrop-blur-xl'
        : 'bg-white/90 border-b border-slate-200 text-slate-900 backdrop-blur-xl shadow-xs'
    }`}>
      {/* Top micro-banner for coaching availability in Ethiopia */}
      <div className="bg-linear-to-r from-blue-700 via-blue-600 to-cyan-600 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        <span>NOW ACCEPTING CLIENTS FOR 12-WEEK TRANSFORMATION IN ETHIOPIA & ONLINE</span>
        <button
          onClick={() => openCheckout()}
          className="underline hover:text-cyan-100 transition-colors cursor-pointer hidden sm:inline ml-1 font-bold"
        >
          Claim Your Spot in ETB →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="gerrardfit-logo"
            title="GerrardFit • Triple-click for Coach Portal"
          >
            {mediaSettings.logoUrl ? (
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-white border border-cyan-400/40 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={mediaSettings.logoUrl}
                  alt="GerrardFit Official Brand Logo"
                  className="w-full h-full object-contain p-1.5"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#060913]"></div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform shrink-0">
                <Dumbbell className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#060913]"></div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl tracking-tighter leading-none flex items-center">
                GERRARD<span className="text-blue-500">FIT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-cyan-400/80 leading-tight">
                ISSA Certified • Coach Dawit
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  id={`nav-link-${item.page}`}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-blue-500 bg-blue-500/10 dark:text-cyan-400 dark:bg-blue-500/15'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={openSearch}
              id="header-search-btn"
              title="Search packages & transformations"
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="header-theme-toggle"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'text-amber-400 hover:bg-white/10 bg-white/5'
                  : 'text-blue-600 hover:bg-slate-100 bg-slate-100'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth / User Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  id="user-profile-menu-btn"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <span className="text-xs font-semibold max-w-[90px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl py-2 z-50 border transition-all ${
                    theme === 'dark'
                      ? 'bg-[#0B1120] border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <div className="px-4 py-2 border-b border-slate-700/30">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/20 text-blue-400 uppercase">
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick('packages');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-blue-500/10 flex items-center gap-2 cursor-pointer"
                    >
                      <Flame className="w-4 h-4 text-blue-500" />
                      View Packages in ETB
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-blue-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Admin Control Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-700/30 mt-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  id="header-login-btn"
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'text-slate-200 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-black hover:bg-slate-100'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => openCheckout()}
                  id="header-cta-btn"
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Start Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className={`p-2 rounded-lg ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 transition-all ${
          theme === 'dark'
            ? 'bg-[#060913] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === item.page
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'hover:bg-white/5 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-800'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            ))}

            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left px-4 py-3 rounded-xl text-sm font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Admin Management Portal</span>
              </button>
            )}

            <div className="pt-3 flex flex-col gap-2">
              {currentUser ? (
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-xs font-bold">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs text-rose-400 font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCheckout();
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold text-center shadow-md shadow-blue-600/30"
                  >
                    Get Started (ETB)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
