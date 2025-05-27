
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ebooks from "./pages/Ebooks";
import Videos from "./pages/Videos";
import Categories from "./pages/Categories";
import Plans from "./pages/Plans";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MemberArea from "./pages/MemberArea";
import ConstructionNews from "./pages/ConstructionNews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/area-membro" element={<MemberArea />} />
          <Route path="/noticias-construcao" element={<ConstructionNews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
