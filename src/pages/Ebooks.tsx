
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { Download, BookOpen, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useEbooks } from "@/hooks/useEbooks";
import { getStorageUrl, formatDownloads, mapEbookType } from "@/utils/supabaseHelpers";

const Ebooks = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || "Todos";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedType, setSelectedType] = useState("Todos");

  const { ebooks, loading, error } = useEbooks();

  // Update selectedCategory when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = [
    "Todos",
    "Arquitetura", 
    "Design de Interiores", 
    "Marcenaria",
    "Sustentabilidade",
    "Tendências",
    "Ferramentas"
  ];

  const types = ["Todos", "Gratuito", "Premium"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Arquitetura":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Design de Interiores":
        return "bg-green-100 text-green-700 border-green-200";
      case "Marcenaria":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Sustentabilidade":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Tendências":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Ferramentas":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (ebook.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Todos" || ebook.category === selectedCategory;
    
    const ebookType = mapEbookType(ebook.type, ebook.is_premium);
    const matchesType = selectedType === "Todos" || 
                       (selectedType === "Gratuito" && ebookType === "free") ||
                       (selectedType === "Premium" && ebookType === "premium");
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando e-books...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar e-books: {error}</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Biblioteca de <span className="font-medium">E-books</span>
              {selectedCategory !== "Todos" && (
                <span className="block text-2xl font-normal text-gray-600 mt-2">
                  {selectedCategory}
                </span>
              )}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {selectedCategory !== "Todos" 
                ? `Explore nossa coleção de e-books especializados em ${selectedCategory}`
                : "Acesse nossa coleção exclusiva de e-books especializados em arquitetura, design e marcenaria"
              }
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por título, autor ou tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filtros:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selectedType === type
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6 text-center text-gray-600">
            {filteredEbooks.length} e-book{filteredEbooks.length !== 1 ? 's' : ''} encontrado{filteredEbooks.length !== 1 ? 's' : ''}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEbooks.map((ebook) => {
              const ebookType = mapEbookType(ebook.type, ebook.is_premium);
              const coverUrl = getStorageUrl('ebook-covers', ebook.cover || '');
              
              return (
                <Link key={ebook.id} to={`/ebook/${ebook.id}`}>
                  <Card className={`group hover:shadow-lg transition-all duration-300 ${ebook.featured ? 'ring-2 ring-gray-900 ring-opacity-10' : ''}`}>
                    {ebook.featured && (
                      <div className="absolute -top-3 left-4 z-10">
                        <Badge className="bg-gray-900 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                      </div>
                    )}
                    
                    <div className="relative">
                      <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                        <img 
                          src={coverUrl} 
                          alt={ebook.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <ContentBadge type={ebookType} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <FavoriteButton 
                            ebook={{
                              id: ebook.id,
                              title: ebook.title,
                              author: ebook.author,
                              category: ebook.category,
                              cover: coverUrl
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(ebook.category)}`}
                        >
                          {ebook.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {ebook.rating || 0}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
                        {ebook.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">por {ebook.author}</p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {ebook.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {ebook.pages || 0} páginas
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {formatDownloads(ebook.downloads)}
                        </div>
                      </div>

                      <Button className="w-full" variant={ebookType === 'free' ? 'default' : 'outline'}>
                        {ebookType === 'free' ? 'Download Gratuito' : 'Acessar Premium'}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ebooks;
