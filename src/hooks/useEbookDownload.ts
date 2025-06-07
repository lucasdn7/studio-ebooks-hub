
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

      if (!user) {
        toast.error("Faça login para baixar e-books.");
        return;
      }

      // Security check: Verify user has permission to download
      if (isPremium) {
        // Check if user has premium subscription or purchased this specific ebook
        const { data: userStats } = await supabase
          .from('user_stats')
          .select('is_premium')
          .eq('user_id', user.id)
          .single();

        const { data: purchase } = await supabase
          .from('orders')
          .select('id')
          .eq('user_id', user.id)
          .eq('product_id', ebookId.toString())
          .eq('product_type', 'ebook')
          .eq('status', 'paid')
          .single();

        if (!userStats?.is_premium && !purchase) {
          toast.error("Este e-book é premium. Assine um plano ou compre este e-book para ter acesso.");
          return;
        }
      }

      // Validate file URL and sanitize
      if (!fileUrl || typeof fileUrl !== 'string') {
        toast.error("Arquivo não encontrado. Entre em contato com o suporte.");
        return;
      }

      // Prevent path traversal attacks
      const sanitizedUrl = fileUrl.replace(/\.\./g, '').replace(/[<>:"|?*]/g, '');
      
      let downloadUrl = sanitizedUrl;
      
      if (sanitizedUrl && !sanitizedUrl.startsWith('http')) {
        // É um caminho do Storage, gerar URL pública
        const { data } = supabase.storage
          .from('ebooks')
          .getPublicUrl(sanitizedUrl);
        
        downloadUrl = data.publicUrl;
      }

      if (!downloadUrl) {
        toast.error("Arquivo não encontrado. Entre em contato com o suporte.");
        return;
      }

      // Fazer o download com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        const response = await fetch(downloadUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/pdf,application/epub+zip,*/*'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        
        // Validate file size (prevent excessively large files)
        if (blob.size > 100 * 1024 * 1024) { // 100MB limit
          throw new Error('File too large');
        }
        
        // Criar link de download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Sanitize filename to prevent XSS
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s\-_]/g, '').replace(/\s+/g, '_').substring(0, 100);
        const filename = `${sanitizedTitle}.pdf`;
        link.download = filename;
        
        // Simular clique para iniciar download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpar URL objeto
        window.URL.revokeObjectURL(url);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }

      // Incrementar contador de downloads usando transação segura
      try {
        const { error: updateError } = await supabase.rpc('increment_ebook_downloads', {
          ebook_id: ebookId
        });

        if (updateError) {
          console.error('Error updating download count:', updateError);
        }
      } catch (error) {
        console.error('Error updating download count:', error);
      }

      // Se o usuário estiver logado, atualizar suas estatísticas
      try {
        const { error: statsError } = await supabase.rpc('increment_user_ebooks_read', {
          user_uuid: user.id
        });

        if (statsError) {
          console.error('Error updating user stats:', statsError);
        }
      } catch (error) {
        console.error('Error updating user stats:', error);
      }

      toast.success("Download iniciado com sucesso!");
      
    } catch (error) {
      console.error('Erro no download:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error("Download cancelado por timeout. Verifique sua conexão.");
        } else if (error.message.includes('File too large')) {
          toast.error("Arquivo muito grande. Entre em contato com o suporte.");
        } else {
          toast.error("Erro ao baixar o arquivo. Verifique sua conexão e tente novamente.");
        }
      } else {
        toast.error("Erro ao baixar o arquivo. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setDownloading(null);
    }
  };

  return {
    downloadEbook,
    downloading
  };
};
