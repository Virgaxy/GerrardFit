import { PackageTier, Certificate, TransformationItem, VideoTestimonialItem, ClientOrder, SiteMediaSettings } from '../types';

export const DEFAULT_MEDIA_SETTINGS: SiteMediaSettings = {
  logoUrl: '/assets/gerrardfit_logo.svg',
  coachPhotoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  videoTitle: '12-Week Transformation Journey with Dawit Solomon',
  videoDescription: 'Client intake, posture screen, and habit rewiring protocols with ISSA Certified Trainer Dawit Solomon.',
  videoThumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  instagramUrl: 'https://www.instagram.com/p/DbTrB4yOKqK/?stkn=MWFjNWtlcnc5YzA5NQ==',
  tiktokUrl: 'https://www.tiktok.com/@gerrardfit',
  telegramUrl: 'https://t.me/gerrardfit',
  youtubeUrl: 'https://www.youtube.com/@gerrardfit',
  phone: '0900450154'
};

export const PACKAGES_DATA: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    tagline: 'Foundational strength, structured nutrition & habit mastery',
    priceETB: 1000,
    period: 'per month',
    category: 'online',
    description: 'Perfect for beginners or individuals looking for a structured, science-backed workout and meal blueprint tailored to Ethiopian dietary preferences.',
    features: [
      'Custom 4-Week Gym or Home Workout Split',
      'Habesha-Friendly Macronutrient Meal Guide',
      'Form Check Video Analysis (Bi-weekly)',
      'Direct Coach Q&A Support (Mon-Fri)',
      'Monthly Progress & Metric Adjustment',
      'Access to GerrardFit Exercise Video Vault'
    ],
    bestFor: 'Self-motivated lifters who need a strict roadmap',
    badge: 'Beginner Blueprint'
  },
  {
    id: 'online-plan',
    name: 'Online Plan',
    tagline: 'Comprehensive 1-on-1 digital coaching anywhere in Ethiopia or globally',
    priceETB: 5500,
    period: 'per month',
    category: 'online',
    popular: true,
    badge: 'Most Popular Online',
    description: 'The complete remote coaching experience. Personalized periodized programming, weekly video check-ins, custom Habesha macro targets, and continuous form optimization.',
    features: [
      '100% Customized Training Program (Home or Gym)',
      'Ethiopian Food Macro Calibration (Injera, Shiro, Tibs, Eggs)',
      'Weekly Comprehensive Video Check-ins & Metric Reviews',
      'Lift Biomechanics & Form Video Breakdown on Every Exercise',
      '24/7 Priority Direct Coach Chat & Messaging Access',
      'Weekly Caloric & Metabolic Adjustments as You Progress',
      'Cardio & Active Recovery Routine'
    ],
    bestFor: 'Individuals anywhere in Ethiopia or diaspora wanting elite remote coaching'
  },
  {
    id: 'transformation',
    name: 'Transformation Plan',
    tagline: 'Our signature 12-week body recomposition & high accountability',
    priceETB: 3000,
    period: 'per month',
    category: 'hybrid',
    badge: 'Signature Protocol',
    description: 'Our signature 12-week transformation protocol. Complete customized periodization, weekly check-in calls, daily diet calibration, and habit rewiring.',
    features: [
      '100% Bespoke Periodized Training Routine',
      'Calorie & Macro Dynamic Coaching + Local Food Swaps',
      'Weekly 1-on-1 Deep-Dive Video/Call Check-ins',
      'Form & Biomechanics Analysis on Every Lift',
      'Cardio & Active Recovery Protocols',
      'High Priority 24/7 Direct Coach Line',
      'Supplementation & Habit Tracking Routine'
    ],
    bestFor: 'Those serious about visible physique & strength shift in 12 weeks'
  },
  {
    id: 'one-to-one',
    name: '1 to 1 Plan',
    tagline: 'Dedicated private hands-on personal training in Ethiopia',
    priceETB: 4000,
    period: 'per month',
    category: 'in_person',
    badge: 'Dedicated In-Person',
    description: 'Direct hands-on personal training sessions with Coach Dawit Solomon in Ethiopia. Includes scheduled private gym sessions, real-time spotting, and comprehensive nutrition.',
    features: [
      '3x Weekly Private 1-on-1 In-Person Gym Sessions (Ethiopia - Premier Facility / Bole Atlas)',
      'Real-Time Spotting, Biomechanical Cueing & Posture Fixes',
      'Personalized Habesha Nutrition & Meal-Prep Strategy',
      'Bi-Weekly Body Composition & Caliper Measurements',
      'Direct Priority Telegram & Phone Access to Coach Dawit',
      'Pre-Workout Mobility & Injury Rehabilitation Guidance',
      'Complimentary GerrardFit Performance T-Shirt & Shaker Cup'
    ],
    bestFor: 'Clients in Ethiopia demanding in-person technique mastery and maximum results'
  },
  {
    id: 'vip-elite',
    name: 'VIP Elite Plan',
    tagline: 'Maximum high-touch coaching, daily monitoring & private sessions',
    priceETB: 7000,
    period: 'per month',
    category: 'hybrid',
    badge: 'Executive Athlete Tier',
    description: 'The highest echelon of fitness coaching in Ethiopia and online. Includes private sessions, daily tracking, lifestyle optimization, and direct phone access.',
    features: [
      'Everything in 1 to 1 & Transformation Plans',
      'Daily Biofeedback, Nutrition & Heart Rate Monitoring',
      'Flexible In-Person 1-on-1 Sessions + Virtual Live Training',
      'Direct VIP Phone Line to Coach Dawit 7 Days a Week',
      'Bloodwork & Micronutrient Optimization Advice',
      'Custom Travel & Dining Out Protocol for Ethiopian & International Venues',
      'Free GerrardFit Official Performance Merch Bundle',
      'Guaranteed Body Composition Shift or Extended Coaching'
    ],
    bestFor: 'Executives, athletes, and individuals demanding zero-compromise results'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'issa-cpt-40006935',
    title: 'ISSA Certified Personal Trainer',
    issuer: 'International Sports Sciences Association (ISSA)',
    recipient: 'Dawit Solomon',
    credentialId: '40006935',
    issueDate: '07-22-2024',
    expirationDate: '07-22-2028',
    imageUrl: '/assets/issa_certificate.jpg',
    verified: true,
    verificationHash: 'ISSA-VERIFIED-40006935-DWT-ETH-2028',
    skills: ['Biomechanics', 'Hypertrophy Periodization', 'Metabolic Conditioning', 'Client Assessment', 'Injury Prevention'],
    isPublic: true,
    ceoSignatory: 'Warren Heffelfinger, CEO'
  },
  {
    id: 'nasm-ces-2023',
    title: 'NASM Corrective Exercise Specialist (CES)',
    issuer: 'National Academy of Sports Medicine',
    recipient: 'Dawit Solomon',
    credentialId: 'NASM-CES-883192',
    issueDate: '03-14-2023',
    expirationDate: '03-14-2027',
    imageUrl: '/assets/issa_certificate.jpg',
    verified: true,
    verificationHash: 'NASM-CES-VALIDATED-883192',
    skills: ['Postural Correction', 'Joint Mobility', 'Kinetic Chain Screening', 'Functional Rehab'],
    isPublic: true,
    ceoSignatory: 'Dr. Micheal A. Clark, NASM'
  },
  {
    id: 'precision-nutrition-l1',
    title: 'Certified Sports Nutrition Coach (Pn1)',
    issuer: 'Precision Nutrition & Science-Based Athletics',
    recipient: 'Dawit Solomon',
    credentialId: 'PN1-SN-61048',
    issueDate: '11-05-2023',
    expirationDate: '11-05-2027',
    imageUrl: '/assets/issa_certificate.jpg',
    verified: true,
    verificationHash: 'PN-CERT-61048-VERIFIED',
    skills: ['Macronutrient Manipulation', 'Energy Balance', 'Fat Loss Biochemistry', 'Cultural Diet Adaptation'],
    isPublic: true,
    ceoSignatory: 'Dr. John Berardi, Ph.D.'
  }
];

export const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: 't-1',
    clientName: 'Yohannes T.',
    age: 29,
    category: 'Fat Loss',
    durationWeeks: 12,
    weightBefore: '94 kg',
    weightAfter: '78 kg',
    bodyFatBefore: '28%',
    bodyFatAfter: '13%',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    story: 'Working long software engineering hours in Bole, Yohannes struggled with visceral belly fat and low stamina. Through Coach Dawit\'s 12-week protocol, he dropped 16kg while retaining all lean muscle without cutting out traditional Ethiopian meals.',
    keyWins: ['-16 kg Body Weight', '-15% Body Fat', 'Deadlift 80kg -> 160kg', 'Zero Energy Slumps'],
    quote: 'Coach Gerrard completely shifted how I view nutrition and lifting. I still enjoyed Shiro and Injera with calibrated protein targets and achieved abs for the first time in my life!'
  },
  {
    id: 't-2',
    clientName: 'Selamawit B.',
    age: 26,
    category: 'Athletic Recomp',
    durationWeeks: 16,
    weightBefore: '68 kg',
    weightAfter: '62 kg',
    bodyFatBefore: '31%',
    bodyFatAfter: '19%',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    story: 'Selamawit was stuck in endless cardio loops without seeing tone or glute development. GerrardFit introduced heavy compound lifting, progressive overload, and high protein intake.',
    keyWins: ['Glute & Hamstring Definition', 'Resting Heart Rate from 78 to 58 bpm', 'Double squat PR', 'Posture alignment'],
    quote: 'I used to fear heavy weights. Dawit taught me technique, progressive overload, and gave me unstoppable confidence inside and outside the gym.'
  },
  {
    id: 't-3',
    clientName: 'Bruk M.',
    age: 34,
    category: 'Muscle Hypertrophy',
    durationWeeks: 20,
    weightBefore: '67 kg',
    weightAfter: '79 kg',
    bodyFatBefore: '12%',
    bodyFatAfter: '11%',
    beforeImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    story: 'A classic "hardgainer" who tried for years to put on shoulder and chest mass. With structured surplus periodization and intensity techniques, Bruk packed on 12kg of dense muscle tissue.',
    keyWins: ['+12 kg Lean Muscle', 'Bench Press 60kg -> 115kg', 'Broadened V-Taper Frame', 'Vastly Improved Digestion'],
    quote: 'GerrardFit is on a totally different level compared to random gym floor trainers. Every single set had a scientific rationale.'
  }
];

export const VIDEO_TESTIMONIALS: VideoTestimonialItem[] = [
  {
    id: 'v-1',
    clientName: 'Dr. Abel K.',
    occupation: 'Surgeon & Health Advocate',
    achievement: '-22kg & Reversal of Pre-Diabetes',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    videoDuration: '1:45 min',
    quote: 'As a medical professional, I scrutinized Dawit\'s methodology. His biomechanical awareness and metabolic nutrition are second to none in East Africa.',
    rating: 5
  },
  {
    id: 'v-2',
    clientName: 'Lensa G.',
    occupation: 'Tech Executive & Marathoner',
    achievement: 'Sub-4hr Marathon + Core Resilience',
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    videoDuration: '2:12 min',
    quote: 'The weekly accountability and structured check-ins kept me locked in during intense work travel. Best fitness investment I ever made.',
    rating: 5
  },
  {
    id: 'v-3',
    clientName: 'Mekdelawit Z.',
    occupation: 'Architect & Mother of 2',
    achievement: 'Postpartum Core Rebuilding',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    videoDuration: '1:30 min',
    quote: 'Coach Gerrard fixed my anterior pelvic tilt and lower back pain within the first month. Incredible results and unmatched empathy.',
    rating: 5
  }
];

export const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Biomechanical Audit & Nutritional Baseline',
    duration: 'Week 1 – 2',
    description: 'We analyze your posture, joint mobility, past injuries, eating patterns, and baseline metabolic rate. You get your custom macro target and workout split.',
    deliverable: 'Personalized GerrardFit Strategy Dossier'
  },
  {
    step: '02',
    title: 'Metabolic Shift & Hypertrophy Induction',
    duration: 'Week 3 – 6',
    description: 'Your body adapts to strict progressive overload and structured refeeds. Noticeable energy surge, reduction in waist circumference, and rapid strength gains.',
    deliverable: 'Bi-weekly Video Form Review & Macro Recalibration'
  },
  {
    step: '03',
    title: 'Plateau Smashing & Peak Intensity',
    duration: 'Week 7 – 9',
    description: 'Deload week followed by targeted high-density training blocks to shatter plateaus. Visibly pronounced vascularity and muscle separation.',
    deliverable: 'Mid-Journey Body Composition Check & Strength Benchmark'
  },
  {
    step: '04',
    title: 'Aesthetic Polish & Sustainable Blueprint',
    duration: 'Week 10 – 12',
    description: 'Final refinement phase for peak definition. We transition you into a maintenance phase so you keep your transformation for life without rebounding.',
    deliverable: 'Long-term Lifestyle Blueprint & Graduation Certificate'
  }
];

export const INITIAL_ORDERS: ClientOrder[] = [
  {
    id: 'GF-ET-8921',
    createdAt: '2026-09-08T10:15:00Z',
    clientName: 'Kidus Yohannes',
    email: 'kidusyohannes2552@gmail.com',
    phone: '0900450154',
    telegramUsername: '@kidus_fit',
    instagramUsername: '@kidus_y',
    packageId: 'transformation',
    packageName: '12-Week Transformation Plan',
    priceETB: 7500,
    fitnessGoals: 'Drop 12kg body fat while building athletic shoulder and core definition.',
    injuriesOrNotes: 'Minor shoulder impingement on bench press, needs form cues.',
    preferredWorkoutTime: 'Early Morning (6:00 AM - 7:30 AM)',
    paymentMethod: 'Registration Only',
    paymentStatus: 'Registered',
    status: 'Active',
    notes: 'Direct onboarding completed. Week 1 nutrition plan delivered.'
  },
  {
    id: 'GF-ET-8919',
    createdAt: '2026-09-07T14:30:00Z',
    clientName: 'Nardos Hailu',
    email: 'nardos.h@gmail.com',
    phone: '+251 922 884 120',
    telegramUsername: '+251922884120',
    instagramUsername: '@nardos_lifestyle',
    packageId: 'one-to-one',
    packageName: '1 to 1 In-Person Coaching',
    priceETB: 16000,
    fitnessGoals: 'Contest physique preparation, hypertrophy and high-level conditioning.',
    injuriesOrNotes: 'No injuries. Advanced lifter (4 years experience).',
    preferredWorkoutTime: 'Evening (6:30 PM)',
    paymentMethod: 'Registration Only',
    paymentStatus: 'Registered',
    status: 'Active',
    notes: 'Bi-weekly Bole Atlas gym in-person sessions scheduled.'
  },
  {
    id: 'GF-ET-8915',
    createdAt: '2026-09-09T08:00:00Z',
    clientName: 'Eyob Girma',
    email: 'eyob.girma@outlook.com',
    phone: '+251 944 190 283',
    telegramUsername: '+251944190283',
    packageId: 'online-plan',
    packageName: '100% Online Coaching Plan',
    priceETB: 6500,
    fitnessGoals: 'Consistent workout routine for desk job posture and beginner strength.',
    injuriesOrNotes: 'Lower back stiffness from sitting.',
    preferredWorkoutTime: 'Lunchtime (12:30 PM)',
    paymentMethod: 'Registration Only',
    paymentStatus: 'Registration Received',
    status: 'Pending',
    notes: 'New registration. Awaiting initial intake consultation call.'
  },
  {
    id: 'GF-ET-8890',
    createdAt: '2026-08-15T16:00:00Z',
    clientName: 'Biniam Tsegaye',
    email: 'biniam.ts@gmail.com',
    phone: '+251 912 345 678',
    telegramUsername: '+251912345678',
    packageId: 'transformation',
    packageName: '12-Week Transformation Plan',
    priceETB: 7500,
    fitnessGoals: 'Completed 12-week fat loss goal (-14kg).',
    injuriesOrNotes: 'None',
    preferredWorkoutTime: 'Morning',
    paymentMethod: 'Registration Only',
    paymentStatus: 'Completed Intake',
    status: 'Completed',
    notes: 'Successfully graduated. Moved to maintenance.'
  }
];

export const FAQS_DATA = [
  {
    q: 'Do I need a gym membership or can I train at home?',
    a: 'Both! Every GerrardFit plan is engineered specifically around your available equipment—whether you train in a commercial gym in Ethiopia, have dumbbells at home, or rely on bodyweight calisthenics.'
  },
  {
    q: 'Can I follow the meal plan eating traditional Ethiopian foods?',
    a: 'Absolutely. Coach Dawit specifically customizes macronutrient allocations for Ethiopian staples: Injera with Shiro, Lentils, Beef Tibs, Eggs, Dulet, Oats, and local fresh produce. You will never be forced onto an unsustainable Western diet.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all prominent Ethiopian payment options: Telebirr, CBE Birr, and direct Bank Transfer (Commercial Bank of Ethiopia, Awash Bank, Bank of Abyssinia).'
  },
  {
    q: 'How does personal coaching communication work?',
    a: 'Coach Dawit conducts all daily tracking, form video feedback, and rapid-response habit monitoring directly via dedicated Telegram & phone channels for real-time synchronization and accountability.'
  },
  {
    q: 'How do I verify Coach Dawit\'s credentials?',
    a: 'Dawit Solomon is a certified personal trainer with the International Sports Sciences Association (ISSA, Certificate #40006935). You can review the verified credential directly in our About & Certificates section with tamper-evident digital security.'
  }
];
