
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FavoriteEbook {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  dateAdded: string;
}

export const useFavorites = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteEbook[]>([]);

  const toggleFavorite = (ebook: Omit<FavoriteEbook, 'dateAdded'>) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.id === ebook.id);
    
    if (isCurrentlyFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== ebook.id));
      toast({
        title: "Removido dos seus favoritos",
        description: `"${ebook.title}" foi removido da sua lista de favoritos.`,
      });
    } else {
      const newFavorite: FavoriteEbook = {
        ...ebook,
        dateAdded: new Date().toLocaleDateString('pt-BR')
      };
      setFavorites(prev => [...prev, newFavorite]);
      toast({
        title: "Adicionado aos seus favoritos!",
        description: `"${ebook.title}" foi salvo na sua lista de favoritos.`,
      });
    }
  };

  const isFavorite = (ebookId: number) => {
    return favorites.some(fav => fav.id === ebookId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
