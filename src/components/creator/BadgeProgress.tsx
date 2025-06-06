
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import CreatorBadge from "./CreatorBadge";

interface BadgeLevel {
  badge: string;
  requirement: number;
  commission: number;
  label: string;
  icon: string;
}

const BADGE_LEVELS: BadgeLevel[] = [
  { badge: "bronze", requirement: 0, commission: 10, label: "Iniciante", icon: "🏅" },
  { badge: "silver", requirement: 1, commission: 9, label: "Vendedor", icon: "🎖️" },
  { badge: "copper", requirement: 5, commission: 8, label: "Bronze", icon: "🥉" },
  { badge: "iron", requirement: 10, commission: 7, label: "Prata", icon: "🥈" },
  { badge: "gold", requirement: 25, commission: 6, label: "Ouro", icon: "🥇" },
  { badge: "diamond", requirement: 50, commission: 5, label: "Diamante", icon: "💎" },
  { badge: "crown", requirement: 100, commission: 4, label: "Coroa", icon: "👑" },
  { badge: "rocket", requirement: 500, commission: 3, label: "Foguete", icon: "🚀" }
];

interface BadgeProgressProps {
  currentBadge: string;
  currentSales: number;
  currentCommissionRate: number;
  nextBadge?: string;
  nextBadgeRequirement?: number;
  salesToNextLevel?: number;
}

const BadgeProgress = ({
  currentBadge,
  currentSales,
  currentCommissionRate,
  nextBadge,
  nextBadgeRequirement,
  salesToNextLevel
}: BadgeProgressProps) => {
  const currentLevel = BADGE_LEVELS.find(level => level.badge === currentBadge);
  const nextLevel = BADGE_LEVELS.find(level => level.badge === nextBadge);
  
  const progressPercentage = nextBadgeRequirement ? 
    ((currentSales - (currentLevel?.requirement || 0)) / (nextBadgeRequirement - (currentLevel?.requirement || 0))) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Current Badge Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreatorBadge badge={currentBadge} size="lg" />
            <div>
              <h3 className="text-xl font-semibold">Sua Badge Atual</h3>
              <p className="text-sm text-gray-600">
                Comissão da plataforma: {(currentCommissionRate * 100).toFixed(0)}%
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Suas Vendas</h4>
              <div className="text-2xl font-bold text-green-600">{currentSales}</div>
              <p className="text-sm text-gray-600">e-books vendidos</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Você Recebe</h4>
              <div className="text-2xl font-bold text-blue-600">
                {((1 - currentCommissionRate) * 100).toFixed(0)}%
              </div>
              <p className="text-sm text-gray-600">de cada venda</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Level */}
      {nextLevel && salesToNextLevel !== undefined && salesToNextLevel > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">{nextLevel.icon}</span>
              <div>
                <h3 className="text-lg font-semibold">Próximo Nível: {nextLevel.label}</h3>
                <p className="text-sm text-gray-600">
                  Comissão da plataforma: {nextLevel.commission}% 
                  (você receberá {100 - nextLevel.commission}%)
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progresso para {nextLevel.label}</span>
                <span>{currentSales}/{nextBadgeRequirement} vendas</span>
              </div>
              <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-3" />
              <p className="text-sm text-center text-gray-600">
                Faltam <span className="font-semibold text-gray-900">{salesToNextLevel}</span> vendas 
                para o próximo nível
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Badge System Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Como funciona a comissão?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Na nossa plataforma, quanto mais você vende, menos comissão pagará! 
            Conheça o nosso sistema de badges:
          </p>
          <div className="space-y-3">
            {BADGE_LEVELS.map((level) => (
              <div 
                key={level.badge}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  level.badge === currentBadge ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{level.icon}</span>
                  <div>
                    <span className="font-medium">{level.label}</span>
                    <p className="text-sm text-gray-600">
                      {level.requirement === 0 ? 'Nível padrão' : `${level.requirement}+ vendas`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Você recebe {100 - level.commission}%</div>
                  <div className="text-sm text-gray-600">Comissão: {level.commission}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeProgress;
