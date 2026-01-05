import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { analyzeSkin } from '../utils/analysis'
import { enhanceImage } from '../utils/imageEnhancement'
import { toast } from 'sonner'

const steps = [
  { label: 'Detectando rosto', icon: '●' },
  { label: 'Analisando pele', icon: '●' },
  { label: 'Medindo hidratação', icon: '●' },
  { label: 'Avaliando elasticidade', icon: '●' },
  { label: 'Gerando resultado', icon: '●' },
]

const messages = [
  '50.000+ mulheres já tiveram sua autoestima renovada com Beleza Viva',
  'Leva só 5 minutos por dia',
  'Resultados visíveis em apenas 28 dias',
  'Técnicas aprovadas por dermatologistas',
  'Sem procedimentos invasivos ou dolorosos',
  'Funciona para todos os tipos de pele',
]

export default function AnalyzingPage() {
  const navigate = useNavigate()
  const { userImage, preferences, setAnalysisResult, setIsAnalyzing } = useApp()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    setIsAnalyzing(true)

    const progressInterval = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + 0.8))
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStep((s) => (s >= steps.length - 1 ? s : s + 1))
    }, 2000)

    const messageInterval = setInterval(() => {
      setCurrentMessage((m) => (m + 1) % messages.length)
    }, 3500)

    const performAnalysis = async () => {
      const image = userImage || ''
      try {
        const analysis = await analyzeSkin(image)
        let improvedImage = image

        if (image) {
          try {
            improvedImage = await enhanceImage(
              image,
              preferences.goal,
              preferences.areas
            )
          } catch (error) {
            console.error('Error enhancing image:', error)
            toast.error('Não foi possível gerar a imagem melhorada. Usando simulação.')
          }
        }

        setProgress(100)
        setAnalysisResult({ ...analysis, improvedImage })
        setIsAnalyzing(false)
        navigate('/problemas')
      } catch (error) {
        console.error('Analysis error:', error)
        toast.error('Ocorreu um erro durante a análise.')
        navigate('/')
      }
    }

    performAnalysis()

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearInterval(messageInterval)
    }
  }, [userImage, preferences, navigate, setAnalysisResult, setIsAnalyzing])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="relative w-64 h-64 mb-8">
        <div className="w-full h-full rounded-[2rem] overflow-hidden bg-muted border-4 border-primary/20 shadow-2xl">
          {userImage ? (
            <img
              src={userImage}
              alt="Sua foto"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-6xl">👤</span>
            </div>
          )}
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${progress}%`,
              boxShadow: '0 0 20px 4px hsl(var(--primary) / 0.6)',
              transition: 'top 0.1s linear',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, 
                transparent ${Math.max(0, progress - 5)}%, 
                hsl(var(--primary) / 0.15) ${progress}%, 
                transparent ${Math.min(100, progress + 5)}%)`,
            }}
          />
        </div>
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
        <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/30" />
      </div>

      <div className="text-center mb-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-foreground mb-2">
          ANALYZING YOUR SKIN
        </h2>
        <p className="text-3xl font-bold gradient-text mb-4">
          {Math.round(progress)}%
        </p>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full gradient-primary transition-all duration-100 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center transition-all duration-300 ${
              index <= currentStep
                ? 'opacity-100 scale-100'
                : 'opacity-40 scale-90'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-accent text-accent-foreground'
                  : index === currentStep
                  ? 'gradient-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentStep ? '✓' : step.icon}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-primary font-medium mb-6 h-5">
        {steps[currentStep]?.label}...
      </p>

      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-border/50 w-full max-w-xs shadow-lg">
        <p className="text-sm text-foreground text-center font-medium animate-fade-in">
          {messages[currentMessage]}
        </p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <Shield className="w-4 h-4 text-accent" />
        <span>Sua foto é processada com total segurança e privacidade</span>
      </div>
    </div>
  )
}
