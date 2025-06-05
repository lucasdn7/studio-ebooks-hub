
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const CreatorAnalytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-gray-900">Análises e Gráficos</h2>

      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Análises em Desenvolvimento
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Esta funcionalidade está sendo desenvolvida. Em breve você terá acesso a gráficos 
          detalhados sobre suas vendas, conversões e performance dos seus e-books.
        </p>
      </div>

      {/* Placeholder cards for future analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Evolução das Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Gráfico em breve</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Ranking em breve</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Conversões por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Análise em breve</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Relatório em breve</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorAnalytics;
