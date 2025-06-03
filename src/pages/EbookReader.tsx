
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useAchievements } from "@/hooks/useAchievements";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2,
  Settings,
  BookOpen,
  Crown,
  Headphones
} from "lucide-react";

const EbookReader = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userProgress } = useAchievements();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock ebook data - in production would come from API
  const ebook = {
    id: 1,
    title: "Manual Completo de Arquitetura Residencial",
    author: "Arq. Maria Silva",
    category: "Arquitetura",
    pages: 120,
    content: `
      <h1>Capítulo 1: Introdução à Arquitetura Residencial</h1>
      
      <p>A arquitetura residencial é uma das áreas mais importantes e gratificantes da profissão de arquiteto. Este manual completo irá guiá-lo através dos princípios fundamentais e técnicas avançadas necessárias para criar projetos residenciais excepcionais.</p>
      
      <h2>1.1 Conceitos Fundamentais</h2>
      
      <p>Antes de começarmos a explorar as técnicas específicas, é essencial compreender os conceitos fundamentais que norteiam a arquitetura residencial moderna. Estes incluem funcionalidade, estética, sustentabilidade e integração com o meio ambiente.</p>
      
      <p>A funcionalidade refere-se à capacidade do espaço de atender às necessidades dos seus ocupantes de forma eficiente e confortável. Uma casa bem projetada deve facilitar as atividades diárias, promover o bem-estar e adaptar-se às mudanças ao longo do tempo.</p>
      
      <h2>1.2 Princípios de Design Bioclimático</h2>
      
      <p>O design bioclimático é uma abordagem que considera as condições climáticas locais para otimizar o conforto térmico e reduzir o consumo de energia. Esta metodologia envolve o estudo da orientação solar, ventos predominantes, precipitação e temperatura.</p>
      
      <p>A orientação adequada da edificação é crucial para maximizar os ganhos solares no inverno e minimizá-los no verão. As aberturas devem ser posicionadas estrategicamente para promover a ventilação natural e aproveitar a iluminação natural.</p>
      
      <h2>1.3 Materiais Sustentáveis</h2>
      
      <p>A escolha de materiais sustentáveis é fundamental para criar projetos que respeitem o meio ambiente. Materiais locais, recicláveis e de baixo impacto ambiental devem ser priorizados sempre que possível.</p>
      
      <p>Além disso, é importante considerar a durabilidade e a manutenção dos materiais escolhidos, pois isso impacta diretamente na sustentabilidade a longo prazo do projeto.</p>
    `,
    audioUrl: "/audio/sample-audiobook.mp3", // This would be the actual audio file
    isPremium: true
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, playbackSpeed]);

  const togglePlayPause = () => {
    if (!userProgress?.isPremium) {
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 15);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/ebook/${id}`} className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Modo Leitura</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Tamanho da fonte:</span>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  max={24}
                  min={12}
                  step={1}
                  className="w-24"
                />
                <span className="text-sm text-gray-500">{fontSize}px</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-2">{ebook.title}</h1>
          <p className="text-lg text-gray-600">por {ebook.author}</p>
        </div>

        {/* Audiobook Controls */}
        <Card className="mb-8 sticky top-20 z-10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Audiobook</span>
                {userProgress?.isPremium ? (
                  <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              {!userProgress?.isPremium && (
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                  <Crown className="w-4 h-4 mr-2" />
                  Fazer Upgrade
                </Button>
              )}
            </div>

            {userProgress?.isPremium ? (
              <>
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src={ebook.audioUrl} type="audio/mpeg" />
                </audio>

                <div className="space-y-4">
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleSeek}
                    max={duration || 100}
                    step={1}
                    className="w-full"
                  />
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="sm" onClick={seekBackward}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    
                    <Button onClick={togglePlayPause} size="lg">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={seekForward}>
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-600" />
                      <Slider
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                        max={100}
                        step={1}
                        className="w-20"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Velocidade:</span>
                      <select 
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="text-sm border rounded px-2 py-1"
                      >
                        {speedOptions.map(speed => (
                          <option key={speed} value={speed}>{speed}x</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Crown className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Audiobook Premium</h3>
                <p className="text-gray-600 mb-4">
                  Acompanhe a leitura com narração profissional. Disponível apenas para membros premium.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ebook Content */}
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: ebook.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EbookReader;
