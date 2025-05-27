
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'content' | 'social' | 'time' | 'special' | 'certificate';
  requirement: number;
  currentProgress: number;
  completed: boolean;
  completedAt?: Date;
  points: number;
  reward?: string;
  premiumOnly?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredEbooks: string[];
  completedEbooks: string[];
  completed: boolean;
  completedAt?: Date;
  certificateUrl?: string;
  icon: string;
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

export interface UserProgress {
  totalPoints: number;
  currentTier: UserTier;
  nextTier?: UserTier;
  completedAchievements: Achievement[];
  pendingAchievements: Achievement[];
  certificates: Certificate[];
  isPremium: boolean;
  stats: {
    ebooksRead: number;
    commentsPosted: number;
    daysActive: number;
    streakDays: number;
    loginCount: number;
    bundlesPurchased: number;
    certificatesEarned: number;
  };
}
