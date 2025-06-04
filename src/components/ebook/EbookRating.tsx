
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const EbookRating = () => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleLike = (isLike: boolean) => {
    setLiked(isLike);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback:', {
      rating: userRating,
      comment,
      liked
    });
    setComment("");
    setUserRating(0);
    setLiked(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Avalie este e-book</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avaliação por estrelas */}
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
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= userRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Like/Dislike */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recomenda este conteúdo?
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleLike(true)}
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

        {/* Comentário */}
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
          />
        </div>

        <Button
          onClick={handleSubmitFeedback}
          disabled={userRating === 0 && liked === null && !comment.trim()}
          className="w-full sm:w-auto"
        >
          Enviar avaliação
        </Button>
      </CardContent>
    </Card>
  );
};

export default EbookRating;
