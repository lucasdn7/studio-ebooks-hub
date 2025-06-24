import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback((
    error: unknown, 
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'Ocorreu um erro inesperado. Tente novamente.'
    } = options;

    // Extract error message
    let errorMessage = fallbackMessage;
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }

    // Sanitize error message for security
    const sanitizedMessage = errorMessage
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .substring(0, 200); // Limit length

    // Log error if enabled
    if (logError) {
      console.error('Error handled:', {
        message: sanitizedMessage,
        originalError: error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    }

    // Show toast if enabled
    if (showToast) {
      toast({
        title: "Erro",
        description: sanitizedMessage,
        variant: "destructive"
      });
    }

    return sanitizedMessage;
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }, [handleError]);

  const handleNetworkError = useCallback((
    error: unknown,
    context: string = 'network'
  ) => {
    let errorMessage = 'Erro de conexão. Verifique sua internet.';
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Erro ao conectar com o servidor. Tente novamente.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Tempo limite excedido. Tente novamente.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Erro de rede. Verifique sua conexão.';
      }
    }

    handleError(error, {
      showToast: true,
      logError: true,
      fallbackMessage: errorMessage
    });
  }, [handleError]);

  const handleValidationError = useCallback((
    errors: Record<string, string[]>,
    context: string = 'validation'
  ) => {
    const errorMessages = Object.values(errors).flat();
    const message = errorMessages.length > 0 
      ? errorMessages.join('. ')
      : 'Dados inválidos. Verifique as informações.';

    handleError(new Error(message), {
      showToast: true,
      logError: false,
      fallbackMessage: message
    });
  }, [handleError]);

  const handleAuthError = useCallback((
    error: unknown,
    context: 'login' | 'signup' | 'logout' = 'login'
  ) => {
    let errorMessage = 'Erro de autenticação. Tente novamente.';
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado.';
      } else if (error.message.includes('Too many requests')) {
        errorMessage = 'Muitas tentativas. Aguarde um momento.';
      }
    }

    handleError(error, {
      showToast: true,
      logError: true,
      fallbackMessage: errorMessage
    });
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    handleNetworkError,
    handleValidationError,
    handleAuthError
  };
}; 