
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
    sm: 'w-24 h-28',
    md: 'w-full min-h-[200px]',
    lg: 'w-full min-h-[250px]'
  };

  if (size === 'sm') {
    return (
      <div className={`${sizeClasses[size]} relative flex flex-col items-center justify-between p-3 rounded-lg border-2 ${
        achievement.completed 
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex flex-col items-center flex-1 justify-center">
          <div className="text-xl mb-1">
            {achievement.completed ? achievement.icon : <Lock className="w-5 h-5 text-gray-400" />}
          </div>
          <div className="font-medium text-center text-xs leading-tight line-clamp-2">
            {achievement.title}
          </div>
        </div>
        
        <div className="mt-2 w-full">
          <div className="text-xs font-medium text-center text-yellow-700 mb-1">
            +{achievement.points} pts
          </div>
          {achievement.premiumOnly && (
            <Badge variant="outline" className="w-full justify-center bg-purple-100 text-purple-700 border-purple-200 text-xs py-0">
              Premium
            </Badge>
          )}
        </div>
        
        {achievement.completed && (
          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
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
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(achievement.category)}`}>
            {getCategoryName(achievement.category)}
          </Badge>
          {achievement.completed && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">
              {achievement.completed ? achievement.icon : <Lock className="w-8 h-8 mx-auto text-gray-400" />}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">{achievement.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">{achievement.description}</p>
          </div>

          <div className="mt-auto space-y-3">
            {achievement.premiumOnly && (
              <Badge variant="outline" className="w-full justify-center bg-purple-100 text-purple-700 border-purple-200 text-xs">
                Exclusivo Premium
              </Badge>
            )}

            {!achievement.completed && (
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-gray-500 text-center">
                  {achievement.currentProgress}/{achievement.requirement}
                </div>
              </div>
            )}
            
            <div className="text-xs font-medium text-center text-yellow-700 bg-yellow-50 py-1 rounded">
              +{achievement.points} pontos
            </div>
            
            {achievement.reward && (
              <div className="text-xs text-gray-600 text-center italic">
                {achievement.reward}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
