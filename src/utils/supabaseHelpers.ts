
import { supabase } from '@/integrations/supabase/client';

export const getStorageUrl = (bucket: string, path: string) => {
  if (!path) return '/placeholder.svg';
  
  // Se já é uma URL completa, retorna como está
  if (path.startsWith('http')) return path;
  
  // Gera URL do Supabase Storage
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const formatDownloads = (downloads: number | null) => {
  if (!downloads || downloads === 0) return '0';
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}k`;
  }
  return downloads.toString();
};

export const mapEbookType = (type: string | null, isPremium: boolean | null) => {
  if (type) return type as 'free' | 'premium';
  return isPremium ? 'premium' : 'free';
};
