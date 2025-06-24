import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Lock } from "lucide-react";
import { CreatorBundle } from "@/types/sales";

interface CreatorBundlesProps {
  canCreateBundles: boolean;
}

const CreatorBundles = ({ canCreateBundles }: CreatorBundlesProps) => {
  const [bundles] = useState<CreatorBundle[]>([]);

  if (!canCreateBundles) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-gray-900">Bundles (Kits de E-books)</h2>
        
        <Card className="text-center py-12">
          <CardContent>
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Criar Bundles Bloqueado
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Para criar bundles, você precisa ter pelo menos 3 e-books publicados. 
              Continue criando conteúdo para desbloquear esta funcionalidade.
            </p>
            <Badge variant="outline" className="px-4 py-2">
              Necessário: 3+ e-books
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-gray-900">Bundles (Kits de E-books)</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Criar Bundle
        </Button>
      </div>

      {bundles.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum bundle criado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Crie bundles combinando seus e-books e ofereça preços promocionais.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Bundle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bundles will be displayed here */}
        </div>
      )}
    </div>
  );
};

export default CreatorBundles;
