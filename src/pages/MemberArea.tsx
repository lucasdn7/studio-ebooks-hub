
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import TierSystem from "@/components/TierSystem";
import AchievementsSection from "@/components/AchievementsSection";
import { useAchievements } from "@/hooks/useAchievements";
import { Download, BookOpen, Play, Clock, Star, Users } from "lucide-react";

const MemberArea = () => {
  const { userProgress } = useAchievements();

  const recentDownloads = [
    {
      title: "Manual de Arquitetura Sustentável",
      type: "ebook",
      date: "2 dias atrás",
      category: "Arquitetura"
    },
    {
      title: "Técnicas de Iluminação",
      type: "video",
      date: "1 semana atrás",
      category: "Design de Interiores"
    },
    {
      title: "Móveis Sob Medida",
      type: "ebook",
      date: "2 semanas atrás",
      category: "Marcenaria"
    }
  ];

  const exclusiveContent = [
    {
      id: 1,
      title: "Masterclass: Projetos Arquitetônicos Avançados",
      type: "video",
      duration: "2h 30min",
      author: "Arq. Carlos Eduardo",
      thumbnail: "/placeholder.svg",
      exclusive: true
    },
    {
      id: 2,
      title: "E-book Premium: Design Biofílico",
      type: "ebook",
      pages: 150,
      author: "Designer Ana Luiza",
      thumbnail: "/placeholder.svg",
      exclusive: true
    },
    {
      id: 3,
      title: "Workshop: Marcenaria Digital",
      type: "video",
      duration: "1h 45min",
      author: "Mestre João Silva",
      thumbnail: "/placeholder.svg",
      exclusive: true
    }
  ];

  const stats = [
    { label: "E-books Acessados", value: userProgress.stats.ebooksRead.toString(), icon: BookOpen },
    { label: "Vídeos Assistidos", value: userProgress.stats.videosWatched.toString(), icon: Play },
    { label: "Horas de Estudo", value: "124", icon: Clock },
    { label: "Pontos Totais", value: userProgress.totalPoints.toString(), icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Bem-vindo, <span className="font-medium">Profissional</span>
              </h1>
              <p className="text-gray-600">Acesse seus conteúdos exclusivos e acompanhe seu progresso</p>
            </div>
            <Badge className={userProgress.currentTier.color}>
              <Users className="w-4 h-4 mr-1" />
              {userProgress.currentTier.name}
            </Badge>
          </div>

          {/* Sistema de Níveis */}
          <TierSystem userProgress={userProgress} />

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-gray-700" />
                  <div className="text-2xl font-light text-gray-900 mb-1">{stat.value}</div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Seção de Conquistas */}
          <div className="mb-12">
            <AchievementsSection 
              completedAchievements={userProgress.completedAchievements}
              pendingAchievements={userProgress.pendingAchievements}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Conteúdo Exclusivo Premium</h2>
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
                              Exclusivo
                            </Badge>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{content.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">por {content.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              {content.type === 'video' ? (
                                <span className="flex items-center">
                                  <Play className="w-4 h-4 mr-1" />
                                  {content.duration}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <BookOpen className="w-4 h-4 mr-1" />
                                  {content.pages} páginas
                                </span>
                              )}
                            </div>
                            <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                              {content.type === 'video' ? 'Assistir' : 'Baixar'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-light text-gray-900 mb-6">Downloads Recentes</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentDownloads.map((download, index) => (
                      <div key={index} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {download.type === 'ebook' ? (
                            <BookOpen className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Play className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{download.title}</h4>
                          <p className="text-xs text-gray-500">{download.category}</p>
                          <p className="text-xs text-gray-400">{download.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Todos os Downloads
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-light">Progresso do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Meta de Leitura</span>
                        <span>8/10 e-books</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-900 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vídeos Assistidos</span>
                        <span>6/8 vídeos</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-900 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemberArea;
