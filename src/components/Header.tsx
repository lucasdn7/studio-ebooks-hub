
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Studio Ebooks</h1>
                <p className="text-xs text-gray-500">Arquitetura & Design</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/ebooks" className="text-gray-700 hover:text-gray-900 font-medium text-sm">E-books</Link>
            <Link to="/videos" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Vídeos</Link>
            <Link to="/categorias" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Categorias</Link>
            <Link to="/planos" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Planos</Link>
            <Link to="/sobre" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Sobre</Link>
            <Link to="/contato" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Contato</Link>
            <Link to="/noticias-construcao" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Notícias</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                Plano Gratuito
              </Badge>
            </div>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/planos">
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                Upgrade
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
