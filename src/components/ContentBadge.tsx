
import { Badge } from "@/components/ui/badge";
import { Crown, Gift } from "lucide-react";

interface ContentBadgeProps {
  type: "free" | "premium";
  size?: "sm" | "md";
}

const ContentBadge = ({ type, size = "sm" }: ContentBadgeProps) => {
  const badgeConfig = {
    free: {
      label: "Gratuito",
      icon: Gift,
      className: "bg-green-100 text-green-800 border-green-200"
    },
    premium: {
      label: "Premium",
      icon: Crown,
      className: "bg-amber-100 text-amber-800 border-amber-200"
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`}
    >
      <Icon className={`${iconSize} mr-1`} />
      {config.label}
    </Badge>
  );
};

export default ContentBadge;
