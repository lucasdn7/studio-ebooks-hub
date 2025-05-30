
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useKits = () => {
  return useQuery({
    queryKey: ['kits'],
    queryFn: async () => {
      console.log('Fetching kits...');
      const { data, error } = await supabase
        .from('kits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching kits:', error);
        throw error;
      }

      console.log('Kits fetched:', data);
      return data;
    }
  });
};
