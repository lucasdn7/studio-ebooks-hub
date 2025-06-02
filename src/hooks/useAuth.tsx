
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

        // Check if user has premium access (casludn@gmail.com)
        if (session?.user?.email === 'casludn@gmail.com' && event === 'SIGNED_IN') {
          setTimeout(async () => {
            try {
              const { error } = await supabase
                .from('user_stats')
                .upsert({
                  user_id: session.user.id,
                  is_premium: true,
                  updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });
              
              if (error) {
                console.error('Erro ao atualizar status premium:', error);
              } else {
                toast({
                  title: "Acesso Premium Ativado!",
                  description: "Bem-vindo ao Clube do eBook Premium!"
                });
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
    const redirectUrl = `${window.location.origin}/member-area`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
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
