import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

const objectives = [
  {
    id: 'hydration',
    title: 'Hidratação',
    description: 'Melhorar a hidratação e suavidade da pele',
    icon: '💧',
  },
  {
    id: 'anti-aging',
    title: 'Anti-idade',
    description: 'Reduzir linhas e sinais de envelhecimento',
    icon: '✨',
  },
  {
    id: 'brightness',
    title: 'Brilho',
    description: 'Uniformizar o tom e aumentar o brilho',
    icon: '🌟',
  },
  {
    id: 'acne',
    title: 'Acne',
    description: 'Controlar e prevenir espinhas',
    icon: '🎯',
  },
  {
    id: 'sensitivity',
    title: 'Sensibilidade',
    description: 'Acalmar e fortalecer a pele sensível',
    icon: '🛡️',
  },
  {
    id: 'general',
    title: 'Cuidado Geral',
    description: 'Manter a saúde geral da pele',
    icon: '🌸',
  },
]

export default function ObjectivePage() {
  const navigate = useNavigate()
  const { preferences, setPreferences } = useApp()

  const handleSelect = (objectiveId) => {
    setPreferences({ ...preferences, goal: objectiveId })
    navigate('/areas')
  }

  return (
    <div className="screen-container bg-gradient-to-b from-beauty-pink/30 to-background">
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">Beleza Viva</span>
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">
          Qual é o seu principal objetivo?
        </h1>
        <p className="text-muted-foreground text-sm">
          Selecione o que mais deseja melhorar na sua pele
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-3 mb-6">
        {objectives.map((objective) => (
          <button
            key={objective.id}
            onClick={() => handleSelect(objective.id)}
            className={`card-beauty text-left transition-all duration-300 ${
              preferences.goal === objective.id
                ? 'border-2 border-primary shadow-beauty'
                : 'border border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{objective.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {objective.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {objective.description}
                </p>
              </div>
              <ArrowRight
                className={`w-5 h-5 transition-transform ${
                  preferences.goal === objective.id
                    ? 'text-primary translate-x-1'
                    : 'text-muted-foreground'
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

