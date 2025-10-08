"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      history: { x: number; y: number }[];
      maxHistory: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller, less varying size
        this.color = "rgba(173, 216, 230, 0.9)"; // Lighter blue/cyan color for dots
        this.speedX = Math.random() * 0.1 - 0.05; // Reduced speed
        this.speedY = Math.random() * 0.1 - 0.05; // Reduced speed
        this.history = [{ x: this.x, y: this.y }];
        this.maxHistory = 10; // Shorter trail history
      }

      update(
        canvas: HTMLCanvasElement,
        mousePosition: { x: number; y: number }
      ) {
        const dx = this.x - mousePosition.x;
        const dy = this.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 100; // Reduced repel radius
        const repelStrength = 0.8; // Reduced repel strength

        if (distance < repelRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force =
            ((repelRadius - distance) / repelRadius) * repelStrength;
          this.x += forceDirectionX * force;
          this.y += forceDirectionY * force;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Keep particles within bounds with a slight bounce
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.history.unshift({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
          this.history.pop();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw the main particle dot with its updated color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw the trail - less prominent
        for (let i = 0; i < this.history.length - 1; i++) {
          const p1 = this.history[i];
          const p2 = this.history[i + 1];
          const opacity = 1 - (i / this.history.length) * 0.6; // Less opaque trail
          ctx.strokeStyle = `rgba(173, 216, 230, ${opacity})`; // Match dot color
          ctx.lineWidth = 0.3; // Thinner lines for trails
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      const numParticles = 150; // Slightly increased number of particles for denser network
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas

      particlesRef.current.forEach((particle) => {
        particle.update(canvas, mousePosition);
        particle.draw(ctx);
      });

      const connectionRadius = 180; // Slightly reduced connection radius for more focused connections
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          const p1 = particlesRef.current[a];
          const p2 = particlesRef.current[b];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            const opacity = 1 - distance / connectionRadius;
            // Brighter, more blueish glow for lines, adjusted opacity
            ctx.strokeStyle = `rgba(80, 180, 255, ${opacity * 0.7})`; // Brighter blue lines
            ctx.lineWidth = 0.8; // Slightly thinner lines
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute top-0 left-0 h-full w-full z-0"
    />
  );
};

export default ParticleBackground;
