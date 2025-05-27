
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-sm">SA</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Studio Ebooks</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Arquitetura & Design</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/ebooks" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">E-books</Link>
            <Link to="/bundles" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Pacotes</Link>
            <Link to="/categorias" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Categorias</Link>
            <Link to="/planos" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Planos</Link>
            <Link to="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Sobre</Link>
            <Link to="/contato" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Contato</Link>
            <Link to="/noticias-construcao" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">Notícias</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700 text-xs">
                Plano Gratuito
              </Badge>
            </div>
            
            <Link to="/member-dashboard">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Área do Membro</span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            
            <Link to="/planos">
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
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
