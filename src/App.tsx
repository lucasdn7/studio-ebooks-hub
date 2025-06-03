
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Ebooks from "./pages/Ebooks";
import EbookDetail from "./pages/EbookDetail";
import EbookReader from "./pages/EbookReader";
import EbookBundles from "./pages/EbookBundles";
import Categories from "./pages/Categories";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MemberArea from "./pages/MemberArea";
import AuthPage from "./components/AuthPage";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/ebook/:id" element={<EbookDetail />} />
            <Route path="/ebook/:id/reader" element={<EbookReader />} />
            <Route path="/bundles" element={<EbookBundles />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/member-area" element={<MemberArea />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
