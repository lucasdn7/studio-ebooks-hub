
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Achievement, UserProgress, UserTier } from '@/types/achievements';
import { userTiers } from '@/data/achievementsData';
import { toast } from '@/hooks/use-toast';

export const useAchievementsSupabase = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    } else {
      setUserProgress(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      // Buscar estatísticas do usuário
      const { data: userStats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      // Buscar conquistas disponíveis
      const { data: achievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*');

      if (achievementsError) throw achievementsError;

      // Buscar conquistas do usuário
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);

      if (userAchievementsError) throw userAchievementsError;

      const stats = userStats || {
        ebooks_read: 0,
        comments_posted: 0,
        days_active: 0,
        streak_days: 0,
        login_count: 0,
        bundles_purchased: 0,
        certificates_earned: 0,
        total_points: 0,
        current_tier: 'bronze',
        is_premium: false
      };

      const currentTier = getCurrentTier(stats.total_points);
      const nextTier = getNextTier(currentTier);

      // Mapear conquistas
      const completedAchievements: Achievement[] = [];
      const pendingAchievements: Achievement[] = [];

      achievements?.forEach(achievement => {
        const userAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
        
        const mappedAchievement: Achievement = {
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon || '🏆',
          category: achievement.type === 'badge' ? 'content' : 'special',
          requirement: achievement.requirement || 1,
          currentProgress: userAchievement?.current_progress || 0,
          completed: userAchievement?.completed || false,
          completedAt: userAchievement?.completed_at ? new Date(userAchievement.completed_at) : undefined,
          points: achievement.points,
          reward: achievement.type === 'badge' ? 'Badge de conquista' : 'Medalha especial',
          premiumOnly: achievement.premium_only || false
        };

        if (mappedAchievement.completed) {
          completedAchievements.push(mappedAchievement);
        } else {
          pendingAchievements.push(mappedAchievement);
        }
      });

      setUserProgress({
        totalPoints: stats.total_points,
        currentTier,
        nextTier,
        completedAchievements,
        pendingAchievements,
        certificates: [],
        isPremium: stats.is_premium,
        stats: {
          ebooksRead: stats.ebooks_read,
          commentsPosted: stats.comments_posted,
          daysActive: stats.days_active,
          streakDays: stats.streak_days,
          loginCount: stats.login_count,
          bundlesPurchased: stats.bundles_purchased,
          certificatesEarned: stats.certificates_earned
        }
      });

    } catch (error) {
      console.error('Erro ao buscar progresso do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentTier = (points: number): UserTier => {
    return userTiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints) || userTiers[0];
  };

  const getNextTier = (currentTier: UserTier): UserTier | undefined => {
    const currentIndex = userTiers.findIndex(tier => tier.level === currentTier.level);
    return currentIndex < userTiers.length - 1 ? userTiers[currentIndex + 1] : undefined;
  };

  const updateStats = async (statType: string, increment: number = 1) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('increment_user_stat', {
        user_id: user.id,
        stat_name: statType,
        increment_value: increment
      });

      if (error) throw error;

      // Atualizar dados localmente
      await fetchUserProgress();
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
    }
  };

  return {
    userProgress,
    loading,
    updateStats,
    getCurrentTier,
    getNextTier,
    fetchUserProgress
  };
};
