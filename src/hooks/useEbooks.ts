
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Ebook = Tables<'ebooks'>;

export const useEbooks = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEbooks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar e-books');
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedEbooks = () => ebooks.filter(ebook => ebook.featured);
  
  const getNewEbooks = () => ebooks
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 3);
  
  const getPopularEbooks = () => ebooks
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  return {
    ebooks,
    loading,
    error,
    refetch: fetchEbooks,
    getFeaturedEbooks,
    getNewEbooks,
    getPopularEbooks
  };
};
