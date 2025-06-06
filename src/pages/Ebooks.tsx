
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EbookCategories from "@/components/EbookCategories";
import { useEbooks } from "@/hooks/useEbooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Clock, Download } from "lucide-react";
import { Link } from "react-router-dom";
import CreatorCTA from "@/components/creator/CreatorCTA";

const Ebooks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { ebooks, loading } = useEbooks({ category: selectedCategory });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Biblioteca de <span className="font-medium">eBooks</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra uma curadoria exclusiva de conteúdo premium para acelerar 
              seu aprendizado e transformar sua carreira.
            </p>
          </div>

          <EbookCategories
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {/* Creator CTA */}
          <div className="mb-12">
            <CreatorCTA />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ebooks.map((ebook) => (
              <Link key={ebook.id} to={`/ebook/${ebook.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                    {ebook.cover ? (
                      <img 
                        src={ebook.cover} 
                        alt={ebook.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={ebook.is_premium ? "default" : "secondary"}>
                        {ebook.is_premium ? "Premium" : "Gratuito"}
                      </Badge>
                      {ebook.price && (
                        <span className="text-lg font-bold text-gray-900">
                          R$ {ebook.price.toString().replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-gray-600">por {ebook.author}</p>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {ebook.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          <span>{ebook.rating || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{ebook.reading_time || 0} min</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          <span>{ebook.downloads || 0}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full group-hover:bg-gray-800 transition-colors">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {ebooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum eBook encontrado
              </h3>
              <p className="text-gray-600">
                {selectedCategory 
                  ? "Não há eBooks disponíveis para esta categoria." 
                  : "Não há eBooks disponíveis no momento."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ebooks;
