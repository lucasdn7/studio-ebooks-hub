import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Ebooks from "./pages/Ebooks";
import EbookDetail from "./pages/EbookDetail";
import EbookReader from "./pages/EbookReader";
import EbookBundles from "./pages/EbookBundles";
import KitDetail from "./pages/KitDetail";
import Categories from "./pages/Categories";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MemberArea from "./pages/MemberArea";
import CreatorDashboard from "./pages/CreatorDashboard";
import AuthPage from "./components/AuthPage";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import App from "./pages/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppRouter = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/ebook/:id" element={<EbookDetail />} />
            <Route path="/bundles" element={<EbookBundles />} />
            <Route path="/kit/:id" element={<KitDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/ebook/:id/reader" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <EbookReader />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/member-area" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <MemberArea />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/creator-dashboard" 
              element={
                <ProtectedRoute requireAuth={true} requireCreator={true}>
                  <CreatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/app" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <App />
                </ProtectedRoute>
              } 
            />
            
            {/* Payment result routes */}
            <Route 
              path="/payment-success" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <PaymentSuccess />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment-cancelled" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <PaymentCancelled />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default AppRouter;
