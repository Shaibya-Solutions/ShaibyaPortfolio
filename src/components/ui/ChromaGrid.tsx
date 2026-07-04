'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../../styles/ChromaGrid.css';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  location?: string;
  /** Quote shown on the back of the card when clicked */
  quote?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const demo: ChromaItem[] = [
  {
    image: 'https://i.pravatar.cc/300?img=8',
    title: 'Alex Rivera',
    subtitle: 'Full Stack Developer',
    handle: '@alexrivera',
    borderColor: '#4F46E5',
    gradient: 'linear-gradient(145deg, #4F46E5, #000)',
    url: 'https://github.com/',
    quote: 'Build things that matter. Ship fast, iterate faster.',
  },
  {
    image: 'https://i.pravatar.cc/300?img=11',
    title: 'Jordan Chen',
    subtitle: 'DevOps Engineer',
    handle: '@jordanchen',
    borderColor: '#10B981',
    gradient: 'linear-gradient(210deg, #10B981, #000)',
    url: 'https://linkedin.com/in/',
    quote: 'Infrastructure is poetry. Reliability is art.',
  },
  {
    image: 'https://i.pravatar.cc/300?img=3',
    title: 'Morgan Blake',
    subtitle: 'UI/UX Designer',
    handle: '@morganblake',
    borderColor: '#F59E0B',
    gradient: 'linear-gradient(165deg, #F59E0B, #000)',
    url: 'https://dribbble.com/',
    quote: 'Design is not how it looks. Design is how it works.',
  },
];

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setX = useRef<gsap.QuickToFunc | null>(null);
  const setY = useRef<gsap.QuickToFunc | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // Track which card index is flipped
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as gsap.QuickToFunc;
    setY.current = gsap.quickSetter(el, '--y', 'px') as gsap.QuickToFunc;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
  };

  const handleLeave = () => {
  };

  const handleCardClick = (index: number, c: ChromaItem) => {
    if (c.quote) {
      // Toggle flip
      setFlippedIndex(flippedIndex === index ? null : index);
    } else if (c.url) {
      window.open(c.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--cols': columns,
          '--rows': rows,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className={`chroma-card${flippedIndex === i ? ' flipped' : ''}`}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(i, c)}
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient || 'linear-gradient(145deg,#333,#000)',
              cursor: 'pointer',
            } as React.CSSProperties
          }
        >
          <div className="chroma-card-inner">
            {/* ── Front face ── */}
            <div className="chroma-card-front">
              <div className="chroma-img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} loading="lazy" />
              </div>
              <footer className="chroma-info">
                <h3 className="name">{c.title}</h3>
                {c.handle && <span className="handle">{c.handle}</span>}
                <p className="role">{c.subtitle}</p>
                {c.location && <span className="location">{c.location}</span>}
              </footer>
            </div>

            {/* ── Back face ── */}
            <div className="chroma-card-back">
              <span className="chroma-back-label">{c.title}</span>
              {c.quote && <p className="chroma-quote">"{c.quote}"</p>}
              <span className="chroma-back-tap">tap to flip back</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
