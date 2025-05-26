
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Studio Ebooks</h1>
              <p className="text-xs text-gray-500">Arquitetura & Design</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">E-books</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Vídeos</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Categorias</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Sobre</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Contato</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
              Assinar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
