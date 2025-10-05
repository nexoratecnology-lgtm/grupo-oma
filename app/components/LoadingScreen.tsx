// components/LoadingScreen.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import logoicon from "../img/logonombre.png"
const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Simulación de progreso
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Partículas para el fondo animado
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      angle: number
      radius: number
      centerX: number
      centerY: number
    }> = []

    // Crear partículas
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1
      const centerX = Math.random() * canvas.width
      const centerY = Math.random() * canvas.height
      const radius = Math.random() * 100 + 50
      const angle = Math.random() * Math.PI * 2
      
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size,
        speedX: 0,
        speedY: 0,
        color: `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`,
        angle,
        radius,
        centerX,
        centerY
      })
    }

    // Ondas expansivas
    const waves: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      opacity: number
    }> = []

    // Función para crear ondas periódicamente
    const createWave = () => {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      })
    }

    // Crear ondas iniciales
    for (let i = 0; i < 5; i++) {
      setTimeout(createWave, i * 1000)
    }

    // Crear ondas periódicamente
    const waveInterval = setInterval(createWave, 2000)

    // Animación del fondo
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar partículas
      particles.forEach(particle => {
        // Actualizar posición en patrón circular
        particle.angle += 0.005
        particle.x = particle.centerX + Math.cos(particle.angle) * particle.radius
        particle.y = particle.centerY + Math.sin(particle.angle) * particle.radius

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Conectar con partículas cercanas
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance/150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Dibujar ondas expansivas
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i]
        wave.radius += wave.speed
        wave.opacity -= 0.003

        if (wave.opacity <= 0 || wave.radius > wave.maxRadius) {
          waves.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212, 175, 55, ${wave.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      clearInterval(waveInterval)
    }
  }, [isClient])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black-900 flex items-center justify-center z-50 overflow-hidden"
      aria-label="Pantalla de carga"
      role="alert"
      aria-busy="true"
    >
      {/* Canvas para el fondo animado */}
      {isClient && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      )}

      {/* Contenido principal */}
      <div className="text-center relative z-10">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
<motion.div
  
  transition={{ duration: 3, repeat: Infinity }}
  className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center font-display font-bold text-2xl mb-4"
  aria-hidden="true"
>
  <img src={logoicon.src} alt="" />
</motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-display font-bold text-gradient-gold mb-2"
          >
            Grupo Roma
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 font-body"
          >
            Innovación, Tecnología y Impacto Social
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="relative mx-auto mb-4"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Progress Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-gray-500 font-mono"
          aria-live="polite"
        >
          {progress}% Cargando experiencia...
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex justify-center space-x-2 mt-6"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-gold-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen