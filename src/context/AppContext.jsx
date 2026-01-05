import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [userImage, setUserImage] = useState(null)
  const [userName, setUserName] = useState('')
  const [preferences, setPreferences] = useState({
    goal: '',
    areas: [],
  })
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <AppContext.Provider
      value={{
        userImage,
        setUserImage,
        userName,
        setUserName,
        preferences,
        setPreferences,
        analysisResult,
        setAnalysisResult,
        isAnalyzing,
        setIsAnalyzing,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

