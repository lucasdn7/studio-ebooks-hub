
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface BadgeProgress {
  currentBadge: string;
  currentSales: number;
  currentCommissionRate: number;
  nextBadge?: string;
  nextBadgeRequirement?: number;
  salesToNextLevel?: number;
}

export const useBadgeProgress = () => {
  const { user } = useAuth();
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBadgeProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBadgeProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .rpc('get_creator_badge_progress', { user_uuid: user.id });

      if (error) throw error;

      if (data && data.length > 0) {
        const progress = data[0];
        setBadgeProgress({
          currentBadge: progress.current_badge,
          currentSales: progress.current_sales,
          currentCommissionRate: progress.current_commission_rate,
          nextBadge: progress.next_badge !== progress.current_badge ? progress.next_badge : undefined,
          nextBadgeRequirement: progress.next_badge !== progress.current_badge ? progress.next_badge_requirement : undefined,
          salesToNextLevel: progress.next_badge !== progress.current_badge ? progress.sales_to_next_level : undefined
        });
      }
    } catch (error) {
      console.error('Error fetching badge progress:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    badgeProgress,
    loading,
    refreshBadgeProgress: fetchBadgeProgress
  };
};
