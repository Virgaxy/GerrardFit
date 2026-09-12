import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ClientOrder, Certificate } from '../types';
import { AdminMediaManager } from './AdminMediaManager';
import { AdminPackagePrices } from './AdminPackagePrices';
import { parseVideoLink } from '../utils/mediaUtils';
import {
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  Plus,
  Trash2,
  Phone,
  Send,
  ExternalLink,
  Award,
  Calendar,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Copy,
  Check,
  FileText,
  Sparkles,
  Dumbbell,
  Camera,
  Video,
  Flame,
  ArrowRight,
  ArrowLeft,
  Lock,
  Edit3,
  Save,
  Tag,
  Image as ImageIcon
} from 'lucide-react';

const INITIAL_VIDEO_PLAYLIST = [
  {
    id: 'video-1',
    title: 'Client Intake & Biomechanics Assessment Protocol',
    duration: '03:45',
    category: 'Intake Strategy',
    description: 'Coach Dawit breaks down the 5-point postural screen, ankle dorsiflexion check, and Habesha nutritional baseline setup.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    keyNotes: ['Always assess pelvic tilt first', 'Screen for past ankle sprains', 'Calculate non-fasting vs fasting calorie caps']
  },
  {
    id: 'video-2',
    title: 'Deadlift & Squat Form Check Analysis',
    duration: '05:12',
    category: 'Technique',
    description: 'Reviewing client gym footage in Ethiopia. Common lumbar hyperextension faults and bar-path optimization.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    keyNotes: ['Foot pressure even across tripod', 'Brace 360 degrees before pull', 'Drive hips through at lockout']
  },
  {
    id: 'video-3',
    title: 'Habesha Diet & Ethiopian Nutrition Consultation Guide',
    duration: '04:20',
    category: 'Nutrition',
    description: 'Structuring Teff injera, defats shiro, roasted beef tips, and high-protein fasting meals for fat loss.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    keyNotes: ['Teff injera contains 3-4g protein per roll', 'Supplement with whey or egg whites during non-fasting', 'Hydration target: 3.5L/day in Addis altitude']
  }
];

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    certificates,
    addCertificate,
    toggleCertificateVisibility,
    deleteCertificate,
    setActivePage,
    showNotification,
    mediaSettings,
    logout
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Active' | 'Completed'>('All');
  const [activeTab, setActiveTab] = useState<'clients' | 'package_prices' | 'video' | 'text' | 'media' | 'certificates'>('clients');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<ClientOrder | null>(null);

  // Quick Text generator state
  const [selectedClientForText, setSelectedClientForText] = useState<string>(orders[0]?.id || '');
  const [customTextDraft, setCustomTextDraft] = useState<string>(
    localStorage.getItem('gerrardfit_coach_notes') ||
      'Daily Coaching Focus:\n- Review Kidus week 2 squat depth video.\n- Check in on Nardos in-person Bole session at 6:30 PM.\n- Send updated Injera carb macro guide to new intake clients.'
  );
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Video Hub player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [videoPlaylist, setVideoPlaylist] = useState(INITIAL_VIDEO_PLAYLIST);

  const handleAddCustomVideoToPlaylist = (newVideo: typeof INITIAL_VIDEO_PLAYLIST[0]) => {
    setVideoPlaylist(prev => [newVideo, ...prev]);
    setCurrentVideoIndex(0);
    showNotification('New video link added to training playlist!', 'success');
  };

  // New Certificate modal form state
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [certTitle, setCertTitle] = useState('ISSA Elite Trainer Certification');
  const [certIssuer, setCertIssuer] = useState('International Sports Sciences Association');
  const [certRecipient, setCertRecipient] = useState('Dawit Solomon');
  const [certCredentialId, setCertCredentialId] = useState('40006935');
  const [certIssueDate, setCertIssueDate] = useState('2024-07-22');
  const [certExpDate, setCertExpDate] = useState('2028-07-22');
  const [certSkills, setCertSkills] = useState('Biomechanics, Strength Coaching, Habesha Nutrition');

  // Stats
  const activeClientsCount = orders.filter(ord => ord.status === 'Active').length;
  const pendingOrdersCount = orders.filter(ord => ord.status === 'Pending').length;
  const completedCount = orders.filter(ord => ord.status === 'Completed').length;

  const filteredOrders = orders.filter(ord => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      ord.clientName.toLowerCase().includes(query) ||
      (ord.telegramUsername && ord.telegramUsername.toLowerCase().includes(query)) ||
      ord.phone.toLowerCase().includes(query) ||
      ord.packageName.toLowerCase().includes(query) ||
      ord.id.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const selectedClientData = orders.find(o => o.id === selectedClientForText) || orders[0];

  const generateWelcomeText = (client?: ClientOrder) => {
    if (!client) return '';
    return `Salam ${client.clientName}! This is Coach Dawit Solomon from GerrardFit.

I have received your registration for the ${client.packageName} (${client.id}).
Your stated goal: "${client.fitnessGoals}".

I am reviewing your intake profile now. Let's schedule your 1-on-1 strategy call this week to finalize your training split and nutrition blueprint.

What time works best for you?
- Coach Dawit Solomon | GerrardFit ISSA Elite Trainer`;
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    showNotification('Welcome message copied to clipboard!', 'success');
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleSaveNotes = () => {
    localStorage.setItem('gerrardfit_coach_notes', customTextDraft);
    showNotification('Coach briefing notes saved locally.', 'success');
  };

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      title: certTitle,
      issuer: certIssuer,
      recipient: certRecipient,
      credentialId: certCredentialId,
      issueDate: certIssueDate,
      expirationDate: certExpDate,
      imageUrl: '/assets/issa_certificate.jpg',
      verified: true,
      verificationHash: `SHA256-${certCredentialId}-${Date.now()}`,
      skills: certSkills.split(',').map(s => s.trim()),
      isPublic: true,
      ceoSignatory: 'Warren Heffelfinger, CEO ISSA'
    };
    addCertificate(newCert);
    setIsAddCertModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020510] text-white p-4 sm:p-6 lg:p-8 font-sans transition-colors relative overflow-hidden">
      {/* Background glowing gradients for ultra-sleek blue-black aesthetic */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* TOP STATUS & NAVIGATION BAR (EASY ACCESS & SECURITY) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-cyan-300 font-medium">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="font-black tracking-wide text-white uppercase text-[11px]">Private Coach Admin Mode</span>
            <span className="text-slate-400 hidden lg:inline">• Hidden from public visitors (Secret trigger: Alt + A or footer lock)</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => setActivePage('home')}
              id="admin-top-back-btn"
              className="px-4 py-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>

            <button
              onClick={() => {
                logout();
                setActivePage('home');
                showNotification('Admin session locked and logged out.', 'info');
              }}
              id="admin-top-lock-btn"
              title="Lock Admin and Return to Site"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700/80 hover:border-rose-500/40 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* BRAND & LOGO COMMAND BAR */}
        <div className="rounded-3xl border border-cyan-500/20 bg-linear-to-r from-[#060C20] via-[#0A122E] to-[#060C20] p-6 shadow-2xl shadow-cyan-950/40">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* OFFICIAL LOGO & TITLE SECTION */}
            <div className="flex items-center gap-4">
              {/* Dynamic GerrardFit Logo Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-tr from-blue-700 via-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/30 shrink-0">
                <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group p-2">
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {mediaSettings.logoUrl ? (
                    <img
                      src={mediaSettings.logoUrl}
                      alt="GerrardFit Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <>
                      <Dumbbell className="w-8 h-8 sm:w-9 sm:h-9 text-cyan-600 -rotate-45" />
                      <span className="text-[9px] font-black uppercase tracking-tighter text-blue-950 mt-0.5">
                        G-FIT
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-widest border border-cyan-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Admin Command Portal
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Ethiopia HQ</span>
                </div>
                
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 tracking-tight flex items-center gap-3">
                  <span>GERRARDFIT</span>
                  <span className="text-sm font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    Coach Dawit Solomon
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  ISSA Certified Elite Trainer • Athlete Intake, Form Video Hub & Client Communication Engine
                </p>
              </div>
            </div>

            {/* Quick Actions & Navigation */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <a
                href="tel:0900450154"
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Coach Line: 0900450154</span>
              </a>

              <button
                onClick={() => setActiveTab('package_prices')}
                id="admin-top-change-prices-btn"
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                  activeTab === 'package_prices'
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-cyan-500/30'
                    : 'bg-[#0A1330] hover:bg-[#0E1A42] border border-cyan-500/40 text-cyan-300'
                }`}
              >
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>Change Package Prices</span>
              </button>

              <button
                onClick={() => setActivePage('about')}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#0A1330] hover:bg-[#0E1A42] border border-blue-800/60 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Public Credentials</span>
              </button>

              <button
                onClick={() => setActivePage('home')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white transition-all cursor-pointer shadow-lg shadow-cyan-500/30"
              >
                Exit to Live Site
              </button>
            </div>

          </div>
        </div>

        {/* METRICS & QUICK STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Client Registrations */}
          <div className="p-5 rounded-2xl bg-[#060B1E] border border-cyan-500/20 shadow-xl relative overflow-hidden group hover:border-cyan-400/40 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Total Client Intakes</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="font-heading font-black text-3xl text-white mt-2">
              {orders.length} <span className="text-sm font-semibold text-cyan-400">Registered</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
              ✓ Direct Intake (0 ETB to Register)
            </span>
          </div>

          {/* Active Clients */}
          <div className="p-5 rounded-2xl bg-[#060B1E] border border-blue-500/20 shadow-xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Active In Training</span>
              <Flame className="w-4 h-4 text-blue-400" />
            </div>
            <p className="font-heading font-black text-3xl text-blue-400 mt-2">
              {activeClientsCount} <span className="text-sm font-semibold text-slate-400">Athletes</span>
            </p>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Currently executing training splits
            </span>
          </div>

          {/* Pending Intakes */}
          <div className="p-5 rounded-2xl bg-[#060B1E] border border-amber-500/20 shadow-xl relative overflow-hidden group hover:border-amber-400/40 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Pending Consultations</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-heading font-black text-3xl text-amber-400 mt-2">
              {pendingOrdersCount} <span className="text-sm font-semibold text-slate-400">Pending</span>
            </p>
            <span className="text-[11px] text-amber-400/80 font-medium block mt-1">
              Ready for onboarding call or SMS
            </span>
          </div>

          {/* Completed Transformations */}
          <div className="p-5 rounded-2xl bg-[#060B1E] border border-emerald-500/20 shadow-xl relative overflow-hidden group hover:border-emerald-400/40 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Graduated Alumni</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-heading font-black text-3xl text-emerald-400 mt-2">
              {completedCount} <span className="text-sm font-semibold text-slate-400">Athletes</span>
            </p>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Completed 12-week transformations
            </span>
          </div>

        </div>

        {/* HIGH-TECH ADMIN TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'clients'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Registrations ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('package_prices')}
            id="admin-tab-package-prices"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'package_prices'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Tag className="w-4 h-4 text-cyan-400" />
            <span>Change Package Prices</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-extrabold">
              ETB
            </span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'video'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span>Video Training Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'text'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Quick Text & Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'media'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Logo, Photos & Video Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'certificates'
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-[#060B1E] hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>ISSA Certificates ({certificates.length})</span>
          </button>
        </div>

        {/* TAB 1: CLIENT REGISTRATIONS (EASY TO USE & COLORFUL) */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name, phone, handle, or package..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060B1E] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-[#060B1E] p-1 rounded-xl border border-slate-800">
                {(['All', 'Pending', 'Active', 'Completed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table Container */}
            <div className="rounded-2xl border border-cyan-500/20 bg-[#060B1E] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#030717] text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Ref ID & Date</th>
                      <th className="py-3.5 px-4">Athlete Client</th>
                      <th className="py-3.5 px-4">Selected Package</th>
                      <th className="py-3.5 px-4">Rate (ETB)</th>
                      <th className="py-3.5 px-4">Direct Contact</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          <p className="font-bold text-sm text-slate-400">No client registrations match your search.</p>
                          <p className="text-xs text-slate-600 mt-1">Try clearing your search query or filters.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => {
                        const smsUrl = `sms:${ord.phone}?body=${encodeURIComponent(
                          `Salam ${ord.clientName}! This is Coach Dawit Solomon from GerrardFit regarding your ${ord.packageName} registration.`
                        )}`;

                        return (
                          <tr key={ord.id} className="hover:bg-[#0A122E]/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-cyan-400 block">{ord.id}</span>
                              <span className="text-[10px] text-slate-500">
                                {new Date(ord.createdAt).toLocaleDateString()}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <p className="font-bold text-white text-sm">{ord.clientName}</p>
                              <p className="text-[11px] text-slate-400">{ord.email}</p>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-cyan-300 font-bold border border-blue-500/20 inline-block">
                                {ord.packageName}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                              {new Intl.NumberFormat('en-US').format(ord.priceETB)} ETB
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <a
                                href={`tel:${ord.phone}`}
                                className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-bold bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20"
                                title="Call client directly"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{ord.phone}</span>
                              </a>
                              <div className="flex flex-wrap gap-1.5 text-[10px]">
                                {ord.telegramUsername && (
                                  <span className="text-cyan-400 font-mono bg-[#0A122E] px-1.5 py-0.5 rounded border border-cyan-500/30">
                                    TG: {ord.telegramUsername.startsWith('@') ? ord.telegramUsername : `@${ord.telegramUsername}`}
                                  </span>
                                )}
                                {ord.instagramUsername && (
                                  <span className="text-pink-400 font-mono bg-[#0A122E] px-1.5 py-0.5 rounded border border-pink-500/30">
                                    IG: {ord.instagramUsername.startsWith('@') ? ord.instagramUsername : `@${ord.instagramUsername}`}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                                  ord.status === 'Active'
                                    ? 'bg-blue-500/20 text-cyan-300 border-blue-500/30'
                                    : ord.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}
                              >
                                <option value="Pending" className="bg-[#060B1E] text-amber-300">Pending Intake</option>
                                <option value="Active" className="bg-[#060B1E] text-cyan-300">Active Roster</option>
                                <option value="Completed" className="bg-[#060B1E] text-emerald-300">Graduated</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => setSelectedOrderForModal(ord)}
                                  className="p-2 rounded-lg bg-[#0A122E] hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-400 transition-colors cursor-pointer"
                                  title="View Full Client Assessment & Goals"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`Remove registration for ${ord.clientName}?`)) {
                                      deleteOrder(ord.id);
                                    }
                                  }}
                                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                                  title="Delete Client Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CHANGE PACKAGE PRICES */}
        {activeTab === 'package_prices' && (
          <AdminPackagePrices />
        )}

        {/* TAB 2: VIDEO TRAINING & TECHNIQUE HUB (VIDEO FEATURE) */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                    Coach Dawit Video Reel & Technique Lab
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white mt-1">
                  Interactive Video Demonstration & Intake Hub
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Play and review coaching demonstration videos, biomechanics breakdown, and client onboarding instructions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('media')}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload / Link New Video</span>
                </button>
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30">
                  {videoPlaylist.length} Coaching Videos
                </span>
              </div>
            </div>

            {/* Video Player & Playlist Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {(() => {
                const currentVid = videoPlaylist[currentVideoIndex] || videoPlaylist[0];
                const parsedCurrentVid = currentVid ? parseVideoLink(currentVid.src) : null;
                const isEmbed = parsedCurrentVid?.isEmbed && parsedCurrentVid.embedUrl;

                return (
                  <div className="lg:col-span-8 rounded-3xl border border-cyan-500/30 bg-[#060B1E] overflow-hidden shadow-2xl flex flex-col justify-between">
                    {/* HTML5 Video Element or Embed Iframe */}
                    <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                      {isEmbed ? (
                        <iframe
                          src={parsedCurrentVid.embedUrl}
                          title={currentVid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            src={parsedCurrentVid?.directUrl || currentVid.src}
                            poster={currentVid.thumbnail}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            className="w-full h-full object-cover"
                            playsInline
                          />

                          {/* Play/Pause Center Overlay */}
                          <button
                            onClick={togglePlayVideo}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer group-hover:scale-105"
                          >
                            <div className="w-16 h-16 rounded-full bg-cyan-500/80 hover:bg-cyan-400 text-[#020510] flex items-center justify-center shadow-2xl shadow-cyan-400/50 backdrop-blur-xs transition-transform">
                              {isPlaying ? (
                                <Pause className="w-8 h-8 fill-current" />
                              ) : (
                                <Play className="w-8 h-8 fill-current ml-1" />
                              )}
                            </div>
                          </button>

                          {/* Bottom Video Controls Bar */}
                          <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white text-xs">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={togglePlayVideo}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>

                              <button
                                onClick={toggleMuteVideo}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                              >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>

                              <span className="font-mono text-[11px] text-cyan-300 font-bold">
                                {currentVid.title}
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                if (videoRef.current?.requestFullscreen) {
                                  videoRef.current.requestFullscreen();
                                }
                              }}
                              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                              title="Fullscreen"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* Floating Video Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                        {currentVid.category} • {currentVid.duration}
                      </div>
                    </div>

                    {/* Video Info Details Card */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-heading font-black text-xl text-white">
                        {videoPlaylist[currentVideoIndex].title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {videoPlaylist[currentVideoIndex].description}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold shrink-0">
                      {videoPlaylist[currentVideoIndex].duration}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A122E] border border-blue-900/40">
                    <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
                      Key Coaching Takeaways:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {videoPlaylist[currentVideoIndex].keyNotes.map((note, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
                );
              })()}

              {/* Video Playlist Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="font-heading font-bold text-sm text-slate-300 uppercase tracking-wider">
                  Select Video Lesson ({videoPlaylist.length})
                </h4>

                <div className="space-y-3">
                  {videoPlaylist.map((item, idx) => {
                    const isSelected = idx === currentVideoIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setCurrentVideoIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-400 bg-linear-to-r from-blue-950/80 to-[#0A1434] shadow-lg shadow-cyan-950/40'
                            : 'border-slate-800 bg-[#060B1E] hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="w-4 h-4 text-white fill-white" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase text-cyan-400">
                                {item.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {item.duration}
                              </span>
                            </div>
                            <p className="font-bold text-xs text-white truncate mt-0.5">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: QUICK TEXT & CLIENT ONBOARDING BROADCAST (TEXT FEATURE) */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Coach Dawit Text Briefing & Client Message Generator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  1-click pre-composed welcome messages, daily workout strategy notes, and intake SMS templates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Box 1: 1-Click Client Welcome Message Generator */}
              <div className="p-6 rounded-3xl border border-cyan-500/30 bg-[#060B1E] shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-cyan-400" />
                    <h4 className="font-heading font-black text-base text-white">
                      Instant Client Welcome Generator
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Live Client Sync
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Choose Registered Client:
                  </label>
                  <select
                    value={selectedClientForText}
                    onChange={(e) => setSelectedClientForText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A122E] border border-slate-700 text-xs text-white focus:outline-hidden focus:border-cyan-400"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.clientName} ({o.packageName}) - {o.phone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rendered Welcome Text Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Formatted Welcome Message Ready to Send:
                  </label>
                  <div className="p-4 rounded-xl bg-[#020510] border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed">
                    {generateWelcomeText(selectedClientData)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => handleCopyText(generateWelcomeText(selectedClientData))}
                    className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#020510] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/30 transition-all"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Welcome Message</span>
                      </>
                    )}
                  </button>

                  {selectedClientData && (
                    <a
                      href={`tel:${selectedClientData.phone}`}
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Client Directly</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Box 2: Coach Dawit Daily Command Briefing Notes */}
              <div className="p-6 rounded-3xl border border-blue-500/30 bg-[#060B1E] shadow-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-heading font-black text-base text-white">
                        Coach Dawit Daily Training Notes & Agendas
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Local Storage Active</span>
                  </div>

                  <p className="text-xs text-slate-400 mb-2">
                    Jot down athlete reminders, form review priorities, and gym schedule updates for today:
                  </p>

                  <textarea
                    rows={8}
                    value={customTextDraft}
                    onChange={(e) => setCustomTextDraft(e.target.value)}
                    placeholder="Write workout notes, athlete progress remarks, or daily nutrition targets..."
                    className="w-full p-4 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white focus:outline-hidden focus:border-blue-400 font-mono leading-relaxed resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-cyan-400 font-semibold">
                    • Persists on device automatically
                  </span>

                  <button
                    onClick={handleSaveNotes}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Daily Notes</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PICTURES, LOGO & VIDEO LINK MANAGER */}
        {activeTab === 'media' && (
          <div className="space-y-8">
            {/* Interactive Admin Media Management Form */}
            <AdminMediaManager onAddVideoToPlaylist={handleAddCustomVideoToPlaylist} />

            {/* Coach Dawit Profile Spotlight Card */}
            <div className="rounded-3xl border border-cyan-500/30 bg-linear-to-r from-[#060C20] via-[#0A1434] to-[#060C20] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Coach Photo */}
                <div className="md:col-span-4 relative group">
                  <div className="w-full h-72 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/30 relative">
                    <img
                      src={mediaSettings.coachPhotoUrl}
                      alt="Coach Dawit Solomon GerrardFit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#020510] via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 text-[#020510] text-[10px] font-black uppercase">
                        Verified Coach
                      </span>
                      <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        Ethiopia Premier Facility
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                      Head Coach & Founder
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">ISSA ID: #40006935</span>
                  </div>

                  <h3 className="font-heading text-3xl font-black text-white">
                    Coach Dawit Solomon
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Elite Personal Trainer specializing in athletic hypertrophy, biomechanical rehabilitation, and Habesha nutrition transformation. With over 6+ years coaching hundreds of professionals and athletes in Ethiopia and globally online, GerrardFit delivers data-driven, sustainable physiques.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#020510] border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Experience</span>
                      <p className="font-heading font-black text-lg text-cyan-400">6+ Years</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#020510] border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Transformed</span>
                      <p className="font-heading font-black text-lg text-emerald-400">100+ Clients</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#020510] border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Certifications</span>
                      <p className="font-heading font-black text-lg text-blue-400">ISSA Elite</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Official Logo Brand Assets & Gym Facility Pictures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Logo Asset 1: Primary Shield Mark */}
              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#060B1E] text-center space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-blue-700 via-cyan-500 to-blue-600 p-1 mx-auto shadow-xl shadow-cyan-500/30">
                  <div className="w-full h-full bg-white rounded-3xl flex flex-col items-center justify-center overflow-hidden p-2.5">
                    {mediaSettings.logoUrl ? (
                      <img
                        src={mediaSettings.logoUrl}
                        alt="Brand Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <Dumbbell className="w-10 h-10 text-cyan-400 -rotate-45" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-white mt-1">
                          G-FIT
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-black text-base text-white">Active Brand Logo</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Customizable via upload or image link above</p>
                </div>
                <div className="pt-2 flex justify-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-mono font-bold">#06B6D4</span>
                  <span className="px-2.5 py-1 rounded bg-black/60 text-slate-300 text-[10px] font-mono font-bold">#020510</span>
                </div>
              </div>

              {/* Gym Facility Picture 1 */}
              <div className="rounded-2xl border border-slate-800 bg-[#060B1E] overflow-hidden space-y-3 pb-4">
                <div className="h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
                    alt="Bole Atlas Gym Weight Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-4">
                  <h4 className="font-heading font-black text-sm text-white">Bole Atlas Facility Floor</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Free weights, Olympic barbells, and Eleiko plates used for 1-to-1 training.</p>
                </div>
              </div>

              {/* Gym Facility Picture 2 */}
              <div className="rounded-2xl border border-slate-800 bg-[#060B1E] overflow-hidden space-y-3 pb-4">
                <div className="h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                    alt="Athlete Training Conditioning Turf"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-4">
                  <h4 className="font-heading font-black text-sm text-white">Functional Conditioning Zone</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Sled turf, kettlebells, and pull-up rigs for athletic recomposition.</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: CERTIFICATES & CREDENTIALS (SECURITY & PRIVACY) */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Verified Personal Training Credentials
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage certified credentials displayed on the public About & Certificates section with anti-screenshot security.
                </p>
              </div>

              <button
                onClick={() => setIsAddCertModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Verified Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-cyan-500/20 bg-[#060B1E] p-5 flex flex-col justify-between space-y-4 hover:border-cyan-400/40 transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30">
                        Verified & Protected
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">
                        #{cert.credentialId}
                      </span>
                    </div>

                    <h4 className="font-heading font-black text-base text-white">{cert.title}</h4>
                    <p className="text-xs text-cyan-300 font-semibold">{cert.issuer}</p>

                    <div className="mt-3 text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Recipient:</span> {cert.recipient}</p>
                      <p><span className="text-slate-500">Valid:</span> {cert.issueDate} to {cert.expirationDate}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                      {cert.skills.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 text-[9px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => toggleCertificateVisibility(cert.id)}
                      className={`text-xs font-bold cursor-pointer ${
                        cert.isPublic ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {cert.isPublic ? 'Publicly Visible' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => deleteCertificate(cert.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: VIEW CLIENT DOSSIER / FULL ASSESSMENT */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#060B1E] border border-cyan-500/30 p-6 sm:p-8 text-white shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedOrderForModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                Athlete Client Intake Dossier
              </span>
              <h3 className="font-heading text-2xl font-black mt-1 text-white">
                {selectedOrderForModal.clientName}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedOrderForModal.id} • {selectedOrderForModal.packageName}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#020510] border border-slate-800 space-y-1.5">
                <p className="font-bold text-cyan-400 uppercase text-[10px]">Client Contact Information</p>
                <p><strong className="text-slate-400">Phone:</strong> {selectedOrderForModal.phone}</p>
                <p><strong className="text-slate-400">Email:</strong> {selectedOrderForModal.email}</p>
                <p><strong className="text-slate-400">Telegram Username:</strong> {selectedOrderForModal.telegramUsername || 'Not provided'}</p>
                {selectedOrderForModal.instagramUsername && (
                  <p><strong className="text-slate-400">Instagram Username:</strong> {selectedOrderForModal.instagramUsername}</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#020510] border border-slate-800 space-y-1.5">
                <p className="font-bold text-emerald-400 uppercase text-[10px]">Fitness Assessment & Goals</p>
                <p><strong className="text-slate-400">Stated Goal:</strong> {selectedOrderForModal.fitnessGoals}</p>
                <p><strong className="text-slate-400">Injuries / Constraints:</strong> {selectedOrderForModal.injuriesOrNotes || 'None reported'}</p>
                <p><strong className="text-slate-400">Preferred Routine:</strong> {selectedOrderForModal.preferredWorkoutTime}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#020510] border border-slate-800 space-y-1.5">
                <p className="font-bold text-blue-400 uppercase text-[10px]">Package Tier & Intake Status</p>
                <p><strong className="text-slate-400">Package:</strong> {selectedOrderForModal.packageName}</p>
                <p><strong className="text-slate-400">Monthly Rate:</strong> {new Intl.NumberFormat('en-US').format(selectedOrderForModal.priceETB)} ETB</p>
                <p><strong className="text-slate-400">Registration Type:</strong> Direct Client Intake</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={`tel:${selectedOrderForModal.phone}`}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client ({selectedOrderForModal.phone})</span>
              </a>

              <button
                onClick={() => handleCopyText(generateWelcomeText(selectedOrderForModal))}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Welcome Note</span>
              </button>

              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD VERIFIED CERTIFICATE */}
      {isAddCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#060B1E] border border-cyan-500/30 p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setIsAddCertModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-black mb-4">Add Verified Personal Training Certificate</h3>

            <form onSubmit={handleCreateCertificate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Issuing Body</label>
                  <input
                    type="text"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Credential ID</label>
                  <input
                    type="text"
                    value={certCredentialId}
                    onChange={(e) => setCertCredentialId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={certIssueDate}
                    onChange={(e) => setCertIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Expiration Date</label>
                  <input
                    type="date"
                    value={certExpDate}
                    onChange={(e) => setCertExpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Verified Competencies (comma-separated)</label>
                <input
                  type="text"
                  value={certSkills}
                  onChange={(e) => setCertSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#020510] border border-slate-700 text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
