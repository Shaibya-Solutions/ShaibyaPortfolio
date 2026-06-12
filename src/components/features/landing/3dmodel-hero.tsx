// components/ModelViewer.js
"use client"; // This is important for client-side rendering in Next.js

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function ModelViewer() {
  // Use useGLTF to load the model.
  // This hook handles the loading state automatically.
  const gltf = useGLTF("/shaibya_cube.glb");

  return (
    <Canvas>
      {/* A light is needed to illuminate the model */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} />

      {/* This component will handle user interactions like rotating and zooming */}
      <OrbitControls />

      {/* The Suspense component shows a fallback while the model loads */}
      <Suspense fallback={null}>
        {/* The model is a React component, making it easy to add to the scene */}
        <primitive object={gltf.scene} />
      </Suspense>
    </Canvas>
  );
}
