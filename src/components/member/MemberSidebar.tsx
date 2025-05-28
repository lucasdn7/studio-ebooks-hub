
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  User, 
  HelpCircle,
  LogOut,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

interface MemberSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProgress: any;
}

const MemberSidebar = ({ activeTab, onTabChange, userProgress }: MemberSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "ebooks", label: "Meus eBooks", icon: BookOpen },
    { id: "subscription", label: "Assinatura", icon: CreditCard },
    { id: "profile", label: "Dados Pessoais", icon: User },
    { id: "support", label: "Suporte", icon: HelpCircle }
  ];

  return (
    <Card className="w-64 h-fit sticky top-8">
      <CardContent className="p-4">
        {/* User Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-medium">
              JS
            </div>
            <div>
              <h3 className="font-medium text-gray-900">João Silva</h3>
              <Badge className={userProgress.currentTier.color}>
                <Crown className="w-3 h-3 mr-1" />
                {userProgress.currentTier.name}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 mb-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Link to="/ebooks">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore novos eBooks
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberSidebar;
