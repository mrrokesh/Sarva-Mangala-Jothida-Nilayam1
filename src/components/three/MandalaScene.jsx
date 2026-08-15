import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Mandala() {
  const outer = useRef()
  const mid = useRef()
  const inner = useRef()
  useFrame((_, delta) => {
    outer.current.rotation.z += delta * 0.15
    mid.current.rotation.z -= delta * 0.22
    inner.current.rotation.y += delta * 0.4
  })
  return (
    <group>
      <mesh ref={outer} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.03, 12, 64]} />
        <meshStandardMaterial color="#8b2332" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={mid} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.02, 12, 64]} />
        <meshStandardMaterial color="#b4532a" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#8b2332" metalness={0.5} roughness={0.25} emissive="#b4532a" emissiveIntensity={0.16} />
      </mesh>
    </group>
  )
}

export default function MandalaScene() {
  return (
    <div className="h-72 w-full min-h-[280px] overflow-hidden rounded-2xl bg-[#fff8f5] md:h-full">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#fff8f5']} />
        <ambientLight intensity={0.85} />
        <pointLight position={[3, 2, 4]} intensity={1.1} color="#b4532a" />
        <Suspense fallback={null}>
          <Mandala />
        </Suspense>
      </Canvas>
    </div>
  )
}
