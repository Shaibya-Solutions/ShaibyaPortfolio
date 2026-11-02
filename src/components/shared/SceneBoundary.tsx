"use client";

import { Component, Suspense, type ReactNode } from "react";

interface SceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

// Decorative WebGL must never suspend or replace the surrounding page.
export class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed
      ? this.props.fallback
      : <Suspense fallback={this.props.fallback}>{this.props.children}</Suspense>;
  }
}

export function GeometricPreview({ accent = "#0ea5e9" }: { accent?: string }) {
  return (
    <div data-scene-fallback className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 320 320" className="h-3/4 w-3/4 max-w-sm" role="img" aria-label="Faceted geometric shape">
        <ellipse cx="160" cy="275" rx="76" ry="13" fill={accent} opacity="0.08" />
        <g stroke={accent} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M160 46 249 112 230 213 160 261 71 195 90 94Z" fill="#f0f9ff" />
          <path d="m160 46 20 99 69-33Z" fill="#e0f2fe" />
          <path d="m160 46-70 48 90 51Z" fill="#f8fafc" />
          <path d="m90 94-19 101 109-50Z" fill="#bae6fd" />
          <path d="m180 145 50 68 19-101Z" fill="#7dd3fc" />
          <path d="m71 195 89 66 20-116Z" fill="#e0f2fe" />
          <path d="m180 145-20 116 70-48Z" fill="#38bdf8" fillOpacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
