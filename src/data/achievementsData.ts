
import { Achievement, UserTier, Certificate } from '@/types/achievements';

export const userTiers: UserTier[] = [
  {
    level: 'bronze',
    name: 'Aprendiz',
    minPoints: 0,
    maxPoints: 250,
    benefits: ['Acesso básico', 'Suporte por email'],
    discount: 5,
    color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-700',
    icon: '🥉'
  },
  {
    level: 'silver',
    name: 'Profissional',
    minPoints: 251,
    maxPoints: 750,
    benefits: ['Materiais exclusivos', 'Suporte prioritário', 'Webinars mensais'],
    discount: 10,
    color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    icon: '🥈'
  },
  {
    level: 'gold',
    name: 'Especialista',
    minPoints: 751,
    maxPoints: 1500,
    benefits: ['Consultoria gratuita', 'Acesso antecipado', 'Mentoria exclusiva'],
    discount: 15,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700',
    icon: '🥇'
  },
  {
    level: 'platinum',
    name: 'Mestre Arquiteto',
    minPoints: 1501,
    maxPoints: Infinity,
    benefits: ['Todos os benefícios', 'Projetos personalizados', 'Networking VIP'],
    discount: 20,
    color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-700',
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
    points: 25,
    reward: '5% de desconto no próximo e-book'
  },
  {
    id: 'ebook-enthusiast',
    title: 'Entusiasta da Leitura',
    description: 'Leia 15 e-books',
    icon: '📚',
    category: 'content',
    requirement: 15,
    currentProgress: 8,
    completed: false,
    points: 100,
    reward: 'Acesso antecipado a novos lançamentos'
  },
  {
    id: 'ebook-master',
    title: 'Mestre dos E-books',
    description: 'Leia 50 e-books',
    icon: '🎓',
    category: 'content',
    requirement: 50,
    currentProgress: 8,
    completed: false,
    points: 300,
    reward: 'Consultoria gratuita de 2 horas'
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
    points: 20,
    reward: 'Badge de Participante Ativo'
  },
  {
    id: 'community-helper',
    title: 'Ajudante da Comunidade',
    description: 'Faça 100 comentários úteis',
    icon: '🤝',
    category: 'social',
    requirement: 100,
    currentProgress: 12,
    completed: false,
    points: 200,
    reward: 'Destaque no perfil + 15% desconto'
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
    points: 50,
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
    points: 250,
    reward: 'Consultoria gratuita de 1 hora'
  },
  {
    id: 'super-streak',
    title: 'Super Dedicação',
    description: 'Acesse por 100 dias seguidos',
    icon: '⚡',
    category: 'time',
    requirement: 100,
    currentProgress: 12,
    completed: false,
    points: 500,
    reward: 'Mentoria VIP + 20% desconto vitalício'
  },
  
  // Conquistas Especiais
  {
    id: 'early-bird',
    title: 'Madrugador',
    description: 'Acesse antes das 6h da manhã 10 vezes',
    icon: '🌅',
    category: 'special',
    requirement: 10,
    currentProgress: 0,
    completed: false,
    points: 75,
    reward: 'Badge exclusivo + conteúdo surpresa'
  },
  {
    id: 'weekend-warrior',
    title: 'Guerreiro de Fim de Semana',
    description: 'Complete atividades em 20 fins de semana',
    icon: '⚔️',
    category: 'special',
    requirement: 20,
    currentProgress: 3,
    completed: false,
    points: 150,
    reward: 'Acesso a workshops exclusivos'
  },
  
  // Conquistas de Certificação
  {
    id: 'arch-certified',
    title: 'Arquiteto Certificado',
    description: 'Complete a série de arquitetura residencial',
    icon: '🏗️',
    category: 'certification',
    requirement: 5,
    currentProgress: 3,
    completed: false,
    points: 400,
    reward: 'Certificado Digital de Arquitetura',
    seriesId: 'architecture'
  },
  {
    id: 'design-certified',
    title: 'Designer Certificado',
    description: 'Complete a série de design de interiores',
    icon: '🎨',
    category: 'certification',
    requirement: 4,
    currentProgress: 2,
    completed: false,
    points: 350,
    reward: 'Certificado Digital de Design',
    seriesId: 'design'
  }
];

export const certificatesData: Certificate[] = [
  {
    id: 'arch-residential',
    title: 'Especialista em Arquitetura Residencial',
    description: 'Certificado que comprova conhecimento avançado em projetos residenciais',
    seriesId: 'architecture',
    ebooksRequired: [
      'Manual Completo de Arquitetura Residencial',
      'Sustentabilidade na Arquitetura',
      'Projetos Residenciais Compactos',
      'Arquitetura Moderna Brasileira',
      'Técnicas de Construção Residencial'
    ]
  },
  {
    id: 'design-expert',
    title: 'Expert em Design de Interiores',
    description: 'Certificado que atesta expertise em design e decoração de ambientes',
    seriesId: 'design',
    ebooksRequired: [
      'Design de Interiores: Tendências 2024',
      'Iluminação para Ambientes',
      'Paleta de Cores Profissional',
      'Móveis e Decoração Contemporânea'
    ]
  }
];
