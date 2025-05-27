
import { Achievement, UserTier, Certificate } from '@/types/achievements';

export const userTiers: UserTier[] = [
  {
    level: 'bronze',
    name: 'Aprendiz',
    minPoints: 0,
    maxPoints: 200,
    benefits: ['Acesso básico', 'Suporte por email'],
    discount: 5,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🥉'
  },
  {
    level: 'silver',
    name: 'Profissional',
    minPoints: 201,
    maxPoints: 500,
    benefits: ['Materiais exclusivos', 'Suporte prioritário', 'Webinars mensais'],
    discount: 10,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '🥈'
  },
  {
    level: 'gold',
    name: 'Especialista',
    minPoints: 501,
    maxPoints: 1000,
    benefits: ['Consultoria gratuita', 'Acesso antecipado', 'Mentoria exclusiva'],
    discount: 15,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🥇'
  },
  {
    level: 'platinum',
    name: 'Mestre Arquiteto',
    minPoints: 1001,
    maxPoints: Infinity,
    benefits: ['Todos os benefícios', 'Projetos personalizados', 'Networking VIP'],
    discount: 20,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '💎'
  }
];

export const certificatesData: Certificate[] = [
  {
    id: 'architecture-specialist',
    title: 'Especialista em Arquitetura Residencial',
    description: 'Complete todos os e-books de arquitetura residencial',
    category: 'Arquitetura',
    requiredEbooks: [
      'Manual Completo de Arquitetura Residencial',
      'Sustentabilidade na Arquitetura', 
      'Projetos Residenciais Compactos'
    ],
    completedEbooks: ['Manual Completo de Arquitetura Residencial'],
    completed: false,
    icon: '🏗️'
  },
  {
    id: 'interior-design-master',
    title: 'Mestre em Design de Interiores',
    description: 'Complete todos os e-books de design de interiores',
    category: 'Design de Interiores',
    requiredEbooks: [
      'Design de Interiores: Tendências 2024',
      'Iluminação para Ambientes',
      'Paleta de Cores para Interiores'
    ],
    completedEbooks: [],
    completed: false,
    icon: '🎨'
  },
  {
    id: 'carpentry-expert',
    title: 'Expert em Marcenaria',
    description: 'Complete todos os e-books de marcenaria',
    category: 'Marcenaria',
    requiredEbooks: [
      'Técnicas Avançadas de Marcenaria',
      'Móveis Funcionais para Espaços Pequenos',
      'Ferramentas Essenciais para Marcenaria'
    ],
    completedEbooks: [],
    completed: false,
    icon: '🪚'
  }
];

export const achievementsData: Achievement[] = [
  // Conquistas de Conteúdo (apenas para premium)
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
    reward: '5% de desconto no próximo e-book',
    premiumOnly: true
  },
  {
    id: 'ebook-enthusiast',
    title: 'Entusiasta da Leitura',
    description: 'Leia 25 e-books',
    icon: '📚',
    category: 'content',
    requirement: 25,
    currentProgress: 3,
    completed: false,
    points: 100,
    reward: 'Acesso antecipado a novos lançamentos',
    premiumOnly: true
  },
  {
    id: 'bundle-collector',
    title: 'Colecionador de Pacotes',
    description: 'Compre 5 pacotes de e-books',
    icon: '📦',
    category: 'content',
    requirement: 5,
    currentProgress: 0,
    completed: false,
    points: 150,
    reward: 'Pacote gratuito de sua escolha',
    premiumOnly: true
  },
  
  // Conquistas Sociais (apenas para premium)
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
    points: 30,
    reward: 'Badge de Participante Ativo',
    premiumOnly: true
  },
  {
    id: 'community-helper',
    title: 'Ajudante da Comunidade',
    description: 'Faça 100 comentários úteis',
    icon: '🤝',
    category: 'social',
    requirement: 100,
    currentProgress: 5,
    completed: false,
    points: 200,
    reward: 'Destaque no perfil + 15% desconto',
    premiumOnly: true
  },
  
  // Conquistas de Tempo/Frequência (apenas para premium)
  {
    id: 'week-streak',
    title: 'Uma Semana Dedicada',
    description: 'Acesse a plataforma por 14 dias seguidos',
    icon: '🔥',
    category: 'time',
    requirement: 14,
    currentProgress: 3,
    completed: false,
    points: 75,
    reward: 'Multiplicador de XP por 7 dias',
    premiumOnly: true
  },
  {
    id: 'month-streak',
    title: 'Dedicação Mensal',
    description: 'Acesse por 60 dias seguidos',
    icon: '📅',
    category: 'time',
    requirement: 60,
    currentProgress: 8,
    completed: false,
    points: 300,
    reward: 'Consultoria gratuita de 2 horas',
    premiumOnly: true
  },
  
  // Conquistas Especiais (apenas para premium)
  {
    id: 'early-bird',
    title: 'Madrugador',
    description: 'Acesse antes das 6h da manhã por 10 dias',
    icon: '🌅',
    category: 'special',
    requirement: 10,
    currentProgress: 0,
    completed: false,
    points: 80,
    reward: 'Badge exclusivo + conteúdo surpresa',
    premiumOnly: true
  },
  {
    id: 'weekend-warrior',
    title: 'Guerreiro de Fim de Semana',
    description: 'Complete atividades em 20 fins de semana',
    icon: '⚔️',
    category: 'special',
    requirement: 20,
    currentProgress: 1,
    completed: false,
    points: 150,
    reward: 'Acesso a workshops exclusivos',
    premiumOnly: true
  },

  // Conquistas de Certificados (apenas para premium)
  {
    id: 'first-certificate',
    title: 'Primeiro Certificado',
    description: 'Ganhe seu primeiro certificado digital',
    icon: '🏆',
    category: 'certificate',
    requirement: 1,
    currentProgress: 0,
    completed: false,
    points: 200,
    reward: 'Destaque especial no perfil',
    premiumOnly: true
  },
  {
    id: 'certificate-master',
    title: 'Mestre Certificado',
    description: 'Ganhe todos os certificados disponíveis',
    icon: '🎓',
    category: 'certificate',
    requirement: 3,
    currentProgress: 0,
    completed: false,
    points: 500,
    reward: 'Status VIP vitalício',
    premiumOnly: true
  }
];
