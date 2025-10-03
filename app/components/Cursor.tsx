

"use client";
import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useStore } from '../store/useStore'

const Cursor: React.FC = () => {
  const { cursorVariant } = useStore()
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const hideCursor = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [cursorX, cursorY])

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(212, 175, 55, 0.8)',
      border: '2px solid rgba(212, 175, 55, 0.3)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      border: '2px solid rgba(212, 175, 55, 0.8)',
      mixBlendMode: 'normal' as const,
    },
    click: {
      scale: 0.8,
      backgroundColor: 'rgba(212, 175, 55, 1)',
      border: '2px solid rgba(212, 175, 55, 1)',
      mixBlendMode: 'normal' as const,
    }
  }

  // Hide on mobile devices
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile || !isVisible) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={cursorVariants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
    >
      {/* Inner dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"
        variants={{
          default: { scale: 1, opacity: 1 },
          hover: { scale: 0, opacity: 0 },
          click: { scale: 2, opacity: 0.8 }
        }}
        animate={cursorVariant}
      />
      
      {/* Outer ring for hover state */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary-gold/30"
        variants={{
          default: { scale: 0, opacity: 0 },
          hover: { scale: 2, opacity: 0.6 },
          click: { scale: 1.5, opacity: 0.8 }
        }}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20
        }}
      />
    </motion.div>
  )
}

export default Cursor
