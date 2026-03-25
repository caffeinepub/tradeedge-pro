const particles = Array.from({ length: 28 }, (_, i) => ({
  id: `gp-${i}`,
  x: (i * 37 + 11) % 100,
  size: 1.5 + ((i * 13) % 4),
  duration: 14 + ((i * 7) % 18),
  delay: (i * 1.3) % 12,
  drift: -30 + ((i * 23) % 60),
  opacity: 0.04 + ((i * 3) % 8) / 100,
}));

const sparkles = Array.from({ length: 10 }, (_, i) => ({
  id: `gs-${i}`,
  x: (i * 41 + 5) % 95,
  y: (i * 29 + 15) % 90,
  duration: 3 + ((i * 2) % 4),
  delay: (i * 1.7) % 8,
  opacity: 0.5 + ((i * 3) % 4) / 10,
}));

const goldBgStyle = `
  @keyframes gp-float {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    15% { opacity: var(--gp-op); }
    85% { opacity: var(--gp-op); }
    100% { transform: translateY(-90vh) translateX(var(--gp-drift)); opacity: 0; }
  }
  @keyframes gs-sparkle {
    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1) rotate(180deg); opacity: var(--gs-op); }
  }
  @keyframes gold-beam-sweep {
    0% { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
    20% { opacity: 0.055; }
    80% { opacity: 0.055; }
    100% { transform: translateX(220%) skewX(-15deg); opacity: 0; }
  }
  @keyframes gold-shimmer-pulse {
    0%, 100% { opacity: 0.04; }
    50% { opacity: 0.11; }
  }
  @keyframes gold-radial-glow {
    0%, 100% { transform: scale(1); opacity: 0.06; }
    50% { transform: scale(1.15); opacity: 0.12; }
  }
`;

export default function GoldBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <style>{goldBgStyle}</style>

      {/* Radial gold glow */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "60vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, oklch(0.78 0.18 85 / 0.18) 0%, transparent 70%)",
          animation: "gold-radial-glow 6s ease-in-out infinite",
        }}
      />

      {/* Shimmer overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, oklch(0.85 0.15 90 / 0.04) 0%, transparent 40%, oklch(0.72 0.22 75 / 0.04) 100%)",
          animation: "gold-shimmer-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Light beams */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30vw",
          height: "100vh",
          background:
            "linear-gradient(to right, transparent, oklch(0.78 0.18 85 / 0.07), transparent)",
          animation: "gold-beam-sweep 12s ease-in-out 2s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "20vw",
          height: "100vh",
          background:
            "linear-gradient(to right, transparent, oklch(0.85 0.15 90 / 0.05), transparent)",
          animation: "gold-beam-sweep 18s ease-in-out 8s infinite",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-5%",
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "oklch(0.78 0.18 85)",
            // @ts-ignore
            "--gp-op": p.opacity,
            "--gp-drift": `${p.drift}px`,
            animation: `gp-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: "6px",
            height: "6px",
            // @ts-ignore
            "--gs-op": s.opacity,
            animation: `gs-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            role="img"
            aria-label="sparkle"
          >
            <title>sparkle</title>
            <path
              d="M3 0L3.7 2.3L6 3L3.7 3.7L3 6L2.3 3.7L0 3L2.3 2.3Z"
              fill="oklch(0.85 0.15 90)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
