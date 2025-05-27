
import { Achievement } from '@/types/achievements';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, CheckCircle } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge = ({ achievement, size = 'md' }: AchievementBadgeProps) => {
  const progressPercentage = (achievement.currentProgress / achievement.requirement) * 100;
  
  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'content': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'social': return 'bg-green-100 text-green-800 border-green-200';
      case 'time': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'special': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'certificate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryName = (category: Achievement['category']) => {
    switch (category) {
      case 'content': return 'Conteúdo';
      case 'social': return 'Social';
      case 'time': return 'Frequência';
      case 'special': return 'Especial';
      case 'certificate': return 'Certificado';
      default: return category;
    }
  };

  const sizeClasses = {
    sm: 'w-20 h-20 text-xs',
    md: 'w-32 h-32 text-sm',
    lg: 'w-40 h-40 text-base'
  };

  if (size === 'sm') {
    return (
      <div className={`${sizeClasses[size]} relative flex flex-col items-center justify-center rounded-lg border-2 ${
        achievement.completed 
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="text-2xl mb-1">
          {achievement.completed ? achievement.icon : <Lock className="w-4 h-4 text-gray-400" />}
        </div>
        <div className="font-medium text-center leading-tight">{achievement.title}</div>
        {achievement.completed && (
          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
        )}
        {achievement.premiumOnly && (
          <Badge variant="outline" className="absolute -bottom-1 bg-purple-100 text-purple-700 border-purple-200 text-xs">
            Premium
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className={`${sizeClasses[size]} ${
      achievement.completed 
        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
        : 'bg-white'
    }`}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(achievement.category)}`}>
            {getCategoryName(achievement.category)}
          </Badge>
          {achievement.completed && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="text-3xl mb-2">
            {achievement.completed ? achievement.icon : <Lock className="w-8 h-8 mx-auto text-gray-400" />}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
          {achievement.premiumOnly && (
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs mb-2">
              Exclusivo Premium
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          {!achievement.completed && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-gray-500 text-center">
                {achievement.currentProgress}/{achievement.requirement}
              </div>
            </>
          )}
          <div className="text-xs font-medium text-center text-yellow-700">
            +{achievement.points} pontos
          </div>
          {achievement.reward && (
            <div className="text-xs text-gray-600 text-center italic">
              {achievement.reward}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
