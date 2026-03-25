import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const strategies = [
  {
    name: "Trend Following System",
    difficulty: "Intermediate",
    winRate: "74%",
    desc: "Ride major market trends using EMA 20/50/200 crossovers with volume confirmation.",
    category: "Trend",
    content: `TREND FOLLOWING SYSTEM — FULL GUIDE

📌 Core Concept:
The trend is your friend. Trade in the direction of the dominant trend using multiple EMAs for confirmation.

📌 Setup Requirements:
• EMA 20 — Short-term trend
• EMA 50 — Medium-term trend
• EMA 200 — Long-term trend (the big picture)

📌 Entry Rules (Buy):
1. Price is above EMA 200 (uptrend confirmed)
2. EMA 20 crossed above EMA 50
3. Price pulls back to EMA 20/50 area
4. Bullish candle closes as confirmation
5. RSI above 50 for momentum confirmation

📌 Entry Rules (Sell):
1. Price is below EMA 200 (downtrend confirmed)
2. EMA 20 crossed below EMA 50
3. Price bounces up to EMA 20/50 resistance
4. Bearish candle closes as confirmation

📌 Stop Loss: Below the last swing low (buy) or above last swing high (sell)
📌 Take Profit: Next major resistance (buy) or support (sell)
📌 Best Pairs: EUR/USD, GBP/USD, AUD/USD on 4H/Daily charts
📌 Win Rate: 74% over 500+ backtested trades`,
  },
  {
    name: "Breakout Trading Strategy",
    difficulty: "Intermediate",
    winRate: "68%",
    desc: "Enter trades when price breaks key support/resistance with momentum. Includes false breakout filters.",
    category: "Breakout",
    content: `BREAKOUT TRADING STRATEGY — FULL GUIDE

📌 Core Concept:
When price breaks through a key level with strong momentum, it tends to continue in that direction.

📌 Identifying Valid Breakouts:
• Level must have 3+ touches (stronger = better)
• Volume spike on breakout candle (higher than average)
• Strong momentum candle (large body, small wicks)
• Avoid breakouts in low liquidity times

📌 False Breakout Filter:
• Wait for candle to CLOSE above/below the level
• RSI must confirm momentum (not overbought on buy breakout)
• Check for news events that may cause fake spikes

📌 Entry Method:
1. Mark the key level on your chart
2. Set a pending order ABOVE resistance (buy stop) or BELOW support (sell stop)
3. OR: Wait for candle close and enter at open of next candle

📌 Stop Loss Placement:
• Buy: Below the broken resistance level
• Sell: Above the broken support level

📌 Targets:
• Minimum 1:2 R:R
• Measure the range and project it forward

📌 Best Markets: Currency pairs during London/NY session, high volatility hours`,
  },
  {
    name: "Scalping the 5-Min Chart",
    difficulty: "Advanced",
    winRate: "71%",
    desc: "High-frequency strategy using Bollinger Bands and RSI for quick 10-20 pip trades.",
    category: "Scalping",
    content: `5-MINUTE SCALPING SYSTEM — FULL GUIDE

📌 Core Concept:
Capture quick 10-20 pip moves during high liquidity sessions using Bollinger Bands and RSI.

📌 Indicators Required:
• Bollinger Bands (20, 2.0)
• RSI (14) with 70/30 levels
• EMA 21 for trend bias

📌 Buy Setup:
1. Price touches lower Bollinger Band
2. RSI below 30 (oversold)
3. Price above EMA 21 on 15-min chart (uptrend bias)
4. Bullish rejection candle on 5-min
5. Enter on next candle open

📌 Sell Setup:
1. Price touches upper Bollinger Band
2. RSI above 70 (overbought)
3. Price below EMA 21 on 15-min chart (downtrend bias)
4. Bearish rejection candle on 5-min
5. Enter on next candle open

📌 Stop Loss: 8-10 pips (below candle low for buy)
📌 Take Profit: 15-20 pips or middle of Bollinger Band
📌 Best Sessions: London open (1:30-3:30 PM IST) and NY open
📌 Warning: Requires full attention and fast execution. Not for beginners.`,
  },
  {
    name: "Swing Trading Blueprint",
    difficulty: "Intermediate",
    winRate: "76%",
    desc: "Capture multi-day moves using daily chart structure and 4H entry refinement.",
    category: "Swing",
    content: `SWING TRADING BLUEPRINT — FULL GUIDE

📌 Core Concept:
Hold trades for 2-10 days to capture larger moves. Analyze daily chart, enter on 4H.

📌 Multi-Timeframe Analysis:
• Weekly Chart: Overall trend direction
• Daily Chart: Entry zone identification, key levels
• 4-Hour Chart: Entry trigger and timing

📌 Bullish Swing Setup:
1. Daily chart shows uptrend (higher highs, higher lows)
2. Price pulls back to key support or EMA 50
3. Daily candle shows bullish reversal (hammer, engulfing)
4. Drop to 4H — confirm with MACD bullish cross
5. Enter long, stop below daily support

📌 Bearish Swing Setup:
1. Daily chart shows downtrend
2. Price rallies to resistance or EMA 50
3. Daily candle shows bearish reversal
4. 4H MACD bearish cross confirmation
5. Enter short, stop above resistance

📌 Targets:
• Primary TP: Next major S/R level
• Extended TP: Previous swing high/low

📌 Pairs: EUR/USD, GBP/JPY, AUD/USD, Gold (XAU/USD)
📌 Time: Check markets once daily, no screen time obsession`,
  },
  {
    name: "Price Action Mastery",
    difficulty: "Advanced",
    winRate: "79%",
    desc: "Trade purely with candlestick patterns and price structure — no indicators needed.",
    category: "Price Action",
    content: `PRICE ACTION MASTERY — FULL GUIDE

📌 Core Philosophy:
Price action is the only true indicator. It tells you everything you need to know without lagging.

📌 Key Concepts:
• Market Structure: Higher Highs/Higher Lows = Uptrend; Lower Highs/Lower Lows = Downtrend
• Order Blocks: Areas where smart money placed orders — price often returns there
• Fair Value Gaps (FVG): Gaps in price where no trading occurred — price seeks to fill them
• Break of Structure (BOS): When price breaks the last swing high/low = trend change

📌 Order Block Trading:
1. Find a strong impulsive move (3+ candles in one direction)
2. Mark the last opposing candle before the move
3. When price returns to that zone, look for entry
4. Confirm with rejection candle

📌 Smart Money Entry:
• Wait for market to sweep liquidity (false break highs/lows)
• Look for reversal immediately after sweep
• Enter after confirmation candle
• Target: Next liquidity pool (previous highs/lows)

📌 Key Trading Rule:
The market moves from liquidity to liquidity. Smart money hunts stop losses before reversing.

📌 Best Timeframes: 15min (entry), 1H (structure), 4H/Daily (bias)`,
  },
  {
    name: "Fibonacci Retracement Strategy",
    difficulty: "Intermediate",
    winRate: "70%",
    desc: "Use Fibonacci levels (38.2%, 61.8%) to enter on pullbacks within a strong trend.",
    category: "Technical",
    content: `FIBONACCI RETRACEMENT STRATEGY — FULL GUIDE

📌 Key Fibonacci Levels:
• 23.6% — Shallow retracement (weak pullback)
• 38.2% — Moderate retracement (good entry zone)
• 50.0% — Psychological level (not official Fib)
• 61.8% — Golden ratio (strongest entry level)
• 78.6% — Deep retracement (high risk/reward)

📌 How to Draw Fibonacci:
• Uptrend: Draw from swing LOW to swing HIGH
• Downtrend: Draw from swing HIGH to swing LOW
• Wait for price to retrace and find support/resistance at key level

📌 Entry Strategy:
1. Identify a strong impulsive move (at least 50 pips)
2. Draw Fibonacci retracement
3. Wait for price to pull back to 38.2% or 61.8%
4. Look for confirmation candle at that level
5. Enter with stop below the 78.6% level

📌 Confluence Trading:
• Fibonacci level + support/resistance = strong zone
• Fibonacci + EMA 50/200 confluence = very strong
• Fibonacci + supply/demand zone = institutional level

📌 Target Setting:
• Conservative: Previous swing high/low
• Aggressive: Fibonacci extension levels (127.2%, 161.8%)

📌 Best Application: Trending markets on 4H and Daily charts`,
  },
  {
    name: "Ichimoku Cloud System",
    difficulty: "Advanced",
    winRate: "73%",
    desc: "Japan's complete trading system for trend, momentum, and support/resistance in one view.",
    category: "Technical",
    content: `ICHIMOKU CLOUD SYSTEM — FULL GUIDE

📌 The 5 Components:
• Tenkan-sen (9): Conversion Line — short-term momentum
• Kijun-sen (26): Base Line — medium-term trend
• Senkou Span A: First cloud boundary
• Senkou Span B: Second cloud boundary
• Chikou Span: Lagging line — confirmation

📌 Reading the Cloud (Kumo):
• Price ABOVE cloud = bullish bias
• Price BELOW cloud = bearish bias
• Price INSIDE cloud = neutral/consolidation
• Thick cloud = strong support/resistance
• Thin cloud = weak support (easier to break)

📌 Buy Signal:
1. Price breaks above the cloud
2. Tenkan-sen crosses above Kijun-sen (above the cloud)
3. Chikou Span is above price of 26 periods ago
4. Senkou Span A is above Senkou Span B

📌 Sell Signal:
1. Price breaks below the cloud
2. Tenkan-sen crosses below Kijun-sen (below the cloud)
3. Chikou Span is below price of 26 periods ago

📌 Dynamic Support/Resistance:
• Use Kijun-sen as dynamic support in uptrend
• Price bounces off Kijun = buy the dip

📌 Best Timeframes: 4H and Daily charts for most reliable signals`,
  },
  {
    name: "News Trading System",
    difficulty: "Advanced",
    winRate: "65%",
    desc: "Trade high-impact news events (NFP, CPI, FOMC) with pre/post news breakout setups.",
    category: "Fundamental",
    content: `NEWS TRADING SYSTEM — FULL GUIDE

📌 High-Impact News Events:
• NFP (Non-Farm Payroll) — First Friday of month, USD pairs
• CPI (Consumer Price Index) — Monthly inflation data
• FOMC Meeting — Fed interest rate decision
• ECB Rate Decision — Euro pairs
• BOE Rate Decision — GBP pairs
• GDP Data — Quarterly economic output

📌 Pre-News Strategy (Straddle):
1. 15 minutes before news, identify current range
2. Place BUY STOP 10 pips above range high
3. Place SELL STOP 10 pips below range low
4. Set 25 pip stops on both orders
5. Cancel opposite order when one triggers
6. Target: 30-50 pips

📌 Post-News Retracement Strategy:
1. Wait for initial spike (1-2 minutes after news)
2. Wait for price to retrace 50-60% of spike
3. Enter in direction of spike
4. Stop: Below spike low (for buy)
5. Target: 100% of spike extension

📌 Risk Rules for News Trading:
• Spreads widen dramatically — account for this
• Use only 0.5% risk (high slippage possible)
• Avoid trading 5 minutes before major news
• Check economic calendar daily (Forex Factory, Investing.com)

📌 Best Events to Trade: NFP > CPI > FOMC > GDP`,
  },
  {
    name: "London Open Strategy",
    difficulty: "Intermediate",
    winRate: "77%",
    desc: "Capitalize on the London market open volatility with defined entry and exit rules.",
    category: "Session",
    content: `LONDON OPEN STRATEGY — FULL GUIDE

📌 Why London Open?
London is the largest forex trading hub. When it opens, volume increases dramatically and trends form.

📌 Best Time to Trade: 1:30 PM – 4:00 PM IST

📌 Setup Method:
1. Identify the Asian session range (3:30 AM – 1:30 PM IST)
2. Mark the HIGH and LOW of the Asian range
3. When London opens, watch for breakout of this range
4. Trade in the direction of the breakout

📌 Entry Rules:
• Buy: Asian high breaks + bullish momentum candle closes above
• Sell: Asian low breaks + bearish momentum candle closes below
• Stop: 10-15 pips beyond the range
• Target: 1:2 to 1:3 R:R

📌 Confirmation Filters:
• EMA 20 direction matches trade direction
• RSI not extreme (avoid if above 75 for buy or below 25 for sell)
• Higher timeframe (4H) trend alignment

📌 Best Pairs for London Open:
• GBP/USD — Highest London volatility
• EUR/USD — Second most active
• EUR/GBP — Direct London play
• Gold (XAU/USD) — Often trends sharply on London open

📌 Typical Win Structure:
• 2-3 setups per week, 20-60 pip moves`,
  },
  {
    name: "Risk-Reward Optimizer",
    difficulty: "Intermediate",
    winRate: "80%",
    desc: "A meta-strategy for selecting only trades with 1:3+ R:R, dramatically improving edge.",
    category: "Risk",
    content: `RISK-REWARD OPTIMIZER — FULL GUIDE

📌 Core Principle:
You don't need a high win rate to be profitable. You need a high R:R ratio.

📌 The Math:
• 1:1 R:R = Need 50% win rate to break even
• 1:2 R:R = Need 34% win rate to profit
• 1:3 R:R = Need 25% win rate to profit
• 1:5 R:R = Need only 17% win rate to profit!

📌 How to Find 1:3+ Setups:
1. Identify entry zone with tight stop loss placement
2. Confirm clear target (S/R level) far enough away
3. Calculate: Distance to target / Distance to stop = R:R
4. Only enter if R:R ≥ 3:1

📌 Optimizer Framework:
• Be selective — quality over quantity
• Aim for 3-5 trades per week maximum
• Reject setups with R:R below 2:1
• Scale in positions at better prices when available

📌 Compounding with R:R:
• $1,000 account, 1% risk = $10 per trade
• Win 3 trades at 1:3 = +$90
• Lose 3 trades at 1:3 = -$30
• Net profit: $60 on only 50% win rate!

📌 Advanced Technique:
Partial exit at 1:1 (protect capital), let remaining position run to 1:3 or beyond.

📌 Rule: If you can't find a 1:3 setup today — don't trade. Wait for it.`,
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all duration-300 group">
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
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
        data-ocid={`advance_member.strategy.button.${index + 1}`}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Hide Strategy
          </>
        ) : (
          <>
            <TrendingUp className="w-4 h-4 mr-2" />
            View Full Strategy
          </>
        )}
      </Button>

      {expanded && (
        <div className="mt-4 p-4 rounded-xl bg-background/60 border border-primary/20 text-xs font-mono text-foreground/80 whitespace-pre-line leading-relaxed">
          {strat.content}
        </div>
      )}
    </div>
  );
}

export default function AdvanceMemberPage() {
  const previewStrategy = strategies[0];
  const lockedStrategies = strategies.slice(1);

  return (
    <div>
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

          {/* Meeting info + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-full border border-primary/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-foreground">
                Live Meeting:{" "}
                <span className="text-primary font-bold">
                  6:00 PM – 7:00 PM IST
                </span>
              </span>
            </div>
            <a
              href="https://wa.me/917828496002"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="advance_member.whatsapp.button"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-display font-bold px-6 rounded-full h-11">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            data-ocid="advance_member.strategy.item.1"
            className="relative"
          >
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/40 tracking-widest">
                FREE PREVIEW
              </span>
            </div>
            <StrategyCard strat={previewStrategy} index={0} />
          </motion.div>
        </div>
      </section>

      <p className="text-sm text-primary font-mono text-center py-4">
        🔒 9 more strategies available with access code: ELWORLD
      </p>

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
