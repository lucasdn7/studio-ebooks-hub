
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'content' | 'social' | 'time' | 'special';
  requirement: number;
  currentProgress: number;
  completed: boolean;
  completedAt?: Date;
  points: number;
  reward?: string;
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
  stats: {
    ebooksRead: number;
    videosWatched: number;
    commentsPosted: number;
    daysActive: number;
    streakDays: number;
    loginCount: number;
  };
}
