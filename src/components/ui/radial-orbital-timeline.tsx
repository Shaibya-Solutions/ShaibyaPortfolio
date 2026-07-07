'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  onActiveChange?: (id: number | null) => void;
  activeId?: number | null;
  activeStepId?: number;
}

export default function RadialOrbitalTimeline({
  timelineData,
  onActiveChange,
  activeId = null,
  activeStepId = 4,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [clickedNodeId, setClickedNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Sync with activeId prop from parent scroll
  useEffect(() => {
    if (activeId !== null) {
      setActiveNodeId(activeId);
      setAutoRotate(false);
      centerViewOnNode(activeId);
    } else {
      setActiveNodeId(null);
      setAutoRotate(true);
      setClickedNodeId(null);
    }
  }, [activeId, timelineData]);

  // Auto rotation timer when not active/pinned
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.35) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    // Center the target node at 180 degrees (left side, right next to the left column text!)
    setRotationAngle(180 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200; // restored original radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const handleNodeClick = (id: number) => {
    setActiveNodeId(id);
    setAutoRotate(false);
    centerViewOnNode(id);
    onActiveChange?.(id);
    setClickedNodeId(id);
  };

  // Determine theme based on the background of the current slide
  // Step 1,4 → blue bg  |  Step 2,5 → light bg  |  Step 3,6 → dark navy bg
  const isLightBg = activeStepId === 2 || activeStepId === 5;
  const isDarkNavy = activeStepId === 3 || activeStepId === 6;
  const isBlueBg = activeStepId === 1 || activeStepId === 4;

  const orbitBorderColor = isLightBg
    ? 'rgba(14, 165, 233, 0.35)'
    : isDarkNavy
      ? 'rgba(56, 189, 248, 0.3)'
      : 'rgba(255, 255, 255, 0.4)';

  const centerSphereBg = isLightBg
    ? 'bg-gradient-to-br from-[#0ea5e9] via-sky-400 to-blue-500 shadow-xl shadow-sky-400/30'
    : isDarkNavy
      ? 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-xl shadow-sky-500/30'
      : 'bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-xl shadow-white/30';

  const centerSphereInnerBg = isLightBg
    ? 'bg-white border-sky-200'
    : isDarkNavy
      ? 'bg-[#111827] border-sky-400/30'
      : 'bg-white border-slate-200';

  const centerPingColor = isLightBg
    ? 'border-sky-400/40'
    : isDarkNavy
      ? 'border-sky-300/30'
      : 'border-white/40';

  const inactiveNodeClass = isLightBg
    ? 'bg-white text-[#0ea5e9] border-[#0ea5e9]/30 hover:bg-sky-50 hover:border-[#0ea5e9]/60'
    : isDarkNavy
      ? 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
      : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40';

  const activeNodeClass = isLightBg
    ? 'bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-xl shadow-sky-400/40 scale-125 font-bold'
    : isDarkNavy
      ? 'bg-sky-500 text-white border-sky-400 shadow-xl shadow-sky-500/50 scale-125 font-bold'
      : 'bg-white text-[#0ea5e9] border-white shadow-xl shadow-white/60 scale-125 font-bold';

  const relatedNodeClass = isLightBg
    ? 'bg-sky-50 text-[#0ea5e9] border-[#0ea5e9]/50'
    : isDarkNavy
      ? 'bg-sky-900/60 text-sky-400 border-sky-500/50'
      : 'bg-white/20 text-white border-white/50';

  const nodeEnergyGlow = isLightBg
    ? 'rgba(14, 165, 233, 0.25)'
    : isDarkNavy
      ? 'rgba(56, 189, 248, 0.35)'
      : 'rgba(255, 255, 255, 0.4)';

  const backdropGlowClass = isLightBg
    ? 'bg-sky-400/10'
    : isDarkNavy
      ? 'bg-sky-500/15'
      : 'bg-white/10';

  const getLabelColor = (isActive: boolean) => {
    if (isLightBg) {
      return isActive ? 'text-[#0ea5e9] font-bold scale-110' : 'text-slate-500';
    }
    if (isDarkNavy) {
      return isActive ? 'text-white font-bold scale-110' : 'text-white/50';
    }
    // blue bg
    return isActive ? 'text-white font-bold scale-110' : 'text-white/60';
  };

  return (
    <div
      className="w-full h-[580px] flex items-center justify-center overflow-visible relative bg-transparent"
      ref={containerRef}
    >
      {/* Outer Backdrop Glow for maximum atmospheric effect */}
      <div className={`absolute w-80 h-80 rounded-full ${backdropGlowClass} blur-3xl pointer-events-none z-0`} />

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center scale-90 sm:scale-100 z-10">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: '1000px',
          }}
        >
          {/* Center sphere — dynamic high-contrast theme gradient */}
          <div className={`absolute w-16 h-16 rounded-full ${centerSphereBg} animate-pulse flex items-center justify-center z-10`}>
            <div className={`absolute w-20 h-20 rounded-full border ${centerPingColor} animate-ping opacity-70`}></div>
            <div
              className={`absolute w-24 h-24 rounded-full border ${centerPingColor} animate-ping opacity-50`}
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className={`w-8 h-8 rounded-full ${centerSphereInnerBg} border shadow-inner`}></div>
          </div>

          {/* Orbit ring — thickened with border-2 */}
          <div
            className="absolute w-96 h-96 rounded-full border-2"
            style={{ borderColor: orbitBorderColor }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isActive = activeNodeId === item.id;
            const isRelated = isRelatedToActive(item.id);
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isActive ? 200 : position.zIndex,
              opacity: isActive ? 1 : position.opacity,
            };

            const transitionClass = autoRotate ? '' : 'transition-all duration-700 ease-out';

            return (
              <div
                key={item.id}
                className={`absolute cursor-pointer ${transitionClass}`}
                style={nodeStyle}
                onClick={() => handleNodeClick(item.id)}
              >
                {/* Energy glow circles */}
                <div
                  className="absolute rounded-full -inset-1.5 animate-pulse duration-1000"
                  style={{
                    background: `radial-gradient(circle, ${nodeEnergyGlow} 0%, rgba(14,165,233,0) 70%)`,
                    width: `${item.energy * 0.5 + 46}px`,
                    height: `${item.energy * 0.5 + 46}px`,
                    left: `-${(item.energy * 0.5 + 46 - 56) / 2}px`,
                    top: `-${(item.energy * 0.5 + 46 - 56) / 2}px`,
                  }}
                ></div>

                {/* Node circle — size increased to w-14 h-14 */}
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform shadow-md
                    ${isActive
                      ? activeNodeClass
                      : isRelated
                        ? relatedNodeClass + ' animate-pulse'
                        : inactiveNodeClass
                    }
                  `}
                >
                  <Icon size={22} />
                </div>

                {/* Node label */}
                <div
                  className={`
                    absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs tracking-wide
                    transition-all duration-300 pointer-events-none
                    ${getLabelColor(isActive)}
                  `}
                >
                  {item.title}
                </div>

                {/* Popover Card Info Box when active/clicked */}
                <AnimatePresence mode="wait">
                  {isActive && (() => {
                    const showAbove = position.y > 0;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: showAbove ? 8 : -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: showAbove ? 8 : -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 w-64 bg-[#0a1628]/95 backdrop-blur-lg border border-white/10 shadow-2xl p-4 rounded-xl z-50 text-left"
                        style={{
                          bottom: showAbove ? "80px" : "auto",
                          top: showAbove ? "auto" : "80px"
                        }}
                      >
                        {/* Arrow */}
                        <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a1628] rotate-45 ${
                          showAbove 
                            ? '-bottom-1.5 border-b border-r border-white/10' 
                            : '-top-1.5 border-t border-l border-white/10'
                        }`} />
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-white/40">
                            {item.date}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                            {item.status === 'completed' ? 'COMPLETE' : item.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-white/70 leading-relaxed mb-3">
                          {item.content}
                        </p>

                        {/* Progress Bar */}
                        <div className="pt-2 border-t border-white/5">
                          <div className="flex justify-between items-center text-[9px] mb-1">
                            <span className="text-white/40 uppercase font-bold tracking-wider">Progress</span>
                            <span className="font-mono text-white/50">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
