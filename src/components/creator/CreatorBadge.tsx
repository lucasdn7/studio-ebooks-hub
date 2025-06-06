
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CreatorBadgeProps {
  badge: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const BADGE_CONFIG = {
  bronze: { icon: "🏅", label: "Iniciante", color: "bg-orange-100 text-orange-800" },
  silver: { icon: "🎖️", label: "Vendedor", color: "bg-gray-100 text-gray-800" },
  copper: { icon: "🥉", label: "Bronze", color: "bg-amber-100 text-amber-800" },
  iron: { icon: "🥈", label: "Prata", color: "bg-slate-100 text-slate-800" },
  gold: { icon: "🥇", label: "Ouro", color: "bg-yellow-100 text-yellow-800" },
  diamond: { icon: "💎", label: "Diamante", color: "bg-blue-100 text-blue-800" },
  crown: { icon: "👑", label: "Coroa", color: "bg-purple-100 text-purple-800" },
  rocket: { icon: "🚀", label: "Foguete", color: "bg-green-100 text-green-800" }
};

const CreatorBadge = ({ badge, size = 'md', showLabel = true }: CreatorBadgeProps) => {
  const config = BADGE_CONFIG[badge as keyof typeof BADGE_CONFIG] || BADGE_CONFIG.bronze;
  
  const iconSize = {
    sm: "text-sm",
    md: "text-lg", 
    lg: "text-2xl"
  }[size];

  if (!showLabel) {
    return (
      <span className={`inline-flex items-center ${iconSize}`}>
        {config.icon}
      </span>
    );
  }

  return (
    <Badge variant="outline" className={`${config.color} border-current`}>
      <span className={`mr-1 ${iconSize}`}>{config.icon}</span>
      {config.label}
    </Badge>
  );
};

export default CreatorBadge;
