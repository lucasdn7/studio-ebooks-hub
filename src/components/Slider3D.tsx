
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Slider3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data para garantir que sempre funcione
  const featuredBooks = [
    {
      id: 1,
      title: "Manual Completo de Arquitetura Residencial",
      author: "Ana Silva",
      cover: "/placeholder.svg",
      rating: 4.8,
      downloads: 1250,
      category: "Arquitetura"
    },
    {
      id: 2,
      title: "Design de Interiores: Tendências 2024",
      author: "Carlos Santos",
      cover: "/placeholder.svg",
      rating: 4.6,
      downloads: 890,
      category: "Design de Interiores"
    },
    {
      id: 3,
      title: "Técnicas Avançadas de Marcenaria",
      author: "Roberto Lima",
      cover: "/placeholder.svg",
      rating: 4.9,
      downloads: 756,
      category: "Marcenaria"
    },
    {
      id: 4,
      title: "Sustentabilidade na Construção Civil",
      author: "Maria Costa",
      cover: "/placeholder.svg",
      rating: 4.7,
      downloads: 623,
      category: "Sustentabilidade"
    },
    {
      id: 5,
      title: "Gestão de Projetos em Arquitetura",
      author: "João Oliveira",
      cover: "/placeholder.svg",
      rating: 4.5,
      downloads: 534,
      category: "Arquitetura"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const totalSlides = featuredBooks.length;
    
    let position = diff;
    if (position > totalSlides / 2) position -= totalSlides;
    if (position < -totalSlides / 2) position += totalSlides;
    
    return position;
  };

  const getSlideStyle = (position: number) => {
    const baseStyles = "absolute transition-all duration-700 ease-in-out";
    
    switch (position) {
      case 0: // Center
        return `${baseStyles} z-30 scale-100 translate-x-0 opacity-100`;
      case -1: // Left
        return `${baseStyles} z-20 scale-75 -translate-x-64 opacity-70 -rotate-y-45`;
      case 1: // Right
        return `${baseStyles} z-20 scale-75 translate-x-64 opacity-70 rotate-y-45`;
      case -2: // Far left
        return `${baseStyles} z-10 scale-50 -translate-x-96 opacity-40 -rotate-y-60`;
      case 2: // Far right
        return `${baseStyles} z-10 scale-50 translate-x-96 opacity-40 rotate-y-60`;
      default: // Hidden
        return `${baseStyles} z-0 scale-25 opacity-0`;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            ⭐ Destaques da Semana
          </Badge>
          <h2 className="text-3xl font-light text-blue-900 mb-4">
            eBooks <span className="font-medium">Em Destaque</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra os conteúdos mais populares e recentes da nossa biblioteca
          </p>
        </div>

        {/* 3D Slider Container */}
        <div className="relative h-96 flex items-center justify-center perspective-1000">
          {featuredBooks.map((book, index) => {
            const position = getSlidePosition(index);
            
            return (
              <div
                key={book.id}
                className={getSlideStyle(position)}
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: `translate(-50%, -50%)`
                }}
              >
                <Card className="w-64 h-80 hover:shadow-2xl transition-all duration-300 cursor-pointer border-blue-200">
                  <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                        Premium
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 h-32 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900 text-sm line-clamp-2 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">por {book.author}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {book.rating}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Download className="w-3 h-3 mr-1" />
                        {book.downloads}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 z-40 bg-white/80 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 z-40 bg-white/80 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {featuredBooks.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 w-6' : 'bg-blue-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/ebooks">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Ver Todos os eBooks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Slider3D;
