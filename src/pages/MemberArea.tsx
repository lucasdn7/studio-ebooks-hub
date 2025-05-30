
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
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Lock } from "lucide-react";

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
        if (!userProgress?.isPremium) {
          return (
            <Card className="p-8 text-center">
              <CardContent>
                <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  Conquistas <span className="font-medium">Premium</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  O sistema de conquistas e badges está disponível apenas para membros premium.
                </p>
                <Button className="bg-gray-900 hover:bg-gray-800">
                  <Crown className="w-4 h-4 mr-2" />
                  Fazer Upgrade Premium
                </Button>
              </CardContent>
            </Card>
          );
        }
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
