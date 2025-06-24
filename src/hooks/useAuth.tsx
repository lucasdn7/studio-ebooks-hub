import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { validateEmail, validatePassword, sanitizeHtml } from '@/utils/security';
import { RateLimiter } from '@/utils/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rate limiter for auth attempts
const authRateLimiter = new RateLimiter();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Update user stats for premium access (secure check)
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(async () => {
            try {
              // Check if user has admin role instead of hardcoded email
              const { data: userStats } = await (supabase as any)
                .from('user_stats')
                .select('role, is_premium')
                .eq('user_id', session.user.id)
                .single();
              
              // Only update premium status if user has admin role
              if (userStats?.role === 'admin' && !userStats?.is_premium) {
                const { error } = await (supabase as any)
                  .from('user_stats')
                  .update({
                    is_premium: true,
                    updated_at: new Date().toISOString()
                  })
                  .eq('user_id', session.user.id);
                
                if (error) {
                  console.error('Erro ao atualizar status premium:', error);
                } else {
                  toast({
                    title: "Acesso Premium Ativado!",
                    description: "Bem-vindo ao Clube do eBook Premium!"
                  });
                }
              }
            } catch (error) {
              console.error('Erro ao verificar status premium:', error);
            }
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    // Rate limiting check
    const clientId = user?.id || 'anonymous';
    if (!authRateLimiter.isAllowed(`signup_${clientId}`, 3, 300000)) { // 3 attempts per 5 minutes
      const error = new Error('Muitas tentativas de cadastro. Aguarde 5 minutos.');
      toast({
        title: "Limite excedido",
        description: "Muitas tentativas de cadastro. Aguarde 5 minutos e tente novamente.",
        variant: "destructive"
      });
      return { error };
    }

    // Input validation and sanitization
    if (!validateEmail(email)) {
      const error = new Error('Email inválido');
      toast({
        title: "Erro no cadastro",
        description: "Email inválido. Verifique o formato do email.",
        variant: "destructive"
      });
      return { error };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const error = new Error('Senha inválida');
      toast({
        title: "Erro no cadastro",
        description: passwordValidation.errors.join('. '),
        variant: "destructive"
      });
      return { error };
    }

    // Sanitize inputs
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedFirstName = firstName ? sanitizeHtml(firstName.trim()) : undefined;
    const sanitizedLastName = lastName ? sanitizeHtml(lastName.trim()) : undefined;

    const redirectUrl = `${window.location.origin}/member-area`;
    
    const { error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: sanitizedFirstName,
          last_name: sanitizedLastName
        }
      }
    });

    if (error) {
      // Handle specific error cases
      let errorMessage = error.message;
      
      if (error.message.includes('captcha')) {
        errorMessage = "Sistema de verificação não configurado. Entre em contato com o suporte.";
      } else if (error.message.includes('User already registered')) {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (error.message.includes('Invalid email')) {
        errorMessage = "Email inválido. Verifique o formato do email.";
      } else if (error.message.includes('Password')) {
        errorMessage = "A senha deve ter pelo menos 8 caracteres com letras maiúsculas, minúsculas e números.";
      }

      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta."
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    // Rate limiting check
    const clientId = user?.id || 'anonymous';
    if (!authRateLimiter.isAllowed(`signin_${clientId}`, 5, 300000)) { // 5 attempts per 5 minutes
      const error = new Error('Muitas tentativas de login. Aguarde 5 minutos.');
      toast({
        title: "Limite excedido",
        description: "Muitas tentativas de login. Aguarde 5 minutos e tente novamente.",
        variant: "destructive"
      });
      return { error };
    }

    // Input validation
    if (!validateEmail(email)) {
      const error = new Error('Invalid email');
      toast({
        title: "Erro no login",
        description: "Email inválido.",
        variant: "destructive"
      });
      return { error };
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    const { error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password
    });

    if (error) {
      // Handle specific error cases
      let errorMessage = error.message;
      
      if (error.message.includes('captcha')) {
        errorMessage = "Sistema de verificação não configurado. Entre em contato com o suporte.";
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email ou senha incorretos.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Email não confirmado. Verifique sua caixa de entrada.";
      } else if (error.message.includes('Too many requests')) {
        errorMessage = "Muitas tentativas. Aguarde um momento e tente novamente.";
      }

      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive"
      });
    } else {
      // Reset rate limiter on successful login
      authRateLimiter.reset(`signin_${clientId}`);
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
