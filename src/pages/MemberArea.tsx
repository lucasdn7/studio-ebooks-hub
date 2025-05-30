
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import MyEbooks from "@/components/member/MyEbooks";
import SubscriptionManagement from "@/components/member/SubscriptionManagement";
import ProfileSettings from "@/components/member/ProfileSettings";
import SupportHelp from "@/components/member/SupportHelp";
import AchievementsTab from "@/components/member/AchievementsTab";
import { useAchievements } from "@/hooks/useAchievements";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const MemberArea = () => {
  const { user, loading } = useAuth();
  const { userProgress, loading: achievementsLoading } = useAchievements();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading || achievementsLoading) {
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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <MemberDashboard userProgress={userProgress} />;
      case "ebooks":
        return <MyEbooks />;
      case "achievements":
        return <AchievementsTab userProgress={userProgress} />;
      case "subscription":
        return <SubscriptionManagement />;
      case "profile":
        return <ProfileSettings />;
      case "support":
        return <SupportHelp />;
      default:
        return <MemberDashboard userProgress={userProgress} />;
    }
  };

  if (!userProgress?.isPremium) {
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
          <div className="flex gap-8">
            {/* Sidebar */}
            <MemberSidebar 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              userProgress={userProgress}
            />
            
            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemberArea;
