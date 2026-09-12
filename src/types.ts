export type ThemeMode = 'dark' | 'light';

export type NavPage = 'home' | 'journeys' | 'packages' | 'about' | 'contact' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'client';
  provider: 'google' | 'github' | 'email';
  telegram?: string;
  phone?: string;
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  priceETB: number;
  period: string;
  popular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  bestFor: string;
  category?: 'in_person' | 'online' | 'hybrid';
  highlightColor?: string;
}

export interface ClientOrder {
  id: string;
  createdAt: string;
  clientName: string;
  email: string;
  phone: string;
  telegramUsername?: string;
  instagramUsername?: string;
  packageId: string;
  packageName: string;
  priceETB: number;
  fitnessGoals: string;
  injuriesOrNotes?: string;
  preferredWorkoutTime: string;
  paymentMethod?: string;
  paymentStatus?: string;
  paymentProofName?: string;
  paymentProofDataUrl?: string;
  status: 'Pending' | 'Active' | 'Completed';
  notes?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  recipient: string;
  credentialId: string;
  issueDate: string;
  expirationDate: string;
  imageUrl: string;
  verified: boolean;
  verificationHash: string;
  skills: string[];
  isPublic: boolean;
  ceoSignatory?: string;
}

export interface TransformationItem {
  id: string;
  clientName: string;
  age: number;
  category: 'Fat Loss' | 'Muscle Hypertrophy' | 'Athletic Recomp';
  durationWeeks: number;
  weightBefore: string;
  weightAfter: string;
  bodyFatBefore: string;
  bodyFatAfter: string;
  beforeImage: string;
  afterImage: string;
  story: string;
  keyWins: string[];
  quote: string;
}

export interface VideoTestimonialItem {
  id: string;
  clientName: string;
  occupation: string;
  achievement: string;
  thumbnail: string;
  videoDuration: string;
  quote: string;
  rating: number;
}

export interface SiteMediaSettings {
  logoUrl: string;
  coachPhotoUrl: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription?: string;
  videoThumbnail?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  phone?: string;
}
