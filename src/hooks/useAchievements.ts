import { useState, useEffect } from 'react';
import { Achievement, UserProgress, UserTier, Certificate } from '@/types/achievements';
import { achievementsData, userTiers, certificatesData } from '@/data/achievementsData';
import { toast } from '@/hooks/use-toast';

export const useAchievements = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 185,
    currentTier: userTiers[0], // Bronze
    nextTier: userTiers[1], // Silver
    completedAchievements: achievementsData.filter(a => a.completed),
    pendingAchievements: achievementsData.filter(a => !a.completed),
    certificates: certificatesData,
    isPremium: true, // Simulando usuário premium para mostrar conquistas
    stats: {
      ebooksRead: 3,
      commentsPosted: 5,
      daysActive: 18,
      streakDays: 3,
      loginCount: 42,
      bundlesPurchased: 0,
      certificatesEarned: 0
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
      // Verificar se é premium para acessar conquistas
      if (achievement.premiumOnly && !userProgress.isPremium) {
        return;
      }

      let shouldComplete = false;
      
      switch (achievement.id) {
        case 'ebook-enthusiast':
          shouldComplete = newStats.ebooksRead >= achievement.requirement;
          break;
        case 'bundle-collector':
          shouldComplete = newStats.bundlesPurchased >= achievement.requirement;
          break;
        case 'community-helper':
          shouldComplete = newStats.commentsPosted >= achievement.requirement;
          break;
        case 'week-streak':
        case 'month-streak':
          shouldComplete = newStats.streakDays >= achievement.requirement;
          break;
        case 'first-certificate':
        case 'certificate-master':
          shouldComplete = newStats.certificatesEarned >= achievement.requirement;
          break;
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

  const checkCertificateProgress = (ebookTitle: string) => {
    const updatedCertificates = userProgress.certificates.map(cert => {
      if (cert.requiredEbooks.includes(ebookTitle) && !cert.completedEbooks.includes(ebookTitle)) {
        const newCompletedEbooks = [...cert.completedEbooks, ebookTitle];
        const isCompleted = newCompletedEbooks.length === cert.requiredEbooks.length;
        
        if (isCompleted && !cert.completed) {
          toast({
            title: "🏆 Certificado Digital Conquistado!",
            description: `Parabéns! Você ganhou o certificado: ${cert.title}`,
            duration: 6000,
          });
          
          // Atualizar stats de certificados
          const newStats = {
            ...userProgress.stats,
            certificatesEarned: userProgress.stats.certificatesEarned + 1
          };
          checkForNewAchievements(newStats);
        }
        
        return {
          ...cert,
          completedEbooks: newCompletedEbooks,
          completed: isCompleted,
          completedAt: isCompleted ? new Date() : cert.completedAt
        };
      }
      return cert;
    });

    setUserProgress(prev => ({ ...prev, certificates: updatedCertificates }));
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
    getNextTier,
    checkCertificateProgress
  };
};
