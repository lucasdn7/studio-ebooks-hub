
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Download, 
  Calendar,
  TrendingUp,
  Star,
  Crown,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface MemberDashboardProps {
  userProgress: any;
}

const MemberDashboard = ({ userProgress }: MemberDashboardProps) => {
  const stats = [
    { label: "eBooks Adquiridos", value: "24", icon: BookOpen, color: "text-blue-600" },
    { label: "Downloads Totais", value: "47", icon: Download, color: "text-green-600" },
    { label: "Dias como Membro", value: "156", icon: Calendar, color: "text-purple-600" },
    { label: "Pontos Totais", value: userProgress.totalPoints.toString(), icon: Star, color: "text-yellow-600" }
  ];

  const recentEbooks = [
    {
      title: "Manual de Arquitetura Sustentável",
      category: "Arquitetura",
      downloadDate: "2 dias atrás",
      cover: "/placeholder.svg"
    },
    {
      title: "Design de Interiores: Tendências 2024",
      category: "Design de Interiores", 
      downloadDate: "1 semana atrás",
      cover: "/placeholder.svg"
    },
    {
      title: "Técnicas Avançadas de Marcenaria",
      category: "Marcenaria",
      downloadDate: "2 semanas atrás",
      cover: "/placeholder.svg"
    }
  ];

  const recommendations = [
    {
      id: 10,
      title: "Iluminação Arquitetônica Avançada",
      category: "Arquitetura",
      reason: "Baseado em seus interesses",
      cover: "/placeholder.svg"
    },
    {
      id: 11,
      title: "Sustentabilidade em Projetos Residenciais", 
      category: "Sustentabilidade",
      reason: "Trending entre membros Premium",
      cover: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">
              Bem-vindo de volta, <span className="font-medium">João</span>
            </h1>
            <p className="text-gray-300">
              Sua última atividade foi há 2 dias
            </p>
          </div>
          <Badge className="bg-white text-gray-900">
            <Crown className="w-4 h-4 mr-1" />
            {userProgress.currentTier.name}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-light text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEbooks.map((ebook, index) => (
                <div key={index} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={ebook.cover} alt={ebook.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{ebook.title}</h4>
                    <p className="text-xs text-gray-500">{ebook.category}</p>
                    <p className="text-xs text-gray-400">{ebook.downloadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recomendações Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((ebook) => (
                <div key={ebook.id} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={ebook.cover} alt={ebook.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{ebook.title}</h4>
                    <p className="text-xs text-gray-500">{ebook.category}</p>
                    <p className="text-xs text-blue-600">{ebook.reason}</p>
                  </div>
                  <Link to={`/ebook/${ebook.id}`}>
                    <Button size="sm" variant="outline">
                      Ver
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/ebooks">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Baixe seu próximo eBook
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDashboard;
