"use client";
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import "./app.css"
// Components
import Navigation from './components/Navigation'
import Landing from './components/screens/LandingScreen'
import VortexStudios from './components/screens/VortexScreen'
import Nexora from './components/screens/NexoraScreen'
import CivitasHumanis from './components/screens/CivitasScreen'
import LoadingScreen from './components/LoadingScreen'

// Hooks
import { useScrollSmooth } from './hooks/useScrollSmooth'
import { usePreloader } from './hooks/usePreloader'

function AppContent() {
  const location = useLocation()
  const { isLoading } = usePreloader()
  
  useScrollSmooth()

  useEffect(() => {
    // Update page title based on route
    const titles = {
      '/': 'Grupo Roma - Innovación, Tecnología y Impacto Social',
      '/vortex': 'Vortex Studios - Producción Audiovisual | Grupo Roma',
      '/nexora': 'Nexora - Tecnologías Avanzadas | Grupo Roma',
      '/civitas': 'Civitas Humanis - Proyectos Sociales | Grupo Roma'
    }
    
    // Verificar si document está definido antes de usarlo
    if (typeof document !== 'undefined') {
      document.title = titles[location.pathname as keyof typeof titles] || titles['/']
    }
  }, [location])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black-100 text-white overflow-x-hidden">
      <Navigation />
      
      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/vortex" element={<VortexStudios />} />
            <Route path="/nexora" element={<Nexora />} />
            <Route path="/civitas" element={<CivitasHumanis />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #D4AF37',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#0B0B0B',
            },
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App