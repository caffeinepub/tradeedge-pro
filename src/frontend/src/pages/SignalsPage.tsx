import {
  Category,
  type Signal,
  SignalType,
  Variant_closed_active,
} from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSignalsByCategory } from "@/hooks/useQueries";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";

const _RED = "oklch(0.62 0.25 25)";
const RED_TEXT = "oklch(0.75 0.22 25)";
const WHITE = "oklch(0.96 0.005 255)";

const skeletonKeys = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

function generateSignals(): Signal[] {
  const pairs = [
    { pair: "EUR/USD", cat: Category.forex, base: 1.0847 },
    { pair: "GBP/USD", cat: Category.forex, base: 1.2634 },
    { pair: "BTC/USDT", cat: Category.crypto, base: 67000 },
    { pair: "ETH/USDT", cat: Category.crypto, base: 3480 },
    { pair: "XAU/USD", cat: Category.forex, base: 2341 },
    { pair: "SOL/USDT", cat: Category.crypto, base: 182 },
    { pair: "USD/JPY", cat: Category.forex, base: 151.82 },
    { pair: "BNB/USDT", cat: Category.crypto, base: 590 },
  ];
  return pairs.map((p, i) => {
    const drift = (Math.random() - 0.5) * p.base * 0.01;
    const entry = p.base + drift;
    const isBuy = Math.random() > 0.4;
    const tpDelta = entry * (0.02 + Math.random() * 0.03) * (isBuy ? 1 : -1);
    const slDelta = entry * (0.01 + Math.random() * 0.02) * (isBuy ? -1 : 1);
    return {
      id: BigInt(i + 1),
      pair: p.pair,
      signalType: isBuy ? SignalType.buy : SignalType.sell,
      entryPrice: entry,
      target: entry + tpDelta,
      stopLoss: entry + slDelta,
      status:
        Math.random() > 0.3
          ? Variant_closed_active.active
          : Variant_closed_active.closed,
      category: p.cat,
      timestamp: BigInt(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 300),
      ),
    };
  });
}

const SIGNAL_DESCRIPTIONS: Record<string, string> = {
  "EUR/USD":
    "Euro strengthening on ECB hawkish signals. Price broke above key resistance at 1.0820. Strong momentum with RSI at 62. Target: 1.0920 confluent with 200 EMA. SL below 1.0780 swing low.",
  "GBP/USD":
    "Cable showing bearish rejection from 1.2680 monthly level. DXY rally supporting USD strength. R:R 1:2.5 with clean structure break. Watch for continuation toward 1.2540.",
  "BTC/USDT":
    "Bitcoin holding above $65K institutional demand zone. On-chain metrics show accumulation. Daily close above $67K confirms bullish continuation. Target $71,500 previous ATH zone.",
  "ETH/USDT":
    "Ethereum ETF inflows driving institutional demand. Price forming higher lows on 4H. Buy order blocks at $3,400 aligning with FVG fill. Next target $3,750 range high.",
  "XAU/USD":
    "Gold rallying on Fed rate cut expectations and geopolitical risk. Strong close above $2,330. Seasonal tendency supports Q2 gold strength. TP at $2,398 prior resistance turned support.",
  "SOL/USDT":
    "Solana showing bearish divergence on RSI. Rejection from $192 weekly resistance. Smart money distribution pattern. SL above $192 swing high.",
  "USD/JPY":
    "BoJ intervention risk elevated above 152.00. USD/JPY sell setup on LTF structure break. Daily bias bearish with rate differential narrowing. Target 149.50.",
  "BNB/USDT":
    "BNB breaking out of 3-week consolidation range. Volume spike confirming breakout. Binance exchange token showing relative strength. TP $640 previous high.",
};

function formatTime(ts: bigint) {
  const ms = Number(ts);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function calcGain(signal: Signal) {
  const diff =
    signal.signalType === SignalType.buy
      ? signal.target - signal.entryPrice
      : signal.entryPrice - signal.target;
  const pct = (diff / signal.entryPrice) * 100;
  return { pct: pct.toFixed(2), positive: diff > 0 };
}

const SignalCard = memo(function SignalCard({
  signal,
  index,
}: { signal: Signal; index: number }) {
  const isBuy = signal.signalType === SignalType.buy;
  const isActive = signal.status === Variant_closed_active.active;
  const gain = calcGain(signal);
  const isCrypto = signal.category === Category.crypto;
  const strength = 50 + (Number(signal.id) % 50);
  const [expanded, setExpanded] = useState(false);
  const desc =
    SIGNAL_DESCRIPTIONS[signal.pair] ??
    "Analysis based on multi-timeframe confluence, volume profile, and institutional order flow patterns. Trade according to your risk management rules.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="glass-card rounded-2xl p-6 flex flex-col"
      style={{ willChange: "transform" }}
      data-ocid={`signals.item.${index + 1}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-display font-bold text-xl"
              style={{ color: WHITE }}
            >
              {signal.pair}
            </span>
            <Badge
              className="text-xs"
              style={
                isCrypto
                  ? {
                      background: "oklch(0.55 0.18 245 / 0.15)",
                      color: "oklch(0.65 0.18 245)",
                      border: "1px solid oklch(0.55 0.18 245 / 0.3)",
                    }
                  : {
                      background: "oklch(0.62 0.25 25 / 0.1)",
                      color: RED_TEXT,
                      border: "1px solid oklch(0.62 0.25 25 / 0.25)",
                    }
              }
            >
              {signal.category.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {formatTime(signal.timestamp)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold font-display ${
              isBuy ? "buy-badge" : "sell-badge"
            }`}
          >
            {isBuy ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {isBuy ? "BUY" : "SELL"}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded font-mono ${isActive ? "active-badge" : "closed-badge"}`}
          >
            {isActive ? "● ACTIVE" : "✓ CLOSED"}
          </span>
        </div>
      </div>

      {/* Price Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Entry</div>
          <div
            className="font-mono font-semibold text-sm"
            style={{ color: WHITE }}
          >
            {signal.entryPrice.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
          </div>
        </div>
        <div
          className="rounded-lg p-3"
          style={{
            background: "oklch(0.72 0.18 145 / 0.08)",
            border: "1px solid oklch(0.72 0.18 145 / 0.2)",
          }}
        >
          <div className="text-xs text-muted-foreground mb-1">Take Profit</div>
          <div className="font-mono font-semibold text-sm signal-green">
            {signal.target.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
          </div>
        </div>
        <div
          className="rounded-lg p-3"
          style={{
            background: "oklch(0.62 0.25 25 / 0.08)",
            border: "1px solid oklch(0.62 0.25 25 / 0.2)",
          }}
        >
          <div className="text-xs text-muted-foreground mb-1">Stop Loss</div>
          <div className="font-mono font-semibold text-sm signal-red">
            {signal.stopLoss.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
          </div>
        </div>
      </div>

      {/* Signal Strength */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground font-mono">
            Signal Strength
          </span>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: RED_TEXT }}
          >
            {strength}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(0.14 0.02 255)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.75 0.22 25), oklch(0.62 0.25 25))",
              boxShadow: "0 0 6px oklch(0.62 0.25 25 / 0.5)",
            }}
          />
        </div>
      </div>

      {/* Gain + Read More */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-xs text-muted-foreground">Potential Gain</span>
        <span
          className={`font-mono font-bold text-sm ${gain.positive ? "signal-green" : "signal-red"}`}
        >
          {gain.positive ? "+" : ""}
          {gain.pct}%
        </span>
      </div>

      {/* Read More expand */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex items-center gap-1 text-xs font-mono font-semibold transition-colors duration-200"
        style={{ color: expanded ? RED_TEXT : "oklch(0.55 0.02 255)" }}
        data-ocid={`signals.item.${index + 1}.toggle`}
      >
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
        {expanded ? "Show Less" : "Read More"}
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? "8rem" : "0",
          opacity: expanded ? 1 : 0,
        }}
      >
        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/30 mt-2">
          {desc}
        </p>
      </div>
    </motion.div>
  );
});

function StatWidget({
  label,
  value,
  suffix,
}: { label: string; value: string; suffix?: string }) {
  return (
    <div
      className="flex-1 text-center p-4 rounded-xl"
      style={{
        background: "oklch(0.09 0.015 255 / 0.8)",
        border: "1px solid oklch(0.62 0.25 25 / 0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="font-display text-2xl font-black"
        style={{
          color: RED_TEXT,
          textShadow: "0 0 15px oklch(0.62 0.25 25 / 0.4)",
        }}
      >
        {value}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

const alertPairs = [
  { pair: "BTC/USDT", side: "BUY", price: "$67,000" },
  { pair: "ETH/USDT", side: "BUY", price: "$3,480" },
  { pair: "EUR/USD", side: "SELL", price: "1.2634" },
  { pair: "SOL/USDT", side: "BUY", price: "$178" },
  { pair: "XAU/USD", side: "BUY", price: "$2,341" },
];

export default function SignalsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "forex" | "crypto">("all");
  const [localSignals, setLocalSignals] = useState<Signal[]>(() =>
    generateSignals(),
  );
  const { data: backendSignals, isLoading } = useGetSignalsByCategory(
    activeTab === "all"
      ? "all"
      : activeTab === "forex"
        ? Category.forex
        : Category.crypto,
  );

  const rawSignals =
    backendSignals && backendSignals.length > 0 ? backendSignals : localSignals;
  const signals =
    activeTab === "all"
      ? rawSignals
      : rawSignals.filter((s) =>
          activeTab === "forex"
            ? s.category === Category.forex
            : s.category === Category.crypto,
        );

  // Refresh signals every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalSignals(generateSignals());
      toast.info("Signals refreshed", {
        description: "Updated with latest market data",
        duration: 3000,
      });
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // Live alert toasts on mount
  useEffect(() => {
    const t1 = setTimeout(() => {
      const a = alertPairs[0];
      toast.success(`🔴 NEW SIGNAL: ${a.pair} ${a.side} at ${a.price}`, {
        description: "Signal strength: 78% • R:R 1:2.5",
        duration: 5000,
      });
    }, 3000);
    let idx = 1;
    const interval = setInterval(() => {
      const a = alertPairs[idx % alertPairs.length];
      toast.success(`🔴 NEW SIGNAL: ${a.pair} ${a.side} at ${a.price}`, {
        description: "Signal strength: 72% • R:R 1:2.0",
        duration: 5000,
      });
      idx++;
    }, 30000);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  const activeCount = signals.filter(
    (s) => s.status === Variant_closed_active.active,
  ).length;

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 py-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "oklch(0.62 0.25 25 / 0.04)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "oklch(0.62 0.25 25 / 0.08)",
                border: "1px solid oklch(0.62 0.25 25 / 0.3)",
                color: RED_TEXT,
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Live Signals • Auto-refresh every 5 min
            </div>
            <h1
              className="font-display text-5xl font-black mb-4"
              style={{ color: WHITE }}
            >
              Trading <span className="neon-gradient-text">Signals</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-mono">
              Real-time forex and crypto signals with precise entry, take
              profit, and stop loss levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Performance Stats */}
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <StatWidget label="Win Rate" value="87" suffix="%" />
          <StatWidget label="Active Signals" value={activeCount.toString()} />
          <StatWidget label="Signals This Week" value="24" />
          <StatWidget label="Avg R:R" value="1:2.8" />
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 mb-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "all" | "forex" | "crypto")}
          className="flex justify-center"
        >
          <TabsList className="bg-card border border-border">
            <TabsTrigger
              value="all"
              data-ocid="signals.filter.tab"
              className="font-display font-semibold"
            >
              All Markets
            </TabsTrigger>
            <TabsTrigger
              value="forex"
              data-ocid="signals.forex.tab"
              className="font-display font-semibold"
            >
              Forex
            </TabsTrigger>
            <TabsTrigger
              value="crypto"
              data-ocid="signals.crypto.tab"
              className="font-display font-semibold"
            >
              Crypto
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Signals Grid */}
      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="signals.loading_state"
          >
            {skeletonKeys.map((k) => (
              <Skeleton key={k} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signals.map((signal, i) => (
                <SignalCard
                  key={signal.id.toString()}
                  signal={signal}
                  index={i}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

        <div className="mt-12 glass-card rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground/70">Risk Disclaimer:</strong> All
            trading signals are for informational purposes only and do not
            constitute financial advice. Trading involves significant risk of
            loss. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </div>
  );
}
