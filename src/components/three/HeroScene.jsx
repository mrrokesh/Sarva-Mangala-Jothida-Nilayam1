import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'

function Planet({ color, radius, distance, speed, size }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    ref.current.position.x = Math.cos(t) * distance
    ref.current.position.z = Math.sin(t) * distance
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.45} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  )
}

function ZodiacRing() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * 0.12
    ref.current.rotation.x = 0.6
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.045, 16, 96]} />
      <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.25} emissive="#e4c76a" emissiveIntensity={0.2} />
    </mesh>
  )
}

function InnerRing() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.z -= delta * 0.18
    ref.current.rotation.x = 1.1
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.55, 0.025, 12, 80]} />
      <meshStandardMaterial color="#e4c76a" metalness={0.65} roughness={0.28} />
    </mesh>
  )
}

function Core() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.35
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.45} roughness={0.3} emissive="#c9a227" emissiveIntensity={0.18} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const planets = useMemo(
    () => [
      { color: '#e4c76a', distance: 3.2, speed: 0.35, size: 0.18 },
      { color: '#1e3a5f', distance: 3.8, speed: 0.22, size: 0.28 },
      { color: '#f4efe2', distance: 4.4, speed: 0.16, size: 0.14 },
      { color: '#c9a227', distance: 2.8, speed: 0.45, size: 0.12 },
    ],
    [],
  )
  return (
    <>
      <color attach="background" args={['#0b1220']} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#e4c76a" />
      <pointLight position={[-4, -2, -3]} intensity={0.55} color="#1e3a5f" />
      <Stars radius={80} depth={40} count={900} factor={2.4} saturation={0.35} fade speed={0.4} />
      <Core />
      <ZodiacRing />
      <InnerRing />
      {planets.map((p) => (
        <Planet key={p.distance} {...p} />
      ))}
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1.2, 6.2], fov: 45 }} dpr={[1, 1.6]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
