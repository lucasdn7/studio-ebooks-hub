
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import TierSystem from "@/components/TierSystem";
import AchievementsSection from "@/components/AchievementsSection";
import CertificateCard from "@/components/CertificateCard";
import { useAchievements } from "@/hooks/useAchievements";
import { Download, BookOpen, Star, Users, Trophy, Award, Calendar, Target } from "lucide-react";

const MemberArea = () => {
  const { userProgress } = useAchievements();

  // Filtrar apenas conquistas premium para exibir
  const premiumAchievements = userProgress.completedAchievements.filter(a => a.premiumOnly);
  const premiumPending = userProgress.pendingAchievements.filter(a => a.premiumOnly);

  const recentActivity = [
    {
      type: "ebook",
      title: "Manual de Arquitetura Sustentável",
      action: "lido",
      date: "2 dias atrás",
      category: "Arquitetura"
    },
    {
      type: "achievement",
      title: "Primeira Interação",
      action: "conquistada",
      date: "1 semana atrás",
      category: "Social"
    },
    {
      type: "bundle",
      title: "Kit Arquitetura Residencial",
      action: "adquirido",
      date: "2 semanas atrás",
      category: "Pacote"
    }
  ];

  const exclusiveContent = [
    {
      id: 1,
      title: "E-book Premium: Arquitetura Bioclimática",
      type: "ebook",
      pages: 180,
      author: "Arq. Sustentável Pro",
      thumbnail: "/placeholder.svg",
      exclusive: true
    },
    {
      id: 2,
      title: "Guia Exclusivo: Materiais Inovadores",
      type: "ebook",
      pages: 120,
      author: "Especialista em Materiais",
      thumbnail: "/placeholder.svg",
      exclusive: true
    },
    {
      id: 3,
      title: "Manual VIP: Projetos Comerciais",
      type: "ebook",
      pages: 200,
      author: "Arq. Comercial Expert",
      thumbnail: "/placeholder.svg",
      exclusive: true
    }
  ];

  const stats = [
    { label: "E-books Lidos", value: userProgress.stats.ebooksRead.toString(), icon: BookOpen, color: "text-blue-600" },
    { label: "Conquistas", value: premiumAchievements.length.toString(), icon: Trophy, color: "text-yellow-600" },
    { label: "Certificados", value: userProgress.certificates.filter(c => c.completed).length.toString(), icon: Award, color: "text-green-600" },
    { label: "Pontos Totais", value: userProgress.totalPoints.toString(), icon: Star, color: "text-purple-600" }
  ];

  if (!userProgress.isPremuim) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Área Exclusiva para <span className="font-medium">Membros Premium</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Faça upgrade para um plano premium e tenha acesso a conquistas, certificados e conteúdos exclusivos.
            </p>
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
              Fazer Upgrade
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Área do <span className="font-medium">Membro</span>
              </h1>
              <p className="text-gray-600">Acompanhe seu progresso e acesse conteúdos exclusivos</p>
            </div>
            <Badge className={userProgress.currentTier.color}>
              <Users className="w-4 h-4 mr-1" />
              {userProgress.currentTier.name}
            </Badge>
          </div>

          {/* Sistema de Níveis */}
          <TierSystem userProgress={userProgress} />

          {/* Estatísticas */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
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

          {/* Conteúdo Principal */}
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="achievements" className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Certificados
              </TabsTrigger>
              <TabsTrigger value="exclusive" className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Exclusivos
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Atividades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="mt-6">
              <AchievementsSection 
                completedAchievements={premiumAchievements}
                pendingAchievements={premiumPending}
              />
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProgress.certificates.map((certificate) => (
                  <CertificateCard key={certificate.id} certificate={certificate} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exclusive" className="mt-6">
              <div className="space-y-6">
                {exclusiveContent.map((content) => (
                  <Card key={content.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <img 
                            src={content.thumbnail} 
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <ContentBadge type="premium" />
                            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Exclusivo Premium
                            </Badge>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{content.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">por {content.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {content.pages} páginas
                            </div>
                            <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                              <Download className="w-4 h-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {activity.type === 'ebook' && <BookOpen className="w-5 h-5 text-gray-600" />}
                          {activity.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-600" />}
                          {activity.type === 'bundle' && <Target className="w-5 h-5 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-xs text-gray-500">{activity.category} • {activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemberArea;
