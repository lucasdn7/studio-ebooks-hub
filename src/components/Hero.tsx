
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Smartphone, ArrowRight } from "lucide-react";
import CreatorCTA from "@/components/creator/CreatorCTA";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236B7280%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
              ✨ Transforme seu conhecimento em conquistas
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 tracking-tight">
            Clube do
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              eBook
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 leading-relaxed">
            Descubra uma biblioteca exclusiva de conteúdo premium para 
            <strong className="text-blue-800"> acelerar seu aprendizado</strong> e 
            transformar sua carreira na construção civil.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Link to="/ebooks">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar eBooks
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-200"
            >
              <Link to="/app">
                <Smartphone className="mr-2 h-5 w-5" />
                Nosso App (Em Breve)
              </Link>
            </Button>
          </div>

          {/* New App Banner */}
          <div className="mt-12 p-6 bg-blue-50 backdrop-blur-sm rounded-2xl border border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-semibold text-blue-900">📱 Novidade em Desenvolvimento!</span>
            </div>
            <p className="text-gray-700 mb-4">
              Estamos criando um app móvel revolucionário com gamificação, 
              sistema de moedas e conquistas incríveis!
            </p>
            <Button 
              asChild 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/app">
                Saiba Mais sobre o App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Creator CTA */}
          <div className="mt-16">
            <CreatorCTA />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-blue-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-gray-600">eBooks Premium</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">10k+</div>
              <div className="text-gray-600">Leitores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-bounce delay-500"></div>
    </section>
  );
};

export default Hero;
