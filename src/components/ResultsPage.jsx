import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { generateMotivationalMessage } from '../utils/analysis'

function MetricBar({ label, value, color }) {
  const colorClasses = {
    blue: 'bg-beauty-blue',
    purple: 'bg-primary',
    green: 'bg-accent',
  }

  return (
    <div className="mb-3">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-bold text-foreground">{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { analysisResult, userImage, preferences, setIsAnalyzing, userName } =
    useApp()

  const [improvedMetrics] = useState(() => {
    const current = analysisResult || {
      hydration: 28,
      elasticity: 39,
      texture: 32,
    }
    return {
      hydration: Math.min(
        94,
        current.hydration + 60 + Math.floor(Math.random() * 10)
      ),
      elasticity: Math.min(
        88,
        current.elasticity + 42 + Math.floor(Math.random() * 8)
      ),
      texture: Math.min(
        92,
        current.texture + 55 + Math.floor(Math.random() * 10)
      ),
    }
  })

  useEffect(() => {
    setIsAnalyzing(false)
  }, [setIsAnalyzing])

  const currentMetrics = analysisResult || {
    hydration: 28,
    elasticity: 39,
    texture: 32,
    image: userImage || '',
    improvedImage: userImage || '',
  }

  const originalImage = userImage || currentMetrics.image
  const improvedImage =
    currentMetrics.improvedImage !== originalImage
      ? currentMetrics.improvedImage
      : originalImage

  const message = generateMotivationalMessage(currentMetrics, userName)

  return (
    <div className="screen-container bg-background pb-28">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate('/problemas')}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-primary font-semibold text-lg">
            Beleza Viva
          </span>
        </div>
        <div className="w-10" />
      </div>

      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">
          {userName ? `${userName}, veja` : 'Veja'} a versão mais radiante da
          sua pele
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
        <div className="space-y-3">
          <div className="relative">
            <img
              src={originalImage}
              alt="Antes"
              className="w-full aspect-[3/4] object-cover object-top rounded-2xl shadow-lg"
            />
            <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-border">
              Antes
            </div>
          </div>
          <div className="px-1">
            <MetricBar
              label="Hidratação"
              value={currentMetrics.hydration}
              color="blue"
            />
            <MetricBar
              label="Elasticidade"
              value={currentMetrics.elasticity}
              color="purple"
            />
            <MetricBar
              label="Textura"
              value={currentMetrics.texture}
              color="green"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <img
              src={improvedImage}
              alt="Depois"
              className="w-full aspect-[3/4] object-cover object-top rounded-2xl shadow-lg"
            />
            <div className="absolute top-3 right-3 gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Depois
            </div>
          </div>
          <div className="px-1">
            <MetricBar
              label="Hidratação"
              value={improvedMetrics.hydration}
              color="blue"
            />
            <MetricBar
              label="Elasticidade"
              value={improvedMetrics.elasticity}
              color="purple"
            />
            <MetricBar
              label="Textura"
              value={improvedMetrics.texture}
              color="green"
            />
          </div>
        </div>
      </div>

      <div className="card-beauty bg-card mb-6 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/plano')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Ver Seu Plano Personalizado
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

