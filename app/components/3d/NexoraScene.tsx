
"use client";
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Octahedron, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

const NexoraScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const mainSphereRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)
  const icosahedronRef = useRef<THREE.Mesh>(null)

  // Create circuit board geometry
  const circuitGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(0.5, 0.1, 1, 1)
    return geometry
  }, [])

  // Create chip geometry
  const chipGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(0.4, 0.1, 0.4)
    return geometry
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
    }

    if (mainSphereRef.current) {
      mainSphereRef.current.rotation.x = time * 0.2
      mainSphereRef.current.rotation.y = time * 0.3
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = time * 0.4
      octahedronRef.current.rotation.z = time * 0.3
      octahedronRef.current.position.y = Math.sin(time * 0.8) * 0.5
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.y = time * 0.5
      icosahedronRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      
      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#06B6D4" />
      <pointLight position={[0, 0, 15]} intensity={0.8} color="#D4AF37" />

      {/* Main Sphere - Tech Core */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere ref={mainSphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#3B82F6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1E40AF"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      {/* Octahedron - Data Node */}
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.3}>
        <Octahedron ref={octahedronRef} args={[0.8]} position={[-3, 2, 1]}>
          <meshStandardMaterial
            color="#06B6D4"
            metalness={0.8}
            roughness={0.2}
            emissive="#0891B2"
            emissiveIntensity={0.15}
          />
        </Octahedron>
      </Float>

      {/* Icosahedron - AI Brain */}
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.5}>
        <Icosahedron ref={icosahedronRef} args={[0.6]} position={[3, -1, -1]}>
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0}
            emissive="#B8941F"
            emissiveIntensity={0.3}
          />
        </Icosahedron>
      </Float>

      {/* Circuit Boards */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 3.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(i * 0.5) * 0.8
        
        return (
          <Float key={i} speed={0.3 + i * 0.05} rotationIntensity={0.2} floatIntensity={0.1}>
            <mesh 
              geometry={circuitGeometry} 
              position={[x, y, z]}
              rotation={[0, angle, 0]}
            >
              <meshStandardMaterial
                color={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#06B6D4" : "#10B981"}
                metalness={0.7}
                roughness={0.3}
                emissive={i % 3 === 0 ? "#1E40AF" : i % 3 === 1 ? "#0891B2" : "#059669"}
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
        )
      })}

      {/* Microchips */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 2.2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <Float key={`chip-${i}`} speed={0.6 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.3}>
            <mesh 
              geometry={chipGeometry} 
              position={[x, Math.cos(i * 2) * 0.5, z]}
              rotation={[Math.PI / 4, angle, 0]}
            >
              <meshStandardMaterial
                color="#1F2937"
                metalness={0.9}
                roughness={0.1}
                emissive="#374151"
                emissiveIntensity={0.05}
              />
            </mesh>
          </Float>
        )
      })}

      {/* Data Cubes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const radius = 5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(i * 0.8) * 1.5
        
        return (
          <Float key={`cube-${i}`} speed={0.4 + i * 0.02} rotationIntensity={0.3} floatIntensity={0.2}>
            <Box 
              args={[0.15, 0.15, 0.15]} 
              position={[x, y, z]}
            >
              <meshStandardMaterial
                color={i % 4 === 0 ? "#3B82F6" : i % 4 === 1 ? "#06B6D4" : i % 4 === 2 ? "#10B981" : "#D4AF37"}
                metalness={0.6}
                roughness={0.4}
                emissive={i % 4 === 0 ? "#1E40AF" : i % 4 === 1 ? "#0891B2" : i % 4 === 2 ? "#059669" : "#B8941F"}
                emissiveIntensity={0.1}
              />
            </Box>
          </Float>
        )
      })}

      {/* Connection Lines Effect */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
  attach="attributes-position"
  args={[
    new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10)),
    3
  ]}
/>
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" opacity={0.3} transparent />
      </lineSegments>
    </group>
  )
}

export default NexoraScene
