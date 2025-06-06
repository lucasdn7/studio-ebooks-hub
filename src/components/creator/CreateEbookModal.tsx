
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, AlertCircle } from "lucide-react";
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
    categories: [] as string[],
    price: '',
    isPremium: false,
    difficulty: 'Iniciante',
    pages: '',
    readingTime: ''
  });

  const categories = [
    // Construção Civil
    { id: 'arquitetura', name: 'Arquitetura', group: 'Construção Civil' },
    { id: 'paisagismo', name: 'Paisagismo', group: 'Construção Civil' },
    { id: 'urbanismo', name: 'Urbanismo', group: 'Construção Civil' },
    { id: 'design-interiores', name: 'Design de Interiores', group: 'Construção Civil' },
    { id: 'marcenaria', name: 'Marcenaria', group: 'Construção Civil' },
    { id: 'engenharia-civil', name: 'Engenharia Civil', group: 'Construção Civil' },
    { id: 'eletrica', name: 'Elétrica', group: 'Construção Civil' },
    { id: 'hidrossanitario', name: 'Hidrossanitário', group: 'Construção Civil' },
    { id: 'legislacao', name: 'Legislação', group: 'Construção Civil' },
    
    // Desenvolvimento Profissional
    { id: 'tecnologia', name: 'Tecnologia', group: 'Desenvolvimento Profissional' },
    { id: 'marketing', name: 'Marketing', group: 'Desenvolvimento Profissional' },
    { id: 'financas', name: 'Finanças', group: 'Desenvolvimento Profissional' },
    { id: 'desenvolvimento-pessoal', name: 'Desenvolvimento Pessoal', group: 'Desenvolvimento Profissional' },
    { id: 'educacao', name: 'Educação', group: 'Desenvolvimento Profissional' },
    { id: 'negocios', name: 'Negócios', group: 'Desenvolvimento Profissional' }
  ];

  const categoryGroups = categories.reduce((groups, category) => {
    const group = category.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(category);
    return groups;
  }, {} as Record<string, typeof categories>);

  const difficulties = ['Iniciante', 'Intermediário', 'Avançado'];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      if (formData.categories.length >= 3) {
        toast({
          title: "Limite atingido",
          description: "Você só pode escolher até 3 categorias para este eBook.",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.filter(id => id !== categoryId)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.categories.length === 0) {
      toast({
        title: "Categorias obrigatórias",
        description: "Selecione pelo menos uma categoria para o eBook.",
        variant: "destructive"
      });
      return;
    }

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

      // Create the ebook with primary category (first selected)
      const { data: ebook, error: ebookError } = await supabase
        .from('ebooks')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.categories[0], // Primary category
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
        categories: [],
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

            {/* Categories Selection */}
            <div>
              <Label>Categorias * (máximo 3)</Label>
              <div className="mt-2 mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {formData.categories.length}/3 categorias selecionadas
                </span>
                {formData.categories.length >= 3 && (
                  <div className="flex items-center text-amber-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Limite atingido</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 max-h-64 overflow-y-auto border rounded-lg p-4">
                {Object.entries(categoryGroups).map(([groupName, groupCategories]) => (
                  <div key={groupName}>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{groupName}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {groupCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={formData.categories.includes(category.id)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category.id, checked as boolean)
                            }
                            disabled={
                              !formData.categories.includes(category.id) && 
                              formData.categories.length >= 3
                            }
                          />
                          <Label 
                            htmlFor={category.id} 
                            className={`text-sm ${
                              !formData.categories.includes(category.id) && 
                              formData.categories.length >= 3 
                                ? 'text-gray-400' 
                                : 'text-gray-700'
                            }`}
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
