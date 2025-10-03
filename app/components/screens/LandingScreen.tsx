import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Lightbulb, Users } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { Variants, Easing } from 'framer-motion'

const businessUnits = [
  {
    id: 'vortex',
    title: 'Vortex Studios',
    description: 'Producción audiovisual de vanguardia',
    detail: 'Creamos contenido visual que trasciende lo convencional, fusionando narrativa cinematográfica con tecnología de última generación.',
    icon: Play,
    color: 'from-purple-500 to-pink-500',
    path: '/vortex',
    stats: { projects: '150+', clients: '80+', awards: '25+' }
  },
  {
    id: 'nexora',
    title: 'Nexora',
    description: 'Tecnologías que transforman el futuro',
    detail: 'Desarrollamos soluciones tecnológicas innovadoras que impulsan la transformación digital de las empresas hacia la era 4.0.',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500',
    path: '/nexora',
    stats: { solutions: '200+', enterprises: '50+', countries: '12+' }
  },
  {
    id: 'civitas',
    title: 'Civitas Humanis',
    description: 'Proyectos sociales con impacto real',
    detail: 'Diseñamos e implementamos iniciativas que generan cambios positivos en comunidades, promoviendo desarrollo sostenible.',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    path: '/civitas',
    stats: { communities: '30+', beneficiaries: '10K+', programs: '45+' }
  }
]

const MinimalCorporateBackground: React.FC = () => {
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

    // Clase para representar una línea sutil
    class SubtleLine {
      x1: number = 0;
      y1: number = 0;
      x2: number = 0;
      y2: number = 0;
      opacity: number = 0;
      targetOpacity: number = 0;
      speed: number = 0;

      constructor() {
        // Crear líneas en posiciones estratégicas
        const side = Math.floor(Math.random() * 4);
        switch(side) {
          case 0: // Superior
            this.x1 = Math.random() * dimensions.width;
            this.y1 = 0;
            this.x2 = Math.random() * dimensions.width;
            this.y2 = dimensions.height;
            break;
          case 1: // Derecha
            this.x1 = dimensions.width;
            this.y1 = Math.random() * dimensions.height;
            this.x2 = 0;
            this.y2 = Math.random() * dimensions.height;
            break;
          case 2: // Inferior
            this.x1 = Math.random() * dimensions.width;
            this.y1 = dimensions.height;
            this.x2 = Math.random() * dimensions.width;
            this.y2 = 0;
            break;
          case 3: // Izquierda
            this.x1 = 0;
            this.y1 = Math.random() * dimensions.height;
            this.x2 = dimensions.width;
            this.y2 = Math.random() * dimensions.height;
            break;
        }
        
        this.opacity = 0;
        this.targetOpacity = Math.random() * 0.15 + 0.05;
        this.speed = Math.random() * 0.005 + 0.002;
      }

      update() {
        // Transición suave de opacidad
        if (this.opacity < this.targetOpacity) {
          this.opacity += this.speed;
        } else if (this.opacity > this.targetOpacity) {
          this.opacity -= this.speed;
        }
        
        // Cambiar opacidad objetivo ocasionalmente
        if (Math.random() < 0.005) {
          this.targetOpacity = Math.random() * 0.15 + 0.05;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Clase para representar un punto de conexión
    class ConnectionPoint {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      pulse: number = 0;
      pulseSpeed: number = 0;
      maxPulse: number = 0;
      color: string = '';

      constructor() {
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        this.size = Math.random() * 2 + 1;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.maxPulse = Math.random() * 5 + 3;
        this.color = 'rgba(212, 175, 55, ';
      }

      update() {
        this.pulse += this.pulseSpeed;
        if (this.pulse > this.maxPulse) {
          this.pulse = 0;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseSize = this.size + Math.sin(this.pulse) * 0.5;
        const opacity = 0.2 + Math.sin(this.pulse) * 0.1;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color + opacity + ')';
        ctx.fill();
      }
    }

    // Clase para representar un elemento geométrico sutil
    class GeometricElement {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      rotation: number = 0;
      rotationSpeed: number = 0;
      type: 'triangle' | 'square' | 'hexagon' = 'triangle';
      opacity: number = 0;
      color: string = '';

      constructor() {
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        this.size = Math.random() * 30 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.1) * .05;
        
        const types: ('triangle' | 'square' | 'hexagon')[] = ['triangle', 'square', 'hexagon'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        this.opacity = Math.random() * 0.1 + 0.05;
        this.color = 'rgba(212, 175, 55, ';
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.strokeStyle = this.color + (this.opacity * 1.5) + ')';
        ctx.lineWidth = 0.5;

        switch (this.type) {
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 'square':
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
            
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * 2 * Math.PI) / 6;
              ctx.lineTo(
                (this.size / 2) * Math.cos(angle),
                (this.size / 2) * Math.sin(angle)
              );
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      }
    }

    // Crear elementos minimalistas
    const lines: SubtleLine[] = [];
    const points: ConnectionPoint[] = [];
    const elements: GeometricElement[] = [];
    
    // Líneas sutiles
    for (let i = 0; i < 15; i++) {
      lines.push(new SubtleLine());
    }
    
    // Puntos de conexión
    for (let i = 0; i < 20; i++) {
      points.push(new ConnectionPoint());
    }
    
    // Elementos geométricos
    for (let i = 0; i < 8; i++) {
      elements.push(new GeometricElement());
    }

    // Función de animación
    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsedTime = (timestamp - timeRef.current) / 1000;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Dibujar todos los elementos
      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });
      
      points.forEach(point => {
        point.update();
        point.draw(ctx);
      });
      
      elements.forEach(element => {
        element.update();
        element.draw(ctx);
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
      className="absolute inset-0 w-full h-full"
    />
  );
};

const Landing: React.FC = () => {
  const navigate = useNavigate()
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [unitsRef, unitsInView] = useInView({ threshold: 0.2, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as Easing
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Minimal Corporate Background */}
        <MinimalCorporateBackground />
        
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial" />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/3 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          className="relative z-10 text-center max-w-6xl mx-auto px-4"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-3xl flex items-center justify-center font-display font-bold text-4xl text-black-900 shadow-gold-lg"
            >
              GR
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-hero font-display font-bold text-gradient-gold mb-6 leading-tight"
          >
            Grupo Roma
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed"
          >
            Tres visiones, un propósito: transformar el mundo a través de la{' '}
            <span className="text-gold-500 font-semibold">innovación</span>,{' '}
            <span className="text-gold-500 font-semibold">tecnología</span> y{' '}
            <span className="text-gold-500 font-semibold">impacto social</span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Desde la producción audiovisual más avanzada hasta soluciones tecnológicas 
            revolucionarias y proyectos sociales que cambian vidas.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/vortex')}
              className="px-8 py-4 bg-gold-500 text-black-900 font-semibold rounded-xl hover:bg-gold-400 transition-all duration-300 flex items-center space-x-2 shadow-gold"
            >
              <span>Explorar Nuestro Ecosistema</span>
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gold-500 text-gold-500 font-semibold rounded-xl hover:bg-gold-500/10 transition-all duration-300"
            >
              Ver Showreel
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gold-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Business Units Section */}
      <section ref={unitsRef} className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={unitsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-display font-display font-bold text-gradient-gold mb-6">
              Nuestras Unidades de Negocio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cada división representa la excelencia en su campo, trabajando en sinergia 
              para crear soluciones integrales que superan expectativas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessUnits.map((unit, index) => {
              const Icon = unit.icon
              
              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={unitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => navigate(unit.path)}
                  className="group cursor-pointer"
                >
                  <div className="relative p-8 bg-gradient-to-br from-gray-900/50 to-black-800/50 backdrop-blur-glass rounded-2xl border border-gray-700/50 hover:border-gold-500/50 transition-all duration-500 h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${unit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                      {unit.title}
                    </h3>
                    
                    <p className="text-gold-500 font-medium mb-4">
                      {unit.description}
                    </p>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {unit.detail}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(unit.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gold-500">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors">
                      <span>Explorar {unit.title}</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Landing