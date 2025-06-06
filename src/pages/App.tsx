
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  BookOpen, 
  Coins, 
  Trophy, 
  Medal, 
  Target, 
  Calendar, 
  Crown, 
  Star,
  Gift,
  Users,
  Zap,
  TrendingUp,
  Heart,
  Mail
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const App = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Obrigado!",
      description: "Você será notificado quando o app for lançado!"
    });
    setEmail("");
  };

  const features = [
    {
      icon: BookOpen,
      title: "Estante Virtual Personalizada",
      description: "Sua biblioteca pessoal com progressos salvos, favoritos e histórico de leitura sincronizado."
    },
    {
      icon: Coins,
      title: "Sistema de Engrenas",
      description: "Ganhe nossa moeda virtual lendo, cumprindo metas e participando de desafios."
    },
    {
      icon: Users,
      title: "Trocas entre Usuários",
      description: "Troque eBooks com outros membros da comunidade usando suas Engrenas."
    },
    {
      icon: Trophy,
      title: "Conquistas e Níveis",
      description: "Desbloqueie insígnias, suba de nível e torne-se um Mestre da Obra!"
    }
  ];

  const rewards = [
    {
      icon: Calendar,
      title: "Login Diário",
      description: "+5 Engrenas por dia",
      color: "text-blue-600"
    },
    {
      icon: Star,
      title: "7 Dias Seguidos",
      description: "Insígnia especial",
      color: "text-purple-600"
    },
    {
      icon: Gift,
      title: "30 Dias",
      description: "eBook surpresa",
      color: "text-green-600"
    },
    {
      icon: Crown,
      title: "365 Dias",
      description: "Prêmio épico + conteúdo exclusivo",
      color: "text-yellow-600"
    }
  ];

  const ranks = [
    { name: "Leitor Iniciante", icon: BookOpen, color: "bg-gray-100 text-gray-700" },
    { name: "Construtor de Conhecimento", icon: Target, color: "bg-blue-100 text-blue-700" },
    { name: "Mestre da Obra", icon: Crown, color: "bg-yellow-100 text-yellow-700" }
  ];

  const earnCoins = [
    { action: "Leitura de eBooks", coins: "10-50", icon: BookOpen },
    { action: "Metas cumpridas", coins: "25", icon: Target },
    { action: "Conclusão de categorias", coins: "100", icon: Trophy },
    { action: "Login diário", coins: "5", icon: Calendar },
    { action: "Desafios semanais", coins: "75", icon: Zap },
    { action: "Maratonas de leitura", coins: "200", icon: Medal }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg">
            <Smartphone className="w-5 h-5 mr-2" />
            Em Desenvolvimento
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            📱 O App Está Chegando!
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Prepare-se para uma experiência revolucionária de aprendizado! 
            O <strong>Clube do eBook Mobile</strong> está sendo desenvolvido com recursos 
            incríveis de gamificação e interação social.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center text-gray-600">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              <span>Feito com carinho para você</span>
            </div>
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              <span>Gamificação inteligente</span>
            </div>
          </div>

          {/* App Preview Mockup */}
          <div className="relative mx-auto w-64 h-128 bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Smartphone className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Clube do eBook</p>
                <p className="text-sm opacity-75">Em breve...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Recursos Incríveis Aguardam Você
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma experiência de aprendizado como nunca vista antes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coins System */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center mb-4">
              <Coins className="w-12 h-12 text-yellow-600 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">
                Sistema de Engrenas ⚙️
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa moeda virtual que recompensa seu engajamento e dedicação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnCoins.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.action}</p>
                          <p className="text-sm text-gray-600">Atividade</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">+{item.coins}</p>
                        <p className="text-xs text-gray-500">Engrenas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🏅 Sistema de Conquistas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suba de nível, ganhe insígnias e torne-se uma lenda!
            </p>
          </div>

          {/* Ranks */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Níveis de Usuário</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {ranks.map((rank, index) => {
                const Icon = rank.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 rounded-full ${rank.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <p className="font-semibold text-lg">{rank.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Login Rewards */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">Recompensas de Login</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Icon className={`w-12 h-12 mx-auto mb-4 ${reward.color}`} />
                      <h4 className="font-bold text-lg mb-2">{reward.title}</h4>
                      <p className="text-gray-600">{reward.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📧 Fique por Dentro!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Assine nossa newsletter e seja o primeiro a saber quando o app for lançado. 
              Garante acesso antecipado e bônus exclusivos!
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Quero Saber!
              </Button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              ✅ Sem spam, apenas atualizações importantes
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
