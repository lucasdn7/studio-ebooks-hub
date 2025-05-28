
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  ebook: {
    id: number;
    title: string;
    author: string;
    category: string;
    cover: string;
  };
  variant?: "icon" | "button";
  className?: string;
}

const FavoriteButton = ({ ebook, variant = "icon", className = "" }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isEbookFavorite = isFavorite(ebook.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(ebook);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggleFavorite}
        className={`p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors ${className}`}
      >
        <Heart 
          className={`w-4 h-4 ${
            isEbookFavorite 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-400 hover:text-red-400'
          }`} 
        />
      </button>
    );
  }

  return (
    <Button
      onClick={handleToggleFavorite}
      variant="outline"
      size="sm"
      className={className}
    >
      <Heart 
        className={`w-4 h-4 mr-2 ${
          isEbookFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }`} 
      />
      {isEbookFavorite ? 'Favorito' : 'Favoritar'}
    </Button>
  );
};

export default FavoriteButton;
