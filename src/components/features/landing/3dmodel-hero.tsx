"use client";

import dynamic from "next/dynamic";

const InteractiveModelViewer = dynamic(
  () => import("@/components/ui/3d/InteractiveModelViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center text-xs text-sky-400 font-mono">
        Initializing 3D Model...
      </div>
    ),
  }
);

export default function ModelViewer({ modelUrl }: { modelUrl?: string }) {
  return (
    <div className="w-full h-96">
      <InteractiveModelViewer modelUrl={modelUrl} color="#0ea5e9" autoRotate />
    </div>
  );
}
