"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'  // Cambiado a usePathname para Next.js 13+
import { motion, AnimatePresence } from 'framer-motion'
import {Menu, X, Home} from 'lucide-react'
import logoicon from "../img/logonombre.png"
const navigationItems = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/vortex', label: 'Vortex Studios', description: 'Producción Audiovisual' },
  { path: '/nexora', label: 'Nexora', description: 'Tecnologías Avanzadas' },
  { path: '/civitas', label: 'Civitas Humanis', description: 'Proyectos Sociales' },
]

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Asegurarse de que el componente está montado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen)

  const isHomePage = pathname === '/'

  // Si no está montado, no renderizar nada para evitar errores de hidratación
  if (!mounted) return null

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black-900/90 backdrop-blur-md border-b border-gold-500/30 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
         <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`w-30 h-30 rounded-lg flex items-center justify-center font-display font-bold text-lg transition-all duration-300 'bg-transparent text-transparent shadow-none'`}
>
                <img src={logoicon.src} alt="" width={1000} height={6000}/>
              </motion.div>
              
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = pathname === item.path
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-yellow-400/20 text-yellow-400 shadow-yellow-400/30' 
                          : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                      }`}
                    >
                      {Icon && <Icon size={16} />}
                      <div>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.description && (
                          <p className="text-xs opacity-75">{item.description}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 shadow-yellow-400/50"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isHomePage 
                  ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30' 
                  : 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black-900/90 backdrop-blur-sm"
              onClick={toggleMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-black-800 border-l border-yellow-400/30"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => {
                    const isActive = pathname === item.path
                    const Icon = item.icon
                    
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.path}
                          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-yellow-400/30 to-yellow-400/20 text-yellow-400 shadow-yellow-400/30 border-l-4 border-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                          }`}
                        >
                          {Icon && <Icon size={20} />}
                          <div>
                            <span className="font-medium">{item.label}</span>
                            {item.description && (
                              <p className="text-sm opacity-75 mt-1">{item.description}</p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation