
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface CreateEbookModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateEbookModal = ({ open, onClose, onSuccess }: CreateEbookModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    isPremium: false,
    difficulty: 'Iniciante',
    pages: '',
    readingTime: ''
  });

  const categories = [
    'Tecnologia', 'Negócios', 'Educação', 'Saúde', 'Arte',
    'Ciência', 'História', 'Literatura', 'Autoajuda', 'Ficção'
  ];

  const difficulties = ['Iniciante', 'Intermediário', 'Avançado'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Get creator ID
      const { data: creator } = await supabase
        .from('content_creators')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!creator) {
        throw new Error('Creator profile not found');
      }

      // Create the ebook
      const { data: ebook, error: ebookError } = await supabase
        .from('ebooks')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.isPremium ? parseFloat(formData.price) : null,
          is_premium: formData.isPremium,
          difficulty: formData.difficulty,
          pages: formData.pages ? parseInt(formData.pages) : null,
          reading_time: formData.readingTime ? parseInt(formData.readingTime) : null,
          author: user.email || 'Autor',
          creator_id: creator.id
        })
        .select()
        .single();

      if (ebookError) throw ebookError;

      // Link the ebook to the creator
      const { error: linkError } = await supabase
        .from('creator_ebooks')
        .insert({
          creator_id: creator.id,
          ebook_id: ebook.id
        });

      if (linkError) throw linkError;

      toast({
        title: "E-book criado!",
        description: "Seu e-book foi criado com sucesso."
      });

      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        isPremium: false,
        difficulty: 'Iniciante',
        pages: '',
        readingTime: ''
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating ebook:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar e-book. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo E-book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Básicas</h3>
            
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digite o título do e-book"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva do que se trata o e-book"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Dificuldade</Label>
                <Select 
                  value={formData.difficulty} 
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Arquivos</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Arraste e solte seu arquivo aqui ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500">
                Formatos aceitos: PDF, EPUB (máx. 50MB)
              </p>
              <Button type="button" variant="outline" className="mt-2">
                Selecionar Arquivo
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Capa do E-book (opcional)
              </p>
              <p className="text-xs text-gray-500">
                Formatos aceitos: JPG, PNG (máx. 5MB)
              </p>
              <Button type="button" variant="outline" className="mt-2">
                Selecionar Imagem
              </Button>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preço e Acesso</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="premium"
                checked={formData.isPremium}
                onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
              />
              <Label htmlFor="premium">E-book Premium (pago)</Label>
            </div>

            {formData.isPremium && (
              <div>
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0,00"
                  required={formData.isPremium}
                />
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Adicionais</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pages">Número de Páginas</Label>
                <Input
                  id="pages"
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="Ex: 150"
                />
              </div>

              <div>
                <Label htmlFor="readingTime">Tempo de Leitura (min)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                  placeholder="Ex: 45"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar E-book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEbookModal;
