
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EbookCategories from "@/components/EbookCategories";
import PriceFilter from "@/components/ebook/PriceFilter";
import PurchaseSteps from "@/components/PurchaseSteps";
import { useEbooks } from "@/hooks/useEbooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Clock, Download } from "lucide-react";
import { Link } from "react-router-dom";
import CreatorCTA from "@/components/creator/CreatorCTA";

const Ebooks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const { ebooks, loading } = useEbooks({ category: selectedCategory });

  // Filter ebooks by price
  const filteredEbooks = ebooks.filter(ebook => {
    if (!ebook.price) return priceRange.min === 0; // Free ebooks
    const price = typeof ebook.price === 'string' ? parseFloat(ebook.price) : ebook.price;
    return price >= priceRange.min && price <= priceRange.max;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-blue-900 mb-4">
              Biblioteca de <span className="font-medium">eBooks</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra uma curadoria exclusiva de conteúdo premium para acelerar 
              seu aprendizado e transformar sua carreira.
            </p>
          </div>

          {/* Layout with sidebar */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Filter */}
              <PriceFilter 
                onPriceChange={(min, max) => setPriceRange({ min, max })}
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
              />
              
              {/* Compact Categories */}
              <div className="lg:block hidden">
                <EbookCategories
                  onCategorySelect={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Categories */}
              <div className="lg:hidden mb-6">
                <EbookCategories
                  onCategorySelect={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  {filteredEbooks.length} eBook{filteredEbooks.length !== 1 ? 's' : ''} encontrado{filteredEbooks.length !== 1 ? 's' : ''}
                  {selectedCategory && ` em ${selectedCategory}`}
                  {(priceRange.min > 0 || priceRange.max < 200) && ` entre R$ ${priceRange.min} - R$ ${priceRange.max}`}
                </div>
              </div>

              {/* Creator CTA */}
              <div className="mb-8">
                <CreatorCTA />
              </div>

              {/* eBooks Grid - 5 per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredEbooks.map((ebook) => (
                  <Link key={ebook.id} to={`/ebook/${ebook.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 h-full border-blue-200">
                      <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                        {ebook.cover ? (
                          <img 
                            src={ebook.cover} 
                            alt={ebook.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="pb-2 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={ebook.is_premium ? "default" : "secondary"} className="text-xs">
                            {ebook.is_premium ? "Premium" : "Gratuito"}
                          </Badge>
                          {ebook.price && (
                            <span className="text-sm font-bold text-blue-900">
                              R$ {ebook.price.toString().replace('.', ',')}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-blue-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                          {ebook.title}
                        </h3>
                        <p className="text-xs text-gray-600">por {ebook.author}</p>
                      </CardHeader>

                      <CardContent className="pt-0 p-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              <span>{ebook.rating || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              <span>{ebook.downloads || 0}</span>
                            </div>
                          </div>
                          
                          <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredEbooks.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-blue-900 mb-2">
                    Nenhum eBook encontrado
                  </h3>
                  <p className="text-gray-600">
                    {selectedCategory 
                      ? "Não há eBooks disponíveis para esta categoria e faixa de preço." 
                      : "Não há eBooks disponíveis nesta faixa de preço."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Steps */}
      <PurchaseSteps />

      <Footer />
    </div>
  );
};

export default Ebooks;
