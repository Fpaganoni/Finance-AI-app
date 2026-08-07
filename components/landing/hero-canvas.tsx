'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = new THREE.Color('#dba84c')
const GOLD_DIM = new THREE.Color('#6b5220')
const GOLD_SOFT = new THREE.Color('#8a6a35')

function ParticleGeoid({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const COUNT = 900
  const RADIUS = 2.4

  const { positions, basePositions, linePositions, lineBase } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const basePositions = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / COUNT)
      const theta = Math.sqrt(COUNT * Math.PI) * phi
      const jitter = 0.15 + Math.random() * 0.25
      const r = RADIUS + Math.sin(phi * 3) * jitter

      const x = r * Math.cos(theta) * Math.sin(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z
    }

    // connective lines between nearby points (sparse, for the "connected assets" look)
    const maxLinks = 700
    const linePositions = new Float32Array(maxLinks * 2 * 3)
    let linkCount = 0
    for (let i = 0; i < COUNT && linkCount < maxLinks; i += 3) {
      const ax = basePositions[i * 3]
      const ay = basePositions[i * 3 + 1]
      const az = basePositions[i * 3 + 2]
      let bestJ = -1
      let bestD = Infinity
      for (let j = i + 1; j < Math.min(i + 40, COUNT); j++) {
        const bx = basePositions[j * 3]
        const by = basePositions[j * 3 + 1]
        const bz = basePositions[j * 3 + 2]
        const d = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2
        if (d < bestD) {
          bestD = d
          bestJ = j
        }
      }
      if (bestJ !== -1 && bestD < 0.6) {
        linePositions[linkCount * 6] = ax
        linePositions[linkCount * 6 + 1] = ay
        linePositions[linkCount * 6 + 2] = az
        linePositions[linkCount * 6 + 3] = basePositions[bestJ * 3]
        linePositions[linkCount * 6 + 4] = basePositions[bestJ * 3 + 1]
        linePositions[linkCount * 6 + 5] = basePositions[bestJ * 3 + 2]
        linkCount++
      }
    }

    return { positions, basePositions, linePositions, lineBase: linePositions.slice(0, linkCount * 6) }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04

    if (groupRef.current) {
      const scroll = scrollProgress.current
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.4 + scroll * Math.PI * 0.9
      groupRef.current.rotation.x = t * 0.03 + mouse.current.y * 0.25 + scroll * 0.6
      groupRef.current.position.x = mouse.current.x * 0.3 + THREE.MathUtils.lerp(0, viewport.width * 0.14, scroll)
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -1.5, scroll)
      const s = THREE.MathUtils.lerp(1, 0.72, scroll)
      groupRef.current.scale.setScalar(s)
    }

    if (pointsRef.current) {
      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3
        const breathe = 1 + Math.sin(t * 0.6 + i * 0.15) * 0.02
        arr[idx] = basePositions[idx] * breathe
        arr[idx + 1] = basePositions[idx + 1] * breathe
        arr[idx + 2] = basePositions[idx + 2] * breathe
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color={GOLD} transparent opacity={0.85} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineBase, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GOLD_DIM} transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

function DriftingGlow({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      const scroll = scrollProgress.current
      ref.current.rotation.x = t * 0.05
      ref.current.rotation.y = t * 0.07
      ref.current.position.x = Math.sin(t * 0.15) * 1.4 - THREE.MathUtils.lerp(0, 1.2, scroll)
      ref.current.position.y = Math.cos(t * 0.12) * 0.8
      ref.current.position.z = -3 - scroll * 2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <MeshDistortMaterial
          color={GOLD_SOFT}
          distort={0.45}
          speed={1.4}
          transparent
          opacity={0.12}
          roughness={1}
          depthWrite={false}
        />
      </mesh>
    </Float>
  )
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.08) * 0.25
    state.camera.position.y = Math.cos(t * 0.06) * 0.15
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export function HeroCanvas({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <CameraDrift />
        <DriftingGlow scrollProgress={scrollProgress} />
        <Sparkles
          count={140}
          scale={[9, 6, 6]}
          size={2}
          speed={0.3}
          opacity={0.5}
          color={GOLD}
          noise={1}
        />
        <ParticleGeoid scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
