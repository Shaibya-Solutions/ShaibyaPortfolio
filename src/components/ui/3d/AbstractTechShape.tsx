"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#0B4E61"
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          metalness={0.7}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>

      {/* Decorative smaller shapes */}
      <mesh position={[2, 1, -1]} scale={0.4}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#1282A2" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[-2, -1.5, 1]} scale={0.3}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#E0F5FC" metalness={0.5} roughness={0.5} />
      </mesh>
    </Float>
  );
}

export function AbstractTechShape({ className = "w-full h-full absolute inset-0 z-0 pointer-events-none" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#E0F5FC" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#0B4E61" />
        
        <Shape />
        
        {/* Adds techy floating particles */}
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.2} color="#1282A2" />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
