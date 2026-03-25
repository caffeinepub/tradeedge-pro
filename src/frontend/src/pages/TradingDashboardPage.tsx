import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RED = "oklch(0.62 0.25 25)";
const RED_TEXT = "oklch(0.75 0.22 25)";
const WHITE = "oklch(0.96 0.005 255)";

type SparkData = { v: number };

type ChartPoint = {
  time: string;
  btc: number;
  eth: number;
  xau: number;
};

const PAIRS = [
  "BTC/USDT",
  "ETH/USDT",
  "BNB/USDT",
  "SOL/USDT",
  "EUR/USD",
  "XAU/USD",
];
const PAIR_PRICES: Record<string, number> = {
  "BTC/USDT": 67420,
  "ETH/USDT": 3521,
  "BNB/USDT": 594,
  "SOL/USDT": 178,
  "EUR/USD": 1.0847,
  "XAU/USD": 2341,
};

const LEVERAGE_OPTIONS = ["1x", "5x", "10x", "25x", "50x"];

function fmt(n: number, d: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

function generateChartHistory(n = 60): ChartPoint[] {
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  let btc = 67000;
  let eth = 3500;
  let xau = 2330;
  const out: ChartPoint[] = [];
  for (let i = 0; i < n; i++) {
    btc += (Math.random() - 0.48) * btc * 0.008;
    eth += (Math.random() - 0.48) * eth * 0.009;
    xau += (Math.random() - 0.48) * xau * 0.003;
    out.push({
      time: `${hours[i % 24]}:00`,
      btc: Math.round(btc),
      eth: Math.round(eth * 10) / 10,
      xau: Math.round(xau * 10) / 10,
    });
  }
  return out;
}

function generateSparkline(base: number, n = 20): SparkData[] {
  let v = base;
  return Array.from({ length: n }, () => {
    v += (Math.random() - 0.5) * v * 0.01;
    return { v: Math.round(v * 100) / 100 };
  });
}

function Spark({ data, color }: { data: SparkData[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Custom tooltip for the main chart
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "oklch(0.1 0.02 255)",
        border: "1px solid oklch(0.62 0.25 25 / 0.2)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 11,
        fontFamily: "Geist Mono, monospace",
      }}
    >
      <p style={{ color: "oklch(0.55 0.02 255)", marginBottom: 4 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function TradingDashboardPage() {
  const [pair, setPair] = useState("BTC/USDT");
  const [timeframe, setTimeframe] = useState("1H");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("0.01");
  const [leverage, setLeverage] = useState("10x");
  const [chartData, setChartData] = useState<ChartPoint[]>(() =>
    generateChartHistory(),
  );
  const [livePrice, setLivePrice] = useState(PAIR_PRICES["BTC/USDT"]);
  const [priceChange, setPriceChange] = useState(2.14);
  const [portfolio, setPortfolio] = useState({
    total: 12483.5,
    pnl: 284.2,
    positions: 3,
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSide, setPopupSide] = useState<"buy" | "sell">("buy");
  const priceRef = useRef(livePrice);

  const [marketCards] = useState(() =>
    PAIRS.map((p) => ({
      pair: p,
      price: PAIR_PRICES[p],
      change: (Math.random() - 0.45) * 5,
      spark: generateSparkline(PAIR_PRICES[p]),
    })),
  );

  const [livePrices, setLivePrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(PAIRS.map((p) => [p, PAIR_PRICES[p]])),
  );

  // Regenerate chart when pair changes
  useEffect(() => {
    const base = PAIR_PRICES[pair];
    setChartData(generateChartHistory());
    setLivePrice(base);
    priceRef.current = base;
  }, [pair]);

  // Live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * priceRef.current * 0.001;
      priceRef.current = Math.max(0.0001, priceRef.current + delta);
      setLivePrice(priceRef.current);
      setPriceChange((prev) =>
        Number.parseFloat((prev + (Math.random() - 0.5) * 0.05).toFixed(2)),
      );
      setPortfolio((prev) => ({
        ...prev,
        pnl: Number.parseFloat(
          (prev.pnl + (Math.random() - 0.48) * 5).toFixed(2),
        ),
      }));
      setLivePrices((prev) => {
        const next = { ...prev };
        for (const p of PAIRS) {
          next[p] = Math.max(
            0.0001,
            prev[p] + (Math.random() - 0.49) * prev[p] * 0.001,
          );
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Append new chart point every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const last = prev[prev.length - 1];
        const now = new Date();
        const newPoint: ChartPoint = {
          time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
          btc: Math.max(
            1,
            last.btc + (Math.random() - 0.49) * last.btc * 0.005,
          ),
          eth: Math.max(
            1,
            last.eth + (Math.random() - 0.49) * last.eth * 0.006,
          ),
          xau: Math.max(
            1,
            last.xau + (Math.random() - 0.49) * last.xau * 0.002,
          ),
        };
        return [...prev.slice(-59), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isUp = priceChange >= 0;
  const decimals =
    pair.includes("USD") && !pair.includes("/USD")
      ? 2
      : pair === "EUR/USD"
        ? 4
        : 0;
  const high24 = chartData.length
    ? Math.max(...chartData.map((c) => c.btc))
    : 0;
  const low24 = chartData.length ? Math.min(...chartData.map((c) => c.btc)) : 0;

  const panelStyle = {
    background: "oklch(0.09 0.015 255 / 0.9)",
    border: "1px solid oklch(0.62 0.25 25 / 0.1)",
    backdropFilter: "blur(16px)",
  };

  function handleOrder(orderSide: "buy" | "sell") {
    setPopupSide(orderSide);
    setPopupOpen(true);
  }

  return (
    <div className="pt-16 min-h-screen pb-10">
      {/* Terminal Header */}
      <div
        className="border-b px-4 py-3 flex items-center gap-4 flex-wrap"
        style={{
          background: "oklch(0.07 0.015 255 / 0.95)",
          borderColor: "oklch(0.62 0.25 25 / 0.15)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{
              background: "oklch(0.62 0.25 25 / 0.15)",
              border: "1px solid oklch(0.62 0.25 25 / 0.3)",
            }}
          >
            <BarChart3 className="w-3.5 h-3.5" style={{ color: RED_TEXT }} />
          </div>
          <span
            className="font-mono font-bold text-xs uppercase tracking-widest"
            style={{ color: RED_TEXT }}
          >
            Trading Terminal
          </span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {PAIRS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPair(p)}
              className="text-xs font-mono px-3 py-1.5 rounded-md transition-all duration-200"
              style={{
                background:
                  pair === p ? "oklch(0.62 0.25 25 / 0.15)" : "transparent",
                color: pair === p ? RED_TEXT : "oklch(0.55 0.02 255)",
                border:
                  pair === p
                    ? "1px solid oklch(0.62 0.25 25 / 0.35)"
                    : "1px solid transparent",
              }}
              data-ocid="dashboard.pair.button"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4">
        {/* Price bar */}
        <div
          className="rounded-xl p-4 mb-4 flex flex-wrap items-center gap-6"
          style={panelStyle}
        >
          <div>
            <div className="text-xs font-mono text-muted-foreground mb-0.5">
              {pair}
            </div>
            <div
              className="font-mono font-black text-3xl transition-all"
              style={{ color: isUp ? "oklch(0.72 0.18 145)" : RED_TEXT }}
            >
              {fmt(livePrice, decimals)}
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono font-bold text-sm"
            style={{
              background: isUp
                ? "oklch(0.72 0.18 145 / 0.1)"
                : "oklch(0.62 0.25 25 / 0.1)",
              color: isUp ? "oklch(0.72 0.18 145)" : RED_TEXT,
              border: isUp
                ? "1px solid oklch(0.72 0.18 145 / 0.25)"
                : "1px solid oklch(0.62 0.25 25 / 0.25)",
            }}
          >
            {isUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {priceChange > 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </div>
          <div className="flex items-center gap-6 ml-auto flex-wrap">
            {[
              { label: "24h High", val: fmt(high24, 0) },
              { label: "24h Low", val: fmt(low24, 0) },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs text-muted-foreground font-mono">
                  {item.label}
                </div>
                <div
                  className="font-mono font-semibold text-sm"
                  style={{ color: WHITE }}
                >
                  {item.val}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {["1H", "4H", "1D", "1W"].map((tf) => (
              <button
                type="button"
                key={tf}
                onClick={() => setTimeframe(tf)}
                className="text-xs font-mono px-2.5 py-1 rounded transition-all duration-200"
                style={{
                  background:
                    timeframe === tf
                      ? "oklch(0.62 0.25 25 / 0.15)"
                      : "transparent",
                  color: timeframe === tf ? RED_TEXT : "oklch(0.55 0.02 255)",
                  border:
                    timeframe === tf
                      ? "1px solid oklch(0.62 0.25 25 / 0.3)"
                      : "1px solid oklch(0.3 0.02 255 / 0.4)",
                }}
                data-ocid="dashboard.timeframe.button"
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Chart — 3 cols */}
          <div className="xl:col-span-3">
            <div className="rounded-xl p-4" style={panelStyle}>
              {/* Legend */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-mono" style={{ color: RED_TEXT }}>
                  ● BTC
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "oklch(0.55 0.18 245)" }}
                >
                  ● ETH
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "oklch(0.96 0.005 255)" }}
                >
                  ● XAU
                </span>
                <span className="text-xs font-mono text-muted-foreground ml-auto">
                  {timeframe} • TradingView Style
                </span>
              </div>
              {/* TradingView-style clean line chart */}
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.62 0.25 25)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.62 0.25 25)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="ethGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.55 0.18 245)"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.55 0.18 245)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="xauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.96 0.005 255)"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.96 0.005 255)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(1 0 0 / 0.04)"
                  />
                  <XAxis
                    dataKey="time"
                    tick={{
                      fill: "oklch(0.45 0.01 255)",
                      fontSize: 10,
                      fontFamily: "Geist Mono, monospace",
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "oklch(0.62 0.25 25 / 0.08)" }}
                    interval={9}
                  />
                  <YAxis
                    yAxisId="btc"
                    tick={{
                      fill: "oklch(0.45 0.01 255)",
                      fontSize: 10,
                      fontFamily: "Geist Mono, monospace",
                    }}
                    tickLine={false}
                    axisLine={false}
                    domain={["auto", "auto"]}
                    width={60}
                    tickFormatter={(v: number) => v.toLocaleString()}
                  />
                  <YAxis yAxisId="eth" orientation="right" hide />
                  <YAxis yAxisId="xau" orientation="right" hide />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    yAxisId="btc"
                    type="monotone"
                    dataKey="btc"
                    name="BTC"
                    stroke="oklch(0.62 0.25 25)"
                    strokeWidth={2}
                    fill="url(#btcGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "oklch(0.62 0.25 25)" }}
                  />
                  <Area
                    yAxisId="eth"
                    type="monotone"
                    dataKey="eth"
                    name="ETH"
                    stroke="oklch(0.55 0.18 245)"
                    strokeWidth={1.5}
                    fill="url(#ethGrad)"
                    dot={false}
                    activeDot={{ r: 3, fill: "oklch(0.55 0.18 245)" }}
                  />
                  <Area
                    yAxisId="xau"
                    type="monotone"
                    dataKey="xau"
                    name="XAU"
                    stroke="oklch(0.82 0.005 255)"
                    strokeWidth={1.5}
                    fill="url(#xauGrad)"
                    dot={false}
                    activeDot={{ r: 3, fill: "oklch(0.82 0.005 255)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Market Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {marketCards.map((card) => {
                const lp = livePrices[card.pair];
                const cardUp = card.change >= 0;
                const d =
                  card.pair.includes("USD") && !card.pair.includes("/USD")
                    ? 2
                    : card.pair === "EUR/USD"
                      ? 4
                      : 0;
                return (
                  <div
                    key={card.pair}
                    className="rounded-xl p-3"
                    style={panelStyle}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: WHITE }}
                      >
                        {card.pair}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: cardUp ? "oklch(0.72 0.18 145)" : RED_TEXT,
                        }}
                      >
                        {cardUp ? "+" : ""}
                        {card.change.toFixed(2)}%
                      </span>
                    </div>
                    <div
                      className="font-mono font-bold text-sm mb-1"
                      style={{
                        color: cardUp ? "oklch(0.72 0.18 145)" : RED_TEXT,
                      }}
                    >
                      {fmt(lp, d)}
                    </div>
                    <Spark
                      data={card.spark}
                      color={
                        cardUp ? "oklch(0.72 0.18 145)" : "oklch(0.62 0.25 25)"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel — 2 cols */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            {/* Order Panel */}
            <div className="rounded-xl p-5" style={panelStyle}>
              <h3
                className="font-mono font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: RED_TEXT }}
              >
                Place Order
              </h3>
              <Tabs
                value={side}
                onValueChange={(v) => setSide(v as "buy" | "sell")}
              >
                <TabsList
                  className="w-full mb-4"
                  style={{ background: "oklch(0.07 0.01 255)" }}
                >
                  <TabsTrigger
                    value="buy"
                    className="flex-1 font-mono font-bold text-xs"
                    style={{
                      color:
                        side === "buy" ? "oklch(0.72 0.18 145)" : undefined,
                    }}
                    data-ocid="dashboard.buy.tab"
                  >
                    BUY / LONG
                  </TabsTrigger>
                  <TabsTrigger
                    value="sell"
                    className="flex-1 font-mono font-bold text-xs"
                    style={{ color: side === "sell" ? RED_TEXT : undefined }}
                    data-ocid="dashboard.sell.tab"
                  >
                    SELL / SHORT
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Amount
                  </div>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="font-mono text-sm bg-muted/30 border-border"
                    type="number"
                    data-ocid="dashboard.amount.input"
                  />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Leverage
                  </div>
                  <div className="flex gap-1">
                    {LEVERAGE_OPTIONS.map((l) => (
                      <button
                        type="button"
                        key={l}
                        onClick={() => setLeverage(l)}
                        className="flex-1 text-xs font-mono py-1.5 rounded transition-all duration-150"
                        style={{
                          background:
                            leverage === l
                              ? "oklch(0.62 0.25 25 / 0.2)"
                              : "oklch(0.12 0.02 255)",
                          color:
                            leverage === l ? RED_TEXT : "oklch(0.55 0.02 255)",
                          border:
                            leverage === l
                              ? "1px solid oklch(0.62 0.25 25 / 0.4)"
                              : "1px solid oklch(0.25 0.02 255 / 0.5)",
                        }}
                        data-ocid="dashboard.leverage.button"
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOrder("buy")}
                    className="py-3 rounded-lg font-mono font-black text-sm uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: "oklch(0.72 0.18 145)",
                      color: "oklch(0.06 0.01 145)",
                    }}
                    data-ocid="dashboard.buy.button"
                  >
                    BUY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrder("sell")}
                    className="py-3 rounded-lg font-mono font-black text-sm uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: RED, color: "oklch(0.98 0.005 255)" }}
                    data-ocid="dashboard.sell.button"
                  >
                    SELL
                  </button>
                </div>
              </div>
            </div>

            {/* Portfolio Widget */}
            <div className="rounded-xl p-5" style={panelStyle}>
              <h3
                className="font-mono font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: RED_TEXT }}
              >
                <Activity className="inline w-3.5 h-3.5 mr-1" />
                Portfolio
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Total Balance",
                    val: `$${portfolio.total.toLocaleString()}`,
                    color: WHITE,
                  },
                  {
                    label: "Today's P&L",
                    val: `${portfolio.pnl >= 0 ? "+" : ""}$${portfolio.pnl.toFixed(2)}`,
                    color:
                      portfolio.pnl >= 0 ? "oklch(0.72 0.18 145)" : RED_TEXT,
                  },
                  {
                    label: "Open Positions",
                    val: portfolio.positions.toString(),
                    color: WHITE,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-muted-foreground font-mono">
                      {row.label}
                    </span>
                    <span
                      className="font-mono font-bold text-sm"
                      style={{ color: row.color }}
                    >
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-xl p-5" style={panelStyle}>
              <h3
                className="font-mono font-bold text-xs uppercase tracking-widest mb-4"
                style={{ color: RED_TEXT }}
              >
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Win Rate", val: "87%" },
                  { label: "Avg R:R", val: "1:2.8" },
                  { label: "Total Trades", val: "142" },
                  { label: "Profit Factor", val: "2.4" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg p-3"
                    style={{
                      background: "oklch(0.07 0.01 255)",
                      border: "1px solid oklch(0.62 0.25 25 / 0.08)",
                    }}
                  >
                    <div className="text-xs text-muted-foreground font-mono mb-0.5">
                      {s.label}
                    </div>
                    <div
                      className="font-mono font-bold text-base"
                      style={{ color: RED_TEXT }}
                    >
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Info Popup */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent
          style={{
            background: "oklch(0.09 0.015 255)",
            border: `1px solid ${popupSide === "buy" ? "oklch(0.72 0.18 145 / 0.35)" : "oklch(0.62 0.25 25 / 0.35)"}`,
            boxShadow: `0 0 40px ${popupSide === "buy" ? "oklch(0.72 0.18 145 / 0.1)" : "oklch(0.62 0.25 25 / 0.1)"}`,
          }}
          data-ocid="dashboard.order.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-black flex items-center gap-2">
              {popupSide === "buy" ? (
                <>
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: "oklch(0.72 0.18 145)" }}
                  />
                  <span style={{ color: "oklch(0.72 0.18 145)" }}>
                    Buy Order Noted
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown
                    className="w-5 h-5"
                    style={{ color: RED_TEXT }}
                  />
                  <span style={{ color: RED_TEXT }}>Sell Order Noted</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed pt-2">
              You clicked{" "}
              <strong
                style={{
                  color:
                    popupSide === "buy" ? "oklch(0.72 0.18 145)" : RED_TEXT,
                }}
              >
                {popupSide.toUpperCase()}
              </strong>{" "}
              on <strong style={{ color: WHITE }}>{pair}</strong> at{" "}
              <strong style={{ color: WHITE }}>
                {fmt(livePrice, decimals)}
              </strong>{" "}
              with {leverage} leverage.
              <br />
              <br />
              <span className="text-muted-foreground">
                ⚠ This action is for{" "}
                <strong style={{ color: WHITE }}>
                  informational purposes only
                </strong>
                . No real trade has been executed. This platform does not
                connect to any exchange or broker.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              onClick={() => setPopupOpen(false)}
              className="font-mono font-bold uppercase tracking-wider"
              style={{
                background: popupSide === "buy" ? "oklch(0.72 0.18 145)" : RED,
                color: "oklch(0.98 0.005 255)",
              }}
              data-ocid="dashboard.order.confirm_button"
            >
              Got It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
