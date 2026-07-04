"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow continuous rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    
    if (groupRef.current) {
      // Subtly follow mouse
      const targetX = (state.mouse.x * Math.PI) / 10;
      const targetY = (state.mouse.y * Math.PI) / 10;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial 
            color="#ff007f" 
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
          />
        </mesh>
        
        {/* Solid inner shape */}
        <mesh scale={0.85}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.4} 
            metalness={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  return (
    <div ref={ref} className="w-full h-full absolute inset-0 pointer-events-none">
      {/* frameloop="demand" pauses the render loop automatically unless state changes, 
          but with useFrame we need it to be "always". Switching to "demand" when not in view
          pauses the useFrame loops, saving immense battery and CPU on mobile. */}
      <Canvas 
        frameloop={inView ? "always" : "demand"} 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]}
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#ff007f" />
          
          {/* Only render scene if in view for extra safety, though frameloop handles most of it */}
          {inView && <Scene />}
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
