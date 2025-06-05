
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import CreateEbookModal from "./CreateEbookModal";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

const CreatorEbooks = () => {
  const { user } = useAuth();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyEbooks();
    }
  }, [user]);

  const fetchMyEbooks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get creator ID first
      const { data: creator } = await supabase
        .from('content_creators')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!creator) return;

      // Get ebooks created by this creator
      const { data: creatorEbooks } = await supabase
        .from('creator_ebooks')
        .select(`
          ebook_id,
          ebooks (*)
        `)
        .eq('creator_id', creator.id);

      if (creatorEbooks) {
        const ebooksData = creatorEbooks
          .map(ce => ce.ebooks)
          .filter(Boolean) as Ebook[];
        setEbooks(ebooksData);
      }
    } catch (error) {
      console.error('Error fetching ebooks:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar seus e-books.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEbookCreated = () => {
    setShowCreateModal(false);
    fetchMyEbooks();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-gray-900">Meus E-books</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar E-book
        </Button>
      </div>

      {ebooks.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum e-book criado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Comece a compartilhar seus conhecimentos criando seu primeiro e-book.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro E-book
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <Card key={ebook.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                {ebook.cover ? (
                  <img 
                    src={ebook.cover} 
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium line-clamp-2">
                  {ebook.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={ebook.is_premium ? "default" : "secondary"}>
                    {ebook.is_premium ? "Premium" : "Gratuito"}
                  </Badge>
                  {ebook.price && (
                    <span className="text-sm font-medium text-gray-900">
                      R$ {ebook.price.toString().replace('.', ',')}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {ebook.description}
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateEbookModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleEbookCreated}
      />
    </div>
  );
};

export default CreatorEbooks;
