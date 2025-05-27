
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'content' | 'social' | 'time' | 'special' | 'certification';
  requirement: number;
  currentProgress: number;
  completed: boolean;
  completedAt?: Date;
  points: number;
  reward?: string;
  seriesId?: string; // For certification achievements
}

export interface UserTier {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  discount: number;
  color: string;
  icon: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  seriesId: string;
  ebooksRequired: string[];
  completedAt?: Date;
  certificateUrl?: string;
}

export interface EbookBundle {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  ebooks: string[];
  bonus: string[];
  category: string;
  featured: boolean;
}

export interface UserProgress {
  totalPoints: number;
  currentTier: UserTier;
  nextTier?: UserTier;
  completedAchievements: Achievement[];
  pendingAchievements: Achievement[];
  certificates: Certificate[];
  stats: {
    ebooksRead: number;
    commentsPosted: number;
    daysActive: number;
    streakDays: number;
    loginCount: number;
    certificatesEarned: number;
    bundlesPurchased: number;
  };
}
