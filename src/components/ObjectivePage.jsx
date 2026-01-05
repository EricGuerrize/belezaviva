import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

const objectives = [
  {
    id: 'wrinkles',
    title: 'Ficar livre das rugas',
    icon: '✨',
  },
  {
    id: 'sagging',
    title: 'Reduzir a flacidez',
    icon: '💪',
  },
  {
    id: 'both',
    title: 'Escolher ambas as opções',
    icon: '🌟',
  },
]

export default function ObjectivePage() {
  const navigate = useNavigate()
  const { preferences, setPreferences } = useApp()

  const handleSelect = (objectiveId) => {
    setPreferences({ ...preferences, goal: objectiveId })
    navigate('/areas')
  }

  const handleSkip = () => {
    navigate('/areas')
  }

  return (
    <div className="screen-container bg-gradient-to-b from-beauty-pink/30 to-background">
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Qual é o seu principal objetivo?
        </h1>
        <p className="text-muted-foreground text-sm">
          Escolha o que mais te incomoda hoje
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-3 mb-6">
        {objectives.map((objective) => (
          <button
            key={objective.id}
            onClick={() => handleSelect(objective.id)}
            className={`card-beauty text-left transition-all duration-300 border ${
              preferences.goal === objective.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{objective.icon}</div>
              <div className="flex-1">
                <span className="font-medium text-foreground text-lg">
                  {objective.title}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSkip}
          className="text-muted-foreground text-sm underline hover:text-foreground transition-colors"
        >
          Pular por agora
        </button>
      </div>
    </div>
  )
}
