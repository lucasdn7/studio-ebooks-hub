
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import MyEbooks from "@/components/member/MyEbooks";
import SubscriptionManagement from "@/components/member/SubscriptionManagement";
import ProfileSettings from "@/components/member/ProfileSettings";
import SupportHelp from "@/components/member/SupportHelp";
import { useAchievements } from "@/hooks/useAchievements";
import { Button } from "@/components/ui/button";

const MemberArea = () => {
  const { userProgress } = useAchievements();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <MemberDashboard userProgress={userProgress} />;
      case "ebooks":
        return <MyEbooks />;
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

  if (!userProgress.isPremium) {
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
