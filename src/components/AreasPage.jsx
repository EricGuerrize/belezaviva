import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const faceAreas = [
  { id: 'testa', label: 'Testa', icon: '👁️' },
  { id: 'olhos', label: 'Olhos', icon: '👀' },
  { id: 'temporas', label: 'Têmporas', icon: '⏰' },
  { id: 'bochechas', label: 'Bochechas', icon: '😊' },
  { id: 'mandibula', label: 'Mandíbula', icon: '💪' },
  { id: 'labios', label: 'Lábios', icon: '💋' },
  { id: 'queixo', label: 'Queixo', icon: '🎯' },
  { id: 'pescoco', label: 'Pescoço', icon: '🦢' },
  { id: 'colo', label: 'Colo', icon: '✨' },
]

export default function AreasPage() {
  const navigate = useNavigate()
  const { preferences, setPreferences } = useApp()
  const [selectedAreas, setSelectedAreas] = useState(preferences.areas || [])

  const toggleArea = (areaId) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    )
  }

  const handleContinue = () => {
    setPreferences({ ...preferences, areas: selectedAreas })
    navigate('/analyzing')
  }

  return (
    <div className="screen-container bg-gradient-to-b from-beauty-pink/30 to-background pb-24">
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">Beleza Viva</span>
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">
          Quais áreas você quer melhorar?
        </h1>
        <p className="text-muted-foreground text-sm">
          Selecione todas as áreas que deseja focar (pode selecionar várias)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {faceAreas.map((area) => {
          const isSelected = selectedAreas.includes(area.id)
          return (
            <button
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className={`card-beauty text-center transition-all duration-300 ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5 shadow-beauty'
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">{area.icon}</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {area.label}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedAreas.length === 0}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

