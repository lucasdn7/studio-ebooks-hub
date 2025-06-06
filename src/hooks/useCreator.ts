
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type ContentCreator = Tables<'content_creators'>;
type CreatorEbook = Tables<'creator_ebooks'>;
type SalesAnalytic = Tables<'sales_analytics'>;

interface CreatorData {
  creator_id: string;
  total_ebooks: number;
  total_bundles: number;
  can_create_bundles: boolean;
}

export const useCreator = () => {
  const { user } = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<ContentCreator | null>(null);
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkCreatorStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkCreatorStatus = async () => {
    if (!user) return;

    try {
      // Check if user has creator role
      const { data: userStats } = await supabase
        .from('user_stats')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const hasCreatorRole = userStats?.role === 'creator';
      setIsCreator(hasCreatorRole);

      if (hasCreatorRole) {
        // Get creator profile with badge info
        const { data: profile } = await supabase
          .from('content_creators')
          .select('*, current_badge, total_ebooks_sold, current_commission_rate')
          .eq('user_id', user.id)
          .single();

        setCreatorProfile(profile);

        // Get creator data using the function
        const { data: creatorInfo } = await supabase
          .rpc('get_creator_data', { user_uuid: user.id });

        if (creatorInfo && creatorInfo.length > 0) {
          setCreatorData(creatorInfo[0]);
        }
      }
    } catch (error) {
      console.error('Error checking creator status:', error);
    } finally {
      setLoading(false);
    }
  };

  const becomeCreator = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Update user role to creator
      const { error: roleError } = await supabase
        .from('user_stats')
        .update({ role: 'creator' })
        .eq('user_id', user.id);

      if (roleError) throw roleError;

      // Create content creator profile
      const { error: creatorError } = await supabase
        .from('content_creators')
        .insert({
          user_id: user.id,
          bio: '',
          social_links: {},
          bank_details: {}
        });

      if (creatorError) throw creatorError;

      toast({
        title: "Parabéns!",
        description: "Você agora é um Criador de Conteúdo!"
      });

      // Refresh creator status
      await checkCreatorStatus();
    } catch (error) {
      console.error('Error becoming creator:', error);
      toast({
        title: "Erro",
        description: "Erro ao se tornar criador. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ContentCreator>) => {
    if (!user || !creatorProfile) return;

    try {
      const { error } = await supabase
        .from('content_creators')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setCreatorProfile({ ...creatorProfile, ...updates });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar perfil.",
        variant: "destructive"
      });
    }
  };

  return {
    isCreator,
    creatorProfile,
    creatorData,
    loading,
    becomeCreator,
    updateProfile,
    refreshData: checkCreatorStatus
  };
};
