
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useEbookDownload = () => {
  const [downloading, setDownloading] = useState<number | null>(null);
  const { user } = useAuth();

  const downloadEbook = async (ebookId: number, title: string, fileUrl: string, isPremium: boolean) => {
    try {
      setDownloading(ebookId);

      // Verificar se o usuário tem permissão para baixar
      if (isPremium && user) {
        // Verificar se o usuário tem acesso premium
        const { data: userStats } = await supabase
          .from('user_stats')
          .select('is_premium')
          .eq('user_id', user.id)
          .single();

        if (!userStats?.is_premium) {
          toast.error("Este e-book é premium. Assine um plano para ter acesso.");
          return;
        }
      }

      // Tentar baixar primeiro do Storage do Supabase
      let downloadUrl = fileUrl;
      
      if (fileUrl && !fileUrl.startsWith('http')) {
        // É um caminho do Storage, gerar URL pública
        const { data } = supabase.storage
          .from('ebooks')
          .getPublicUrl(fileUrl);
        
        downloadUrl = data.publicUrl;
      }

      if (!downloadUrl) {
        toast.error("Arquivo não encontrado. Entre em contato com o suporte.");
        return;
      }

      // Fazer o download
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      
      // Criar link de download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Definir nome do arquivo
      const filename = `${title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.pdf`;
      link.download = filename;
      
      // Simular clique para iniciar download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpar URL objeto
      window.URL.revokeObjectURL(url);

      // Incrementar contador de downloads
      await supabase
        .from('ebooks')
        .update({ downloads: supabase.raw('downloads + 1') })
        .eq('id', ebookId);

      // Se o usuário estiver logado, atualizar suas estatísticas
      if (user) {
        await supabase
          .from('user_stats')
          .update({ ebooks_read: supabase.raw('ebooks_read + 1') })
          .eq('user_id', user.id);
      }

      toast.success("Download iniciado com sucesso!");
      
    } catch (error) {
      console.error('Erro no download:', error);
      toast.error("Erro ao baixar o arquivo. Verifique sua conexão e tente novamente.");
    } finally {
      setDownloading(null);
    }
  };

  return {
    downloadEbook,
    downloading
  };
};
