
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import { useEbookRatings } from "@/hooks/useEbookRatings";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface EbookRatingProps {
  ebookId: number;
}

const EbookRating = ({ ebookId }: EbookRatingProps) => {
  const { user } = useAuth();
  const {
    ratings,
    userRating,
    loading,
    submitting,
    submitRating,
    deleteRating,
    getAverageRating,
    getLikesPercentage
  } = useEbookRatings(ebookId);

  const [userRatingValue, setUserRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    if (userRating) {
      setUserRatingValue(userRating.rating);
      setComment(userRating.comment || "");
      setLiked(userRating.liked);
    } else {
      setUserRatingValue(0);
      setComment("");
      setLiked(null);
    }
  }, [userRating]);

  const handleRating = (rating: number) => {
    setUserRatingValue(rating);
  };

  const handleLike = (isLike: boolean) => {
    setLiked(isLike);
  };

  const handleSubmitFeedback = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para avaliar");
      return;
    }

    if (userRatingValue === 0 && liked === null && !comment.trim()) {
      toast.error("Por favor, adicione pelo menos uma avaliação");
      return;
    }

    try {
      await submitRating(userRatingValue || 1, liked, comment);
      toast.success(userRating ? "Avaliação atualizada!" : "Avaliação enviada!");
    } catch (error) {
      toast.error("Erro ao salvar avaliação");
    }
  };

  const handleDeleteRating = async () => {
    try {
      await deleteRating();
      toast.success("Avaliação removida!");
    } catch (error) {
      toast.error("Erro ao remover avaliação");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas das avaliações */}
      {ratings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">Avaliações da comunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{getAverageRating()}</div>
                <div className="flex justify-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= getAverageRating()
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{ratings.length} avaliações</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{getLikesPercentage()}%</div>
                <div className="text-sm text-gray-600">Recomendam</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{ratings.filter(r => r.comment).length}</div>
                <div className="text-sm text-gray-600">Comentários</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulário de avaliação */}
      {user && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                {userRating ? 'Sua avaliação' : 'Avalie este e-book'}
              </CardTitle>
              {userRating && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteRating}
                  disabled={submitting}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua avaliação
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="transition-colors"
                    disabled={submitting}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= userRatingValue
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recomenda este conteúdo?
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleLike(true)}
                  disabled={submitting}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    liked === true
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Gostei
                </button>
                <button
                  onClick={() => handleLike(false)}
                  disabled={submitting}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    liked === false
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Não gostei
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário (opcional)
              </label>
              <Textarea
                placeholder="Compartilhe sua opinião sobre este e-book..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
                rows={3}
                disabled={submitting}
              />
            </div>

            <Button
              onClick={handleSubmitFeedback}
              disabled={submitting || (userRatingValue === 0 && liked === null && !comment.trim())}
              className="w-full sm:w-auto"
            >
              {submitting ? 'Salvando...' : userRating ? 'Atualizar avaliação' : 'Enviar avaliação'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lista de comentários */}
      {ratings.filter(r => r.comment).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">Comentários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratings
              .filter(rating => rating.comment)
              .slice(0, 5)
              .map((rating) => (
                <div key={rating.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {rating.liked !== null && (
                      <div className="flex items-center">
                        {rating.liked ? (
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <ThumbsDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-700">{rating.comment}</p>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EbookRating;
