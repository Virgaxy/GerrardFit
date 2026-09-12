import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, NavPage, User, PackageTier, ClientOrder, Certificate, SiteMediaSettings } from '../types';
import { PACKAGES_DATA, INITIAL_CERTIFICATES, INITIAL_ORDERS, DEFAULT_MEDIA_SETTINGS } from '../data/mockData';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  isCheckoutOpen: boolean;
  selectedPackage: PackageTier | null;
  openCheckout: (pkg?: PackageTier) => void;
  closeCheckout: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  orders: ClientOrder[];
  addOrder: (orderData: Partial<ClientOrder> & { packageName: string; priceETB: number }) => ClientOrder;
  updateOrderStatus: (orderId: string, status: 'Pending' | 'Active' | 'Completed') => void;
  deleteOrder: (orderId: string) => void;
  packages: PackageTier[];
  updatePackagePrice: (packageId: string, newPriceETB: number) => void;
  updatePackage: (packageId: string, updates: Partial<PackageTier>) => void;
  addPackage: (newPkg: PackageTier) => void;
  deletePackage: (packageId: string) => void;
  resetPackages: () => void;
  certificates: Certificate[];
  addCertificate: (cert: Certificate) => void;
  toggleCertificateVisibility: (id: string) => void;
  deleteCertificate: (id: string) => void;
  mediaSettings: SiteMediaSettings;
  updateMediaSettings: (newSettings: Partial<SiteMediaSettings>) => void;
  updateSocialLinks: (links: {
    instagramUrl?: string;
    tiktokUrl?: string;
    telegramUrl?: string;
    youtubeUrl?: string;
    phone?: string;
  }) => void;
  resetMediaSettings: () => void;
  isSecretAdminModalOpen: boolean;
  openSecretAdminModal: () => void;
  closeSecretAdminModal: () => void;
  unlockAdminAsCoach: () => void;
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme initialization (Dark default with electric blue accents as requested)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('gerrardfit_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [activePage, setActivePage] = useState<NavPage>('home');

  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gerrardfit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo user can be null or a signed-in client
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Coaching Packages State with LocalStorage
  const [packages, setPackages] = useState<PackageTier[]>(() => {
    const saved = localStorage.getItem('gerrardfit_packages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        return PACKAGES_DATA;
      }
    }
    return PACKAGES_DATA;
  });

  // Checkout modal / drawer state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(() => {
    const saved = localStorage.getItem('gerrardfit_packages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 1) {
          return parsed[1];
        }
      } catch {
        // fallback
      }
    }
    return PACKAGES_DATA[1];
  });

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Secret Admin modal state (hidden portal)
  const [isSecretAdminModalOpen, setIsSecretAdminModalOpen] = useState(false);

  // Notification toast
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Orders state with LocalStorage
  const [orders, setOrders] = useState<ClientOrder[]>(() => {
    const saved = localStorage.getItem('gerrardfit_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  // Certificates state with LocalStorage
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('gerrardfit_certificates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CERTIFICATES;
      }
    }
    return INITIAL_CERTIFICATES;
  });

  // Media & Branding settings (Logo, Coach Photo, Video Link) with LocalStorage
  const [mediaSettings, setMediaSettings] = useState<SiteMediaSettings>(() => {
    const saved = localStorage.getItem('gerrardfit_media_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_MEDIA_SETTINGS,
          ...parsed,
          logoUrl: parsed.logoUrl || DEFAULT_MEDIA_SETTINGS.logoUrl,
          instagramUrl: parsed.instagramUrl ?? DEFAULT_MEDIA_SETTINGS.instagramUrl,
          tiktokUrl: parsed.tiktokUrl ?? DEFAULT_MEDIA_SETTINGS.tiktokUrl,
          telegramUrl: parsed.telegramUrl ?? DEFAULT_MEDIA_SETTINGS.telegramUrl,
          phone: parsed.phone ?? DEFAULT_MEDIA_SETTINGS.phone
        };
      } catch {
        return DEFAULT_MEDIA_SETTINGS;
      }
    }
    return DEFAULT_MEDIA_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('gerrardfit_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gerrardfit_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gerrardfit_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gerrardfit_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gerrardfit_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('gerrardfit_media_settings', JSON.stringify(mediaSettings));
  }, [mediaSettings]);

  const updateMediaSettings = (newSettings: Partial<SiteMediaSettings>) => {
    setMediaSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    showNotification('Media & brand assets updated successfully!', 'success');
  };

  const updateSocialLinks = (links: {
    instagramUrl?: string;
    tiktokUrl?: string;
    telegramUrl?: string;
    youtubeUrl?: string;
    phone?: string;
  }) => {
    setMediaSettings(prev => ({
      ...prev,
      ...links
    }));
    showNotification('Social media links updated and saved!', 'success');
  };

  const resetMediaSettings = () => {
    setMediaSettings(DEFAULT_MEDIA_SETTINGS);
    showNotification('Media assets reset to default.', 'info');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showNotification(`Welcome back, ${user.name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showNotification('You have logged out successfully.', 'info');
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openCheckout = (pkg?: PackageTier) => {
    if (pkg) {
      setSelectedPackage(pkg);
    }
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openSecretAdminModal = () => setIsSecretAdminModalOpen(true);
  const closeSecretAdminModal = () => setIsSecretAdminModalOpen(false);

  const unlockAdminAsCoach = () => {
    const coachUser: User = {
      id: 'dawit-admin-01',
      name: 'Coach Dawit Solomon',
      email: 'dawit@gerrardfit.com',
      role: 'admin',
      provider: 'email',
      avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      phone: '0900450154',
      telegram: '@Gerrardfit'
    };
    setCurrentUser(coachUser);
    localStorage.setItem('gerrardfit_user', JSON.stringify(coachUser));
    setActivePage('admin');
    setIsSecretAdminModalOpen(false);
    showNotification('Coach Dawit Authenticated. Admin dashboard unlocked!', 'success');
  };

  // Keyboard shortcut listener for discrete Admin Access (Alt + A or Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A or Ctrl+Shift+A or Cmd+Shift+A
      if (
        (e.altKey && (e.key === 'a' || e.key === 'A')) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        setIsSecretAdminModalOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check URL query parameter for discrete direct launch (?admin=secret or #admin)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (urlParams.get('admin') === 'secret' || urlParams.get('coach') === 'dawit' || hash === '#admin') {
        setIsSecretAdminModalOpen(true);
      }
    } catch {
      // Ignore URL parse edge cases
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const addOrder = (orderData: Partial<ClientOrder> & { packageName: string; priceETB: number }): ClientOrder => {
    const newOrder: ClientOrder = {
      id: `GF-ET-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      clientName: orderData.clientName || 'GerrardFit Athlete',
      email: orderData.email || '',
      phone: orderData.phone || '',
      telegramUsername: orderData.telegramUsername || '@user',
      instagramUsername: orderData.instagramUsername,
      packageId: orderData.packageId || 'transformation',
      packageName: orderData.packageName,
      priceETB: orderData.priceETB,
      fitnessGoals: orderData.fitnessGoals || 'Transform physique & mindset',
      injuriesOrNotes: orderData.injuriesOrNotes,
      preferredWorkoutTime: orderData.preferredWorkoutTime || 'Flexible',
      paymentMethod: orderData.paymentMethod || 'Registration Only',
      paymentStatus: orderData.paymentStatus || 'Registration Submitted',
      paymentProofName: orderData.paymentProofName,
      paymentProofDataUrl: orderData.paymentProofDataUrl,
      status: 'Pending',
      notes: orderData.notes
    };

    setOrders(prev => [newOrder, ...prev]);
    showNotification(`Client registration ${newOrder.id} received!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: 'Pending' | 'Active' | 'Completed') => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showNotification(`Client status updated to ${status}.`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
    showNotification('Registration record removed.', 'info');
  };

  const updatePackagePrice = (packageId: string, newPriceETB: number) => {
    const validatedPrice = Math.max(0, Math.round(newPriceETB));
    setPackages(prev => {
      const updated = prev.map(p =>
        p.id === packageId ? { ...p, priceETB: validatedPrice } : p
      );
      localStorage.setItem('gerrardfit_packages', JSON.stringify(updated));
      return updated;
    });

    setSelectedPackage(prev =>
      prev && prev.id === packageId
        ? { ...prev, priceETB: validatedPrice }
        : prev
    );

    showNotification('Package price updated and saved!', 'success');
  };

  const updatePackage = (packageId: string, updates: Partial<PackageTier>) => {
    setPackages(prev => {
      const updated = prev.map(p => (p.id === packageId ? { ...p, ...updates } : p));
      localStorage.setItem('gerrardfit_packages', JSON.stringify(updated));
      return updated;
    });

    setSelectedPackage(prev =>
      prev && prev.id === packageId ? { ...prev, ...updates } : prev
    );

    showNotification('Package details updated and saved!', 'success');
  };

  const addPackage = (newPkg: PackageTier) => {
    setPackages(prev => {
      const updated = [...prev, newPkg];
      localStorage.setItem('gerrardfit_packages', JSON.stringify(updated));
      return updated;
    });
    showNotification(`New package "${newPkg.name}" added!`, 'success');
  };

  const deletePackage = (packageId: string) => {
    setPackages(prev => {
      const updated = prev.filter(p => p.id !== packageId);
      localStorage.setItem('gerrardfit_packages', JSON.stringify(updated));
      return updated;
    });
    showNotification('Package tier removed.', 'info');
  };

  const resetPackages = () => {
    setPackages(PACKAGES_DATA);
    localStorage.removeItem('gerrardfit_packages');
    setSelectedPackage(PACKAGES_DATA[1]);
    showNotification('All package prices restored to default.', 'info');
  };

  const addCertificate = (cert: Certificate) => {
    setCertificates(prev => [cert, ...prev]);
    showNotification('New verified certificate added!', 'success');
  };

  const toggleCertificateVisibility = (id: string) => {
    setCertificates(prev =>
      prev.map(c => (c.id === id ? { ...c, isPublic: !c.isPublic } : c))
    );
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    showNotification('Certificate removed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activePage,
        setActivePage,
        currentUser,
        login,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isCheckoutOpen,
        selectedPackage,
        openCheckout,
        closeCheckout,
        isSearchOpen,
        openSearch,
        closeSearch,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        packages,
        updatePackagePrice,
        updatePackage,
        addPackage,
        deletePackage,
        resetPackages,
        certificates,
        addCertificate,
        toggleCertificateVisibility,
        deleteCertificate,
        mediaSettings,
        updateMediaSettings,
        resetMediaSettings,
        isSecretAdminModalOpen,
        openSecretAdminModal,
        closeSecretAdminModal,
        unlockAdminAsCoach,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
