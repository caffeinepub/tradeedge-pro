import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacityDelta: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 30; // Reduced from 80 for performance

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? window.innerWidth),
        y: (canvas?.height ?? window.innerHeight) + Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: 0,
        opacityDelta: Math.random() * 0.003 + 0.001,
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * (canvas.height ?? window.innerHeight);
      p.opacity = Math.random() * 0.4;
      particles.push(p);
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      const spacing = 80;
      ctx.strokeStyle = "oklch(0.62 0.25 25 / 0.03)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
    }

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacityDelta;

        if (p.opacity > 0.45) p.opacityDelta = -Math.abs(p.opacityDelta);
        if (p.opacity < 0) p.opacityDelta = Math.abs(p.opacityDelta);

        if (p.y < -10) {
          particles[i] = createParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.62 0.25 25 / ${p.opacity.toFixed(2)})`;
        ctx.fill();

        // Connect only nearby particles (reduced distance for performance)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `oklch(0.62 0.25 25 / ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    }

    loop();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6, willChange: "transform" }}
    />
  );
}
