import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { parseVideoLink } from '../utils/mediaUtils';
import {
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  RotateCcw,
  Check,
  Play,
  Dumbbell,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Camera,
  Layers,
  Film,
  Plus
} from 'lucide-react';

interface AdminMediaManagerProps {
  onAddVideoToPlaylist?: (video: {
    id: string;
    title: string;
    src: string;
    duration: string;
    category: string;
    description: string;
    thumbnail: string;
    keyNotes: string[];
  }) => void;
}

const PHOTO_PRESETS = [
  {
    name: 'Athletic Hypertrophy (Default)',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    tag: 'Hero Signature'
  },
  {
    name: 'Coaching Floor & Conditioning',
    url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
    tag: 'Bole Facility'
  },
  {
    name: 'Heavy Barbell Strength Training',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Biomechanics'
  },
  {
    name: 'High Performance Fitness Studio',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
    tag: 'Premier Elite'
  }
];

const SAMPLE_VIDEO_LINKS = [
  {
    label: 'Sample MP4 (Transformation Protocol)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: '12-Week Transformation Journey with Dawit Solomon'
  },
  {
    label: 'Sample MP4 (Gym Technique Breakdown)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'ISSA Biomechanics & Posture Analysis'
  },
  {
    label: 'Sample YouTube (GerrardFit Story)',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Dawit Solomon Client Transformation Showcase'
  }
];

export const AdminMediaManager: React.FC<AdminMediaManagerProps> = ({ onAddVideoToPlaylist }) => {
  const { mediaSettings, updateMediaSettings, resetMediaSettings, showNotification } = useApp();

  // Active sub-tab in Media Manager
  const [activeMediaSection, setActiveMediaSection] = useState<'all' | 'logo' | 'photo' | 'video'>('all');

  // Brand Logo form state
  const [logoMode, setLogoMode] = useState<'upload' | 'url'>('url');
  const [logoUrlInput, setLogoUrlInput] = useState(mediaSettings.logoUrl);

  // Coach Photo form state
  const [photoMode, setPhotoMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [photoUrlInput, setPhotoUrlInput] = useState(mediaSettings.coachPhotoUrl);

  // Video by Link form state
  const [videoUrlInput, setVideoUrlInput] = useState(mediaSettings.videoUrl);
  const [videoTitleInput, setVideoTitleInput] = useState(mediaSettings.videoTitle);
  const [videoDescInput, setVideoDescInput] = useState(mediaSettings.videoDescription || '');

  // Keep local inputs in sync if mediaSettings changes externally
  useEffect(() => {
    setLogoUrlInput(mediaSettings.logoUrl);
    setPhotoUrlInput(mediaSettings.coachPhotoUrl);
    setVideoUrlInput(mediaSettings.videoUrl);
    setVideoTitleInput(mediaSettings.videoTitle);
    setVideoDescInput(mediaSettings.videoDescription || '');
  }, [mediaSettings]);

  // Video Link Parsing
  const videoParsed = parseVideoLink(videoUrlInput);

  // Logo file upload handler
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Logo image must be smaller than 5MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoUrlInput(result);
      updateMediaSettings({ logoUrl: result });
    };
    reader.readAsDataURL(file);
  };

  // Coach photo file upload handler
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      showNotification('Photo must be smaller than 8MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoUrlInput(result);
      updateMediaSettings({ coachPhotoUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLogoUrl = () => {
    updateMediaSettings({ logoUrl: logoUrlInput.trim() });
  };

  const handleResetLogo = () => {
    setLogoUrlInput('');
    updateMediaSettings({ logoUrl: '' });
  };

  const handleApplyPhotoUrl = () => {
    if (!photoUrlInput.trim()) {
      showNotification('Please provide a valid image URL', 'error');
      return;
    }
    updateMediaSettings({ coachPhotoUrl: photoUrlInput.trim() });
  };

  const handleSelectPresetPhoto = (url: string) => {
    setPhotoUrlInput(url);
    updateMediaSettings({ coachPhotoUrl: url });
  };

  const handleSaveVideoByLink = () => {
    if (!videoUrlInput.trim()) {
      showNotification('Please enter a valid video link (YouTube, Vimeo, or direct MP4 URL)', 'error');
      return;
    }
    updateMediaSettings({
      videoUrl: videoUrlInput.trim(),
      videoTitle: videoTitleInput.trim() || 'Transformation Journey with Dawit Solomon',
      videoDescription: videoDescInput.trim()
    });
  };

  const handleAddVideoToHub = () => {
    if (!videoUrlInput.trim()) {
      showNotification('Please enter a video link first', 'error');
      return;
    }
    if (onAddVideoToPlaylist) {
      onAddVideoToPlaylist({
        id: `custom-video-${Date.now()}`,
        title: videoTitleInput.trim() || 'Custom Coaching Video by Link',
        src: videoUrlInput.trim(),
        duration: 'Stream Link',
        category: 'Custom Video',
        description: videoDescInput.trim() || 'Uploaded by link via Admin Media Manager.',
        thumbnail: mediaSettings.coachPhotoUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        keyNotes: ['Configured dynamically via Admin Link', 'Accessible to all clients']
      });
      showNotification('Added video link to Video Training Hub playlist!', 'success');
    }
  };

  return (
    <div className="space-y-8" id="admin-media-manager-panel">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-linear-to-r from-[#060B1E] via-[#0A1434] to-[#060B1E] border border-cyan-500/30 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
              Live Brand & Media Control Center
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
            Change Brand Logo, Coach Picture & Video
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
            Update your public branding in real time. Videos can be provided by pasting any video link (YouTube, Vimeo, or MP4 URL).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => resetMediaSettings()}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700 transition-colors"
            title="Restore default brand logo, hero photo and video"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Default</span>
          </button>
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveMediaSection('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMediaSection === 'all'
              ? 'bg-cyan-500 text-[#020510] shadow-md shadow-cyan-500/30'
              : 'bg-[#060B1E] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Media Controls
        </button>
        <button
          onClick={() => setActiveMediaSection('logo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeMediaSection === 'logo'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-[#060B1E] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Brand Logo</span>
        </button>
        <button
          onClick={() => setActiveMediaSection('photo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeMediaSection === 'photo'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-[#060B1E] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Coach Dawit Picture</span>
        </button>
        <button
          onClick={() => setActiveMediaSection('video')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeMediaSection === 'video'
              ? 'bg-cyan-500 text-[#020510] shadow-md shadow-cyan-500/30'
              : 'bg-[#060B1E] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <VideoIcon className="w-3.5 h-3.5" />
          <span>Video by Link</span>
        </button>
      </div>

      {/* ================= 1. BRAND LOGO MANAGER ================= */}
      {(activeMediaSection === 'all' || activeMediaSection === 'logo') && (
        <div className="p-6 rounded-3xl bg-[#060B1E] border border-cyan-500/20 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-cyan-400" />
                <h4 className="font-heading font-black text-lg text-white">
                  1. Brand Logo Management
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Customize the official GerrardFit brand logo displayed in the header navigation, footer, and admin panel.
              </p>
            </div>
            {mediaSettings.logoUrl && (
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-500/30">
                Custom Logo Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Live Preview Box */}
            <div className="lg:col-span-5 space-y-3">
              <label className="text-xs font-bold uppercase text-slate-300 tracking-wider block">
                Live Logo Preview (Header & Dark Mode Display)
              </label>
              
              <div className="p-6 rounded-2xl bg-[#020510] border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 w-full justify-center">
                  {logoUrlInput ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-cyan-400/40 p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={logoUrlInput}
                        alt="Brand Logo Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0">
                      <Dumbbell className="w-6 h-6 -rotate-12" />
                    </div>
                  )}
                  <div className="text-left">
                    <span className="font-heading font-black text-xl text-white tracking-tight flex items-center">
                      GERRARD<span className="text-blue-500">FIT</span>
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 block">
                      ISSA Certified • Coach Dawit
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400">
                  {logoUrlInput ? 'Official GerrardFit brand emblem active' : 'Using default high-contrast electric blue emblem'}
                </span>
              </div>
            </div>

            {/* Controls Box */}
            <div className="lg:col-span-7 space-y-4">
              {/* Brand Presets */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Official GerrardFit Logo Styles:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setLogoUrlInput('/assets/gerrardfit_logo.svg');
                      updateMediaSettings({ logoUrl: '/assets/gerrardfit_logo.svg' });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>Black Emblem (Active)</span>
                  </button>
                  <button
                    onClick={() => {
                      setLogoUrlInput('/assets/gerrardfit_logo_badge.svg');
                      updateMediaSettings({ logoUrl: '/assets/gerrardfit_logo_badge.svg' });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>Shield Badge Edition</span>
                  </button>
                  <button
                    onClick={() => {
                      setLogoUrlInput('/assets/gerrardfit_logo_cyan.svg');
                      updateMediaSettings({ logoUrl: '/assets/gerrardfit_logo_cyan.svg' });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    <span>Electric Cyan</span>
                  </button>
                  <button
                    onClick={() => {
                      setLogoUrlInput('/assets/gerrardfit_logo_white.svg');
                      updateMediaSettings({ logoUrl: '/assets/gerrardfit_logo_white.svg' });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Pure White</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 pt-2">
                <button
                  onClick={() => setLogoMode('url')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    logoMode === 'url' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Logo Image URL</span>
                </button>
                <button
                  onClick={() => setLogoMode('upload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    logoMode === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Logo File</span>
                </button>
              </div>

              {logoMode === 'url' ? (
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold">
                    Enter Direct Image Link (PNG, SVG, or JPG)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={logoUrlInput}
                      onChange={(e) => setLogoUrlInput(e.target.value)}
                      placeholder="https://example.com/brand-logo.png"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-cyan-400"
                    />
                    <button
                      onClick={handleApplyLogoUrl}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold">
                    Upload Logo From Device (Instant Preview & Save)
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-cyan-400/60 rounded-2xl bg-[#020510] cursor-pointer transition-colors group">
                    <Upload className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200">Click or Drag & Drop Image Here</span>
                    <span className="text-[10px] text-slate-400 mt-1">Supports PNG, SVG, JPG, WebP (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Updates header, footer, and admin brand marks automatically.
                </span>
                {logoUrlInput && (
                  <button
                    onClick={handleResetLogo}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer underline"
                  >
                    Reset to Default Logo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. COACH PHOTO / HERO PICTURE MANAGER ================= */}
      {(activeMediaSection === 'all' || activeMediaSection === 'photo') && (
        <div className="p-6 rounded-3xl bg-[#060B1E] border border-blue-500/20 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <h4 className="font-heading font-black text-lg text-white">
                  2. Coach Dawit Hero & Profile Picture
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Change the high-resolution coaching picture displayed in the Hero Card, About & Certificates section, and Admin profile.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase border border-blue-500/30">
              Live Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Live Preview Box */}
            <div className="lg:col-span-5 space-y-3">
              <label className="text-xs font-bold uppercase text-slate-300 tracking-wider block">
                Current Active Picture (Hero Section)
              </label>

              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl bg-slate-900 group">
                <img
                  src={photoUrlInput || mediaSettings.coachPhotoUrl}
                  alt="Coach Dawit Solomon Hero"
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020510] via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ISSA Certified</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Head Coach & Founder</p>
                  <p className="font-heading font-black text-base">Dawit Solomon (Gerrard)</p>
                  <p className="text-[11px] text-slate-300">Ethiopia Premier Facility • 100+ Trained</p>
                </div>
              </div>
            </div>

            {/* Controls Box */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <button
                  onClick={() => setPhotoMode('presets')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    photoMode === 'presets' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Curated Presets</span>
                </button>
                <button
                  onClick={() => setPhotoMode('url')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    photoMode === 'url' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Image URL</span>
                </button>
                <button
                  onClick={() => setPhotoMode('upload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    photoMode === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
              </div>

              {photoMode === 'presets' && (
                <div className="space-y-3">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Choose from Curated Coach Dawit Photo Presets
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PHOTO_PRESETS.map((preset) => {
                      const isSelected = photoUrlInput === preset.url;
                      return (
                        <div
                          key={preset.name}
                          onClick={() => handleSelectPresetPhoto(preset.url)}
                          className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-cyan-400 text-white'
                              : 'bg-[#020510] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold truncate">{preset.name}</p>
                            <span className="text-[10px] text-cyan-400 font-semibold">{preset.tag}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {photoMode === 'url' && (
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Enter Direct Picture Link (High-Resolution JPG / WebP)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      placeholder="https://example.com/coach-photo.jpg"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-cyan-400"
                    />
                    <button
                      onClick={handleApplyPhotoUrl}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {photoMode === 'upload' && (
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Upload Coach Photo From Computer or Phone
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-cyan-400/60 rounded-2xl bg-[#020510] cursor-pointer transition-colors group">
                    <Upload className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-200">Click or Drag & Drop Photo Here</span>
                    <span className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, WebP (Max 8MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. FEATURED VIDEO (UPLOADED BY LINK) ================= */}
      {(activeMediaSection === 'all' || activeMediaSection === 'video') && (
        <div className="p-6 rounded-3xl bg-[#060B1E] border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-cyan-400" />
                <h4 className="font-heading font-black text-lg text-white">
                  3. Featured Video (Uploaded by Link)
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enter any video link (YouTube, Vimeo, or direct MP4/WebM URL). This video plays when users click "Watch Story" in the Hero section and is featured across the platform.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-500/30">
              Provider: {videoParsed.provider.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Live Video Player Preview Box */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-slate-300 tracking-wider block">
                  Interactive Video Player Preview
                </label>
                <span className="text-[10px] font-mono text-cyan-400">
                  {videoParsed.isEmbed ? 'Embed Mode' : 'HTML5 Direct Mode'}
                </span>
              </div>

              {/* Real Video Player Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center group">
                {videoParsed.isEmbed && videoParsed.embedUrl ? (
                  <iframe
                    src={videoParsed.embedUrl}
                    title={videoTitleInput || 'GerrardFit Story Video Preview'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : videoParsed.directUrl ? (
                  <video
                    src={videoParsed.directUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <Film className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">Enter a video link to see live interactive preview</p>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-[#020510] border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="truncate pr-2">
                  <span className="text-slate-500">Title: </span>
                  <span className="font-bold text-white">{videoTitleInput || 'Untitled Video'}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold shrink-0">
                  ✓ Ready for Public Playback
                </span>
              </div>
            </div>

            {/* Video Link Form Controls */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Quick Sample Links */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                  Quick Testing Links
                </label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_VIDEO_LINKS.map((sample) => (
                    <button
                      key={sample.label}
                      onClick={() => {
                        setVideoUrlInput(sample.url);
                        setVideoTitleInput(sample.title);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#020510] hover:bg-slate-800 border border-slate-800 text-[11px] text-cyan-300 hover:text-white cursor-pointer transition-colors"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Link Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">
                  Video Link (URL) *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-cyan-400 font-mono"
                  />
                  <LinkIcon className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                </div>
                <p className="text-[10px] text-slate-400">
                  Supports YouTube standard URLs, YouTube Shorts, Vimeo URLs, or direct .mp4/.webm video links.
                </p>
              </div>

              {/* Video Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">
                  Video Title (Displayed in Player & Modal)
                </label>
                <input
                  type="text"
                  value={videoTitleInput}
                  onChange={(e) => setVideoTitleInput(e.target.value)}
                  placeholder="e.g. 12-Week Transformation Journey with Dawit Solomon"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              {/* Video Description Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">
                  Video Notes / Protocol Summary (Optional)
                </label>
                <textarea
                  rows={2}
                  value={videoDescInput}
                  onChange={(e) => setVideoDescInput(e.target.value)}
                  placeholder="Key training cues, biomechanics notes, or athlete story..."
                  className="w-full px-4 py-2 rounded-xl bg-[#020510] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleSaveVideoByLink}
                  className="px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/30 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Apply Video Link</span>
                </button>

                <button
                  onClick={handleAddVideoToHub}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Video Training Hub</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
