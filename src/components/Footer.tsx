
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Crown } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Creator CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              Torne-se um Criador de Conteúdo!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Compartilhe seu conhecimento, venda seus eBooks e tenha acesso a uma dashboard 
              exclusiva com relatórios e ferramentas para alavancar suas vendas.
            </p>
            <Link to="/creator-dashboard">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Quero ser um Criador de Conteúdo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8" />
              <span className="text-2xl font-light">
                Clube do <span className="font-medium">eBook</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Descubra o poder dos eBooks transformadores. Uma curadoria exclusiva 
              de conteúdo premium para acelerar seu aprendizado.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ebooks" className="text-gray-400 hover:text-white transition-colors">
                  eBooks
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="text-gray-400 hover:text-white transition-colors">
                  Bundles
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-gray-400 hover:text-white transition-colors">
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/creator-dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Área do Criador
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Clube do eBook. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
