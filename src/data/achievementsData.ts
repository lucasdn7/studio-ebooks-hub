
import { Achievement, UserTier } from '@/types/achievements';

export const userTiers: UserTier[] = [
  {
    level: 'bronze',
    name: 'Aprendiz',
    minPoints: 0,
    maxPoints: 100,
    benefits: ['Acesso básico', 'Suporte por email'],
    discount: 5,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🥉'
  },
  {
    level: 'silver',
    name: 'Profissional',
    minPoints: 101,
    maxPoints: 300,
    benefits: ['Materiais exclusivos', 'Suporte prioritário', 'Webinars mensais'],
    discount: 10,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '🥈'
  },
  {
    level: 'gold',
    name: 'Especialista',
    minPoints: 301,
    maxPoints: 600,
    benefits: ['Consultoria gratuita', 'Acesso antecipado', 'Mentoria exclusiva'],
    discount: 15,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🥇'
  },
  {
    level: 'platinum',
    name: 'Mestre Arquiteto',
    minPoints: 601,
    maxPoints: Infinity,
    benefits: ['Todos os benefícios', 'Projetos personalizados', 'Networking VIP'],
    discount: 20,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '💎'
  }
];

export const achievementsData: Achievement[] = [
  // Conquistas de Conteúdo
  {
    id: 'first-ebook',
    title: 'Primeiro Passo',
    description: 'Leia seu primeiro e-book',
    icon: '📖',
    category: 'content',
    requirement: 1,
    currentProgress: 1,
    completed: true,
    completedAt: new Date('2024-01-15'),
    points: 10,
    reward: '5% de desconto no próximo e-book'
  },
  {
    id: 'ebook-enthusiast',
    title: 'Entusiasta da Leitura',
    description: 'Leia 10 e-books',
    icon: '📚',
    category: 'content',
    requirement: 10,
    currentProgress: 8,
    completed: false,
    points: 50,
    reward: 'Acesso antecipado a novos lançamentos'
  },
  {
    id: 'video-starter',
    title: 'Espectador Iniciante',
    description: 'Assista seu primeiro vídeo completo',
    icon: '🎬',
    category: 'content',
    requirement: 1,
    currentProgress: 1,
    completed: true,
    completedAt: new Date('2024-01-20'),
    points: 10,
    reward: 'Badge de Espectador'
  },
  {
    id: 'video-marathon',
    title: 'Maratona de Vídeos',
    description: 'Assista 25 vídeos',
    icon: '🎯',
    category: 'content',
    requirement: 25,
    currentProgress: 23,
    completed: false,
    points: 75,
    reward: 'Acesso exclusivo a masterclasses'
  },
  
  // Conquistas Sociais
  {
    id: 'first-comment',
    title: 'Primeira Interação',
    description: 'Faça seu primeiro comentário',
    icon: '💬',
    category: 'social',
    requirement: 1,
    currentProgress: 1,
    completed: true,
    completedAt: new Date('2024-02-01'),
    points: 15,
    reward: 'Badge de Participante Ativo'
  },
  {
    id: 'community-helper',
    title: 'Ajudante da Comunidade',
    description: 'Faça 50 comentários úteis',
    icon: '🤝',
    category: 'social',
    requirement: 50,
    currentProgress: 12,
    completed: false,
    points: 100,
    reward: 'Destaque no perfil + 10% desconto'
  },
  
  // Conquistas de Tempo/Frequência
  {
    id: 'week-streak',
    title: 'Uma Semana Dedicada',
    description: 'Acesse a plataforma por 7 dias seguidos',
    icon: '🔥',
    category: 'time',
    requirement: 7,
    currentProgress: 5,
    completed: false,
    points: 30,
    reward: 'Multiplicador de XP por 3 dias'
  },
  {
    id: 'month-streak',
    title: 'Dedicação Mensal',
    description: 'Acesse por 30 dias seguidos',
    icon: '📅',
    category: 'time',
    requirement: 30,
    currentProgress: 12,
    completed: false,
    points: 150,
    reward: 'Consultoria gratuita de 1 hora'
  },
  
  // Conquistas Especiais
  {
    id: 'early-bird',
    title: 'Madrugador',
    description: 'Acesse antes das 6h da manhã',
    icon: '🌅',
    category: 'special',
    requirement: 1,
    currentProgress: 0,
    completed: false,
    points: 25,
    reward: 'Badge exclusivo + conteúdo surpresa'
  },
  {
    id: 'weekend-warrior',
    title: 'Guerreiro de Fim de Semana',
    description: 'Complete atividades em 10 fins de semana',
    icon: '⚔️',
    category: 'special',
    requirement: 10,
    currentProgress: 3,
    completed: false,
    points: 80,
    reward: 'Acesso a workshops exclusivos'
  }
];
