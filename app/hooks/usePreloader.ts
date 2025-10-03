"use client";
import { useState, useEffect } from 'react'

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading process
    const loadingSteps = [
      { delay: 200, progress: 20, message: 'Inicializando...' },
      { delay: 400, progress: 40, message: 'Cargando recursos...' },
      { delay: 600, progress: 60, message: 'Preparando 3D...' },
      { delay: 800, progress: 80, message: 'Configurando animaciones...' },
      { delay: 1000, progress: 100, message: 'Listo!' },
    ]

    let timeoutIds: NodeJS.Timeout[] = []

    loadingSteps.forEach((step) => {
      const timeoutId = setTimeout(() => {
        setProgress(step.progress)
        
        if (step.progress === 100) {
          setTimeout(() => {
            setIsLoading(false)
          }, 500)
        }
      }, step.delay)
      
      timeoutIds.push(timeoutId)
    })

    // Cleanup timeouts on unmount
    return () => {
      timeoutIds.forEach(clearTimeout)
    }
  }, [])

  return { isLoading, progress }
}
