'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Stars } from '@react-three/drei';
import { useRef } from 'react';

function Scene() {
  const group = useRef();
  useFrame(() => { group.current.rotation.y += 0.001; });
  return (
    <group ref={group}>
      <Torus args={[1.5, 0.3, 16, 100]} position={[0,0,0]} rotation={[0.5,0.5,0]}>
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.15} roughness={0.3} metalness={0.5} />
      </Torus>
      {[...Array(6)].map((_,i) => {
        const angle = (i/6)*Math.PI*2;
        return <Sphere key={i} args={[0.1,8,8]} position={[Math.cos(angle)*2.5, Math.sin(angle*1.3)*1.2, Math.sin(angle)*2.5]}><meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.3} /></Sphere>
      })}
      <Stars radius={5} depth={15} count={300} factor={3} />
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-30">
      <Canvas camera={{ position: [0,0,5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5,5,5]} intensity={0.8} color="#4F46E5" />
        <Scene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
}
