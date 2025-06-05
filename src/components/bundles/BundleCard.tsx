
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Kit = Tables<'kits'>;

interface BundleCardProps {
  bundle: Kit;
  onPurchase?: (bundle: Kit) => void;
}

const BundleCard = ({ bundle, onPurchase }: BundleCardProps) => {
  const ebookCount = bundle.ebook_ids?.length || 0;
  const savings = Math.round(Math.random() * 30 + 20); // Mock savings percentage

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="aspect-[3/2] bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
          {bundle.cover_image ? (
            <img 
              src={bundle.cover_image} 
              alt={bundle.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-2" />
                <span className="text-lg font-semibold">Kit de E-books</span>
              </div>
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 text-white">
              {savings}% OFF
            </Badge>
          </div>
          
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-white text-gray-900">
              {ebookCount} E-books
            </Badge>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
          {bundle.title}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">
          {bundle.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                R$ {bundle.price.toString().replace('.', ',')}
              </div>
              <div className="text-sm text-gray-500">
                Economia de {savings}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {ebookCount} e-books inclusos
              </div>
              <div className="text-xs text-gray-500">
                Acesso vitalício
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full"
              onClick={() => onPurchase?.(bundle)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar Kit
            </Button>
            
            <Link to={`/bundle/${bundle.id}`}>
              <Button variant="outline" className="w-full">
                Ver Detalhes
              </Button>
            </Link>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <Download className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-green-700">
                <p className="font-medium">Inclui:</p>
                <p>• Download imediato de todos os e-books</p>
                <p>• Formatos PDF e EPUB</p>
                <p>• Suporte via e-mail</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleCard;
