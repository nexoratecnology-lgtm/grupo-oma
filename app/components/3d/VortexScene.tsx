
"use client";
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

const VortexScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  // Create film reel geometry
  const filmReelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32)
    return geometry
  }, [])

  // Create camera geometry
  const cameraGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(0.8, 0.6, 1.2)
    return geometry
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.3
      sphereRef.current.rotation.x = time * 0.3
      sphereRef.current.rotation.z = time * 0.2
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.4
      torusRef.current.rotation.y = time * 0.6
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ambient Light */}
      <ambientLight intensity={0.2} />
      
      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 0, 10]} intensity={0.6} color="#EC4899" />

      {/* Main Sphere - Film Reel */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.7}
            roughness={0.2}
            emissive="#4C1D95"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      {/* Film Reels */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh geometry={filmReelGeometry} position={[-3, 1, 0]}>
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.1}
            emissive="#B8941F"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh geometry={filmReelGeometry} position={[3, -1, 0]}>
          <meshStandardMaterial
            color="#EC4899"
            metalness={0.6}
            roughness={0.3}
            emissive="#BE185D"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Camera Object */}
      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh geometry={cameraGeometry} position={[0, 2.5, -2]}>
          <meshStandardMaterial
            color="#1F2937"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Torus Ring */}
      <Torus ref={torusRef} args={[2, 0.1, 16, 100]} position={[0, 0, -1]}>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </Torus>

      {/* Floating Boxes - Film Frames */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.2}>
            <Box args={[0.3, 0.2, 0.05]} position={[x, Math.sin(i) * 0.5, z]}>
              <meshStandardMaterial
                color={i % 2 === 0 ? "#8B5CF6" : "#EC4899"}
                metalness={0.5}
                roughness={0.4}
                emissive={i % 2 === 0 ? "#4C1D95" : "#BE185D"}
                emissiveIntensity={0.1}
              />
            </Box>
          </Float>
        )
      })}
    </group>
  )
}

export default VortexScene
