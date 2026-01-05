import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

function MetricBar({ label, value, color }) {
  const colorClasses = {
    blue: 'bg-beauty-blue',
    purple: 'bg-primary',
    green: 'bg-accent',
  }

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-foreground">{value}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

function PulseDot({ top, left, delay }) {
  return (
    <div
      className="absolute w-3 h-3 animate-fade-in"
      style={{ top, left, animationDelay: `${delay}ms` }}
    >
      <div className="w-full h-full rounded-full bg-primary/60 animate-ping" />
      <div className="absolute inset-0 w-full h-full rounded-full bg-primary border-2 border-primary-foreground" />
    </div>
  )
}

export default function ProblemsPage() {
  const navigate = useNavigate()
  const { analysisResult, userImage, setUserName, preferences } = useApp()
  const [name, setName] = useState('')

  const metrics = analysisResult || {
    hydration: 28,
    elasticity: 39,
    texture: 32,
  }

  const pulsePositions = (() => {
    const positions = []
    const areaMap = {
      testa: [
        { top: '15%', left: '35%' },
        { top: '18%', left: '55%' },
      ],
      olhos: [
        { top: '32%', left: '25%' },
        { top: '32%', left: '65%' },
      ],
      temporas: [
        { top: '28%', left: '15%' },
        { top: '28%', left: '78%' },
      ],
      bochechas: [
        { top: '48%', left: '20%' },
        { top: '48%', left: '72%' },
      ],
      mandibula: [
        { top: '62%', left: '22%' },
        { top: '62%', left: '70%' },
      ],
      labios: [{ top: '58%', left: '45%' }],
      queixo: [{ top: '72%', left: '45%' }],
      pescoco: [
        { top: '85%', left: '40%' },
        { top: '85%', left: '55%' },
      ],
      colo: [{ top: '95%', left: '45%' }],
    }

    const selectedAreas = preferences.areas || []
    selectedAreas.forEach((area) => {
      if (areaMap[area]) {
        positions.push(...areaMap[area])
      }
    })

    if (positions.length === 0) {
      return [
        { top: '18%', left: '45%' },
        { top: '32%', left: '28%' },
        { top: '32%', left: '62%' },
        { top: '50%', left: '22%' },
        { top: '50%', left: '68%' },
        { top: '65%', left: '45%' },
      ]
    }

    return positions
  })()

  const handleContinue = () => {
    if (name.trim()) {
      setUserName(name.trim())
    }
    navigate('/resultados')
  }

  return (
    <div className="screen-container bg-background pb-32">
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-xl font-bold text-foreground mb-2">
          Beleza Viva plan with 100% fit
        </h1>
        <p className="text-muted-foreground text-sm">
          Let's get dream skin, we will show how to build effective routine, help to pick the right products and assist you on this journey
        </p>
      </div>

      <div className="flex gap-4 mb-6 animate-fade-in">
        <div className="relative flex-shrink-0 w-[45%]">
          {userImage ? (
            <div className="relative">
              <img
                src={userImage}
                alt="Sua foto"
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl"
              />
              {pulsePositions.map((pos, index) => (
                <PulseDot
                  key={index}
                  top={pos.top}
                  left={pos.left}
                  delay={index * 200}
                />
              ))}
            </div>
          ) : (
            <div className="w-full aspect-[3/4] bg-muted rounded-2xl flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <MetricBar
            label="Hydration"
            value={metrics.hydration}
            color="blue"
          />
          <MetricBar
            label="Elasticity"
            value={metrics.elasticity}
            color="purple"
          />
          <MetricBar label="Texture" value={metrics.texture} color="green" />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border mb-6 animate-fade-in">
        <label className="block text-sm font-medium text-foreground mb-2">
          Como podemos te chamar?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Ver Minha Transformação
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
