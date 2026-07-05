'use client';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   LAND DATA — longitude ranges per 5° latitude band
   Row 0 = 87.5°N … Row 35 = 87.5°S
   Each entry: [[lngStart, lngEnd], …]
   ───────────────────────────────────────────────────────── */
const LAND: [number, number][][] = [
  /* 87.5°N */ [[-100,-60],[40,180]],
  /* 82.5°N */ [[-130,-55],[20,180]],
  /* 77.5°N */ [[-170,-55],[15,180]],
  /* 72.5°N */ [[-170,-55],[10,180]],
  /* 67.5°N */ [[-170,-55],[-5,180]],
  /* 62.5°N */ [[-170,-55],[-10,50],[55,180]],
  /* 57.5°N */ [[-140,-52],[-10,50],[55,180]],
  /* 52.5°N */ [[-135,-52],[-10,145]],
  /* 47.5°N */ [[-130,-52],[-10,145]],
  /* 42.5°N */ [[-125,-65],[-10,145]],
  /* 37.5°N */ [[-125,-75],[-10,145]],
  /* 32.5°N */ [[-120,-78],[-5,130]],
  /* 27.5°N */ [[-115,-80],[25,125]],
  /* 22.5°N */ [[-110,-80],[-17,55],[68,120]],
  /* 17.5°N */ [[-105,-85],[-17,50],[72,115]],
  /* 12.5°N */ [[-87,-83],[-17,50],[75,125]],
  /*  7.5°N */ [[-83,-77],[-12,45],[78,130]],
  /*  2.5°N */ [[-80,-77],[-8,42],[95,140]],
  /*  2.5°S */ [[-80,-75],[-8,42],[98,140]],
  /*  7.5°S */ [[-78,-35],[-8,42],[100,140]],
  /* 12.5°S */ [[-77,-35],[10,45],[115,150]],
  /* 17.5°S */ [[-75,-40],[12,42],[120,148]],
  /* 22.5°S */ [[-70,-40],[14,38],[115,155]],
  /* 27.5°S */ [[-60,-45],[16,35],[114,155]],
  /* 32.5°S */ [[-72,-50],[17,33],[115,153]],
  /* 37.5°S */ [[-73,-60],[18,28],[140,150]],
  /* 42.5°S */ [[-75,-63],[145,148]],
  /* 47.5°S */ [[-76,-65]],
  /* 52.5°S */ [[-75,-68]],
  /* 57.5°S */ [[-70,-65]],
  /* 62.5°S */ [],
  /* 67.5°S */ [[-65,-55],[60,70],[100,170]],
  /* 72.5°S */ [[-70,-55],[40,170]],
  /* 77.5°S */ [[-130,170]],
  /* 82.5°S */ [[-180,180]],
  /* 87.5°S */ [[-180,180]],
];

function isLand(lat: number, lng: number): boolean {
  const row = Math.floor((90 - lat) / 5);
  if (row < 0 || row >= LAND.length) return false;
  let l = ((lng % 360) + 540) % 360 - 180;
  return LAND[row].some(([s, e]) => l >= s && l <= e);
}

function fibSphere(n: number) {
  const pts: { lat: number; lng: number; land: boolean }[] = [];
  const gr = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / n);
    const phi = (2 * Math.PI * i) / gr;
    const lat = 90 - (theta * 180) / Math.PI;
    const lng = ((phi * 180) / Math.PI) % 360 - 180;
    pts.push({ lat, lng, land: isLand(lat, lng) });
  }
  return pts;
}

interface EarthProps {
  className?: string;
  isLightBg?: boolean;
}

const Earth: React.FC<EarthProps> = ({ className, isLightBg = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 1000;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const points = fibSphere(18000);
    let rotation = 0;
    let animId: number;

    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const R = SIZE * 0.34;

    function render() {
      ctx!.clearRect(0, 0, SIZE, SIZE);

      /* ── Outer atmospheric glow ── */
      const glow = ctx!.createRadialGradient(CX, CY, R * 0.85, CX, CY, R * 1.35);
      if (isLightBg) {
        // Bright brand blue atmospheric glow
        glow.addColorStop(0, 'rgba(14, 165, 233, 0.42)');
        glow.addColorStop(0.5, 'rgba(14, 165, 233, 0.16)');
        glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
      } else {
        glow.addColorStop(0, 'rgba(56, 139, 255, 0.08)');
        glow.addColorStop(0.5, 'rgba(56, 139, 255, 0.04)');
        glow.addColorStop(1, 'rgba(56, 139, 255, 0)');
      }
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, SIZE, SIZE);

      /* ── Sphere body (light or dark fill) ── */
      ctx!.beginPath();
      ctx!.arc(CX, CY, R, 0, Math.PI * 2);
      const bodyGrad = ctx!.createRadialGradient(
        CX - R * 0.25, CY - R * 0.25, R * 0.1,
        CX, CY, R
      );
      if (isLightBg) {
        // Medium pink gradient for the body (pink-200 to pink-400)
        bodyGrad.addColorStop(0, '#fbcfe8');
        bodyGrad.addColorStop(1, '#f472b6');
      } else {
        bodyGrad.addColorStop(0, 'rgba(15, 30, 60, 0.95)');
        bodyGrad.addColorStop(1, 'rgba(2, 8, 23, 0.98)');
      }
      ctx!.fillStyle = bodyGrad;
      ctx!.fill();

      /* ── Grid lines (latitude) ── */
      ctx!.strokeStyle = isLightBg ? 'rgba(14, 165, 233, 0.16)' : 'rgba(56, 139, 255, 0.06)';
      ctx!.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = CY - Math.sin(latRad) * R;
        const rx = Math.cos(latRad) * R;
        ctx!.beginPath();
        ctx!.ellipse(CX, y, rx, rx * 0.15, 0, 0, Math.PI * 2);
        ctx!.stroke();
      }

      /* ── Land dots ── */
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const latRad = (pt.lat * Math.PI) / 180;
        const lngRad = ((pt.lng + rotation) * Math.PI) / 180;

        const x3d = Math.cos(latRad) * Math.sin(lngRad);
        const y3d = Math.sin(latRad);
        const z3d = Math.cos(latRad) * Math.cos(lngRad);

        if (z3d <= 0.05) continue; // back-face cull

        const px = CX + x3d * R;
        const py = CY - y3d * R;

        if (pt.land) {
          const alpha = z3d * 0.95;
          const dotSize = 1.8 + z3d * 1.5;
          ctx!.beginPath();
          ctx!.arc(px, py, dotSize, 0, Math.PI * 2);
          
          if (isLightBg) {
            // White land dots for contrast on pink body
            ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          } else {
            ctx!.fillStyle = `rgba(100, 180, 255, ${alpha})`;
          }
          ctx!.fill();
        } else {
          // Ocean dots
          if (z3d > 0.5) {
            ctx!.beginPath();
            ctx!.arc(px, py, 0.5, 0, Math.PI * 2);
            if (isLightBg) {
              // Faint dark blue ocean dots for contrast
              ctx!.fillStyle = `rgba(15, 37, 84, ${z3d * 0.08})`;
            } else {
              ctx!.fillStyle = `rgba(56, 100, 180, ${z3d * 0.08})`;
            }
            ctx!.fill();
          }
        }
      }

      /* ── Highlight edge ring ── */
      ctx!.beginPath();
      ctx!.arc(CX, CY, R, 0, Math.PI * 2);
      ctx!.strokeStyle = isLightBg ? 'rgba(14, 165, 233, 0.45)' : 'rgba(80, 160, 255, 0.2)';
      ctx!.lineWidth = 2.0;
      ctx!.stroke();

      /* ── Specular highlight ── */
      const spec = ctx!.createRadialGradient(
        CX - R * 0.3, CY - R * 0.3, 0,
        CX - R * 0.3, CY - R * 0.3, R * 0.6
      );
      if (isLightBg) {
        spec.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        spec.addColorStop(0, 'rgba(130, 200, 255, 0.06)');
        spec.addColorStop(1, 'rgba(130, 200, 255, 0)');
      }
      ctx!.fillStyle = spec;
      ctx!.beginPath();
      ctx!.arc(CX, CY, R, 0, Math.PI * 2);
      ctx!.fill();

      rotation += 0.15;
      animId = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(animId);
  }, [isLightBg]);

  return (
    <div
      className={cn(
        'flex items-center justify-center z-10 w-full h-full',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-full max-h-full"
        style={{
          aspectRatio: '1',
        }}
      />
    </div>
  );
};

export default Earth;
