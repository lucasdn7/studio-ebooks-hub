
import { useState } from "react";
import { useCreator } from "@/hooks/useCreator";
import { useBadgeProgress } from "@/hooks/useBadgeProgress";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, BarChart3, Package, Settings, Crown, Award } from "lucide-react";
import CreatorEbooks from "@/components/creator/CreatorEbooks";
import CreatorSales from "@/components/creator/CreatorSales";
import CreatorAnalytics from "@/components/creator/CreatorAnalytics";
import CreatorBundles from "@/components/creator/CreatorBundles";
import CreatorSettings from "@/components/creator/CreatorSettings";
import CreatorBadge from "@/components/creator/CreatorBadge";
import BadgeProgress from "@/components/creator/BadgeProgress";

const CreatorDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isCreator, creatorData, creatorProfile, loading: creatorLoading, becomeCreator } = useCreator();
  const { badgeProgress, loading: badgeLoading } = useBadgeProgress();
  const [activeTab, setActiveTab] = useState("ebooks");

  if (authLoading || creatorLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isCreator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Card className="p-8">
              <CardContent>
                <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-6" />
                <h1 className="text-3xl font-light text-gray-900 mb-4">
                  Torne-se um <span className="font-medium">Criador de Conteúdo</span>
                </h1>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Compartilhe seus conhecimentos e monetize seu conteúdo criando e-books incríveis. 
                  Ganhe até 97% de cada venda e tenha acesso a ferramentas profissionais de criação e análise.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-2">Crie e-books</h3>
                    <p className="text-sm text-gray-600">Upload de PDFs, EPUBs e audiobooks</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-2">Até 97% de comissão</h3>
                    <p className="text-sm text-gray-600">Sistema de badges progressivo</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-2">Sistema de badges</h3>
                    <p className="text-sm text-gray-600">Quanto mais vende, mais recebe</p>
                  </div>
                </div>
                <Button onClick={becomeCreator} size="lg" className="bg-gray-900 hover:bg-gray-800">
                  Tornar-se Criador de Conteúdo
                </Button>
              </CardContent>
            </Card>
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
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-light text-gray-900">
                Dashboard do <span className="font-medium">Criador</span>
              </h1>
              {badgeProgress && !badgeLoading && (
                <CreatorBadge badge={badgeProgress.currentBadge} size="lg" />
              )}
            </div>
            <p className="text-gray-600">Gerencie seus e-books, vendas e análises</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">E-books Criados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creatorData?.total_ebooks || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">E-books Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{badgeProgress?.currentSales || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Comissão Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {badgeProgress ? `${((1 - badgeProgress.currentCommissionRate) * 100).toFixed(0)}%` : '90%'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {creatorProfile?.total_earnings?.toString().replace('.', ',') || '0,00'}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="ebooks" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Meus E-books
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Vendas
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Análises
              </TabsTrigger>
              <TabsTrigger value="bundles" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Bundles
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Badges
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ebooks" className="mt-6">
              <CreatorEbooks />
            </TabsContent>

            <TabsContent value="sales" className="mt-6">
              <CreatorSales />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <CreatorAnalytics />
            </TabsContent>

            <TabsContent value="bundles" className="mt-6">
              <CreatorBundles canCreateBundles={creatorData?.can_create_bundles || false} />
            </TabsContent>

            <TabsContent value="badges" className="mt-6">
              {badgeProgress && !badgeLoading ? (
                <BadgeProgress {...badgeProgress} />
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <CreatorSettings />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorDashboard;
