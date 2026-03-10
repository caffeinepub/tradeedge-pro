const skeletonKeys = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];
const eduStats = [
  { label: "Free Courses", value: "20+" },
  { label: "Members Enrolled", value: "500+" },
  { label: "Win Rate", value: "85%" },
];

import { Category, type EducationResource } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllEducationResources } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Clock,
  Crown,
  GraduationCap,
  Layers,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Level = "all" | "beginner" | "intermediate" | "advanced" | "analysis";

const sampleResources: EducationResource[] = [
  {
    id: BigInt(1),
    title: "Forex Fundamentals",
    description:
      "Master the building blocks of forex trading — currency pairs, pips, lots, leverage, and how global macro events move markets.",
    category: Category.forex,
    difficultyLevel: "beginner",
    duration: BigInt(240),
  },
  {
    id: BigInt(2),
    title: "Crypto Trading Basics",
    description:
      "Understand blockchain, market structure, wallets, and how to safely trade Bitcoin, Ethereum, and altcoins with confidence.",
    category: Category.crypto,
    difficultyLevel: "beginner",
    duration: BigInt(180),
  },
  {
    id: BigInt(3),
    title: "Technical Analysis Mastery",
    description:
      "Deep-dive into chart patterns, Fibonacci levels, Bollinger Bands, RSI, MACD, and institutional order flow concepts.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(420),
  },
  {
    id: BigInt(4),
    title: "Risk Management",
    description:
      "The most overlooked skill in trading. Learn position sizing, R:R frameworks, drawdown management, and protecting your capital.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(200),
  },
  {
    id: BigInt(5),
    title: "Price Action Trading",
    description:
      "Trade using pure price movement — support/resistance, market structure, and high-probability candlestick formations without lagging indicators.",
    category: Category.forex,
    difficultyLevel: "advanced",
    duration: BigInt(360),
  },
  {
    id: BigInt(6),
    title: "Candlestick Patterns",
    description:
      "Comprehensive guide to 40+ candlestick patterns, their reliability scores, and how to combine them with S/R for high-confluence entries.",
    category: Category.forex,
    difficultyLevel: "analysis",
    duration: BigInt(150),
  },
  {
    id: BigInt(7),
    title: "DeFi & Advanced Crypto",
    description:
      "Liquidity pools, yield farming, on-chain analytics, whale wallet tracking, and identifying altcoin opportunities before the crowd.",
    category: Category.crypto,
    difficultyLevel: "advanced",
    duration: BigInt(300),
  },
  {
    id: BigInt(8),
    title: "Multi-Timeframe Analysis",
    description:
      "Learn to read the market from HTF context down to LTF execution entries — the exact methodology used in our live signals.",
    category: Category.forex,
    difficultyLevel: "analysis",
    duration: BigInt(280),
  },
  {
    id: BigInt(9),
    title: "Support & Resistance Zones",
    description:
      "Learn to identify key price levels where markets repeatedly reverse. Master horizontal S/R, dynamic levels, and how institutions use these zones to place orders.",
    category: Category.forex,
    difficultyLevel: "beginner",
    duration: BigInt(190),
  },
  {
    id: BigInt(10),
    title: "Trend Lines & Channels",
    description:
      "Draw trend lines correctly, identify ascending/descending channels, and use breakouts and retests for high-probability trade entries.",
    category: Category.forex,
    difficultyLevel: "beginner",
    duration: BigInt(160),
  },
  {
    id: BigInt(11),
    title: "Moving Averages & EMA",
    description:
      "Master SMA, EMA, and WMA. Learn golden cross, death cross, dynamic support/resistance using 20/50/200 EMA and trend-following strategies.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(210),
  },
  {
    id: BigInt(12),
    title: "Bollinger Bands Strategy",
    description:
      "Use Bollinger Bands for volatility measurement, squeeze setups, mean reversion trades, and combining with RSI for confluence entries.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(175),
  },
  {
    id: BigInt(13),
    title: "RSI & MACD Mastery",
    description:
      "Deep dive into RSI divergences, overbought/oversold signals, MACD histogram analysis, signal line crossovers, and combining both for powerful entries.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(230),
  },
  {
    id: BigInt(14),
    title: "Volume Analysis & VSA",
    description:
      "Understand volume spread analysis, accumulation/distribution phases, volume climax signals, and how smart money uses volume to manipulate and move price.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(195),
  },
  {
    id: BigInt(15),
    title: "Candlestick Patterns Complete Guide",
    description:
      "Complete encyclopedia of 25+ candlestick patterns: Doji (4 types), Hammer, Hanging Man, Shooting Star, Inverted Hammer, Bullish/Bearish Engulfing, Morning Star, Evening Star, Harami, Pin Bar, Marubozu, Spinning Top, Three White Soldiers, Three Black Crows, Dragonfly Doji, Gravestone Doji, Dark Cloud Cover, Piercing Pattern — with reliability scores and entry rules.",
    category: Category.forex,
    difficultyLevel: "analysis",
    duration: BigInt(320),
  },
  {
    id: BigInt(16),
    title: "Chart Patterns Mastery",
    description:
      "Complete guide to Head & Shoulders, Inverse H&S, Double Top/Bottom, Triple Top/Bottom, Ascending/Descending/Symmetrical Triangles, Bull/Bear Flags, Pennants, Wedges, Cup & Handle, Rounding Bottom — with entry, TP, and SL rules for each.",
    category: Category.forex,
    difficultyLevel: "advanced",
    duration: BigInt(380),
  },
  {
    id: BigInt(17),
    title: "Trading Tools & Platforms",
    description:
      "Master MT4/MT5 and TradingView. Learn order types (Market, Limit, Stop, Stop-Limit), position sizing calculator, pip calculator, risk/reward tool, economic calendar, and broker selection criteria.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(250),
  },
  {
    id: BigInt(18),
    title: "Fibonacci Retracement & Extensions",
    description:
      "Apply Fibonacci retracement (0.236, 0.382, 0.5, 0.618, 0.786) and extensions (1.272, 1.618, 2.618). Find confluence zones, identify hidden S/R, and use Fib levels for precision entries and targets.",
    category: Category.forex,
    difficultyLevel: "advanced",
    duration: BigInt(290),
  },
  {
    id: BigInt(19),
    title: "Market Structure & Liquidity",
    description:
      "Understand Higher Highs/Lows, Break of Structure (BOS), Change of Character (CHOCH), inducement, liquidity sweeps, stop hunts, and how institutional order flow drives price.",
    category: Category.forex,
    difficultyLevel: "advanced",
    duration: BigInt(310),
  },
  {
    id: BigInt(20),
    title: "Trading Psychology & Mindset",
    description:
      "Overcome FOMO, revenge trading, and overtrading. Build a trader's mindset using journaling, rules-based trading, emotional discipline, and performance reviews.",
    category: Category.forex,
    difficultyLevel: "intermediate",
    duration: BigInt(220),
  },
];

const levelColors: Record<string, string> = {
  beginner: "bg-signal-green/10 text-signal-green border-signal-green/30",
  intermediate: "bg-secondary/10 text-secondary border-secondary/30",
  advanced: "bg-primary/10 text-primary border-primary/30",
  analysis: "bg-destructive/10 text-destructive border-destructive/30",
};

const categoryIcons: Record<string, typeof BookOpen> = {
  forex: TrendingUp,
  crypto: Zap,
};

function formatDuration(mins: bigint) {
  const m = Number(mins);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}

function CourseCard({
  resource,
  index,
}: { resource: EducationResource; index: number }) {
  const Icon = categoryIcons[resource.category] ?? BookOpen;
  const levelClass =
    levelColors[resource.difficultyLevel] ?? levelColors.beginner;

  const categoryStyle =
    resource.category === Category.crypto
      ? {
          background: "oklch(0.62 0.18 235 / 0.1)",
          color: "oklch(0.62 0.18 235)",
          border: "1px solid oklch(0.62 0.18 235 / 0.25)",
        }
      : {
          background: "oklch(0.65 0.25 300 / 0.1)",
          color: "oklch(0.65 0.25 300)",
          border: "1px solid oklch(0.65 0.25 300 / 0.25)",
        };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="glass-card rounded-2xl p-7 hover:scale-[1.02] transition-transform duration-300 flex flex-col"
      data-ocid={`education.item.${index + 1}`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <Badge className={`${levelClass} text-xs font-display capitalize`}>
          {resource.difficultyLevel}
        </Badge>
      </div>
      <h3 className="font-display font-bold text-lg mb-3">{resource.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
        {resource.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {formatDuration(resource.duration)}
        </div>
        <span
          className="px-2 py-0.5 rounded font-mono text-xs"
          style={categoryStyle}
        >
          {resource.category.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}

export default function EducationPage() {
  const [activeLevel, setActiveLevel] = useState<Level>("all");
  const { data: backendResources, isLoading } = useGetAllEducationResources();

  const allResources =
    backendResources && backendResources.length > 0
      ? backendResources
      : sampleResources;

  const filtered =
    activeLevel === "all"
      ? allResources
      : allResources.filter((r) => r.difficultyLevel === activeLevel);

  return (
    <div>
      {/* BIG INTRO NOTE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        data-ocid="education.intro.panel"
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.25 300 / 0.12), oklch(0.12 0.02 255 / 0.95))",
            borderBottom: "2px solid oklch(0.65 0.25 300 / 0.5)",
            boxShadow:
              "0 0 40px oklch(0.65 0.25 300 / 0.15), inset 0 1px 0 oklch(0.65 0.25 300 / 0.1)",
          }}
          className="px-4 py-6 md:py-8"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(0.65 0.25 300 / 0.15)",
                border: "1px solid oklch(0.65 0.25 300 / 0.4)",
              }}
            >
              <GraduationCap
                className="w-7 h-7"
                style={{ color: "oklch(0.75 0.28 290)" }}
              />
            </div>
            <div className="flex-1">
              <div
                className="font-mono text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.75 0.28 290)" }}
              >
                FREE LEARNING ZONE
              </div>
              <p
                className="font-display font-black text-lg md:text-xl leading-snug"
                style={{ color: "oklch(0.92 0.01 255)" }}
              >
                Explore our free education resources below. For{" "}
                <span style={{ color: "oklch(0.75 0.28 290)" }}>
                  deep learning of advanced concepts
                </span>
                , institutional strategies, and live mentorship —{" "}
                <span style={{ color: "oklch(0.75 0.28 290)" }}>
                  you need to take our Membership Plan.
                </span>
              </p>
            </div>
            <Link to="/membership">
              <Button
                className="flex-shrink-0 font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.75 0.28 290))",
                  color: "white",
                  boxShadow: "0 0 20px oklch(0.65 0.25 300 / 0.4)",
                }}
                data-ocid="education.intro.primary_button"
              >
                <Crown className="w-4 h-4 mr-2" />
                Get Membership
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Hero */}
      <section className="pt-16 py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-6 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
              TRADING ACADEMY
            </Badge>
            <h1 className="font-display text-5xl font-black mb-4">
              Master the <span className="gold-gradient">Markets</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Structured courses from beginner foundations to advanced
              institutional strategies — learn the way professionals do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <div className="container mx-auto px-4 mb-12">
        <div className="glass-card-blue rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <Badge className="mb-3 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              FEATURED COURSE
            </Badge>
            <h3 className="font-display font-black text-3xl mb-3">
              Price Action Trading
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our flagship course. Trade using pure price movement — the same
              methodology behind our highest win-rate signals.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 6 hours
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-4 h-4" /> 24 modules
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-primary" /> 4.9/5
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/15 border border-primary/30 gold-glow">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="container mx-auto px-4 mb-8">
        <Tabs
          value={activeLevel}
          onValueChange={(v) => setActiveLevel(v as Level)}
          className="flex justify-center"
        >
          <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="all"
              data-ocid="education.filter.tab"
              className="font-display"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="beginner"
              data-ocid="education.beginner.tab"
              className="font-display"
            >
              Beginner
            </TabsTrigger>
            <TabsTrigger
              value="intermediate"
              data-ocid="education.intermediate.tab"
              className="font-display"
            >
              Intermediate
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              data-ocid="education.advanced.tab"
              className="font-display"
            >
              Advanced
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              data-ocid="education.analysis.tab"
              className="font-display"
            >
              Analysis
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="education.loading_state"
          >
            {skeletonKeys.map((k) => (
              <Skeleton key={k} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => (
                <CourseCard key={r.id.toString()} resource={r} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}
        {filtered.length === 0 && !isLoading && (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="education.empty_state"
          >
            No resources found for this level.
          </div>
        )}
      </div>

      {/* BIG OUTRO / MEMBERSHIP CTA */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
        data-ocid="education.membership.section"
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, oklch(0.08 0.025 300), oklch(0.10 0.02 255) 50%, oklch(0.08 0.025 300))",
            borderTop: "1px solid oklch(0.65 0.25 300 / 0.3)",
            borderBottom: "1px solid oklch(0.65 0.25 300 / 0.3)",
          }}
          className="px-4 py-20"
        >
          <div
            className="absolute top-0 left-1/4 w-96 h-96 blur-[120px] rounded-full pointer-events-none"
            style={{ background: "oklch(0.65 0.25 300 / 0.08)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 blur-[120px] rounded-full pointer-events-none"
            style={{ background: "oklch(0.62 0.18 235 / 0.06)" }}
          />

          <div className="relative z-10 container mx-auto text-center max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "oklch(0.65 0.25 300 / 0.15)",
                border: "1px solid oklch(0.65 0.25 300 / 0.4)",
                color: "oklch(0.75 0.28 290)",
              }}
            >
              <Crown className="w-3.5 h-3.5" />
              EXCLUSIVE MEMBERSHIP
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Ready to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.75 0.28 290))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Go Deeper?
              </span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4">
              These free resources are just the beginning. Our Membership Plans
              unlock{" "}
              <strong className="text-foreground">
                advanced institutional strategies
              </strong>
              , live trade rooms, exclusive PDFs, and{" "}
              <strong className="text-foreground">
                direct mentorship from Nikhil and the team
              </strong>
              . Don&apos;t just learn — master the markets.
            </p>

            <p
              className="font-mono text-sm font-bold mb-10"
              style={{ color: "oklch(0.75 0.28 290)" }}
            >
              Members get access to ADVANCE &amp; CONQUEROR tier content —
              concepts not taught anywhere else.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/membership">
                <Button
                  size="lg"
                  className="font-bold text-lg px-10 py-6 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.75 0.28 290))",
                    color: "white",
                    boxShadow:
                      "0 0 30px oklch(0.65 0.25 300 / 0.5), 0 0 60px oklch(0.65 0.25 300 / 0.2)",
                  }}
                  data-ocid="education.membership.primary_button"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Get Membership Now
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold text-base px-8 py-6 rounded-xl border-primary/40 text-primary hover:bg-primary/10"
                  data-ocid="education.membership.secondary_button"
                >
                  Meet the Team
                </Button>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              {eduStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display font-black text-3xl mb-1"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.75 0.28 290))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
