import { supabase } from './supabase'

export async function enhanceImage(imageBase64, goal, areas) {
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

