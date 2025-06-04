
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface EbookRating {
  id: string;
  ebook_id: number;
  user_id: string;
  rating: number;
  liked: boolean | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export const useEbookRatings = (ebookId: number) => {
  const [ratings, setRatings] = useState<EbookRating[]>([]);
  const [userRating, setUserRating] = useState<EbookRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchRatings();
  }, [ebookId]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      
      // Buscar todas as avaliações do e-book
      const { data: allRatings, error: ratingsError } = await supabase
        .from('ebook_ratings')
        .select('*')
        .eq('ebook_id', ebookId)
        .order('created_at', { ascending: false });

      if (ratingsError) throw ratingsError;

      setRatings(allRatings || []);

      // Buscar avaliação do usuário atual se estiver logado
      if (user) {
        const userRatingData = allRatings?.find(rating => rating.user_id === user.id);
        setUserRating(userRatingData || null);
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (rating: number, liked: boolean | null, comment: string) => {
    if (!user) {
      throw new Error('Usuário deve estar logado para avaliar');
    }

    try {
      setSubmitting(true);

      const ratingData = {
        ebook_id: ebookId,
        user_id: user.id,
        rating,
        liked,
        comment: comment.trim() || null,
      };

      if (userRating) {
        // Atualizar avaliação existente
        const { error } = await supabase
          .from('ebook_ratings')
          .update(ratingData)
          .eq('id', userRating.id);

        if (error) throw error;
      } else {
        // Criar nova avaliação
        const { error } = await supabase
          .from('ebook_ratings')
          .insert(ratingData);

        if (error) throw error;
      }

      // Recarregar avaliações
      await fetchRatings();
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteRating = async () => {
    if (!user || !userRating) return;

    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('ebook_ratings')
        .delete()
        .eq('id', userRating.id);

      if (error) throw error;

      await fetchRatings();
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return Number((sum / ratings.length).toFixed(1));
  };

  const getLikesPercentage = () => {
    const ratingsWithOpinion = ratings.filter(r => r.liked !== null);
    if (ratingsWithOpinion.length === 0) return 0;
    const likes = ratingsWithOpinion.filter(r => r.liked === true).length;
    return Math.round((likes / ratingsWithOpinion.length) * 100);
  };

  return {
    ratings,
    userRating,
    loading,
    submitting,
    submitRating,
    deleteRating,
    refetch: fetchRatings,
    getAverageRating,
    getLikesPercentage,
  };
};
