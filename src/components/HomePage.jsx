import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, Shield, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { toast } from 'sonner'

export default function HomePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { setUserImage } = useApp()

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result
        if (base64) {
          setUserImage(base64.toString())
          navigate('/analyzing')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // Por simplicidade, vamos usar o input de arquivo para câmera também
      // Em produção, você implementaria uma captura de vídeo real
      fileInputRef.current?.click()
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      toast.error('Não foi possível acessar a câmera')
      console.error('Camera error:', error)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="screen-container bg-gradient-to-b from-beauty-pink/30 to-background">
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">Beleza Viva</span>
        </div>
      </div>

      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
          Rejuvenesça até 8 anos em apenas 28 dias
        </h1>
        <p className="text-muted-foreground">
          Tire uma foto para começar sua análise personalizada
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 mb-6 animate-fade-in">
            <div className="w-full h-full bg-gradient-to-b from-beauty-light-blue to-beauty-pink rounded-full relative">
              {/* Face placeholder elements */}
              <div className="absolute top-1/3 left-1/4 w-4 h-2 bg-foreground/30 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-4 h-2 bg-foreground/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-4 bg-foreground/10 rounded-full"></div>
              <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-8 h-2 bg-foreground/20 rounded-full"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-beauty-blue/20 rounded-full animate-pulse-ring"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/20 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 animate-fade-in-delay-1">
            <Shield className="w-4 h-4 text-accent" />
            <span>Suas fotos são privadas e nunca armazenadas</span>
          </div>
        </div>

        <div className="space-y-3 mt-auto animate-fade-in-delay-2">
          <button
            onClick={handleCameraClick}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Tirar uma Selfie
          </button>
          <button
            onClick={handleUploadClick}
            className="btn-outline w-full flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Fazer Upload de Foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <p className="text-center text-xs text-muted-foreground mt-4">
            Confiado por <span className="font-semibold text-foreground">89.345+</span> usuários
          </p>
        </div>
      </div>
    </div>
  )
}

