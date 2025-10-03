// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Importar dinámicamente los componentes con SSR deshabilitado
const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false });
const Landing = dynamic(() => import('./components/screens/LandingScreen'), { ssr: false });
const LoadingScreen = dynamic(() => import('./components/LoadingScreen'), { ssr: false });

// Hooks personalizados adaptados para Next.js
function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simular carga de recursos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading };
}

function useScrollSmooth() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Implementación de scroll suave
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const id = target.getAttribute('href')?.substring(1);
          const element = document.getElementById(id || '');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, []);
}

export default function Home() {
  const { isLoading } = usePreloader();
  useScrollSmooth();

  // Actualizar título de página
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Grupo Roma - Innovación, Tecnología y Impacto Social';
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black-100 text-white overflow-x-hidden">
      <Navigation />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}