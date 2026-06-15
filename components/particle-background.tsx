"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

type ParticleBackgroundProps = {
  className?: string;
};

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    size: 1.2 + Math.random() * 2.4,
    alpha: 0.32 + Math.random() * 0.46,
  };
}

export function ParticleBackground({ className = "" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasElement: HTMLCanvasElement = canvasRef.current;
    const context = canvasElement.getContext("2d");
    if (!context) return;
    const drawingContext: CanvasRenderingContext2D = context;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function particleCount() {
      if (reduceMotion) return 0;
      if (window.innerWidth < 640) return 18;
      if (window.innerWidth < 1024) return 36;
      return 96;
    }

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvasElement.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvasElement.width = Math.floor(width * ratio);
      canvasElement.height = Math.floor(height * ratio);
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: particleCount() }, () => createParticle(width, height));
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = canvasElement.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      if (reduceMotion) return;
      drawingContext.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 96) {
          const force = (96 - distance) / 96;
          particle.x += (dx / Math.max(distance, 1)) * force * 1.4;
          particle.y += (dy / Math.max(distance, 1)) * force * 1.4;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        drawingContext.beginPath();
        drawingContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        drawingContext.fillStyle = `rgba(37, 99, 235, ${particle.alpha})`;
        drawingContext.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 118) continue;

          drawingContext.beginPath();
          drawingContext.moveTo(a.x, a.y);
          drawingContext.lineTo(b.x, b.y);
          drawingContext.strokeStyle = `rgba(20, 184, 166, ${0.16 * (1 - distance / 118)})`;
          drawingContext.lineWidth = 0.7;
          drawingContext.stroke();
        }
      }

      frameId = window.requestAnimationFrame(draw);
    }

    resize();
    if (!reduceMotion) draw();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      if (!reduceMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
