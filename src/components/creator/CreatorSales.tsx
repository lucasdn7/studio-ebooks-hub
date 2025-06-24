import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Download, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Tables } from "@/integrations/supabase/types";

type SaleAnalytics = Tables<'sales_analytics'>;
type SalesStats = {
  totalSales: number;
  grossRevenue: number;
  netRevenue: number;
  downloads: number;
};

const CreatorSales = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState<SaleAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SalesStats>({
    totalSales: 0,
    grossRevenue: 0,
    netRevenue: 0,
    downloads: 0
  });

  const fetchSalesData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get creator ID
      const { data: creator } = await supabase
        .from('content_creators')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!creator) return;

      // Get sales analytics
      const { data: sales } = await supabase
        .from('sales_analytics')
        .select('*')
        .eq('creator_id', creator.id)
        .order('sale_date', { ascending: false });

      if (sales) {
        setSalesData(sales);
        
        // Calculate stats
        const totalSales = sales.length;
        const grossRevenue = sales.reduce((sum, sale) => sum + sale.gross_amount, 0);
        const netRevenue = sales.reduce((sum, sale) => sum + sale.net_amount, 0);
        
        setStats({
          totalSales,
          grossRevenue,
          netRevenue,
          downloads: totalSales // Assuming each sale is a download
        });
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSalesData();
    }
  }, [user, fetchSalesData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-gray-900">Minhas Vendas</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Receita Bruta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.grossRevenue.toFixed(2).replace('.', ',')}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Receita Líquida (95%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {stats.netRevenue.toFixed(2).replace('.', ',')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.downloads}</div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          {salesData.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma venda ainda
              </h3>
              <p className="text-gray-600">
                Suas vendas aparecerão aqui quando começarem a acontecer.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {salesData.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{sale.product_type === 'ebook' ? 'E-book' : 'Bundle'}</h4>
                    <p className="text-sm text-gray-600">ID: {sale.product_id}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(sale.sale_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      R$ {Number(sale.gross_amount).toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-green-600">
                      Líquido: R$ {Number(sale.net_amount).toFixed(2).replace('.', ',')}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      Comissão: {((1 - Number(sale.net_amount) / Number(sale.gross_amount)) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorSales;
