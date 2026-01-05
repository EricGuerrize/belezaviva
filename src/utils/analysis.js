// Análise de pele - pode usar API real ou simulação
import { supabase } from './supabase'

// Análise usando Edge Function (quando disponível)
export async function analyzeSkin(imageBase64) {
  // Tenta usar edge function se Supabase estiver configurado
  if (supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-skin', {
        body: { imageBase64 },
      })

      if (!error && data) {
        return {
          ...data,
          image: imageBase64,
          improvedImage: imageBase64,
        }
      }
    } catch (error) {
      console.warn('Edge function não disponível, usando simulação:', error)
    }
  }

  // Fallback: Análise simulada melhorada
  // Em produção, isso seria substituído por análise real de API
  return {
    hydration: 28 + Math.floor(Math.random() * 15),
    elasticity: 39 + Math.floor(Math.random() * 15),
    texture: 32 + Math.floor(Math.random() * 15),
    image: imageBase64,
    improvedImage: imageBase64,
  }
}

// Gera produtos recomendados baseado na análise
export function generateProducts(analysis) {
  const { hydration, elasticity, texture } = analysis

  const allProducts = [
    {
      name: 'Limpeza Suave',
      type: 'Limpeza',
      benefit: 'Remove impurezas sem ressecar',
      priority: hydration < 35 ? 'high' : 'medium',
    },
    {
      name: 'Sérum de Vitamina C',
      type: 'Sérum',
      benefit: 'Clareia e uniformiza o tom',
      priority: texture < 40 ? 'high' : 'medium',
    },
    {
      name: 'Hidratante Facial',
      type: 'Hidratante',
      benefit: 'Restaura a barreira cutânea',
      priority: hydration < 35 ? 'high' : 'medium',
    },
    {
      name: 'Proteção Solar FPS 50',
      type: 'Proteção Solar',
      benefit: 'Protege contra raios UV',
      priority: 'high',
    },
    {
      name: 'Creme Noturno',
      type: 'Creme Noturno',
      benefit: 'Repara durante o sono',
      priority: elasticity < 45 ? 'high' : 'medium',
    },
    {
      name: 'Esfoliante Químico',
      type: 'Esfoliante',
      benefit: 'Renova a superfície da pele',
      priority: texture < 40 ? 'medium' : 'low',
    },
    {
      name: 'Máscara Hidratante',
      type: 'Máscara',
      benefit: 'Intensifica a hidratação',
      priority: hydration < 35 ? 'medium' : 'low',
    },
    {
      name: 'Sérum de Ácido Hialurônico',
      type: 'Sérum',
      benefit: 'Aumenta a retenção de água',
      priority: hydration < 35 ? 'high' : 'medium',
    },
    {
      name: 'Creme para Área dos Olhos',
      type: 'Área dos Olhos',
      benefit: 'Reduz linhas e olheiras',
      priority: 'medium',
    },
  ]

  // Filtra e ordena produtos por prioridade
  return allProducts
    .filter((p) => p.priority !== 'low' || Math.random() > 0.5)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
}

// Gera mensagem motivacional baseada nos resultados
export function generateMotivationalMessage(analysis, userName) {
  const { hydration, elasticity, texture } = analysis
  const avg = (hydration + elasticity + texture) / 3

  if (avg < 35) {
    return `${userName || 'Você'}, com nosso método, sua pele pode alcançar resultados incríveis em apenas 28 dias. Comece hoje mesmo sua jornada para uma pele mais saudável e radiante!`
  } else if (avg < 50) {
    return `${userName || 'Você'}, sua pele tem potencial para melhorar significativamente. Com a rotina certa, você verá resultados visíveis em apenas 28 dias!`
  } else {
    return `${userName || 'Você'}, sua pele já está em bom estado! Com os cuidados certos, podemos elevar ainda mais sua qualidade e brilho natural.`
  }
}
