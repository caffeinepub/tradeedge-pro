import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const strategies = [
  {
    name: "Trend Following System",
    difficulty: "Intermediate",
    winRate: "74%",
    desc: "Ride major market trends using EMA 20/50/200 crossovers with volume confirmation.",
    category: "Trend",
  },
  {
    name: "Breakout Trading Strategy",
    difficulty: "Intermediate",
    winRate: "68%",
    desc: "Enter trades when price breaks key support/resistance with momentum. Includes false breakout filters.",
    category: "Breakout",
  },
  {
    name: "Scalping the 5-Min Chart",
    difficulty: "Advanced",
    winRate: "71%",
    desc: "High-frequency strategy using Bollinger Bands and RSI for quick 10-20 pip trades.",
    category: "Scalping",
  },
  {
    name: "Swing Trading Blueprint",
    difficulty: "Intermediate",
    winRate: "76%",
    desc: "Capture multi-day moves using daily chart structure and 4H entry refinement.",
    category: "Swing",
  },
  {
    name: "Price Action Mastery",
    difficulty: "Advanced",
    winRate: "79%",
    desc: "Trade purely with candlestick patterns and price structure — no indicators needed.",
    category: "Price Action",
  },
  {
    name: "Fibonacci Retracement Strategy",
    difficulty: "Intermediate",
    winRate: "70%",
    desc: "Use Fibonacci levels (38.2%, 61.8%) to enter on pullbacks within a strong trend.",
    category: "Technical",
  },
  {
    name: "Ichimoku Cloud System",
    difficulty: "Advanced",
    winRate: "73%",
    desc: "Japan's complete trading system for trend, momentum, and support/resistance in one view.",
    category: "Technical",
  },
  {
    name: "News Trading System",
    difficulty: "Advanced",
    winRate: "65%",
    desc: "Trade high-impact news events (NFP, CPI, FOMC) with pre/post news breakout setups.",
    category: "Fundamental",
  },
  {
    name: "London Open Strategy",
    difficulty: "Intermediate",
    winRate: "77%",
    desc: "Capitalize on the London market open volatility with defined entry and exit rules.",
    category: "Session",
  },
  {
    name: "Risk-Reward Optimizer",
    difficulty: "Intermediate",
    winRate: "80%",
    desc: "A meta-strategy for selecting only trades with 1:3+ R:R, dramatically improving edge.",
    category: "Risk",
  },
];

const difficultyColor: Record<string, string> = {
  Intermediate: "#60A5FA",
  Advanced: "#F87171",
};

function StrategyCard({
  strat,
  index,
}: { strat: (typeof strategies)[0]; index: number }) {
  const diffColor = difficultyColor[strat.difficulty] ?? "#D4AF37";
  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all duration-300 group">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "#D4AF3718",
            border: "1px solid #D4AF3740",
          }}
        >
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
          style={{
            backgroundColor: `${diffColor}18`,
            color: diffColor,
            border: `1px solid ${diffColor}40`,
          }}
        >
          {strat.difficulty}
        </div>
      </div>

      <h3 className="font-display font-bold text-base text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
        {strat.name}
      </h3>

      {/* Win rate */}
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-4 h-4 text-primary" />
        <span className="text-xs font-mono text-primary font-bold">
          Win Rate: {strat.winRate}
        </span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border/30">
          {strat.category}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">
        {strat.desc}
      </p>

      <Button
        className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
        data-ocid={`advance_member.strategy.button.${index + 1}`}
      >
        <TrendingUp className="w-4 h-4 mr-2" />
        View Strategy
      </Button>
    </div>
  );
}

export default function AdvanceMemberPage() {
  const previewStrategy = strategies[0];
  const lockedStrategies = strategies.slice(1);

  return (
    <div>
      {/* Hero — always visible */}
      <section className="pt-24 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 left-1/3 w-[500px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs tracking-widest">
              ADVANCE MEMBER AREA
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-5 leading-tight">
              Pro Trading
              <br />
              <span className="gold-gradient">Strategy Vault</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Battle-tested strategies used by professional traders. Study each
              system, backtest it, and master it before going live.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free preview card — always visible */}
      <section className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            data-ocid="advance_member.strategy.item.1"
            className="relative"
          >
            {/* FREE PREVIEW badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/40 tracking-widest">
                FREE PREVIEW
              </span>
            </div>
            <StrategyCard strat={previewStrategy} index={0} />
          </motion.div>
        </div>
      </section>

      {/* Teaser message */}
      <p className="text-sm text-primary font-mono text-center py-4">
        🔒 9 more strategies available for Advance members
      </p>

      {/* Locked content */}
      <MemberGate tier="advance">
        <section className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lockedStrategies.map((strat, i) => (
              <motion.div
                key={strat.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`advance_member.strategy.item.${i + 2}`}
              >
                <StrategyCard strat={strat} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </section>
      </MemberGate>
    </div>
  );
}
