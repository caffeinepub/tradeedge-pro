import { useEffect, useRef } from "react";

interface Crystal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  color: "blue" | "red";
  opacity: number;
  sides: number;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function CrystalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let crystals: Crystal[] = [];

    const CRYSTAL_COUNT = 28;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnCrystal(): Crystal {
      const color = Math.random() > 0.5 ? "blue" : "red";
      return {
        x: randomBetween(0, window.innerWidth),
        y: randomBetween(-100, window.innerHeight + 100),
        vx: randomBetween(-0.18, 0.18),
        vy: randomBetween(-0.25, -0.08),
        size: randomBetween(4, 11),
        rotation: randomBetween(0, Math.PI * 2),
        rotSpeed: randomBetween(-0.005, 0.005),
        color,
        opacity: randomBetween(0.08, 0.22),
        sides: Math.random() > 0.5 ? 4 : 6,
      };
    }

    function drawCrystal(ctx: CanvasRenderingContext2D, c: Crystal) {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);

      const blueColor = `rgba(60, 140, 255, ${c.opacity})`;
      const redColor = `rgba(220, 40, 60, ${c.opacity})`;
      const blueGlow = `rgba(60, 140, 255, ${c.opacity * 0.4})`;
      const redGlow = `rgba(220, 40, 60, ${c.opacity * 0.4})`;

      const fill = c.color === "blue" ? blueColor : redColor;
      const glow = c.color === "blue" ? blueGlow : redGlow;
      const glowColor =
        c.color === "blue" ? "rgba(60,140,255,0.5)" : "rgba(220,40,60,0.5)";

      // glow shadow
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = c.size * 2.5;

      ctx.beginPath();
      if (c.sides === 4) {
        // diamond shape
        ctx.moveTo(0, -c.size * 1.6);
        ctx.lineTo(c.size * 0.9, 0);
        ctx.lineTo(0, c.size * 1.6);
        ctx.lineTo(-c.size * 0.9, 0);
        ctx.closePath();
      } else {
        // hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = Math.cos(angle) * c.size;
          const py = Math.sin(angle) * c.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }

      ctx.fillStyle = fill;
      ctx.fill();

      // inner highlight line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = glow;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // center glint
      ctx.beginPath();
      ctx.arc(0, 0, c.size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle =
        c.color === "blue" ? "rgba(180,220,255,0.3)" : "rgba(255,180,180,0.3)";
      ctx.fill();

      ctx.restore();
    }

    function init() {
      crystals = Array.from({ length: CRYSTAL_COUNT }, spawnCrystal);
    }

    function loop() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const c of crystals) {
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotSpeed;

        // respawn when out of view
        if (c.y < -80 || c.x < -80 || c.x > window.innerWidth + 80) {
          const nc = spawnCrystal();
          nc.y = window.innerHeight + 40;
          nc.x = randomBetween(0, window.innerWidth);
          Object.assign(c, nc);
        }

        drawCrystal(ctx, c);
      }

      animId = requestAnimationFrame(loop);
    }

    resize();
    init();
    loop();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
