import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, TrendingUp, X, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type NewsItem = {
  id: number;
  category: "Crypto" | "Forex" | "Global";
  headline: string;
  summary: string;
  source: string;
  time: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "Crypto",
    headline: "Bitcoin Surges Past $70K as Institutional Demand Rises",
    summary:
      "Bitcoin breaks above $70,000 for the first time in months, driven by record ETF inflows and growing institutional adoption from major asset managers.",
    source: "CoinDesk",
    time: "2m ago",
  },
  {
    id: 2,
    category: "Forex",
    headline: "EUR/USD Hits 3-Month High on ECB Rate Decision",
    summary:
      "The Euro strengthened against the Dollar after the European Central Bank held rates steady, signaling a potential shift in monetary policy approach.",
    source: "Reuters",
    time: "8m ago",
  },
  {
    id: 3,
    category: "Global",
    headline: "S&P 500 Reaches All-Time High Amid Strong Earnings Season",
    summary:
      "US equities continue to climb as major corporations report earnings that surpass analyst expectations by wide margins across multiple sectors.",
    source: "Bloomberg",
    time: "15m ago",
  },
  {
    id: 4,
    category: "Crypto",
    headline: "Ethereum ETF Sees Record $500M Inflows in Single Day",
    summary:
      "Ethereum spot ETFs recorded their highest single-day inflows since launch, reflecting growing institutional interest in the second-largest cryptocurrency.",
    source: "CoinTelegraph",
    time: "22m ago",
  },
  {
    id: 5,
    category: "Forex",
    headline: "Bank of Japan Signals Potential Rate Hike in Q2",
    summary:
      "BOJ Governor's latest remarks suggest the central bank may raise rates earlier than expected, causing significant yen volatility in Asian trading sessions.",
    source: "FT",
    time: "35m ago",
  },
  {
    id: 6,
    category: "Global",
    headline: "Gold Prices Climb to Record High on Safe-Haven Demand",
    summary:
      "Spot gold touched a new all-time high as geopolitical tensions and inflation concerns drive investors toward traditional safe-haven assets.",
    source: "WSJ",
    time: "1h ago",
  },
  {
    id: 7,
    category: "Crypto",
    headline:
      "BlackRock's Bitcoin ETF Surpasses $20B in Assets Under Management",
    summary:
      "IBIT has become one of the fastest-growing ETFs in history, now managing over $20 billion in Bitcoin assets with daily inflows remaining robust.",
    source: "Bloomberg",
    time: "1h ago",
  },
  {
    id: 8,
    category: "Forex",
    headline: "GBP/USD Rallies After Better-Than-Expected UK GDP Data",
    summary:
      "The British pound gained more than 0.5% against the dollar following UK GDP growth that exceeded consensus estimates, reducing recession fears.",
    source: "Reuters",
    time: "2h ago",
  },
  {
    id: 9,
    category: "Global",
    headline: "Oil Prices Drop 3% on OPEC+ Supply Increase Reports",
    summary:
      "Crude oil fell sharply after leaked OPEC+ documents suggested member nations may vote to increase production quotas at the upcoming meeting.",
    source: "CNBC",
    time: "2h ago",
  },
  {
    id: 10,
    category: "Crypto",
    headline: "Solana Ecosystem Hits $50B TVL Milestone",
    summary:
      "Total value locked in Solana DeFi protocols crossed $50 billion for the first time, cementing its position as a major smart contract platform.",
    source: "DeFiLlama",
    time: "3h ago",
  },
  {
    id: 11,
    category: "Forex",
    headline: "USD Weakens as CPI Data Comes in Below Forecasts",
    summary:
      "The US Dollar Index fell 0.4% after core inflation came in at 3.1%, below the 3.3% consensus, fueling speculation about earlier Fed rate cuts.",
    source: "MarketWatch",
    time: "4h ago",
  },
  {
    id: 12,
    category: "Global",
    headline: "Tech Stocks Lead Rally as AI Earnings Beat Estimates",
    summary:
      "Major tech companies report stronger-than-expected AI-related revenue growth, with cloud computing and AI infrastructure showing double-digit gains.",
    source: "FT",
    time: "5h ago",
  },
];

const trending = [
  { rank: 1, title: "Bitcoin ETF Inflows", badge: "🔥 Hot" },
  { rank: 2, title: "Fed Rate Decision", badge: "📊 Key" },
  { rank: 3, title: "Gold All-Time High", badge: "⬆ Rising" },
  { rank: 4, title: "Solana DeFi", badge: "⚡ Fast" },
  { rank: 5, title: "OPEC+ Supply", badge: "⚠ Alert" },
];

const tickerHeadlines = [
  "BTC surges past $70K • EUR/USD 3-month high • S&P 500 all-time high • ETH ETF record inflows • BOJ rate hike signals • Gold new record • Solana $50B TVL • USD weakens on CPI data • Tech stocks rally on AI earnings • BlackRock Bitcoin ETF hits $20B",
];

const categoryColors: Record<string, string> = {
  Crypto: "oklch(0.82 0.22 142 / 0.15)",
  Forex: "oklch(0.55 0.18 245 / 0.15)",
  Global: "oklch(0.65 0.18 85 / 0.15)",
};
const categoryTextColors: Record<string, string> = {
  Crypto: "oklch(0.82 0.22 142)",
  Forex: "oklch(0.65 0.18 245)",
  Global: "oklch(0.78 0.18 85)",
};
const categoryBorderColors: Record<string, string> = {
  Crypto: "oklch(0.82 0.22 142 / 0.3)",
  Forex: "oklch(0.55 0.18 245 / 0.3)",
  Global: "oklch(0.65 0.18 85 / 0.3)",
};

export default function NewsPage() {
  const [tab, setTab] = useState<"All" | "Crypto" | "Forex" | "Global">("All");
  const [breakingVisible, setBreakingVisible] = useState(true);

  const filtered =
    tab === "All" ? newsData : newsData.filter((n) => n.category === tab);

  return (
    <div className="pt-16">
      {/* Breaking News Banner */}
      {breakingVisible && (
        <div
          className="relative flex items-center gap-3 px-4 py-3"
          style={{
            background: "oklch(0.62 0.2 25 / 0.15)",
            borderBottom: "1px solid oklch(0.62 0.2 25 / 0.3)",
            animation: "breaking-pulse 2s ease-in-out infinite",
          }}
          data-ocid="news.breaking.panel"
        >
          <div
            className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest shrink-0"
            style={{ color: "oklch(0.75 0.2 25)" }}
          >
            <Zap className="w-3.5 h-3.5" />
            BREAKING
          </div>
          <p className="text-sm font-mono text-foreground/90 flex-1 truncate">
            ⚡ Federal Reserve holds rates steady — markets react with
            broad-based equity rally and dollar weakness
          </p>
          <button
            type="button"
            onClick={() => setBreakingVisible(false)}
            className="text-muted-foreground hover:text-foreground p-1 shrink-0 transition-colors"
            data-ocid="news.breaking.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* News Ticker */}
      <div
        className="overflow-hidden py-2 border-b border-border/60"
        style={{
          background: "oklch(0.07 0.015 255 / 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex">
          <div className="flex ticker-news-scroll whitespace-nowrap">
            {[...tickerHeadlines, ...tickerHeadlines].map((t, i) => (
              <span
                key={`tick-item-${i}-${t.slice(0, 20)}`}
                className="px-8 text-xs font-mono text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 relative">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "oklch(0.82 0.22 142 / 0.08)",
                border: "1px solid oklch(0.82 0.22 142 / 0.3)",
                color: "oklch(0.82 0.22 142)",
              }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Market News
            </div>
            <h1 className="font-display text-5xl font-black mb-4">
              Financial <span className="neon-gradient-text">Intelligence</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-mono">
              Real-time market news, analysis, and insights from leading
              financial sources.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="bg-card border border-border">
              <TabsTrigger
                value="All"
                data-ocid="news.all.tab"
                className="font-mono font-semibold"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="Crypto"
                data-ocid="news.crypto.tab"
                className="font-mono font-semibold"
              >
                Crypto
              </TabsTrigger>
              <TabsTrigger
                value="Forex"
                data-ocid="news.forex.tab"
                className="font-mono font-semibold"
              >
                Forex
              </TabsTrigger>
              <TabsTrigger
                value="Global"
                data-ocid="news.global.tab"
                className="font-mono font-semibold"
              >
                Global Economy
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* News Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl p-5 flex flex-col justify-between cursor-default transition-all duration-300"
                  style={{
                    background: "oklch(0.09 0.015 255 / 0.85)",
                    border: "1px solid oklch(0.82 0.22 142 / 0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.82 0.22 142 / 0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 30px oklch(0.82 0.22 142 / 0.08)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.82 0.22 142 / 0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                  data-ocid={`news.item.${i + 1}`}
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          background: categoryColors[item.category],
                          color: categoryTextColors[item.category],
                          border: `1px solid ${categoryBorderColors[item.category]}`,
                        }}
                      >
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2 leading-tight">
                      {item.headline}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-mono line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-between mt-auto pt-4"
                    style={{
                      borderTop: "1px solid oklch(0.82 0.22 142 / 0.08)",
                    }}
                  >
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.source}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs font-mono h-7 px-3 hover:text-primary transition-colors"
                      style={{ color: "oklch(0.82 0.22 142 / 0.7)" }}
                      data-ocid={`news.read.button.${i + 1}`}
                    >
                      Read More →
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5 sticky top-20"
              style={{
                background: "oklch(0.09 0.015 255 / 0.9)",
                border: "1px solid oklch(0.82 0.22 142 / 0.12)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-5 font-mono font-bold text-xs uppercase tracking-widest"
                style={{ color: "oklch(0.82 0.22 142)" }}
              >
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </div>
              <div className="space-y-4">
                {trending.map((t) => (
                  <div
                    key={t.rank}
                    className="flex items-center gap-3 group cursor-default"
                    data-ocid={`news.trending.item.${t.rank}`}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0"
                      style={{
                        background: "oklch(0.82 0.22 142 / 0.1)",
                        color: "oklch(0.82 0.22 142)",
                        border: "1px solid oklch(0.82 0.22 142 / 0.2)",
                      }}
                    >
                      {t.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-mono text-foreground/90 truncate group-hover:text-primary transition-colors">
                        {t.title}
                      </div>
                    </div>
                    <Badge
                      className="text-xs shrink-0"
                      style={{
                        background: "oklch(0.82 0.22 142 / 0.08)",
                        color: "oklch(0.82 0.22 142)",
                        border: "1px solid oklch(0.82 0.22 142 / 0.2)",
                        fontSize: "10px",
                      }}
                    >
                      {t.badge}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid oklch(0.82 0.22 142 / 0.1)" }}
              >
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Market Snapshot
                </div>
                <div className="space-y-3">
                  {[
                    { label: "BTC Dominance", val: "52.4%", up: true },
                    { label: "Fear & Greed", val: "68 Greed", up: true },
                    { label: "Total Market Cap", val: "$2.47T", up: true },
                    { label: "24h Volume", val: "$142B", up: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{
                          color: item.up
                            ? "oklch(0.82 0.22 142)"
                            : "oklch(0.62 0.2 25)",
                        }}
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
