
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
              const { data: userStats } = await supabase
                .from('user_stats')
                .select('role, is_premium')
                .eq('user_id', session.user.id)
                .single();
              
              // Only update premium status if user has admin role
              if (userStats?.role === 'admin' && !userStats?.is_premium) {
                const { error } = await supabase
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
    // Input validation and sanitization
    if (!email || !email.includes('@') || email.length > 254) {
      const error = new Error('Email inválido');
      toast({
        title: "Erro no cadastro",
        description: "Email inválido. Verifique o formato do email.",
        variant: "destructive"
      });
      return { error };
    }

    if (!password || password.length < 6) {
      const error = new Error('Password too short');
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return { error };
    }

    const redirectUrl = `${window.location.origin}/member-area`;
    
    const { error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName?.trim(),
          last_name: lastName?.trim()
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
        errorMessage = "A senha deve ter pelo menos 6 caracteres.";
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
    // Input validation
    if (!email || !email.includes('@')) {
      const error = new Error('Invalid email');
      toast({
        title: "Erro no login",
        description: "Email inválido.",
        variant: "destructive"
      });
      return { error };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
