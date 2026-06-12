"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteLoaderProvider({ children }) {
  // This provider no longer renders its own loader
  // The Suspense fallback in layout.tsx will handle loading states
  return children;
}
