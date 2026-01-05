// Supabase Edge Function para melhorar imagens usando Replicate API
// Modelo: GFPGAN para melhoria de rosto

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN')

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { imageBase64, goal, areas } = await req.json()

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Imagem não fornecida' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      )
    }

    // Se não tiver token do Replicate, retorna a imagem original
    if (!REPLICATE_API_TOKEN) {
      console.warn('REPLICATE_API_TOKEN não configurado. Retornando imagem original.')
      return new Response(
        JSON.stringify({ enhancedImage: imageBase64 }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    }

    // Usa GFPGAN para melhorar o rosto
    // Modelo: tencentarc/gfpgan
    const modelVersion = '9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3'

    // Cria predição no Replicate
    const predictionResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: modelVersion,
        input: {
          img: imageBase64,
          version: 'v1.4',
          scale: 2,
        },
      }),
    })

    if (!predictionResponse.ok) {
      const error = await predictionResponse.text()
      console.error('Erro ao criar predição:', error)
      // Retorna imagem original em caso de erro
      return new Response(
        JSON.stringify({ enhancedImage: imageBase64 }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    }

    const prediction = await predictionResponse.json()
    
    // Polling para verificar status da predição (máximo 60 segundos)
    let result = prediction
    let attempts = 0
    const maxAttempts = 60

    while ((result.status === 'starting' || result.status === 'processing') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        },
      })
      result = await statusResponse.json()
      attempts++
    }

    if (result.status === 'succeeded' && result.output) {
      // Baixa a imagem melhorada
      const enhancedImageResponse = await fetch(result.output)
      const enhancedImageBlob = await enhancedImageResponse.blob()
      const enhancedImageArrayBuffer = await enhancedImageBlob.arrayBuffer()
      const enhancedImageBase64 = btoa(
        String.fromCharCode(...new Uint8Array(enhancedImageArrayBuffer))
      )
      const enhancedImageDataUrl = `data:image/jpeg;base64,${enhancedImageBase64}`

      return new Response(
        JSON.stringify({ enhancedImage: enhancedImageDataUrl }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    } else {
      // Se falhar ou timeout, retorna imagem original
      console.warn('Predição falhou ou timeout:', result.status)
      return new Response(
        JSON.stringify({ enhancedImage: imageBase64 }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      )
    }
  } catch (error) {
    console.error('Erro na edge function:', error)
    // Em caso de erro, retorna imagem original
    const { imageBase64 } = await req.json().catch(() => ({ imageBase64: null }))
    return new Response(
      JSON.stringify({ 
        error: error.message,
        enhancedImage: imageBase64 || null 
      }),
      { 
        status: 200, // Retorna 200 para não quebrar o frontend
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    )
  }
})
