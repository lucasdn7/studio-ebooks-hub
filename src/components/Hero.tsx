
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            Biblioteca Digital Profissional
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            E-books Premium para 
            <span className="font-medium"> Arquitetos</span> e 
            <span className="font-medium"> Designers</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Acesse uma curadoria exclusiva de e-books especializados em arquitetura, 
            design de interiores e marcenaria. Conteúdo premium para profissionais exigentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planos">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 px-8">
                Começar Assinatura
              </Button>
            </Link>
            <Link to="/ebooks">
              <Button variant="outline" size="lg" className="px-8">
                Explorar Catálogo
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>✓ Acesso ilimitado • ✓ Novos títulos mensais • ✓ Download offline</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
