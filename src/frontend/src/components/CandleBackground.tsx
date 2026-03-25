// Reduced to 10 candles for performance
const candles = [
  {
    id: "c01",
    x: 10,
    width: 8,
    bodyHeight: 32,
    bodyY: 60,
    wickTop: 20,
    wickBottom: 10,
    bullish: true,
    opacity: 0.035,
    duration: 35,
    delay: 0,
  },
  {
    id: "c02",
    x: 22,
    width: 6,
    bodyHeight: 22,
    bodyY: 45,
    wickTop: 15,
    wickBottom: 8,
    bullish: false,
    opacity: 0.03,
    duration: 40,
    delay: 5,
  },
  {
    id: "c03",
    x: 35,
    width: 10,
    bodyHeight: 40,
    bodyY: 55,
    wickTop: 25,
    wickBottom: 12,
    bullish: true,
    opacity: 0.04,
    duration: 45,
    delay: 10,
  },
  {
    id: "c04",
    x: 48,
    width: 7,
    bodyHeight: 28,
    bodyY: 70,
    wickTop: 18,
    wickBottom: 10,
    bullish: false,
    opacity: 0.032,
    duration: 38,
    delay: 3,
  },
  {
    id: "c05",
    x: 60,
    width: 9,
    bodyHeight: 35,
    bodyY: 40,
    wickTop: 22,
    wickBottom: 14,
    bullish: true,
    opacity: 0.038,
    duration: 42,
    delay: 15,
  },
  {
    id: "c06",
    x: 72,
    width: 6,
    bodyHeight: 20,
    bodyY: 75,
    wickTop: 12,
    wickBottom: 8,
    bullish: false,
    opacity: 0.028,
    duration: 50,
    delay: 8,
  },
  {
    id: "c07",
    x: 82,
    width: 11,
    bodyHeight: 45,
    bodyY: 35,
    wickTop: 28,
    wickBottom: 16,
    bullish: true,
    opacity: 0.042,
    duration: 36,
    delay: 20,
  },
  {
    id: "c08",
    x: 20,
    width: 7,
    bodyHeight: 26,
    bodyY: 80,
    wickTop: 16,
    wickBottom: 10,
    bullish: false,
    opacity: 0.03,
    duration: 44,
    delay: 12,
  },
  {
    id: "c09",
    x: 55,
    width: 9,
    bodyHeight: 38,
    bodyY: 25,
    wickTop: 24,
    wickBottom: 13,
    bullish: true,
    opacity: 0.036,
    duration: 48,
    delay: 25,
  },
  {
    id: "c10",
    x: 90,
    width: 6,
    bodyHeight: 18,
    bodyY: 65,
    wickTop: 10,
    wickBottom: 7,
    bullish: false,
    opacity: 0.028,
    duration: 52,
    delay: 7,
  },
];

export default function CandleBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <style>{`
        @keyframes candle-float {
          0%   { transform: translateY(0px);   opacity: var(--candle-opacity); }
          50%  { opacity: calc(var(--candle-opacity) * 0.4); }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
      <svg
        role="img"
        aria-label="Decorative candlestick background"
        width="100%"
        height="100%"
        viewBox="0 0 100 200"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <title>Decorative candlestick background</title>
        {candles.map((c) => {
          const bullColor = "oklch(0.72 0.18 145)";
          const bearColor = "oklch(0.62 0.25 25)";
          const color = c.bullish ? bullColor : bearColor;
          const cx = c.x;
          const hw = c.width / 2;
          const bodyTop = c.bodyY;
          const bodyBottom = c.bodyY + c.bodyHeight;

          return (
            <g
              key={c.id}
              style={{
                // @ts-ignore
                "--candle-opacity": c.opacity,
                animation: `candle-float ${c.duration}s ease-in-out ${c.delay}s infinite`,
                transformOrigin: `${cx}px ${c.bodyY + c.bodyHeight / 2}px`,
              }}
            >
              <line
                x1={cx}
                y1={bodyTop - c.wickTop}
                x2={cx}
                y2={bodyBottom + c.wickBottom}
                stroke={color}
                strokeWidth="0.3"
                opacity={c.opacity}
              />
              <rect
                x={cx - hw}
                y={bodyTop}
                width={c.width}
                height={c.bodyHeight}
                fill={color}
                opacity={c.opacity}
                rx="0.5"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
