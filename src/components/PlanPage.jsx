import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Sparkles, Sun, Moon, ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { generateProducts } from '../utils/analysis'

function ProductCard({ product, index }) {
  const priorityStyles = {
    high: 'border-l-4 border-l-primary',
    medium: 'border-l-4 border-l-secondary',
    low: 'border-l-4 border-l-muted-foreground/30',
  }

  const priorityBadges = {
    high: 'bg-primary/10 text-primary',
    medium: 'bg-secondary/10 text-secondary',
    low: 'bg-muted text-muted-foreground',
  }

  return (
    <div
      className={`card-beauty ${priorityStyles[product.priority]} animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-foreground">{product.name}</h4>
          <span className="text-sm text-muted-foreground">{product.type}</span>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${priorityBadges[product.priority]}`}
        >
          {product.priority === 'high'
            ? 'Essencial'
            : product.priority === 'medium'
            ? 'Recomendado'
            : 'Opcional'}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{product.benefit}</p>
    </div>
  )
}

function RoutineStep({ product, stepNumber }) {
  return (
    <div
      className="flex items-center gap-3 animate-fade-in"
      style={{ animationDelay: `${stepNumber * 0.1}s` }}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
        {stepNumber + 1}
      </div>
      <div className="flex-1 bg-card rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-foreground text-sm">
              {product.name}
            </span>
            <p className="text-xs text-muted-foreground">{product.benefit}</p>
          </div>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
      </div>
    </div>
  )
}

export default function PlanPage() {
  const navigate = useNavigate()
  const { analysisResult } = useApp()

  const products = generateProducts(
    analysisResult || { hydration: 28, elasticity: 39, texture: 32 }
  )

  const morningProducts = products.filter((p) =>
    ['Limpeza', 'Sérum', 'Hidratante', 'Proteção Solar'].includes(p.type)
  )

  const nightProducts = products.filter((p) =>
    ['Limpeza', 'Sérum', 'Creme Noturno', 'Esfoliante', 'Área dos Olhos'].includes(
      p.type
    )
  )

  return (
    <div className="screen-container pb-24 bg-gradient-to-b from-beauty-pink/30 to-background">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/resultados')}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">
            Seu Plano de Skincare
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalizado para sua pele
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Home className="w-4 h-4 text-primary-foreground" />
          </div>
        </button>
      </div>

      <div className="card-beauty gradient-primary text-primary-foreground mb-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6" />
          <h2 className="font-semibold text-lg">Sua Rotina Personalizada</h2>
        </div>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Com base na sua análise de pele, criamos uma rotina personalizada com{' '}
          {products.length} produtos para ajudá-la a alcançar seus objetivos de
          skincare.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Sun className="w-4 h-4" />
            <span>~5 min Manhã</span>
          </div>
          <div className="flex items-center gap-1">
            <Moon className="w-4 h-4" />
            <span>~7 min Noite</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-semibold text-foreground">Rotina da Manhã</h3>
        </div>
        <div className="space-y-3">
          {morningProducts.slice(0, 4).map((product, index) => (
            <RoutineStep key={product.name} product={product} stepNumber={index} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-foreground">Rotina da Noite</h3>
        </div>
        <div className="space-y-3">
          {nightProducts.slice(0, 5).map((product, index) => (
            <RoutineStep key={product.name} product={product} stepNumber={index} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Produtos Recomendados</h3>
          <span className="text-sm text-muted-foreground">
            {products.length} itens
          </span>
        </div>
        <div className="space-y-3">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-md mx-auto space-y-2">
          <button
            onClick={() =>
              window.open('https://skyfluence-beauty.com/quiz/?id=17', '_blank')
            }
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Continuar para o Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground w-full text-center"
          >
            Começar Novamente
          </button>
        </div>
      </div>
    </div>
  )
}

