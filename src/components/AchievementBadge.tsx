
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
      case 'content': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700';
      case 'social': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700';
      case 'time': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-700';
      case 'special': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-700';
      case 'certification': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
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
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-300 dark:border-yellow-600' 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="text-2xl mb-1">
          {achievement.completed ? achievement.icon : <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />}
        </div>
        <div className="font-medium text-center leading-tight text-gray-900 dark:text-gray-100">{achievement.title}</div>
        {achievement.completed && (
          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white dark:bg-gray-800 rounded-full" />
        )}
      </div>
    );
  }

  return (
    <Card className={`${sizeClasses[size]} ${
      achievement.completed 
        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-300 dark:border-yellow-600' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(achievement.category)}`}>
            {achievement.category === 'content' && 'Conteúdo'}
            {achievement.category === 'social' && 'Social'}
            {achievement.category === 'time' && 'Frequência'}
            {achievement.category === 'special' && 'Especial'}
            {achievement.category === 'certification' && 'Certificação'}
          </Badge>
          {achievement.completed && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="text-3xl mb-2">
            {achievement.completed ? achievement.icon : <Lock className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500" />}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{achievement.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
        </div>

        <div className="space-y-2">
          {!achievement.completed && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {achievement.currentProgress}/{achievement.requirement}
              </div>
            </>
          )}
          <div className="text-xs font-medium text-center text-yellow-700 dark:text-yellow-400">
            +{achievement.points} pontos
          </div>
          {achievement.reward && (
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center italic">
              {achievement.reward}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
