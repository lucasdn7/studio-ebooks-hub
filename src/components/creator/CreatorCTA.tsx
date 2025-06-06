
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const CreatorCTA = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <Crown className="w-16 h-16 text-blue-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Torne-se um Criador de Conteúdo!
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Compartilhe seu conhecimento, venda seus eBooks e tenha acesso a uma dashboard 
          exclusiva com relatórios e ferramentas para alavancar suas vendas. 
          Cadastre-se agora e comece a publicar seus conteúdos na nossa plataforma!
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Monetize seu conhecimento</h4>
            <p className="text-sm text-gray-600 text-center">
              Transforme sua expertise em renda vendendo e-books
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Dashboard exclusiva</h4>
            <p className="text-sm text-gray-600 text-center">
              Acompanhe suas vendas e analytics em tempo real
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <Crown className="w-8 h-8 text-yellow-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Sistema de badges</h4>
            <p className="text-sm text-gray-600 text-center">
              Quanto mais vende, maior sua participação nos lucros
            </p>
          </div>
        </div>

        <Link to="/creator-dashboard">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            Quero ser um Criador de Conteúdo
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CreatorCTA;
