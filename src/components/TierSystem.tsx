
import { UserTier, UserProgress } from '@/types/achievements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Star, Gift } from 'lucide-react';

interface TierSystemProps {
  userProgress: UserProgress;
}

const TierSystem = ({ userProgress }: TierSystemProps) => {
  const { currentTier, nextTier, totalPoints } = userProgress;
  
  const progressToNext = nextTier 
    ? ((totalPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-yellow-600" />
          <span>Seu Nível Atual</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{currentTier.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{currentTier.name}</h3>
              <Badge variant="outline" className={currentTier.color}>
                {currentTier.level.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
            <div className="text-sm text-gray-600">pontos totais</div>
          </div>
        </div>

        {nextTier && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso para {nextTier.name}</span>
              <span>{totalPoints}/{nextTier.minPoints} pontos</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Gift className="w-4 h-4 mr-1" />
              Benefícios Atuais
            </h4>
            <ul className="space-y-1">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <Star className="w-3 h-3 mr-2 text-yellow-500" />
                  {benefit}
                </li>
              ))}
              <li className="text-sm text-gray-600 flex items-center">
                <Star className="w-3 h-3 mr-2 text-yellow-500" />
                {currentTier.discount}% de desconto
              </li>
            </ul>
          </div>

          {nextTier && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Próximo Nível: {nextTier.name}
              </h4>
              <ul className="space-y-1">
                {nextTier.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-500 flex items-center">
                    <Star className="w-3 h-3 mr-2 text-gray-400" />
                    {benefit}
                  </li>
                ))}
                <li className="text-sm text-gray-500 flex items-center">
                  <Star className="w-3 h-3 mr-2 text-gray-400" />
                  {nextTier.discount}% de desconto
                </li>
              </ul>
              <div className="mt-2 text-xs text-gray-500">
                Faltam {nextTier.minPoints - totalPoints} pontos
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TierSystem;
