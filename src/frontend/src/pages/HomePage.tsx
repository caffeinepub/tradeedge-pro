import CryptoHeatmap from "@/components/CryptoHeatmap";
import Globe3D from "@/components/Globe3D";
import MarketTicker from "@/components/MarketTicker";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Brain,
  ChevronLeft,
  ChevronRight,
  LineChart,
  Lock,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({
  target,
  suffix,
  prefix,
}: { target: number; suffix: string; prefix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const dur = 1800;
          function tick() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / dur, 1);
            const eased = 1 - (1 - progress) ** 3;
            setVal(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setVal(target);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = val >= 1000 ? val.toLocaleString() : val.toString();
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Alex Thompson",
    role: "Professional Forex Trader",
    text: "TRADEFOREX UNIVERSE CHAIN signals have completely transformed my trading. The AI accuracy is unmatched — 87%+ win rate consistently month after month.",
    stars: 5,
    gain: "+42%",
  },
  {
    name: "Priya Sharma",
    role: "Crypto Fund Manager",
    text: "The real-time signals and risk management tools are exactly what institutional-level trading demands. I've scaled my portfolio 3x in 8 months.",
    stars: 5,
    gain: "+198%",
  },
  {
    name: "Marcus Chen",
    role: "Quantitative Analyst",
    text: "The technical depth of the analysis rivals Bloomberg Terminal tools at a fraction of the cost. The AI signal engine is genuinely impressive.",
    stars: 5,
    gain: "+67%",
  },
  {
    name: "Sofia Rossi",
    role: "Independent Swing Trader",
    text: "Finally a platform that treats retail traders like professionals. The education combined with live signals accelerated my learning curve enormously.",
    stars: 5,
    gain: "+89%",
  },
];

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Trading Analysis",
    desc: "Deep learning models analyze 200+ indicators simultaneously to generate high-probability trade setups.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Automated Signals",
    desc: "Real-time buy/sell signals with precise entry, take profit, and stop loss levels delivered instantly.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Management",
    desc: "Smart position sizing, risk/reward calculators, and portfolio protection built into every signal.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Smart Portfolio",
    desc: "Track open positions, closed trades, and portfolio analytics in real-time across all markets.",
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Real-Time Charts",
    desc: "Advanced charting with MA, RSI, MACD, and Fibonacci overlays. Professional trading terminal interface.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Market Intelligence",
    desc: "Live market news, macroeconomic analysis, and sentiment data to stay ahead of major moves.",
  },
];

const stats = [
  {
    label: "Trading Volume",
    value: 2400,
    suffix: "M+",
    prefix: "$",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Active Traders",
    value: 15847,
    suffix: "",
    prefix: "",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Win Rate",
    value: 87,
    suffix: "%",
    prefix: "",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: "Signals Delivered",
    value: 500,
    suffix: "+",
    prefix: "",
    icon: <Zap className="w-4 h-4" />,
  },
];

// ─── Hero candlestick SVG lines ───────────────────────────────────────────────
const candlePaths = [
  "M 50 180 L 50 60 M 50 120 L 200 100 L 200 40 M 200 70 L 350 90 L 350 30 M 350 60 L 500 50 L 500 130",
  "M 100 200 L 100 100 M 100 150 L 250 130 L 250 60 M 250 95 L 400 80 L 400 160 M 400 120 L 550 100",
];

export default function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [floatingVisible, setFloatingVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFloatingVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col pt-16">
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

        {/* Radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, oklch(0.82 0.22 142 / 0.06) 0%, transparent 70%)",
          }}
        />

        {/* Animated SVG chart lines in background */}
        <svg
          role="img"
          aria-label="Animated chart lines"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 600 300"
        >
          {candlePaths.map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="oklch(0.82 0.22 142)"
              strokeWidth="1.5"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{
                animation: `chart-draw 3s ease forwards ${i * 0.8}s`,
              }}
            />
          ))}
        </svg>

        <MarketTicker />

        <div className="relative z-10 container mx-auto px-4 flex-1 flex items-center py-20">
          <div className="max-w-4xl mx-auto w-full">
            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-center mb-6"
            >
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-2">
                <span className="shimmer-text neon-glow-text">
                  Trade Smarter.
                </span>
              </h1>
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black leading-none">
                <span className="text-foreground/80">Profit </span>
                <span className="neon-gradient-text neon-glow-text">
                  Consistently.
                </span>
              </h1>
            </motion.div>

            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center text-muted-foreground text-lg max-w-xl mx-auto mb-10 font-mono"
            >
              AI-powered forex & crypto signals with 87%+ win rate.
              Institutional-grade analysis for every trader.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button
                asChild
                size="lg"
                data-ocid="hero.primary_button"
                className="relative font-mono font-bold uppercase tracking-widest text-sm px-8 overflow-hidden group"
                style={{
                  background: "oklch(0.82 0.22 142)",
                  color: "oklch(0.06 0.01 142)",
                  boxShadow:
                    "0 0 25px oklch(0.82 0.22 142 / 0.4), 0 0 60px oklch(0.82 0.22 142 / 0.15)",
                  animation: "neon-pulse 2s ease-in-out infinite",
                }}
              >
                <Link to="/">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Trading
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-ocid="hero.secondary_button"
                className="font-mono font-bold uppercase tracking-widest text-sm px-8"
                style={{
                  borderColor: "oklch(0.82 0.22 142 / 0.5)",
                  color: "oklch(0.82 0.22 142)",
                  background: "oklch(0.82 0.22 142 / 0.05)",
                  boxShadow: "0 0 15px oklch(0.82 0.22 142 / 0.1)",
                }}
              >
                <Link to="/">
                  <Zap className="w-4 h-4 mr-2" />
                  View Signals
                </Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: "oklch(0.09 0.015 255 / 0.8)",
                    border: "1px solid oklch(0.82 0.22 142 / 0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="font-display text-2xl font-black mb-1"
                    style={{
                      color: "oklch(0.82 0.22 142)",
                      textShadow: "0 0 15px oklch(0.82 0.22 142 / 0.4)",
                    }}
                  >
                    <Counter
                      target={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center justify-center gap-1">
                    {s.icon} {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating UI cards */}
          {floatingVisible && (
            <>
              <motion.div
                className="absolute hidden xl:block"
                style={{ left: 20, top: "35%" }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="px-4 py-3 rounded-xl flex items-center gap-3 font-mono text-sm"
                  style={{
                    background: "oklch(0.09 0.015 255 / 0.9)",
                    border: "1px solid oklch(0.82 0.22 142 / 0.3)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 0 20px oklch(0.82 0.22 142 / 0.15)",
                  }}
                >
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: "oklch(0.82 0.22 142)" }}
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      BUY EUR/USD
                    </div>
                    <div
                      style={{ color: "oklch(0.82 0.22 142)" }}
                      className="font-bold"
                    >
                      +2.4%
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute hidden xl:block"
                style={{ right: 20, top: "40%" }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              >
                <div
                  className="px-4 py-3 rounded-xl font-mono text-sm"
                  style={{
                    background: "oklch(0.09 0.015 255 / 0.9)",
                    border: "1px solid oklch(0.82 0.22 142 / 0.4)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 0 20px oklch(0.82 0.22 142 / 0.2)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "oklch(0.82 0.22 142)",
                        boxShadow: "0 0 6px oklch(0.82 0.22 142)",
                      }}
                    />
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.82 0.22 142)" }}
                    >
                      LIVE SIGNAL
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">BTC/USDT</div>
                  <div
                    className="font-bold"
                    style={{ color: "oklch(0.82 0.22 142)" }}
                  >
                    $67,420
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute hidden xl:block"
                style={{ right: 60, bottom: "20%" }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <div
                  className="px-3 py-2 rounded-xl font-mono text-xs flex items-center gap-2"
                  style={{
                    background: "oklch(0.62 0.2 25 / 0.15)",
                    border: "1px solid oklch(0.62 0.2 25 / 0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <TrendingDown className="w-4 h-4 text-signal-red" />
                  <span className="text-signal-red font-bold">
                    GBP/USD -0.41%
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ─── GLOBE SECTION ──────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.55 0.18 245 / 0.04) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{
                  background: "oklch(0.82 0.22 142 / 0.08)",
                  border: "1px solid oklch(0.82 0.22 142 / 0.25)",
                  color: "oklch(0.82 0.22 142)",
                }}
              >
                Global Coverage
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
                Global Markets,{" "}
                <span className="neon-gradient-text">Real-Time</span>{" "}
                Intelligence
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-mono">
                Our AI monitors forex and crypto markets across 8 major
                financial hubs simultaneously — London, New York, Tokyo, Dubai,
                Singapore, Sydney, Frankfurt, and Hong Kong.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Markets Covered",
                    value: "50+",
                    icon: <BarChart3 className="w-4 h-4" />,
                  },
                  {
                    label: "Data Points/sec",
                    value: "10K+",
                    icon: <Activity className="w-4 h-4" />,
                  },
                  {
                    label: "Uptime",
                    value: "99.9%",
                    icon: <Zap className="w-4 h-4" />,
                  },
                  {
                    label: "Latency",
                    value: "<10ms",
                    icon: <Lock className="w-4 h-4" />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl"
                    style={{
                      background: "oklch(0.09 0.015 255 / 0.8)",
                      border: "1px solid oklch(0.82 0.22 142 / 0.1)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 mb-1"
                      style={{ color: "oklch(0.82 0.22 142)" }}
                    >
                      {item.icon}
                      <span className="font-mono font-bold text-lg">
                        {item.value}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <Globe3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HEATMAP ────────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div
              className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "oklch(0.82 0.22 142 / 0.08)",
                border: "1px solid oklch(0.82 0.22 142 / 0.25)",
                color: "oklch(0.82 0.22 142)",
              }}
            >
              Live Data
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
              Market <span className="neon-gradient-text">Heatmap</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-mono">
              Real-time crypto performance visualization. Updates every 3
              seconds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-4 rounded-2xl"
            style={{
              background: "oklch(0.08 0.015 255 / 0.9)",
              border: "1px solid oklch(0.82 0.22 142 / 0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Crypto Market Performance (24h)
              </span>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: "oklch(0.82 0.22 142 / 0.85)" }}
                  />
                  Gain
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: "oklch(0.62 0.2 25 / 0.85)" }}
                  />
                  Loss
                </span>
              </div>
            </div>
            <CryptoHeatmap />
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.82 0.22 142 / 0.03) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "oklch(0.82 0.22 142 / 0.08)",
                border: "1px solid oklch(0.82 0.22 142 / 0.25)",
                color: "oklch(0.82 0.22 142)",
              }}
            >
              Platform Features
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
              Everything You Need to{" "}
              <span className="neon-gradient-text">Win</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-mono">
              Professional-grade tools previously only available to
              institutional traders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: "oklch(0.09 0.015 255 / 0.85)",
                  border: "1px solid oklch(0.82 0.22 142 / 0.08)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "oklch(0.82 0.22 142 / 0.35)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 30px oklch(0.82 0.22 142 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "oklch(0.82 0.22 142 / 0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
                data-ocid={`features.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "oklch(0.82 0.22 142 / 0.1)",
                    border: "1px solid oklch(0.82 0.22 142 / 0.2)",
                    color: "oklch(0.82 0.22 142)",
                    boxShadow: "0 0 15px oklch(0.82 0.22 142 / 0.1)",
                  }}
                >
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-3 text-foreground">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "oklch(0.82 0.22 142 / 0.08)",
                border: "1px solid oklch(0.82 0.22 142 / 0.25)",
                color: "oklch(0.82 0.22 142)",
              }}
            >
              Testimonials
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black">
              Trusted by <span className="neon-gradient-text">15,000+</span>{" "}
              Traders
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl"
                style={{
                  background: "oklch(0.09 0.015 255 / 0.9)",
                  border: "1px solid oklch(0.82 0.22 142 / 0.15)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 0 40px oklch(0.82 0.22 142 / 0.05)",
                }}
                data-ocid="testimonials.card"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5]
                      .slice(0, testimonials[testimonialIdx].stars)
                      .map((n) => (
                        <Star
                          key={n}
                          className="w-4 h-4 fill-current"
                          style={{ color: "oklch(0.82 0.22 142)" }}
                        />
                      ))}
                  </div>
                  <div
                    className="px-3 py-1 rounded-full font-mono font-bold text-sm"
                    style={{
                      background: "oklch(0.82 0.22 142 / 0.1)",
                      color: "oklch(0.82 0.22 142)",
                      border: "1px solid oklch(0.82 0.22 142 / 0.25)",
                    }}
                  >
                    {testimonials[testimonialIdx].gain}
                  </div>
                </div>
                <p className="text-lg text-foreground/90 leading-relaxed mb-8 font-mono">
                  "{testimonials[testimonialIdx].text}"
                </p>
                <div>
                  <div
                    className="font-display font-bold"
                    style={{ color: "oklch(0.82 0.22 142)" }}
                  >
                    {testimonials[testimonialIdx].name}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {testimonials[testimonialIdx].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() =>
                  setTestimonialIdx(
                    (i) => (i - 1 + testimonials.length) % testimonials.length,
                  )
                }
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "oklch(0.09 0.015 255 / 0.8)",
                  border: "1px solid oklch(0.82 0.22 142 / 0.2)",
                  color: "oklch(0.82 0.22 142)",
                }}
                data-ocid="testimonials.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    type="button"
                    key={t.name}
                    onClick={() => setTestimonialIdx(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i === testimonialIdx
                          ? "oklch(0.82 0.22 142)"
                          : "oklch(0.3 0.02 255)",
                      boxShadow:
                        i === testimonialIdx
                          ? "0 0 8px oklch(0.82 0.22 142 / 0.6)"
                          : "none",
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setTestimonialIdx((i) => (i + 1) % testimonials.length)
                }
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "oklch(0.09 0.015 255 / 0.8)",
                  border: "1px solid oklch(0.82 0.22 142 / 0.2)",
                  color: "oklch(0.82 0.22 142)",
                }}
                data-ocid="testimonials.pagination_next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.82 0.22 142 / 0.08) 0%, oklch(0.06 0.01 255) 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.82 0.22 142 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.22 142 / 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-display text-5xl md:text-7xl font-black mb-6 neon-glow-text"
              style={{ color: "oklch(0.82 0.22 142)" }}
            >
              Join 15,000+ Professional Traders
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto font-mono">
              Start receiving AI-powered signals today. Risk-free access to our
              Basic plan. Upgrade anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                data-ocid="cta.primary_button"
                className="font-mono font-bold uppercase tracking-widest text-base px-12 py-6 h-auto"
                style={{
                  background: "oklch(0.82 0.22 142)",
                  color: "oklch(0.06 0.01 142)",
                  boxShadow:
                    "0 0 40px oklch(0.82 0.22 142 / 0.5), 0 0 80px oklch(0.82 0.22 142 / 0.2)",
                }}
              >
                <Link to="/shop">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-ocid="cta.secondary_button"
                className="font-mono font-bold uppercase tracking-widest text-base px-12 py-6 h-auto"
                style={{
                  borderColor: "oklch(0.82 0.22 142 / 0.4)",
                  color: "oklch(0.82 0.22 142)",
                  background: "transparent",
                }}
              >
                <Link to="/">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Live Signals
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
