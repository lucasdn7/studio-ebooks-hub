
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login e redirecionar para área do membro
    navigate('/area-membro');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Acesso à Plataforma
            </Badge>
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              {isLogin ? 'Fazer Login' : 'Criar Conta'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Acesse sua conta para continuar' : 'Crie sua conta gratuita'}
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-light text-center">
                {isLogin ? 'Entrar na Conta' : 'Criar Nova Conta'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Seu nome completo"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <input 
                    type="password" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Sua senha"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
                    <input 
                      type="password" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Lembrar de mim</span>
                    </label>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      Esqueceu a senha?
                    </a>
                  </div>
                )}

                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-gray-900 hover:underline font-medium"
                  >
                    {isLogin ? 'Criar conta' : 'Fazer login'}
                  </button>
                </p>
              </div>

              <div className="mt-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou continue com</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Continuar com Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continuar com Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Voltar para início
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
