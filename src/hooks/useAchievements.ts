
import { useState, useEffect } from 'react';
import { Achievement, UserProgress, UserTier } from '@/types/achievements';
import { achievementsData, userTiers } from '@/data/achievementsData';
import { toast } from '@/hooks/use-toast';

export const useAchievements = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 285,
    currentTier: userTiers[1], // Silver
    nextTier: userTiers[2], // Gold
    completedAchievements: achievementsData.filter(a => a.completed),
    pendingAchievements: achievementsData.filter(a => !a.completed),
    stats: {
      ebooksRead: 8,
      videosWatched: 23,
      commentsPosted: 12,
      daysActive: 45,
      streakDays: 5,
      loginCount: 67
    }
  });

  const getCurrentTier = (points: number): UserTier => {
    return userTiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints) || userTiers[0];
  };

  const getNextTier = (currentTier: UserTier): UserTier | undefined => {
    const currentIndex = userTiers.findIndex(tier => tier.level === currentTier.level);
    return currentIndex < userTiers.length - 1 ? userTiers[currentIndex + 1] : undefined;
  };

  const checkForNewAchievements = (newStats: any) => {
    const newlyCompleted: Achievement[] = [];
    
    userProgress.pendingAchievements.forEach(achievement => {
      let shouldComplete = false;
      
      switch (achievement.id) {
        case 'ebook-enthusiast':
          shouldComplete = newStats.ebooksRead >= achievement.requirement;
          break;
        case 'video-marathon':
          shouldComplete = newStats.videosWatched >= achievement.requirement;
          break;
        case 'community-helper':
          shouldComplete = newStats.commentsPosted >= achievement.requirement;
          break;
        case 'week-streak':
          shouldComplete = newStats.streakDays >= achievement.requirement;
          break;
        // Adicione mais casos conforme necessário
      }
      
      if (shouldComplete && !achievement.completed) {
        const completedAchievement = {
          ...achievement,
          completed: true,
          completedAt: new Date(),
          currentProgress: achievement.requirement
        };
        newlyCompleted.push(completedAchievement);
      }
    });

    // Mostrar notificações para novas conquistas
    newlyCompleted.forEach(achievement => {
      toast({
        title: "🎉 Nova Conquista Desbloqueada!",
        description: `${achievement.title} - ${achievement.reward}`,
        duration: 5000,
      });
    });

    if (newlyCompleted.length > 0) {
      const newTotalPoints = userProgress.totalPoints + newlyCompleted.reduce((sum, a) => sum + a.points, 0);
      const newCurrentTier = getCurrentTier(newTotalPoints);
      const newNextTier = getNextTier(newCurrentTier);
      
      // Verificar se subiu de nível
      if (newCurrentTier.level !== userProgress.currentTier.level) {
        toast({
          title: "🚀 Parabéns! Você subiu de nível!",
          description: `Agora você é ${newCurrentTier.name} e tem ${newCurrentTier.discount}% de desconto!`,
          duration: 6000,
        });
      }

      setUserProgress(prev => ({
        ...prev,
        totalPoints: newTotalPoints,
        currentTier: newCurrentTier,
        nextTier: newNextTier,
        completedAchievements: [...prev.completedAchievements, ...newlyCompleted],
        pendingAchievements: prev.pendingAchievements.filter(a => !newlyCompleted.find(nc => nc.id === a.id)),
        stats: newStats
      }));
    }
  };

  const updateStats = (statType: keyof UserProgress['stats'], increment: number = 1) => {
    const newStats = {
      ...userProgress.stats,
      [statType]: userProgress.stats[statType] + increment
    };
    
    checkForNewAchievements(newStats);
  };

  return {
    userProgress,
    updateStats,
    getCurrentTier,
    getNextTier
  };
};
