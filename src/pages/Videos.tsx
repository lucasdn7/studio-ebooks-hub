
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoSection from "@/components/VideoSection";
import { Badge } from "@/components/ui/badge";

const Videos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Conteúdo em Vídeo
            </Badge>
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Biblioteca de <span className="font-medium">Vídeos</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aprenda com nossos especialistas através de vídeos práticos e tutoriais detalhados
            </p>
          </div>
        </div>
      </section>

      <VideoSection />
      
      <Footer />
    </div>
  );
};

export default Videos;
