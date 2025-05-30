
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface FavoriteEbook {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  dateAdded: string;
}

export const useFavoritesSupabase = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteEbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          ebooks (
            id,
            title,
            author,
            category,
            cover
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const favoritesData = data?.map(fav => ({
        id: fav.ebooks.id,
        title: fav.ebooks.title,
        author: fav.ebooks.author,
        category: fav.ebooks.category,
        cover: fav.ebooks.cover || '/placeholder.svg',
        dateAdded: new Date(fav.created_at).toLocaleDateString('pt-BR')
      })) || [];

      setFavorites(favoritesData);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (ebook: Omit<FavoriteEbook, 'dateAdded'>) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para favoritar eBooks.",
        variant: "destructive"
      });
      return;
    }

    const isCurrentlyFavorite = favorites.some(fav => fav.id === ebook.id);
    
    try {
      if (isCurrentlyFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('ebook_id', ebook.id);

        if (error) throw error;

        setFavorites(prev => prev.filter(fav => fav.id !== ebook.id));
        toast({
          title: "Removido dos favoritos",
          description: `"${ebook.title}" foi removido da sua lista de favoritos.`,
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            ebook_id: ebook.id
          });

        if (error) throw error;

        const newFavorite: FavoriteEbook = {
          ...ebook,
          dateAdded: new Date().toLocaleDateString('pt-BR')
        };
        setFavorites(prev => [...prev, newFavorite]);
        toast({
          title: "Adicionado aos favoritos!",
          description: `"${ebook.title}" foi salvo na sua lista de favoritos.`,
        });
      }
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o favorito.",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (ebookId: number) => {
    return favorites.some(fav => fav.id === ebookId);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite
  };
};
