import { useRef, useState, useEffect } from 'react'
import { X, Camera as CameraIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'user', // Câmera frontal
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsStreaming(true)
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error)
      toast.error('Não foi possível acessar a câmera. Verifique as permissões.')
      onClose()
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsStreaming(false)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Ajusta o canvas para o tamanho do vídeo
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Desenha o frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Converte para base64
    const imageData = canvas.toDataURL('image/jpeg', 0.9)

    stopCamera()
    onCapture(imageData)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {isStreaming && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Overlay com guia de enquadramento */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Máscara SVG para criar o buraco oval */}
          <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'normal' }}>
            <defs>
              <mask id="faceMask">
                <rect width="100%" height="100%" fill="white" />
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="32%"
                  ry="40%"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.6)"
              mask="url(#faceMask)"
            />
          </svg>
          
          {/* Guia de enquadramento oval */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-80 md:h-96 pointer-events-none">
            {/* Círculo/oval principal com borda */}
            <div className="w-full h-full rounded-full border-4 border-white/90 relative">
              {/* Pontos de referência do rosto */}
              <div className="absolute top-[28%] left-[22%] w-3 h-3 border-2 border-white/70 rounded-full bg-white/20" />
              <div className="absolute top-[28%] right-[22%] w-3 h-3 border-2 border-white/70 rounded-full bg-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-4 border border-white/50 rounded-full" />
              <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-10 h-2 border border-white/50 rounded-full" />
            </div>
          </div>
          
          {/* Instruções no topo */}
          <div className="absolute top-16 left-0 right-0 text-center px-4 z-10">
            <p className="text-white text-base font-semibold drop-shadow-lg">
              Posicione seu rosto dentro do círculo
            </p>
            <p className="text-white/80 text-sm mt-1 drop-shadow">
              Mantenha o rosto centralizado e bem iluminado
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <button
          onClick={capturePhoto}
          disabled={!isStreaming}
          className="w-20 h-20 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg disabled:opacity-50 active:scale-95 transition-transform"
        >
          <CameraIcon className="w-10 h-10 text-primary" />
        </button>
      </div>
    </div>
  )
}
