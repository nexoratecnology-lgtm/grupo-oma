
"use client";
import { useState, useEffect } from 'react'

export const useWebGLSupport = () => {
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
        
        if (!gl) {
          setHasWebGLSupport(false)
          return false
        }

        // Check for required extensions
        const requiredExtensions = [
          'OES_texture_float',
          'OES_texture_half_float',
          'WEBGL_depth_texture'
        ]
        
        const hasAllExtensions = requiredExtensions.every(ext => 
          gl.getExtension(ext) !== null
        )

        setHasWebGLSupport(hasAllExtensions)
        return hasAllExtensions
      } catch (error) {
        console.warn('WebGL check failed:', error)
        setHasWebGLSupport(false)
        return false
      } finally {
        setIsChecking(false)
      }
    }

    // Delay check to ensure DOM is ready
    const timer = setTimeout(checkWebGLSupport, 100)
    return () => clearTimeout(timer)
  }, [])

  return { hasWebGLSupport, isChecking }
}
