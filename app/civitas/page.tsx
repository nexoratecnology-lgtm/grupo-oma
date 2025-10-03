"use client";
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import {Heart, Users, Globe, TreePine, GraduationCap, Home} from 'lucide-react'
import * as THREE from 'three'
import Navigation from '../components/Navigation'
// Componente de fondo con ondas sutiles
const SubtleWavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clase para representar una onda sutil
    class SubtleWave {
      x: number;
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      opacity: number;
      offset: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.amplitude = Math.random() * 30 + 10;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.speed = Math.random() * 0.5 + 0.2;
        this.offset = Math.random() * Math.PI * 2;
        
        // Colores suaves para el tema social
        const colors = [
          'rgba(72, 187, 120, ',  // Verde suave
          'rgba(66, 165, 245, ',  // Azul suave
          'rgba(212, 175, 55, ', // Dorado suave
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.1 + 0.05;
      }

      update(time: number) {
        this.offset += this.speed * 0.01;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.beginPath();
        
        // Dibujar onda sinusoidal
        for (let x = 0; x < dimensions.width; x += 5) {
          const y = this.y + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.strokeStyle = this.color + this.opacity + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Crear ondas
    const waves: SubtleWave[] = [];
    for (let i = 0; i < 8; i++) {
      waves.push(new SubtleWave(dimensions.width, dimensions.height));
    }

    // Función de animación
    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsedTime = (timestamp - timeRef.current) / 1000;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Dibujar ondas
      waves.forEach(wave => {
        wave.update(elapsedTime);
        wave.draw(ctx, elapsedTime);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// 3D Components
const SocialImpactVisualization: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const spheresRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
    if (spheresRef.current) {
      spheresRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Sphere (Community) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Orbiting Impact Spheres */}
      <group ref={spheresRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8
          const radius = 3
          return (
            <mesh 
              key={i} 
              position={[
                Math.cos(angle) * radius, 
                0, 
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#00FF7F" : "#FF6B6B"} 
                emissive={i % 2 === 0 ? "#00FF7F" : "#FF6B6B"}
                emissiveIntensity={0.3}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Connecting Network */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8
        const radius = 3
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * radius / 2, 
              0, 
              Math.sin(angle) * radius / 2
            ]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
            <meshStandardMaterial 
              color="#00FF7F" 
              transparent 
              opacity={0.6}
            />
          </mesh>
        )
      })}
      
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

const CivitasHumanis: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [programsRef, programsInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [impactRef, impactInView] = useInView({ threshold: 0.2, triggerOnce: true })

  const programs = [
    {
      icon: GraduationCap,
      title: 'Educación Digital',
      description: 'Programas de alfabetización tecnológica en comunidades rurales',
      impact: '5,000+ estudiantes',
      color: 'from-blue-500 to-indigo-500',
      details: ['Centros de aprendizaje', 'Capacitación docente', 'Conectividad rural']
    },
    {
      icon: TreePine,
      title: 'Sostenibilidad Ambiental',
      description: 'Proyectos de conservación y energías renovables',
      impact: '15 comunidades',
      color: 'from-green-500 to-emerald-500',
      details: ['Paneles solares', 'Reforestación', 'Gestión de residuos']
    },
    {
      icon: Heart,
      title: 'Salud Comunitaria',
      description: 'Programas de telemedicina y prevención sanitaria',
      impact: '3,000+ beneficiarios',
      color: 'from-red-500 to-pink-500',
      details: ['Telemedicina', 'Campañas preventivas', 'Capacitación sanitaria']
    },
    {
      icon: Home,
      title: 'Vivienda Digna',
      description: 'Construcción de hogares sostenibles y espacios comunitarios',
      impact: '200+ familias',
      color: 'from-orange-500 to-yellow-500',
      details: ['Construcción sostenible', 'Espacios comunitarios', 'Mejoramiento urbano']
    },
    {
      icon: Users,
      title: 'Emprendimiento Social',
      description: 'Incubación de proyectos productivos comunitarios',
      impact: '80+ emprendimientos',
      color: 'from-purple-500 to-pink-500',
      details: ['Microcréditos', 'Capacitación empresarial', 'Redes de apoyo']
    },
    {
      icon: Globe,
      title: 'Desarrollo Rural',
      description: 'Fortalecimiento de economías locales y agricultura sostenible',
      impact: '25+ cooperativas',
      color: 'from-teal-500 to-cyan-500',
      details: ['Agricultura sostenible', 'Cooperativas rurales', 'Comercio justo']
    }
  ]

  const impactStats = [
    { number: '30+', label: 'Comunidades Impactadas', description: 'En 8 países de Latinoamérica' },
    { number: '10K+', label: 'Beneficiarios Directos', description: 'Familias transformadas' },
    { number: '45+', label: 'Programas Activos', description: 'Proyectos en ejecución' },
    { number: '85%', label: 'Tasa de Éxito', description: 'Proyectos sostenibles' }
  ]

  return (
    <>
        <Navigation/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black-900 to-emerald-900/20" />
        <SubtleWavesBackground />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-6"
            >
              <Heart size={16} />
              <span className="text-sm font-medium">Impacto Social</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gradient-gold mb-6">
              Civitas Humanis
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Creamos puentes entre la innovación y el desarrollo social sostenible. 
              Cada proyecto es una oportunidad de transformar vidas y construir 
              comunidades más fuertes y resilientes.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">30+</div>
                <div className="text-sm text-gray-400">Comunidades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">10K+</div>
                <div className="text-sm text-gray-400">Beneficiarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">45+</div>
                <div className="text-sm text-gray-400">Programas</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold-500 text-black-900 font-semibold rounded-xl hover:bg-gold-400 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Únete al Impacto</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-green-500 text-green-400 font-semibold rounded-xl hover:bg-green-500/10 transition-all duration-300"
              >
                Ver Proyectos
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Social Impact Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-96 lg:h-[500px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center canvas-fallback">
                <div className="text-center">
                  <Heart size={48} className="mx-auto mb-4" />
                  <p>Cargando visualización 3D...</p>
                </div>
              </div>
            }>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={0.5}
                  enablePan={false}
                />
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FF7F" />
                <SocialImpactVisualization />
                <Environment preset="park" />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="py-20 px-4 relative">
        <SubtleWavesBackground />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={programsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Programas de Impacto
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desarrollamos iniciativas integrales que abordan las necesidades 
              más urgentes de las comunidades, generando cambios duraderos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon
              
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={programsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group p-6 bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-500"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${program.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-3 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  <div className="text-green-400 font-semibold text-sm mb-4">
                    {program.impact}
                  </div>

                  <ul className="space-y-1">
                    {program.details.map((detail) => (
                      <li key={detail} className="flex items-center text-xs text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Impact Statistics */}
      <section ref={impactRef} className="py-20 px-4 bg-gradient-to-b from-transparent to-green-900/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={impactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Nuestro Impacto
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cada número representa vidas transformadas, comunidades fortalecidas 
              y un futuro más esperanzador para miles de familias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={impactInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3, type: "spring" }}
                  className="text-4xl font-bold text-green-400 mb-2"
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={impactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              ¿Quieres ser parte del cambio?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a nuestra misión de crear un impacto social duradero. 
              Juntos podemos transformar más comunidades y cambiar más vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-400 transition-all duration-300"
              >
                Colaborar con Nosotros
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-green-500 text-green-400 font-semibold rounded-xl hover:bg-green-500/10 transition-all duration-300"
              >
                Conocer Más Proyectos
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
    </>
  )
}

export default CivitasHumanis