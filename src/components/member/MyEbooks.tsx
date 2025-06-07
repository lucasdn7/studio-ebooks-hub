
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Download, 
  Search, 
  Filter, 
  Heart,
  Calendar,
  Star
} from "lucide-react";

const MyEbooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const filters = ["Todos", "Favoritos", "Recentes", "Mais Lidos", "Arquitetura", "Design de Interiores", "Marcenaria"];

  const myEbooks = [
    {
      id: 1,
      title: "Manual Completo de Arquitetura Residencial",
      category: "Arquitetura", 
      cover: "/placeholder.svg",
      downloadDate: "15/01/2024",
      isFavorite: true,
      downloadCount: 3
    },
    {
      id: 2,
      title: "Design de Interiores: Tendências 2024",
      category: "Design de Interiores",
      cover: "/placeholder.svg", 
      downloadDate: "10/01/2024",
      isFavorite: false,
      downloadCount: 1
    },
    {
      id: 3,
      title: "Técnicas Avançadas de Marcenaria",
      category: "Marcenaria",
      cover: "/placeholder.svg",
      downloadDate: "05/01/2024", 
      isFavorite: true,
      downloadCount: 2
    },
    {
      id: 4,
      title: "Sustentabilidade na Arquitetura",
      category: "Sustentabilidade",
      cover: "/placeholder.svg",
      downloadDate: "28/12/2023",
      isFavorite: false,
      downloadCount: 1
    }
  ];

  const getCategoryColor = (category: string) => {
    // Usando apenas variações de azul seguindo o padrão da página categorias
    switch (category) {
      case "Arquitetura":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Design de Interiores":
        return "bg-blue-200 text-blue-800 border-blue-300";
      case "Marcenaria":
        return "bg-blue-300 text-blue-900 border-blue-400";
      case "Sustentabilidade":
        return "bg-blue-400 text-blue-900 border-blue-500";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const filteredEbooks = myEbooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "Todos" || 
                         (selectedFilter === "Favoritos" && ebook.isFavorite) ||
                         ebook.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-blue-900">
          Meus <span className="font-medium">eBooks</span>
        </h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {myEbooks.length} eBooks adquiridos
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
          <Input
            placeholder="Buscar nos meus eBooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Filtros:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-blue-600 mb-4">
        {filteredEbooks.length} eBook{filteredEbooks.length !== 1 ? 's' : ''} encontrado{filteredEbooks.length !== 1 ? 's' : ''}
      </div>

      {/* eBooks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEbooks.map((ebook) => (
          <Card key={ebook.id} className="group hover:shadow-lg transition-all border-blue-200 hover:border-blue-400">
            <div className="relative">
              <div className="aspect-[3/4] bg-blue-50 rounded-t-lg overflow-hidden">
                <img 
                  src={ebook.cover} 
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors">
                  <Heart className={`w-4 h-4 ${ebook.isFavorite ? 'fill-blue-500 text-blue-500' : 'text-blue-400'}`} />
                </button>
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
                {ebook.downloadCount > 1 && (
                  <div className="flex items-center text-xs text-blue-500">
                    <Download className="w-3 h-3 mr-1" />
                    {ebook.downloadCount}x
                  </div>
                )}
              </div>
              <CardTitle className="text-lg font-medium text-blue-900 leading-snug line-clamp-2">
                {ebook.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4 text-xs text-blue-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Adquirido em {ebook.downloadDate}
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Baixar novamente
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-blue-900 mb-2">Nenhum eBook encontrado</h3>
          <p className="text-blue-600 mb-4">Tente ajustar seus filtros ou explore nossa biblioteca</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Explorar biblioteca
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyEbooks;
