export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'reading' | 'purchase' | 'social' | 'creator';
  points: number;
  requirement: number;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BadgeProgress {
  id: string;
  user_id: string;
  badge_id: string;
  progress: number;
  max_progress: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  user_id: string;
  total_points: number;
  level: number;
  achievements_count: number;
  badges_count: number;
  created_at: string;
  updated_at: string;
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
