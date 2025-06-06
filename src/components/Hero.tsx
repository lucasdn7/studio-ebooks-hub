
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import CreatorCTA from "@/components/creator/CreatorCTA";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Descubra o <span className="font-medium">poder</span> dos
            <br />
            <span className="font-medium">eBooks</span> transformadores
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Uma curadoria exclusiva de conteúdo premium para acelerar seu 
            aprendizado e transformar sua carreira.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ebooks">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Explorar eBooks
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/plans">
              <Button size="lg" variant="outline">
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">eBooks Premium</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
            <p className="text-gray-600">Leitores Ativos</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
            <p className="text-gray-600">Avaliação Média</p>
          </div>
        </div>

        {/* Creator CTA */}
        <div className="max-w-4xl mx-auto">
          <CreatorCTA />
        </div>
      </div>
    </section>
  );
};

export default Hero;
