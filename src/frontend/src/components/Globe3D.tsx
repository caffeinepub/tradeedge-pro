import { useEffect, useRef } from "react";

const CITIES = [
  { name: "New York", lat: 40.7, lng: -74.0 },
  { name: "London", lat: 51.5, lng: -0.1 },
  { name: "Tokyo", lat: 35.7, lng: 139.7 },
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Sydney", lat: -33.9, lng: 151.2 },
  { name: "Frankfurt", lat: 50.1, lng: 8.7 },
  { name: "Hong Kong", lat: 22.3, lng: 114.2 },
];

const CONNECTIONS = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 6],
  [2, 4],
  [3, 4],
  [4, 5],
  [2, 7],
  [0, 6],
  [3, 7],
];

const LATLNG_KEYS = [-60, -30, 0, 30, 60];
const VERT_KEYS = [-120, -60, 0, 60, 120];

const RADIUS = 140;
const CX = 160;
const CY = 160;

function latLngToXY(lat: number, lng: number, rotationY: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + rotationY) * Math.PI) / 180;
  const x = RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = RADIUS * Math.cos(phi);
  const z = RADIUS * Math.sin(phi) * Math.sin(theta);
  return { x: CX + x, y: CY - y, z };
}

export default function Globe3D() {
  const rotRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const connTimers = useRef<number[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let connIdx = 0;
    function pulseConnections() {
      const lines = svg?.querySelectorAll(".conn-line");
      if (!lines) return;
      for (const l of Array.from(lines)) {
        (l as SVGElement).style.opacity = "0";
        (l as SVGElement).style.strokeDashoffset = "300";
      }
      const line = lines[connIdx % lines.length] as SVGElement;
      if (line) {
        line.style.transition = "opacity 0.5s, stroke-dashoffset 1s";
        line.style.opacity = "0.7";
        line.style.strokeDashoffset = "0";
        const tid = window.setTimeout(() => {
          line.style.opacity = "0";
        }, 1200);
        connTimers.current.push(tid);
      }
      connIdx++;
    }

    const connInterval = window.setInterval(pulseConnections, 800);

    function frame() {
      rotRef.current = (rotRef.current + 0.15) % 360;
      const rot = rotRef.current;

      for (let i = 0; i < CITIES.length; i++) {
        const city = CITIES[i];
        const pt = latLngToXY(city.lat, city.lng, rot);
        const dot = svg?.querySelector(`#city-${i}`) as SVGCircleElement | null;
        if (dot) {
          dot.setAttribute("cx", pt.x.toString());
          dot.setAttribute("cy", pt.y.toString());
          dot.style.opacity = pt.z > 0 ? "1" : "0";
          dot.setAttribute("r", pt.z > 50 ? "4" : pt.z > 0 ? "3" : "2");
        }
        const label = svg?.querySelector(
          `#city-label-${i}`,
        ) as SVGTextElement | null;
        if (label) {
          label.setAttribute("x", (pt.x + 6).toString());
          label.setAttribute("y", (pt.y - 4).toString());
          label.style.opacity = pt.z > 60 ? "0.8" : "0";
        }
      }

      for (let i = 0; i < CONNECTIONS.length; i++) {
        const [a, b] = CONNECTIONS[i];
        const pa = latLngToXY(CITIES[a].lat, CITIES[a].lng, rot);
        const pb = latLngToXY(CITIES[b].lat, CITIES[b].lng, rot);
        const line = svg?.querySelector(`#conn-${i}`) as SVGLineElement | null;
        if (line) {
          line.setAttribute("x1", pa.x.toString());
          line.setAttribute("y1", pa.y.toString());
          line.setAttribute("x2", pb.x.toString());
          line.setAttribute("y2", pb.y.toString());
          if (!(pa.z > 0 && pb.z > 0)) line.style.opacity = "0";
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(connInterval);
      for (const t of connTimers.current) clearTimeout(t);
    };
  }, []);

  const latLines = LATLNG_KEYS.map((lat) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const rx = RADIUS * Math.sin(phi);
    const cy2 = CY - RADIUS * Math.cos(phi);
    return { key: `lat-${lat}`, rx, cy2 };
  });

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute rounded-full"
        style={{
          width: 340,
          height: 340,
          background:
            "radial-gradient(circle, oklch(0.82 0.22 142 / 0.04) 0%, oklch(0.55 0.18 245 / 0.08) 50%, transparent 70%)",
          boxShadow:
            "0 0 60px oklch(0.82 0.22 142 / 0.15), 0 0 120px oklch(0.82 0.22 142 / 0.06)",
        }}
      />
      <svg
        ref={svgRef}
        width={320}
        height={320}
        viewBox="0 0 320 320"
        className="relative z-10"
        role="img"
        aria-label="Animated globe showing global financial markets"
      >
        <title>Global Financial Markets Globe</title>
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="oklch(0.82 0.22 142 / 0.15)"
          strokeWidth="1"
        />
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          style={{ fill: "url(#globeGrad)" }}
        />
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.15 0.04 245)" />
            <stop offset="100%" stopColor="oklch(0.06 0.01 255)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {latLines.map(({ key, rx, cy2 }) => (
          <ellipse
            key={key}
            cx={CX}
            cy={cy2}
            rx={rx}
            ry={rx * 0.15}
            fill="none"
            stroke="oklch(0.82 0.22 142 / 0.08)"
            strokeWidth="0.5"
          />
        ))}

        {VERT_KEYS.map((lng) => {
          const pts = Array.from({ length: 37 }, (_, k) => {
            const lat = -90 + k * 5;
            const phi = ((90 - lat) * Math.PI) / 180;
            const theta = (lng * Math.PI) / 180;
            const x = CX + RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = CY - RADIUS * Math.cos(phi);
            return `${x},${y}`;
          }).join(" ");
          return (
            <polyline
              key={`lng-${lng}`}
              points={pts}
              fill="none"
              stroke="oklch(0.82 0.22 142 / 0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={`conn-${a}-${b}`}
            id={`conn-${i}`}
            className="conn-line"
            stroke="oklch(0.82 0.22 142)"
            strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset="300"
            opacity="0"
            filter="url(#glow)"
          />
        ))}

        {CITIES.map((city, i) => (
          <g key={city.name}>
            <circle
              id={`city-${i}`}
              r="3"
              fill="oklch(0.82 0.22 142)"
              filter="url(#glow)"
            />
            <text
              id={`city-label-${i}`}
              fontSize="7"
              fill="oklch(0.82 0.22 142)"
              opacity="0"
              fontFamily="Geist Mono, monospace"
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
