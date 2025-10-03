
import { create } from 'zustand'

type Screen = 'landing' | 'vortex' | 'nexora' | 'civitas'

interface StoreState {
  // Navigation
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  
  // Loading
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Animation preferences
  prefersReducedMotion: boolean
  setPrefersReducedMotion: (reduced: boolean) => void
  
  // 3D Settings
  enable3D: boolean
  setEnable3D: (enabled: boolean) => void
  
  // Performance
  performanceMode: 'high' | 'medium' | 'low'
  setPerformanceMode: (mode: 'high' | 'medium' | 'low') => void
  
  // UI State
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  
  // Cursor
  cursorVariant: 'default' | 'hover' | 'click'
  setCursorVariant: (variant: 'default' | 'hover' | 'click') => void
}

export const useStore = create<StoreState>((set) => ({
  // Navigation
  currentScreen: 'landing',
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  
  // Loading
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Animation preferences
  prefersReducedMotion: false,
  setPrefersReducedMotion: (reduced) => set({ prefersReducedMotion: reduced }),
  
  // 3D Settings
  enable3D: true,
  setEnable3D: (enabled) => set({ enable3D: enabled }),
  
  // Performance
  performanceMode: 'high',
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
  
  // UI State
  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
  
  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))
