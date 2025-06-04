
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BarChart3, Clock, TrendingUp } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookLearningPointsProps {
  ebook: Ebook;
}

const EbookLearningPoints = ({ ebook }: EbookLearningPointsProps) => {
  const getEbookSnippets = (ebook: Ebook) => {
    const baseSnippets = [
      {
        icon: Target,
        text: `Domine ${ebook.category?.toLowerCase()} em ${ebook.reading_time || 30} minutos`
      },
      {
        icon: BarChart3,
        text: `Técnicas práticas para aplicar no dia a dia`
      },
      {
        icon: Clock,
        text: `Retorno do investimento em conhecimento garantido`
      }
    ];

    // Category-specific snippets
    const categorySnippets: Record<string, Array<{ icon: any; text: string }>> = {
      'Arquitetura': [
        {
          icon: BarChart3,
          text: "Entenda em quanto tempo a arquitetura sustentável se paga"
        },
        {
          icon: Target,
          text: "Projetos que valorizam imóveis em até 30%"
        },
        {
          icon: Clock,
          text: "Reduza custos operacionais desde o primeiro mês"
        }
      ],
      'Negócios': [
        {
          icon: TrendingUp,
          text: "Estratégias para aumentar receita em 90 dias"
        },
        {
          icon: Target,
          text: "Métodos validados por empresas de sucesso"
        },
        {
          icon: BarChart3,
          text: "ROI comprovado em estudos de caso reais"
        }
      ],
      'Tecnologia': [
        {
          icon: Target,
          text: "Implemente soluções que economizam horas de trabalho"
        },
        {
          icon: BarChart3,
          text: "Automações que aumentam produtividade em 40%"
        },
        {
          icon: Clock,
          text: "Tecnologias do futuro explicadas de forma simples"
        }
      ],
      'Desenvolvimento Pessoal': [
        {
          icon: Target,
          text: "Hábitos que transformam resultados em 21 dias"
        },
        {
          icon: TrendingUp,
          text: "Mindset de alta performance comprovado"
        },
        {
          icon: Clock,
          text: "Técnicas usadas por líderes mundiais"
        }
      ]
    };

    return categorySnippets[ebook.category || ''] || baseSnippets;
  };

  const snippets = getEbookSnippets(ebook);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">O que você vai aprender</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {snippets.map((snippet, index) => {
            const IconComponent = snippet.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {snippet.text}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EbookLearningPoints;
