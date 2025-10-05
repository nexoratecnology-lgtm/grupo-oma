"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import {Play, Film, Camera, Award, Users, Clock, Share2, MessageSquare, Heart, TrendingUp} from 'lucide-react'
import Navigation from '../components/Navigation'

// Componente de fondo con ondas sutiles adaptadas para tema de producción audiovisual
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
        
        // Colores suaves para el tema de producción audiovisual
        const colors = [
          'rgba(139, 92, 246, ',  // Púrpura suave
          'rgba(236, 72, 153, ',  // Rosa suave
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
const FilmReel: React.FC = () => {
  return (
    <group>
      {/* Film Reel */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.3, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Center Hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="#0B0B0B" />
      </mesh>
      
      {/* Film Strip */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.5, 0, Math.sin(i * Math.PI / 4) * 1.5]} rotation={[0, i * Math.PI / 4, 0]}>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  )
}

const VortexStudios: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.2, triggerOnce: true })
 const handleClick = () => {
    const phoneNumber = "525613072964"; // Número en formato internacional, sin "+"
    const message = "Hola, me gustaría obtener más información.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank"); // Abre en una nueva pestaña
  };
  const services = [
    {
      icon: Film,
      title: 'Producción Cinematográfica',
      description: 'Largometrajes, cortometrajes y documentales con calidad internacional',
      features: ['Narrativa Visual', 'Dirección Creativa', 'Post-producción Avanzada']
    },
    {
      icon: Camera,
      title: 'Contenido Digital',
      description: 'Videos corporativos, comerciales y contenido para redes sociales',
      features: ['Marketing Digital', 'Branded Content', 'Streaming Live']
    },
    {
      icon: Play,
      title: 'Motion Graphics',
      description: 'Animación 2D/3D, efectos visuales y diseño gráfico en movimiento',
      features: ['VFX Avanzados', 'Animación 3D', 'Compositing Digital']
    }
  ]

  const projects = [
    {
      title: 'Campaña Global Tech',
      category: 'Comercial',
      description: 'Serie de comerciales para lanzamiento internacional de producto tecnológico',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { views: '2.5M', reach: '15 países', awards: '3 premios' }
    },
    {
      title: 'Documental Social',
      category: 'Documental',
      description: 'Producción sobre impacto de tecnología en comunidades rurales',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { festivals: '12 festivales', audience: '500K', impact: 'Alto' }
    },
    {
      title: 'Serie Web Corporativa',
      category: 'Branded Content',
      description: 'Contenido episódico para estrategia de marca B2B',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: { episodes: '8 episodios', engagement: '85%', leads: '2.3K' }
    }
  ]

  const socialMetrics = [
    { icon: Share2, value: '1.2M', label: 'Compartidos' },
    { icon: Heart, value: '850K', label: 'Me Gusta' },
    { icon: MessageSquare, value: '320K', label: 'Comentarios' },
    { icon: TrendingUp, value: '45%', label: 'Engagement' }
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black-900 to-pink-900/20" />
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
              className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full mb-6"
            >
              <Film size={16} />
              <span className="text-sm font-medium">Producción Audiovisual</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gradient-gold mb-6">
              Vortex Studios
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Creamos experiencias audiovisuales que trascienden lo convencional. 
              Desde narrativas cinematográficas hasta contenido digital innovador, 
              cada proyecto es una obra maestra visual.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">150+</div>
                <div className="text-sm text-gray-400">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">25+</div>
                <div className="text-sm text-gray-400">Premios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">80+</div>
                <div className="text-sm text-gray-400">Clientes</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
          
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-semibold rounded-xl hover:bg-purple-500/10 transition-all duration-300"
           onClick={handleClick}
           >
               Empieza tu producción
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Film Reel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-96 lg:h-[500px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center canvas-fallback">
                <div className="text-center">
                  <Film size={48} className="mx-auto mb-4" />
                  <p>Cargando modelo 3D...</p>
                </div>
              </div>
            }>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={0.5} // Reducida velocidad de rotación
                  enablePan={false}
                />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <FilmReel />
                <Environment preset="studio" />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4 relative">
        <SubtleWavesBackground />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos soluciones audiovisuales integrales desde la conceptualización 
              hasta la entrega final, garantizando excelencia en cada etapa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group p-8 bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
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

      {/* Social Metrics Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-pink-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Impacto en Redes Sociales
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nuestro contenido genera conversaciones y construye comunidades 
              activas alrededor de las marcas que representamos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialMetrics.map((metric, index) => {
              const Icon = metric.icon
              
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50 p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gold-500 mb-2">{metric.value}</div>
                  <div className="text-gray-400">{metric.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 px-4 relative">
        <SubtleWavesBackground />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gradient-gold mb-6">
              Proyectos Destacados
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una selección de nuestros trabajos más reconocidos que demuestran 
              nuestra capacidad de crear contenido que impacta y trasciende.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/80 text-white text-sm rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-purple-400">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
    </>
  )
}

export default VortexStudios