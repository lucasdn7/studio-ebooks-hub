
import { Badge } from "@/components/ui/badge";

interface CreatorBadgeProps {
  badge: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const BADGE_CONFIG = {
  bronze: { icon: "🏅", label: "Iniciante", color: "bg-blue-100 text-blue-800" },
  silver: { icon: "🎖️", label: "Vendedor", color: "bg-blue-200 text-blue-800" },
  copper: { icon: "🥉", label: "Bronze", color: "bg-blue-300 text-blue-900" },
  iron: { icon: "🥈", label: "Prata", color: "bg-blue-400 text-blue-900" },
  gold: { icon: "🥇", label: "Ouro", color: "bg-blue-500 text-white" },
  diamond: { icon: "💎", label: "Diamante", color: "bg-blue-600 text-white" },
  crown: { icon: "👑", label: "Coroa", color: "bg-blue-700 text-white" },
  rocket: { icon: "🚀", label: "Foguete", color: "bg-blue-800 text-white" }
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
