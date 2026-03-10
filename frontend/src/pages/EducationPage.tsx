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
  Layers,
  Lock,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Level = "all" | "beginner" | "intermediate" | "advanced" | "analysis";
type AdvancedTier = "all" | "advanced" | "conqueror";

interface AdvancedConcept {
  title: string;
  description: string;
  tier: "advanced" | "conqueror";
}

const ADVANCED_CONCEPTS: AdvancedConcept[] = [
  // ADVANCED TIER — 25 concepts
  { tier: "advanced", title: "Liquidity Zones", description: "Where institutional orders cluster to fuel price moves" },
  { tier: "advanced", title: "Actual Market Structure", description: "True BOS and CHOCH beyond textbook definitions" },
  { tier: "advanced", title: "Order Blocks", description: "Institutional candle zones that act as future S/R" },
  { tier: "advanced", title: "Fair Value Gaps (FVG)", description: "Imbalances in price delivery that get filled" },
  { tier: "advanced", title: "Breaker Blocks", description: "Failed order blocks that flip to opposing support/resistance" },
  { tier: "advanced", title: "Mitigation Blocks", description: "Price returns to neutralize opposing orders" },
  { tier: "advanced", title: "Smart Money Concepts (SMC)", description: "Full institutional trading framework" },
  { tier: "advanced", title: "Change of Character (CHOCH)", description: "Early signal of structural reversal" },
  { tier: "advanced", title: "Break of Structure (BOS)", description: "Confirmed continuation signals" },
  { tier: "advanced", title: "Premium & Discount Zones", description: "Fibonacci-based optimal entry pricing" },
  { tier: "advanced", title: "Optimal Trade Entry (OTE)", description: "61.8%–79% retracement entry model" },
  { tier: "advanced", title: "Inducement & Stop Hunts", description: "How market makers engineer liquidity grabs" },
  { tier: "advanced", title: "Internal & External Liquidity", description: "Mapping liquidity pools above/below structure" },
  { tier: "advanced", title: "Buy-side / Sell-side Liquidity", description: "Identifying where stops are resting" },
  { tier: "advanced", title: "Equal Highs & Equal Lows", description: "Engineered liquidity magnets" },
  { tier: "advanced", title: "Displacement Candles", description: "Strong directional moves signaling institutional entry" },
  { tier: "advanced", title: "Volume Imbalance", description: "Single-sided volume gaps in the order book" },
  { tier: "advanced", title: "VWAP & Institutional VWAP", description: "Volume-weighted price as institutional benchmark" },
  { tier: "advanced", title: "Inverse FVG", description: "Gap that acts as resistance instead of support" },
  { tier: "advanced", title: "Consequent Encroachment (CE)", description: "Midpoint of FVG as key level" },
  { tier: "advanced", title: "Rejection Blocks", description: "Wicked candles forming strong reversal zones" },
  { tier: "advanced", title: "Propulsion Blocks", description: "Consolidations before explosive moves" },
  { tier: "advanced", title: "Swing High/Low Classification", description: "Proper labeling for structure analysis" },
  { tier: "advanced", title: "Divergence Trading", description: "Hidden and regular divergence with momentum indicators" },
  { tier: "advanced", title: "Confluence Trading Framework", description: "Stacking multiple factors for high-probability setups" },
  // CONQUEROR TIER — 27 concepts
  { tier: "conqueror", title: "Power of 3 (AMD)", description: "Accumulation, Manipulation, Distribution model by ICT" },
  { tier: "conqueror", title: "ICT Kill Zones", description: "London, New York, Asian session timing windows" },
  { tier: "conqueror", title: "Silver Bullet Strategy", description: "ICT's high-probability 3-window intraday setup" },
  { tier: "conqueror", title: "Daily Profiles & Open Range", description: "How each trading day unfolds institutionally" },
  { tier: "conqueror", title: "HTF Bias & LTF Entry", description: "Top-down analysis from weekly to 1-minute" },
  { tier: "conqueror", title: "Weekly Profile & Range", description: "Institutional weekly setups and range targets" },
  { tier: "conqueror", title: "Monthly Levels & Seasonality", description: "Long-term institutional planning levels" },
  { tier: "conqueror", title: "Market Maker Buy/Sell Model", description: "Full cycle from accumulation to distribution" },
  { tier: "conqueror", title: "Turtle Soup Pattern", description: "Counter-trend liquidity grab reversal" },
  { tier: "conqueror", title: "Judas Swing", description: "False opening move to engineer liquidity" },
  { tier: "conqueror", title: "London Open Strategy", description: "First-hour manipulation and reversal plays" },
  { tier: "conqueror", title: "New York Open Strategy", description: "NY session killzone momentum setups" },
  { tier: "conqueror", title: "Asian Range Strategy", description: "Range-bound accumulation and morning breakout" },
  { tier: "conqueror", title: "Session Overlaps & Manipulation", description: "London/NY overlap trap and reversal" },
  { tier: "conqueror", title: "PD Arrays & Dealing Range", description: "Premium/Discount price delivery framework" },
  { tier: "conqueror", title: "Wyckoff Accumulation/Distribution", description: "Spring, upthrust and composite man" },
  { tier: "conqueror", title: "Composite Man Theory", description: "How smart money engineers market cycles" },
  { tier: "conqueror", title: "Volume Profile POC & VAH/VAL", description: "Point of Control and value area analysis" },
  { tier: "conqueror", title: "Delta & CVD Analysis", description: "Buy/sell pressure imbalance reading" },
  { tier: "conqueror", title: "Footprint Charts", description: "Order flow visualization at each price level" },
  { tier: "conqueror", title: "Elliott Wave Theory", description: "5-wave impulse and 3-wave corrective structures" },
  { tier: "conqueror", title: "Harmonic Patterns", description: "Gartley, Bat, Crab, Butterfly precision patterns" },
  { tier: "conqueror", title: "Wolfe Wave Patterns", description: "5-point reversal structures for timing entries" },
  { tier: "conqueror", title: "Turtle Soup Reversal", description: "Engineering false breakouts for counter moves" },
  { tier: "conqueror", title: "Correlation Trading (DXY)", description: "Dollar Index relationship with major pairs" },
  { tier: "conqueror", title: "Accumulation Phase Detection", description: "Wyckoff phase A-E identification" },
  { tier: "conqueror", title: "Market Profile Theory", description: "TPO charts and auction market theory" },
];

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
      "Complete encyclopedia of 25+ candlestick patterns: Doji (4 types), Hammer, Hanging Man, Shooting Star, Inverted Hammer, Bullish/Bearish Engulfing, Morning Star, Evening Star, Harami, Pin Bar, Marubozu, Spinning Top, Three White Soldiers, Three Black Crows — with reliability scores and entry rules.",
    category: Category.forex,
    difficultyLevel: "analysis",
    duration: BigInt(320),
  },
  {
    id: BigInt(16),
    title: "Chart Patterns Mastery",
    description:
      "Complete guide to Head & Shoulders, Inverse H&S, Double Top/Bottom, Triple Top/Bottom, Ascending/Descending/Symmetrical Triangles, Bull/Bear Flags, Pennants, Wedges, Cup & Handle — with entry, TP, and SL rules for each.",
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

function AdvancedConceptCard({
  concept,
  index,
}: { concept: AdvancedConcept; index: number }) {
  const isConqueror = concept.tier === "conqueror";

  return (
    <Link to="/membership">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 10) * 0.05, duration: 0.35 }}
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        style={{
          background: isConqueror
            ? "linear-gradient(135deg, oklch(0.08 0.03 80), oklch(0.10 0.04 75))"
            : "linear-gradient(135deg, oklch(0.08 0.02 300), oklch(0.10 0.025 290))",
          border: isConqueror
            ? "1px solid oklch(0.65 0.18 80 / 0.35)"
            : "1px solid oklch(0.65 0.25 300 / 0.3)",
        }}
        data-ocid={`advanced_concepts.item.${index + 1}`}
      >
        {/* Lock overlay bg */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Lock
            className="w-16 h-16"
            style={{
              color: isConqueror
                ? "oklch(0.65 0.18 80 / 0.08)"
                : "oklch(0.65 0.25 300 / 0.07)",
            }}
          />
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20"
          style={{
            background: isConqueror
              ? "oklch(0.65 0.18 80 / 0.12)"
              : "oklch(0.65 0.25 300 / 0.12)",
          }}
        >
          <div
            className="text-center px-3"
            style={{ color: isConqueror ? "oklch(0.82 0.16 85)" : "oklch(0.75 0.28 290)" }}
          >
            <Lock className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-bold font-mono">
              Unlock with {isConqueror ? "Conqueror" : "Advanced"} Plan
            </span>
          </div>
        </div>

        <div className="relative z-10 p-4">
          {/* Tier badge */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold font-mono"
              style={{
                background: isConqueror
                  ? "oklch(0.65 0.18 80 / 0.2)"
                  : "oklch(0.65 0.25 300 / 0.15)",
                border: isConqueror
                  ? "1px solid oklch(0.65 0.18 80 / 0.5)"
                  : "1px solid oklch(0.65 0.25 300 / 0.4)",
                color: isConqueror ? "oklch(0.82 0.16 85)" : "oklch(0.75 0.28 290)",
              }}
            >
              <Shield className="w-3 h-3" />
              {isConqueror ? "CONQUEROR" : "ADVANCED"}
            </div>
            <Lock
              className="w-3.5 h-3.5"
              style={{
                color: isConqueror ? "oklch(0.82 0.16 85 / 0.6)" : "oklch(0.75 0.28 290 / 0.6)",
              }}
            />
          </div>

          <h4 className="font-display font-bold text-sm mb-1 leading-snug">{concept.title}</h4>
          <p className="text-xs leading-relaxed" style={{ color: "oklch(0.55 0.02 250)" }}>
            {concept.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function EducationPage() {
  const [activeLevel, setActiveLevel] = useState<Level>("all");
  const [advancedTierFilter, setAdvancedTierFilter] = useState<AdvancedTier>("all");
  const { data: backendResources, isLoading } = useGetAllEducationResources();

  const allResources =
    backendResources && backendResources.length > 0
      ? backendResources
      : sampleResources;

  const filtered =
    activeLevel === "all"
      ? allResources
      : allResources.filter((r) => r.difficultyLevel === activeLevel);

  const filteredAdvanced =
    advancedTierFilter === "all"
      ? ADVANCED_CONCEPTS
      : ADVANCED_CONCEPTS.filter((c) => c.tier === advancedTierFilter);

  return (
    <div>
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

      {/* ===== ADVANCED CONCEPTS LIBRARY ===== */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.06 0.015 270), oklch(0.07 0.02 260) 50%, oklch(0.06 0.015 270))",
          borderTop: "1px solid oklch(0.65 0.25 300 / 0.15)",
          borderBottom: "1px solid oklch(0.65 0.18 80 / 0.15)",
        }}
        data-ocid="advanced_concepts.section"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] blur-[160px] rounded-full pointer-events-none"
          style={{ background: "oklch(0.65 0.25 300 / 0.05)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none"
          style={{ background: "oklch(0.65 0.18 80 / 0.05)" }}
        />

        <div className="relative z-10 container mx-auto px-4">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "oklch(0.65 0.18 80 / 0.12)",
                border: "1px solid oklch(0.65 0.18 80 / 0.4)",
                color: "oklch(0.82 0.16 85)",
              }}
            >
              <Crown className="w-3.5 h-3.5" />
              MEMBERS ONLY
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
              Advanced Concepts{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.65 0.20 75))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Library
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
              50+ institutional-grade concepts — unlocked with membership
            </p>
            <p className="text-sm font-mono" style={{ color: "oklch(0.65 0.18 80 / 0.8)" }}>
              <Lock className="w-3.5 h-3.5 inline mr-1" />
              Each concept is individually locked. Click any card to unlock with the required plan.
            </p>
          </motion.div>

          {/* Tier filter tabs */}
          <div className="flex justify-center mb-10">
            <div
              className="flex gap-1 p-1 rounded-xl"
              style={{
                background: "oklch(0.09 0.02 270)",
                border: "1px solid oklch(0.65 0.18 80 / 0.2)",
              }}
            >
              {(["all", "advanced", "conqueror"] as AdvancedTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setAdvancedTierFilter(tier)}
                  className="px-5 py-2 rounded-lg text-sm font-bold font-mono uppercase tracking-wide transition-all duration-200"
                  style={{
                    background:
                      advancedTierFilter === tier
                        ? tier === "conqueror"
                          ? "oklch(0.65 0.18 80 / 0.25)"
                          : tier === "advanced"
                            ? "oklch(0.65 0.25 300 / 0.2)"
                            : "oklch(0.15 0.02 270)"
                        : "transparent",
                    color:
                      advancedTierFilter === tier
                        ? tier === "conqueror"
                          ? "oklch(0.82 0.16 85)"
                          : tier === "advanced"
                            ? "oklch(0.75 0.28 290)"
                            : "oklch(0.85 0.01 270)"
                        : "oklch(0.5 0.02 270)",
                    border:
                      advancedTierFilter === tier
                        ? tier === "conqueror"
                          ? "1px solid oklch(0.65 0.18 80 / 0.4)"
                          : tier === "advanced"
                            ? "1px solid oklch(0.65 0.25 300 / 0.35)"
                            : "1px solid oklch(0.3 0.02 270)"
                        : "1px solid transparent",
                  }}
                  data-ocid={`advanced_concepts.${tier}.tab`}
                >
                  {tier === "all" ? "All Concepts" : tier === "advanced" ? "Advanced Tier" : "Conqueror Tier"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="font-display font-black text-3xl" style={{ color: "oklch(0.82 0.16 85)" }}>52+</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">LOCKED CONCEPTS</div>
            </div>
            <div className="text-center">
              <div className="font-display font-black text-3xl" style={{ color: "oklch(0.75 0.28 290)" }}>25</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">ADVANCED TIER</div>
            </div>
            <div className="text-center">
              <div className="font-display font-black text-3xl" style={{ color: "oklch(0.82 0.16 85)" }}>27</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">CONQUEROR TIER</div>
            </div>
          </div>

          {/* Concepts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAdvanced.map((concept, i) => (
              <AdvancedConceptCard key={concept.title} concept={concept} index={i} />
            ))}
          </div>

          {/* Unlock CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <p className="text-muted-foreground mb-6">
              All <strong className="text-foreground">52 advanced concepts</strong> are exclusively available to members.
              Upgrade your plan to unlock the full institutional-grade library.
            </p>
            <Link to="/membership">
              <Button
                size="lg"
                className="font-bold text-base px-10 py-6 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.18 80), oklch(0.78 0.18 85))",
                  color: "oklch(0.08 0.02 80)",
                  boxShadow: "0 0 30px oklch(0.65 0.18 80 / 0.4), 0 0 60px oklch(0.65 0.18 80 / 0.15)",
                }}
                data-ocid="advanced_concepts.unlock.primary_button"
              >
                <Crown className="w-5 h-5 mr-2" />
                Unlock All Concepts — Get Membership
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

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
