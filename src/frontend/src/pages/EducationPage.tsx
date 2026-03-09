const skeletonKeys = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

import { Category, type EducationResource } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllEducationResources } from "@/hooks/useQueries";
import {
  BarChart3,
  BookOpen,
  Clock,
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
          background: "oklch(0.78 0.12 85 / 0.1)",
          color: "oklch(0.78 0.12 85)",
          border: "1px solid oklch(0.78 0.12 85 / 0.25)",
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
    </div>
  );
}
