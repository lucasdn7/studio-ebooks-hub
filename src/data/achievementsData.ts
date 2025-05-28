
import { Achievement, UserTier, Certificate } from '@/types/achievements';

export const userTiers: UserTier[] = [
  {
    level: 'bronze',
    name: 'Aprendiz',
    minPoints: 0,
    maxPoints: 99,
    benefits: ['Acesso à biblioteca básica', 'Suporte por email'],
    discount: 0,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🥉'
  },
  {
    level: 'silver',
    name: 'Explorador',
    minPoints: 100,
    maxPoints: 299,
    benefits: ['Participação em sorteios', 'Ofertas sazonais', 'Biblioteca expandida'],
    discount: 5,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '🥈'
  },
  {
    level: 'gold',
    name: 'Especialista',
    minPoints: 300,
    maxPoints: 599,
    benefits: ['eBook técnico secreto', '10% desconto consultoria', 'Suporte prioritário'],
    discount: 10,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🥇'
  },
  {
    level: 'platinum',
    name: 'Mestre do Estúdio',
    minPoints: 600,
    maxPoints: Infinity,
    benefits: ['20% desconto vitalício', 'Ferramentas exclusivas', 'Acesso VIP'],
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
  // BADGES (+10 pontos cada)
  {
    id: 'first-step',
    title: 'Primeiro Passo',
    description: 'Baixe seu primeiro eBook',
    icon: '📖',
    category: 'content',
    requirement: 1,
    currentProgress: 1,
    completed: true,
    completedAt: new Date('2024-01-15'),
    points: 10,
    reward: 'Badge de iniciante',
    premiumOnly: true
  },
  {
    id: 'avid-reader',
    title: 'Leitor Assíduo',
    description: 'Baixe 10 eBooks',
    icon: '📚',
    category: 'content',
    requirement: 10,
    currentProgress: 3,
    completed: false,
    points: 10,
    reward: 'Badge de leitor dedicado',
    premiumOnly: true
  },
  {
    id: 'category-explorer',
    title: 'Explorador de Categorias',
    description: 'Baixe eBooks de 5 categorias diferentes',
    icon: '🗺️',
    category: 'content',
    requirement: 5,
    currentProgress: 2,
    completed: false,
    points: 10,
    reward: 'Badge de diversidade',
    premiumOnly: true
  },
  {
    id: 'literary-critic',
    title: 'Crítico Literário',
    description: 'Deixe 3 avaliações em eBooks',
    icon: '⭐',
    category: 'social',
    requirement: 3,
    currentProgress: 1,
    completed: false,
    points: 10,
    reward: 'Badge de engajamento',
    premiumOnly: true
  },
  {
    id: 'collector',
    title: 'Colecionador',
    description: 'Favorite 20 eBooks',
    icon: '❤️',
    category: 'social',
    requirement: 20,
    currentProgress: 0,
    completed: false,
    points: 10,
    reward: 'Badge de curadoria',
    premiumOnly: true
  },
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
    points: 10,
    reward: 'Badge de participação',
    premiumOnly: true
  },

  // MEDALHAS (+50 pontos cada)
  {
    id: 'premium-member',
    title: 'Membro Premium',
    description: 'Assine um plano pago',
    icon: '👑',
    category: 'special',
    requirement: 1,
    currentProgress: 1,
    completed: true,
    completedAt: new Date('2024-01-10'),
    points: 50,
    reward: 'Medalha de membro premium',
    premiumOnly: true
  },
  {
    id: 'trailblazer',
    title: 'Desbravador',
    description: 'Complete a leitura de 50 eBooks',
    icon: '🚀',
    category: 'content',
    requirement: 50,
    currentProgress: 3,
    completed: false,
    points: 50,
    reward: 'Medalha de dedicação extrema',
    premiumOnly: true
  },
  {
    id: 'top-reviewer',
    title: 'Top Revisor',
    description: 'Realize 10 comentários em diferentes eBooks',
    icon: '🏆',
    category: 'social',
    requirement: 10,
    currentProgress: 1,
    completed: false,
    points: 50,
    reward: 'Medalha de contribuição',
    premiumOnly: true
  },

  // Conquistas de Certificados (para compatibilidade)
  {
    id: 'first-certificate',
    title: 'Primeiro Certificado',
    description: 'Ganhe seu primeiro certificado digital',
    icon: '🏆',
    category: 'certificate',
    requirement: 1,
    currentProgress: 0,
    completed: false,
    points: 50,
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
    points: 100,
    reward: 'Status VIP vitalício',
    premiumOnly: true
  }
];
