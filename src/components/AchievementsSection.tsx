
import { useState } from 'react';
import { Achievement } from '@/types/achievements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AchievementBadge from './AchievementBadge';
import { Trophy, Target, Users, Clock, Sparkles, Award } from 'lucide-react';

interface AchievementsSectionProps {
  completedAchievements: Achievement[];
  pendingAchievements: Achievement[];
}

const AchievementsSection = ({ completedAchievements, pendingAchievements }: AchievementsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Achievement['category']>('all');

  const filterAchievements = (achievements: Achievement[]) => {
    if (selectedCategory === 'all') return achievements;
    return achievements.filter(a => a.category === selectedCategory);
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'content': return <Target className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'time': return <Clock className="w-4 h-4" />;
      case 'special': return <Sparkles className="w-4 h-4" />;
      case 'certificate': return <Award className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: Achievement['category']) => {
    switch (category) {
      case 'content': return 'Conteúdo';
      case 'social': return 'Social';
      case 'time': return 'Frequência';
      case 'special': return 'Especial';
      case 'certificate': return 'Certificados';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <span>Conquistas Premium</span>
          <Badge variant="secondary" className="ml-2">
            {completedAchievements.length}/{completedAchievements.length + pendingAchievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed">
              Conquistadas ({completedAchievements.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Em Progresso ({pendingAchievements.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap gap-2 my-6">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory('all')}
            >
              Todas
            </Badge>
            {['content', 'social', 'time', 'special', 'certificate'].map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer flex items-center space-x-1"
                onClick={() => setSelectedCategory(category as Achievement['category'])}
              >
                {getCategoryIcon(category as Achievement['category'])}
                <span>{getCategoryName(category as Achievement['category'])}</span>
              </Badge>
            ))}
          </div>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {filterAchievements(completedAchievements).map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} size="sm" />
              ))}
            </div>
            {filterAchievements(completedAchievements).length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-2">Nenhuma conquista nesta categoria ainda</p>
                <p className="text-sm">Continue explorando para desbloquear suas primeiras conquistas!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterAchievements(pendingAchievements).map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} size="md" />
              ))}
            </div>
            {filterAchievements(pendingAchievements).length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                <p className="text-lg font-medium mb-2">Todas as conquistas desta categoria foram completadas! 🎉</p>
                <p className="text-sm">Parabéns! Você dominou esta categoria completamente.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;
