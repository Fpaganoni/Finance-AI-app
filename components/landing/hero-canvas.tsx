'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = new THREE.Color('#dba84c')
const GOLD_DIM = new THREE.Color('#6b5220')
const GOLD_SOFT = new THREE.Color('#8a6a35')

/** Rasterizes a "$" glyph and samples `count` points from its filled pixels. */
function generateDollarPositions(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  const res = 480
  const canvas = document.createElement('canvas')
  canvas.width = res
  canvas.height = res
  const ctx = canvas.getContext('2d')
  if (!ctx) return out

  ctx.clearRect(0, 0, res, res)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '900 400px Georgia, serif'
  ctx.fillText('$', res / 2, res / 2 + 12)

  const data = ctx.getImageData(0, 0, res, res).data
  const candidates: { x: number; y: number }[] = []
  for (let y = 0; y < res; y += 1) {
    for (let x = 0; x < res; x += 1) {
      if (data[(y * res + x) * 4 + 3] > 160) candidates.push({ x, y })
    }
  }

  // Shuffle once, then sample by cycling through — spreads repeats evenly
  // across the glyph instead of clumping from pure random draws.
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  for (let i = 0; i < count; i++) {
    const p = candidates.length ? candidates[i % candidates.length] : { x: res / 2, y: res / 2 }
    const nx = (p.x - res / 2) / (res / 2)
    const ny = -(p.y - res / 2) / (res / 2)
    out[i * 3] = nx * radius
    out[i * 3 + 1] = ny * radius
    out[i * 3 + 2] = 0
  }

  return out
}

function ParticleGeoid({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const COUNT = 900
  const RADIUS = 2.4

  const { positions, basePositions, dollarPositions, linePositions, lineBase } = useMemo(() => {
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

    const dollarPositions = generateDollarPositions(COUNT, RADIUS * 1.15)

    return { positions, basePositions, dollarPositions, linePositions, lineBase: linePositions.slice(0, linkCount * 6) }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04

    const scroll = scrollProgress.current

    // Timeline across the pinned scroll:
    // 0.00-0.15 sphere forms · 0.15-0.35 morphs into a $ sign
    // 0.35-0.55 holds the $ shape · 0.55-0.78 bursts apart
    // 0.78-1.00 collapses into a dense core (and fades out, in hero.tsx)
    const formT = THREE.MathUtils.smoothstep(scroll, 0.15, 0.35)
    const disperseT = THREE.MathUtils.smoothstep(scroll, 0.55, 0.78)
    const collapseT = THREE.MathUtils.smoothstep(scroll, 0.78, 1.0)

    // Rotation and mouse parallax fade out as the $ forms, so it sits
    // dead-on to the camera and reads clearly while held, then both
    // resume once it bursts apart again.
    const rotateScroll = scroll < 0.15 ? scroll : scroll < 0.55 ? 0.15 : 0.15 + (scroll - 0.55)
    const formHold = THREE.MathUtils.smoothstep(scroll, 0.1, 0.3) * (1 - disperseT)
    const faceCamera = 1 - formHold

    if (groupRef.current) {
      groupRef.current.rotation.y = (t * 0.05 + mouse.current.x * 0.3 + rotateScroll * Math.PI * 1.4) * faceCamera
      groupRef.current.rotation.x = (t * 0.02 + mouse.current.y * 0.2 + rotateScroll * 0.8) * faceCamera
      groupRef.current.position.x =
        mouse.current.x * 0.3 * faceCamera + THREE.MathUtils.lerp(0, viewport.width * 0.1, scroll)
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -2.2, scroll)
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.4, collapseT))
    }

    if (pointsRef.current) {
      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array
      const spread = 1 + disperseT * 1.3
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3
        const breathe = 1 + Math.sin(t * 0.6 + i * 0.15) * 0.015
        const bx = THREE.MathUtils.lerp(basePositions[idx], dollarPositions[idx], formT)
        const by = THREE.MathUtils.lerp(basePositions[idx + 1], dollarPositions[idx + 1], formT)
        const bz = THREE.MathUtils.lerp(basePositions[idx + 2], dollarPositions[idx + 2], formT)
        arr[idx] = bx * breathe * spread
        arr[idx + 1] = by * breathe * spread
        arr[idx + 2] = bz * breathe * spread
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      // Connective lines would clutter the glyph, so fade them out while
      // it forms/holds, then let them fade back only slightly on burst.
      mat.opacity = THREE.MathUtils.lerp(0.35, 0.04, Math.max(formT, disperseT))
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={GOLD} transparent opacity={0.9} sizeAttenuation depthWrite={false} />
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

function CameraDrift({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const scroll = scrollProgress.current
    state.camera.position.x = Math.sin(t * 0.08) * 0.25
    state.camera.position.y = Math.cos(t * 0.06) * 0.15
    state.camera.position.z = THREE.MathUtils.lerp(6.2, 3.6, scroll)
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
        <CameraDrift scrollProgress={scrollProgress} />
        <DriftingGlow scrollProgress={scrollProgress} />
        <Sparkles
          count={90}
          scale={[9, 6, 6]}
          size={1.6}
          speed={0.3}
          opacity={0.3}
          color={GOLD}
          noise={1}
        />
        <ParticleGeoid scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
