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
import { AlertTriangle, Clock, TrendingDown, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const skeletonKeys = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

const sampleSignals: Signal[] = [
  {
    id: BigInt(1),
    pair: "EUR/USD",
    signalType: SignalType.buy,
    entryPrice: 1.0847,
    target: 1.092,
    stopLoss: 1.078,
    status: Variant_closed_active.active,
    category: Category.forex,
    timestamp: BigInt(Date.now() - 1000 * 60 * 45),
  },
  {
    id: BigInt(2),
    pair: "GBP/USD",
    signalType: SignalType.sell,
    entryPrice: 1.2634,
    target: 1.254,
    stopLoss: 1.271,
    status: Variant_closed_active.active,
    category: Category.forex,
    timestamp: BigInt(Date.now() - 1000 * 60 * 120),
  },
  {
    id: BigInt(3),
    pair: "BTC/USDT",
    signalType: SignalType.buy,
    entryPrice: 67000,
    target: 71500,
    stopLoss: 64200,
    status: Variant_closed_active.active,
    category: Category.crypto,
    timestamp: BigInt(Date.now() - 1000 * 60 * 30),
  },
  {
    id: BigInt(4),
    pair: "ETH/USDT",
    signalType: SignalType.buy,
    entryPrice: 3480,
    target: 3750,
    stopLoss: 3320,
    status: Variant_closed_active.active,
    category: Category.crypto,
    timestamp: BigInt(Date.now() - 1000 * 60 * 180),
  },
  {
    id: BigInt(5),
    pair: "XAU/USD",
    signalType: SignalType.buy,
    entryPrice: 2341,
    target: 2398,
    stopLoss: 2305,
    status: Variant_closed_active.closed,
    category: Category.forex,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    id: BigInt(6),
    pair: "SOL/USDT",
    signalType: SignalType.sell,
    entryPrice: 182,
    target: 165,
    stopLoss: 192,
    status: Variant_closed_active.closed,
    category: Category.crypto,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: BigInt(7),
    pair: "USD/JPY",
    signalType: SignalType.sell,
    entryPrice: 151.82,
    target: 149.5,
    stopLoss: 153.4,
    status: Variant_closed_active.active,
    category: Category.forex,
    timestamp: BigInt(Date.now() - 1000 * 60 * 90),
  },
  {
    id: BigInt(8),
    pair: "BNB/USDT",
    signalType: SignalType.buy,
    entryPrice: 590,
    target: 640,
    stopLoss: 562,
    status: Variant_closed_active.active,
    category: Category.crypto,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60),
  },
];

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

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  const isBuy = signal.signalType === SignalType.buy;
  const isActive = signal.status === Variant_closed_active.active;
  const gain = calcGain(signal);
  const isCrypto = signal.category === Category.crypto;

  const categoryStyle = isCrypto
    ? {}
    : {
        background: "oklch(0.78 0.12 85 / 0.1)",
        color: "oklch(0.78 0.12 85)",
        border: "1px solid oklch(0.78 0.12 85 / 0.3)",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default"
      data-ocid={`signals.item.${index + 1}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-xl text-foreground">
              {signal.pair}
            </span>
            <Badge
              className={
                isCrypto ? "active-badge text-xs" : "closed-badge text-xs"
              }
              style={categoryStyle}
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
          <div className="font-mono font-semibold text-sm text-foreground">
            {signal.entryPrice.toLocaleString()}
          </div>
        </div>
        <div className="bg-signal-green/10 border border-signal-green/20 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Take Profit</div>
          <div className="font-mono font-semibold text-sm text-signal-green">
            {signal.target.toLocaleString()}
          </div>
        </div>
        <div className="bg-signal-red/10 border border-signal-red/20 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Stop Loss</div>
          <div className="font-mono font-semibold text-sm text-signal-red">
            {signal.stopLoss.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Gain */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-xs text-muted-foreground">Potential Gain</span>
        <span
          className={`font-mono font-bold text-sm ${
            gain.positive ? "text-signal-green" : "text-signal-red"
          }`}
        >
          {gain.positive ? "+" : ""}
          {gain.pct}%
        </span>
      </div>
    </motion.div>
  );
}

export default function SignalsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "forex" | "crypto">("all");
  const { data: backendSignals, isLoading } = useGetSignalsByCategory(
    activeTab === "all"
      ? "all"
      : activeTab === "forex"
        ? Category.forex
        : Category.crypto,
  );

  const signals =
    backendSignals && backendSignals.length > 0
      ? backendSignals
      : activeTab === "all"
        ? sampleSignals
        : sampleSignals.filter((s) =>
            activeTab === "forex"
              ? s.category === Category.forex
              : s.category === Category.crypto,
          );

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              LIVE SIGNALS
            </Badge>
            <h1 className="font-display text-5xl font-black mb-4">
              Trading <span className="gold-gradient">Signals</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real-time forex and crypto signals with precise entry, take
              profit, and stop loss levels.
            </p>
          </motion.div>
        </div>
      </section>

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
              <Skeleton key={k} className="h-56 rounded-2xl" />
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

        {/* Risk Disclaimer */}
        <div className="mt-12 glass-card rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground/70">Risk Disclaimer:</strong> All
            trading signals are for informational purposes only and do not
            constitute financial advice. Trading involves significant risk of
            loss. Past performance is not indicative of future results. Never
            risk more capital than you can afford to lose. Always conduct your
            own research before entering any trade.
          </p>
        </div>
      </div>
    </div>
  );
}
