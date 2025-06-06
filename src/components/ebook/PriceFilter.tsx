
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Filter } from "lucide-react";

interface PriceFilterProps {
  onPriceChange: (min: number, max: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

const PriceFilter = ({ onPriceChange, minPrice = 0, maxPrice = 200 }: PriceFilterProps) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [inputMin, setInputMin] = useState(minPrice.toString());
  const [inputMax, setInputMax] = useState(maxPrice.toString());

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setInputMin(value[0].toString());
    setInputMax(value[1].toString());
    onPriceChange(value[0], value[1]);
  };

  const handleInputChange = () => {
    const min = Math.max(0, parseInt(inputMin) || 0);
    const max = Math.min(500, parseInt(inputMax) || 500);
    setPriceRange([min, max]);
    onPriceChange(min, max);
  };

  const handleReset = () => {
    setPriceRange([0, 200]);
    setInputMin("0");
    setInputMax("200");
    onPriceChange(0, 200);
  };

  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-900 flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          Filtrar por Preço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={handleSliderChange}
            max={500}
            min={0}
            step={5}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block">Mín.</label>
            <Input
              value={inputMin}
              onChange={(e) => setInputMin(e.target.value)}
              onBlur={handleInputChange}
              className="text-sm h-8"
              placeholder="0"
            />
          </div>
          <span className="text-gray-400 mt-5">—</span>
          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block">Máx.</label>
            <Input
              value={inputMax}
              onChange={(e) => setInputMax(e.target.value)}
              onBlur={handleInputChange}
              className="text-sm h-8"
              placeholder="200"
            />
          </div>
        </div>

        <div className="text-center text-sm text-blue-700 font-medium">
          R$ {priceRange[0]} - R$ {priceRange[1]}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset}
          className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Filter className="w-3 h-3 mr-1" />
          Limpar Filtro
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceFilter;
