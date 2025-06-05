
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, CreditCard, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";

type Kit = Tables<'kits'>;

interface BundleCardProps {
  bundle: Kit;
  onPurchase: (bundle: Kit) => void;
}

const BundleCard = ({ bundle, onPurchase }: BundleCardProps) => {
  const coverUrl = getStorageUrl('kit-covers', bundle.cover_image || '');

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={coverUrl} 
            alt={bundle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-600 text-white">
              <Package className="w-3 h-3 mr-1" />
              Kit
            </Badge>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
          {bundle.title}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">
          {bundle.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {bundle.ebook_ids?.length || 0} e-books
          </div>
          <div className="text-lg font-bold text-gray-900">
            R$ {bundle.price.toString().replace('.', ',')}
          </div>
        </div>

        <div className="space-y-2">
          <Link to={`/kit/${bundle.id}`} className="block">
            <Button variant="outline" className="w-full">
              Ver detalhes
            </Button>
          </Link>
          
          <Button 
            onClick={() => onPurchase(bundle)}
            className="w-full"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Comprar Kit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleCard;
