export interface SaleAnalytics {
  id: string;
  creator_id: string;
  product_id: string;
  product_type: 'ebook' | 'bundle';
  gross_amount: number;
  net_amount: number;
  sale_date: string;
  created_at: string;
  updated_at: string;
}

export interface SalesStats {
  totalSales: number;
  grossRevenue: number;
  netRevenue: number;
  downloads: number;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  price: number;
  ebook_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface CreatorBundle {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  price: number;
  ebook_count: number;
  sales_count: number;
  created_at: string;
  updated_at: string;
} 