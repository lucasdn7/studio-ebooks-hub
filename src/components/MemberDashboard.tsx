
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TierSystem from "@/components/TierSystem";
import AchievementsSection from "@/components/AchievementsSection";
import CertificatesSection from "@/components/CertificatesSection";
import { useAchievements } from "@/hooks/useAchievements";
import { BookOpen, Award, TrendingUp, Calendar, Star, Users, Download } from "lucide-react";

const MemberDashboard = () => {
  const { userProgress } = useAchievements();

  const stats = [
    { label: "E-books Lidos", value: userProgress.stats.ebooksRead.toString(), icon: BookOpen, color: "text-blue-600" },
    { label: "Certificados", value: userProgress.stats.certificatesEarned.toString(), icon: Award, color: "text-green-600" },
    { label: "Sequência Ativa", value: `${userProgress.stats.streakDays} dias`, icon: TrendingUp, color: "text-orange-600" },
    { label: "Pontos Totais", value: userProgress.totalPoints.toString(), icon: Star, color: "text-yellow-600" }
  ];

  const recentActivity = [
    { action: "Completou e-book", item: "Arquitetura Sustentável", points: 25, time: "2 horas atrás" },
    { action: "Nova conquista", item: "Leitor Dedicado", points: 50, time: "1 dia atrás" },
    { action: "Certificado obtido", item: "Especialista em Design", points: 100, time: "3 dias atrás" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
            Área do <span className="font-medium">Membro</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Acompanhe seu progresso e conquistas</p>
        </div>
        <Badge className={`${userProgress.currentTier.color} flex items-center space-x-1`}>
          <Users className="w-4 h-4" />
          <span>{userProgress.currentTier.name}</span>
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tier System */}
      <TierSystem userProgress={userProgress} />

      {/* Recent Activity */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
            <Calendar className="w-5 h-5" />
            <span>Atividade Recente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</span>
                    <Badge variant="outline" className="text-xs">+{activity.points} pts</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <AchievementsSection 
        completedAchievements={userProgress.completedAchievements}
        pendingAchievements={userProgress.pendingAchievements}
      />

      {/* Certificates */}
      <CertificatesSection certificates={userProgress.certificates} />
    </div>
  );
};

export default MemberDashboard;
