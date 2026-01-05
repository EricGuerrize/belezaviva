import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

const faceAreas = [
  { id: 'testa', label: 'Testa', top: '12%', left: '50%' },
  { id: 'temporas', label: 'Têmporas', top: '20%', left: '20%' },
  { id: 'olhos', label: 'Olhos', top: '30%', left: '50%' },
  { id: 'bochechas', label: 'Bochechas', top: '45%', left: '30%' },
  { id: 'mandibula', label: 'Mandíbula', top: '55%', left: '50%' },
  { id: 'labios', label: 'Lábios', top: '60%', left: '50%' },
  { id: 'queixo', label: 'Queixo', top: '70%', left: '50%' },
  { id: 'pescoco', label: 'Pescoço', top: '80%', left: '50%' },
  { id: 'colo', label: 'Colo', top: '90%', left: '50%' },
]

export default function AreasPage() {
  const navigate = useNavigate()
  const { preferences, setPreferences, userImage } = useApp()
  const [selectedAreas, setSelectedAreas] = useState(preferences.areas || [])

  useEffect(() => {
    // Se não houver imagem, volta para home
    if (!userImage) {
      navigate('/')
    }
  }, [userImage, navigate])

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

  const getAreaPosition = (areaId) => {
    const area = faceAreas.find((a) => a.id === areaId)
    return area ? { top: area.top, left: area.left } : null
  }

  return (
    <div className="screen-container bg-gradient-to-b from-beauty-pink/30 to-background pb-24">
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Quais áreas você gostaria de melhorar?
        </h1>
        <p className="text-muted-foreground text-sm">
          Se não tiver certeza, pressione Continuar
        </p>
      </div>

      <div className="mb-6 relative">
        {/* Imagem do rosto com áreas marcadas */}
        <div className="relative w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
          {userImage ? (
            <>
              <img
                src={userImage}
                alt="Seu rosto"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay com áreas marcadas */}
              {faceAreas.map((area) => {
                const isSelected = selectedAreas.includes(area.id)
                const pos = getAreaPosition(area.id)
                if (!pos) return null

                return (
                  <div
                    key={area.id}
                    className={`absolute rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/20 w-16 h-16'
                        : 'border-muted-foreground/30 bg-muted-foreground/10 w-12 h-12'
                    }`}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )
              })}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          )}
        </div>
      </div>

      {/* Lista de áreas selecionáveis */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {faceAreas.map((area) => {
          const isSelected = selectedAreas.includes(area.id)
          return (
            <button
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className={`card-beauty text-left transition-all duration-300 border ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {area.label}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                {!isSelected && (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
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
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
