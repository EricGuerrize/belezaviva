import { supabase } from './supabase'

export async function enhanceImage(imageBase64, goal, areas) {
  // Se o Supabase não estiver configurado, retorna a imagem original
  if (!supabase) {
    console.warn('Supabase não configurado. Retornando imagem original.')
    return imageBase64
  }

  try {
    console.log('Calling enhance-image function...')
    
    const { data, error } = await supabase.functions.invoke('enhance-image', {
      body: {
        imageBase64,
        goal,
        areas,
      },
    })

    if (error) {
      console.error('Edge function error:', error)
      // Retorna a imagem original se houver erro
      return imageBase64
    }

    if (data?.enhancedImage) {
      console.log('Enhanced image received')
      return data.enhancedImage
    }

    return imageBase64
  } catch (error) {
    console.error('Error enhancing image:', error)
    return imageBase64
  }
}
