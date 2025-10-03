"use client";
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import {Cpu, Code, Database, Cloud, Shield, Zap} from 'lucide-react'
import * as THREE from 'three'

// Componente de fondo con ondas tecnológicas simples
const SimpleTechWaves: React.FC = () => {
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

    // Clase para representar una onda tecnológica simple
    class TechWave {
      x: number;
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      opacity: number;
      points: number;
      type: 'sine' | 'square' | 'triangle';

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.amplitude = Math.random() * 50 + 20;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.speed = Math.random() * 0.02 + 0.01;
        
        // Colores tecnológicos
        const colors = [
          'rgba(0, 195, 255, ',  // Azul brillante
          'rgba(0, 255, 170, ',  // Verde cian
          'rgba(212, 175, 55, ', // Dorado
          'rgba(120, 80, 255, '  // Púrpura
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.opacity = Math.random() * 0.3 + 0.1;
        this.points = Math.floor(Math.random() * 3) + 3; // 3-5 puntos
        
        const types: ('sine' | 'square' | 'triangle')[] = ['sine', 'square', 'triangle'];
        this.type = types[Math.floor(Math.random() * types.length)];
      }

      update(time: number) {
        // Mover suavemente la onda
        this.x += Math.sin(time * this.speed) * 0.5;
        this.y += Math.cos(time * this.speed * 0.7) * 0.3;
        
        // Mantener dentro de los límites
        if (this.x < -100) this.x = dimensions.width + 100;
        if (this.x > dimensions.width + 100) this.x = -100;
        if (this.y < -100) this.y = dimensions.height + 100;
        if (this.y > dimensions.height + 100) this.y = -100;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Crear gradiente
        const gradient = ctx.createLinearGradient(-this.amplitude, 0, this.amplitude, 0);
        gradient.addColorStop(0, this.color + '0)');
        gradient.addColorStop(0.5, this.color + (this.opacity * 0.8) + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        // Dibujar onda según el tipo
        ctx.beginPath();
        for (let i = 0; i <= this.points; i++) {
          const x = (i / this.points) * this.amplitude * 2 - this.amplitude;
          let y;
          
          switch(this.type) {
            case 'sine':
              y = Math.sin((i / this.points) * Math.PI * 2 + time * this.speed * 10) * this.amplitude * 0.3;
              break;
            case 'square':
              y = Math.sin((i / this.points) * Math.PI * 2 + time * this.speed * 10) > 0 ? this.amplitude * 0.3 : -this.amplitude * 0.3;
              break;
            case 'triangle':
              y = (2 / Math.PI) * Math.asin(Math.sin((i / this.points) * Math.PI * 2 + time * this.speed * 10)) * this.amplitude * 0.3;
              break;
          }
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Dibujar puntos en los extremos
        for (let i = 0; i <= this.points; i += this.points) {
          const x = (i / this.points) * this.amplitude * 2 - this.amplitude;
          const y = Math.sin((i / this.points) * Math.PI * 2 + time * this.speed * 10) * this.amplitude * 0.3;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color + this.opacity + ')';
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Clase para representar un anillo de energía
    class EnergyRing {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      color: string;
      opacity: number;
      thickness: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0;
        this.maxRadius = Math.random() * 150 + 50;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.thickness = Math.random() * 2 + 1;
        
        const colors = [
          'rgba(0, 195, 255, ',
          'rgba(0, 255, 170, ',
          'rgba(212, 175, 55, ',
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.radius += this.speed;
        this.opacity -= 0.002;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0 || this.radius > this.maxRadius) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color + this.opacity + ')';
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
    }

    // Crear elementos
    const waves: TechWave[] = [];
    const rings: EnergyRing[] = [];
    
    // Crear ondas
    for (let i = 0; i < 8; i++) {
      waves.push(new TechWave(dimensions.width, dimensions.height));
    }
    
    // Crear anillos
    for (let i = 0; i < 5; i++) {
      rings.push(new EnergyRing(dimensions.width, dimensions.height));
    }
    
    // Función para crear nuevos anillos periódicamente
    const createRing = () => {
      if (rings.length < 8) {
        rings.push(new EnergyRing(dimensions.width, dimensions.height));
      }
    };
    
    // Crear anillos periódicamente
    const ringInterval = setInterval(createRing, 2000);

    // Función de animación
    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsedTime = (timestamp - timeRef.current) / 1000;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Dibujar anillos
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.update();
        ring.draw(ctx);
        
        // Eliminar anillos invisibles
        if (ring.opacity <= 0 || ring.radius > ring.maxRadius) {
          rings.splice(i, 1);
        }
      }
      
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
      clearInterval(ringInterval);
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
const TechCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y += 0.01
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Cube */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color="#00FFFF" 
          emissive="#0066CC"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Orbiting Elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
          <mesh position={[3, 0, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Connecting Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[i * Math.PI / 4, i * Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshStandardMaterial color="#00FFFF" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

const Nexora: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [solutionsRef, solutionsInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [techRef, techInView] = useInView({ threshold: 0.2, triggerOnce: true })

  const solutions = [
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Infraestructura escalable y segura en la nube',
      features: ['AWS/Azure/GCP', 'Microservicios', 'DevOps/CI-CD'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Cpu,
      title: 'Inteligencia Artificial',
      description: 'Machine Learning y automatización inteligente',
      features: ['ML/DL Models', 'Computer Vision', 'NLP Processing'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'Big Data Analytics',
      description: 'Análisis avanzado de datos y business intelligence',
      features: ['Data Pipeline', 'Real-time Analytics', 'Predictive Models'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'Protección integral de activos digitales',
      features: ['Threat Detection', 'Compliance', 'Security Audits'],
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Code,
      title: 'Desarrollo Custom',
      description: 'Software a medida con tecnologías de vanguardia',
      features: ['Full-Stack Dev', 'Mobile Apps', 'API Integration'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Automatización',
      description: 'Procesos automatizados y optimización operacional',
      features: ['RPA', 'Workflow Automation', 'Process Mining'],
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const technologies = [
    { name: 'React/Next.js', level: 95, category: 'Frontend' },
    { name: 'Node.js/Python', level: 92, category: 'Backend' },
    { name: 'AWS/Azure', level: 88, category: 'Cloud' },
    { name: 'TensorFlow/PyTorch', level: 85, category: 'AI/ML' },
    { name: 'Docker/Kubernetes', level: 90, category: 'DevOps' },
    { name: 'PostgreSQL/MongoDB', level: 87, category: 'Database' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black-900 to-cyan-900/20" />
        <SimpleTechWaves />
        
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
              className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-6"
            >
              <Cpu size={16} />
              <span className="text-sm font-medium">Tecnologías Avanzadas</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gradient-gold mb-6">
              Nexora
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transformamos empresas a través de tecnología de vanguardia. 
              Desde inteligencia artificial hasta cloud computing, creamos 
              soluciones que impulsan la innovación y el crecimiento.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">200+</div>
                <div className="text-sm text-gray-400">Soluciones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">50+</div>
                <div className="text-sm text-gray-400">Empresas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">12+</div>
                <div className="text-sm text-gray-400">Países</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold-500 text-black-900 font-semibold rounded-xl hover:bg-gold-400 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Zap size={20} />
                <span>Consulta Tecnológica</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-xl hover:bg-blue-500/10 transition-all duration-300"
              >
                Ver Casos de Éxito
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Tech Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-96 lg:h-[500px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center canvas-fallback">
                <div className="text-center">
                  <Cpu size={48} className="mx-auto mb-4" />
                  <p>Cargando modelo 3D...</p>
                </div>
              </div>
            }>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={1}
                  enablePan={false}
                />
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />
                <TechCube />
                <Environment preset="city" />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="py-20 px-4 relative">
        <SimpleTechWaves />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Soluciones Tecnológicas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos un ecosistema completo de tecnologías emergentes 
              para acelerar la transformación digital de tu empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              
              return (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group p-6 bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {solution.description}
                  </p>

                  <ul className="space-y-1">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center text-xs text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-900/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Stack Tecnológico
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dominamos las tecnologías más avanzadas del mercado para 
              entregar soluciones robustas, escalables y futuro-proof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={techInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-xl border border-gray-700/50"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{tech.name}</h3>
                    <span className="text-sm text-blue-400">{tech.category}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={techInView ? { width: `${tech.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-400">{tech.level}% Expertise</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Nexora