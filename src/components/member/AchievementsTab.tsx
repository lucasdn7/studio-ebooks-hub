
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Star, Crown, Target } from "lucide-react";
import TierSystem from "@/components/TierSystem";
import AchievementsSection from "@/components/AchievementsSection";

interface AchievementsTabProps {
  userProgress: any;
}

const AchievementsTab = ({ userProgress }: AchievementsTabProps) => {
  const { currentTier, nextTier, totalPoints, completedAchievements, pendingAchievements } = userProgress;
  
  const progressToNext = nextTier 
    ? ((totalPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const totalBadges = completedAchievements.filter(a => a.category !== 'certificate').length;
  const totalMedals = completedAchievements.filter(a => a.category === 'certificate').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">
            Minhas <span className="font-medium">Conquistas</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Acompanhe seu progresso e desbloqueie recompensas exclusivas
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{totalPoints}</div>
          <div className="text-sm text-gray-600">pontos totais</div>
        </div>
      </div>

      {/* User Avatar and Current Rank */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JS
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <span className="text-2xl">{currentTier.icon}</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">João Silva</h2>
              <Badge className={`${currentTier.color} text-sm`}>
                <Crown className="w-4 h-4 mr-1" />
                {currentTier.name}
              </Badge>
              {nextTier && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progresso para {nextTier.name}</span>
                    <span>{totalPoints}/{nextTier.minPoints} pts</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Você está a {nextTier.minPoints - totalPoints} pontos de se tornar {nextTier.name}!
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Medal className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalBadges}</div>
            <div className="text-sm text-gray-600">Badges Conquistadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalMedals}</div>
            <div className="text-sm text-gray-600">Medalhas Especiais</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{pendingAchievements.length}</div>
            <div className="text-sm text-gray-600">Em Progresso</div>
          </CardContent>
        </Card>
      </div>

      {/* Tier System */}
      <TierSystem userProgress={userProgress} />

      {/* Achievements Section */}
      <AchievementsSection 
        completedAchievements={completedAchievements}
        pendingAchievements={pendingAchievements}
      />

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Continue sua jornada de aprendizado!
          </h3>
          <p className="text-gray-600 mb-4">
            Baixe mais eBooks, deixe avaliações e suba de rank para desbloquear recompensas exclusivas.
          </p>
          <div className="flex justify-center space-x-3">
            <Badge variant="outline" className="bg-white">
              📚 Próxima conquista: Leitor Assíduo
            </Badge>
            <Badge variant="outline" className="bg-white">
              🎯 Faltam 7 eBooks
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsTab;
