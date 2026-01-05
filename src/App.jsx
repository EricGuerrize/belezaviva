import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppProvider } from './context/AppContext'
import HomePage from './components/HomePage'
import ObjectivePage from './components/ObjectivePage'
import AreasPage from './components/AreasPage'
import AnalyzingPage from './components/AnalyzingPage'
import ProblemsPage from './components/ProblemsPage'
import ResultsPage from './components/ResultsPage'
import PlanPage from './components/PlanPage'
import NotFoundPage from './components/NotFoundPage'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/objetivo" element={<ObjectivePage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/analyzing" element={<AnalyzingPage />} />
          <Route path="/problemas" element={<ProblemsPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/plano" element={<PlanPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
