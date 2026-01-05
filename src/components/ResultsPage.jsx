import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { generateMotivationalMessage } from '../utils/analysis'

function MetricBar({ label, beforeValue, afterValue, color }) {
  const colorClasses = {
    blue: 'bg-beauty-blue',
    purple: 'bg-primary',
    green: 'bg-accent',
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">{beforeValue}%</span>
          <span className="text-muted-foreground">→</span>
          <span className="text-xl font-bold text-primary">{afterValue}%</span>
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClasses[color]}`}
            style={{ width: `${beforeValue}%` }}
          />
        </div>
        <div className="w-2" />
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClasses[color]}`}
            style={{ width: `${afterValue}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { analysisResult, userImage, preferences, setIsAnalyzing, userName } =
    useApp()

  useEffect(() => {
    setIsAnalyzing(false)
  }, [setIsAnalyzing])

  // Os números do "antes" são os mesmos da etapa de problemas
  const currentMetrics = analysisResult || {
    hydration: 28,
    elasticity: 39,
    texture: 32,
    image: userImage || '',
    improvedImage: userImage || '',
  }

  // Os números do "depois" aumentam significativamente
  const improvedMetrics = {
    hydration: Math.min(94, currentMetrics.hydration + 66),
    elasticity: Math.min(88, currentMetrics.elasticity + 49),
    texture: Math.min(92, currentMetrics.texture + 60),
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
          {userName ? `${userName}, ` : ''}Get the most radiant version of your skin
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
        </div>
      </div>

      {/* Métricas lado a lado com seta */}
      <div className="bg-card rounded-2xl p-4 border border-border mb-6 animate-fade-in">
        <MetricBar
          label="Hydration"
          beforeValue={currentMetrics.hydration}
          afterValue={improvedMetrics.hydration}
          color="blue"
        />
        <MetricBar
          label="Elasticity"
          beforeValue={currentMetrics.elasticity}
          afterValue={improvedMetrics.elasticity}
          color="purple"
        />
        <MetricBar
          label="Texture"
          beforeValue={currentMetrics.texture}
          afterValue={improvedMetrics.texture}
          color="green"
        />
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
