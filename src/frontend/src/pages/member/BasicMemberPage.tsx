import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const pdfResources = [
  {
    category: "Forex Basics",
    title: "Introduction to Forex Trading",
    desc: "Learn currency pairs, pips, lot sizes and how forex markets operate globally.",
    icon: BookOpen,
    color: "#D4AF37",
    content: `FOREX TRADING FUNDAMENTALS

📌 What is Forex?
Forex (Foreign Exchange) is the global market for trading currencies. It is the largest financial market in the world with over $7 trillion traded daily.

📌 Key Terms:
• Currency Pair: Two currencies traded against each other (e.g., EUR/USD)
• Base Currency: The first currency in a pair (EUR in EUR/USD)
• Quote Currency: The second currency (USD in EUR/USD)
• Pip: Smallest price move — 0.0001 for most pairs
• Lot Size: Standard (100,000 units), Mini (10,000), Micro (1,000)
• Spread: Difference between buy and sell price
• Leverage: Trading more than your capital allows (e.g., 1:100)

📌 Major Currency Pairs:
• EUR/USD — Euro / US Dollar
• GBP/USD — British Pound / US Dollar
• USD/JPY — US Dollar / Japanese Yen
• USD/CHF — US Dollar / Swiss Franc

📌 Market Sessions:
• Sydney: 10 PM – 7 AM IST
• Tokyo: 3:30 AM – 12:30 PM IST
• London: 1:30 PM – 10:30 PM IST (highest volume)
• New York: 6:30 PM – 3:30 AM IST

📌 Pro Tips for Beginners:
1. Always use a demo account first
2. Never risk more than 1-2% per trade
3. Learn to read candlestick charts
4. Understand support and resistance
5. Keep a trading journal from day one`,
  },
  {
    category: "Chart Patterns",
    title: "Candlestick Patterns Bible",
    desc: "Master 30+ candlestick patterns including Doji, Hammer, Engulfing, and Morning Star.",
    icon: FileText,
    color: "#60A5FA",
    content: `CANDLESTICK PATTERNS GUIDE

📌 Bullish Patterns (Buy Signals):
• Hammer: Small body at top, long lower wick — buyers rejected sell-off
• Bullish Engulfing: Green candle fully covers previous red — strong reversal
• Morning Star: 3-candle reversal — red, small doji, large green
• Dragonfly Doji: Open/close at top, long lower shadow
• Three White Soldiers: 3 consecutive bullish candles = strong uptrend

📌 Bearish Patterns (Sell Signals):
• Shooting Star: Small body at bottom, long upper wick — sellers dominate
• Bearish Engulfing: Red candle fully covers previous green
• Evening Star: 3-candle reversal — green, doji, large red
• Hanging Man: Looks like hammer but appears at top of uptrend
• Three Black Crows: 3 consecutive bearish candles = strong downtrend

📌 Neutral / Indecision Patterns:
• Doji: Open = Close — market indecision
• Spinning Top: Small body, long wicks both sides
• Long-Legged Doji: Very long wicks — extreme indecision

📌 How to Use:
1. Always confirm with volume
2. Look at the trend context
3. Use support/resistance zones
4. Wait for candle to close before entering
5. Combine with RSI or MACD for confirmation`,
  },
  {
    category: "Technical Analysis",
    title: "Support & Resistance Masterclass",
    desc: "Identify key price levels, breakout zones, and how to trade bounces effectively.",
    icon: FileText,
    color: "#34D399",
    content: `SUPPORT & RESISTANCE TRADING

📌 What is Support?
A price level where buyers are stronger than sellers. Price tends to bounce UP from support.

📌 What is Resistance?
A price level where sellers are stronger than buyers. Price tends to bounce DOWN from resistance.

📌 How to Identify Key Levels:
• Look for price reversals on the daily/weekly chart
• Use round numbers (1.2000, 1.3000) — psychological levels
• Previous swing highs become resistance
• Previous swing lows become support
• Once broken, support becomes resistance (role reversal)

📌 Trading Strategies:
1. Bounce Trade: Enter when price touches support and shows reversal candle
2. Breakout Trade: Enter when price closes convincingly above resistance
3. Retest Trade: Wait for price to break, pull back to test the level, then enter

📌 Key Tips:
• Strong levels are tested multiple times
• The more touches, the stronger the level
• Higher timeframe levels are more powerful
• Always set stop loss BELOW support or ABOVE resistance
• Target the next significant level as take profit`,
  },
  {
    category: "Risk Management",
    title: "Risk Management Handbook",
    desc: "Position sizing, stop-loss placement, and protecting your capital in volatile markets.",
    icon: BookOpen,
    color: "#F87171",
    content: `RISK MANAGEMENT MASTERCLASS

📌 The Golden Rule:
NEVER risk more than 1-2% of your account on a single trade.

📌 Position Sizing Formula:
Risk Amount = Account Balance × Risk %
Lot Size = Risk Amount / (Stop Loss in pips × Pip Value)

Example:
• Account: $1,000
• Risk: 1% = $10
• Stop Loss: 20 pips
• Pip Value (standard): $10/pip → use micro lot

📌 Stop Loss Placement:
• Place below support (for buy trades)
• Place above resistance (for sell trades)
• Use ATR (Average True Range) × 1.5 for volatile pairs
• Never move stop loss against your trade

📌 Take Profit Targets:
• Minimum 1:2 Risk/Reward ratio
• Target next major support/resistance
• Consider partial exits (50% at 1:1, rest at 1:3)

📌 Risk/Reward Rules:
• 1:1 — Need 50% win rate to break even
• 1:2 — Need only 34% win rate to be profitable
• 1:3 — Need only 25% win rate to be profitable

📌 Daily Loss Limit:
Stop trading for the day if you lose 3-5% of your account. Protect your capital first.`,
  },
  {
    category: "Chart Patterns",
    title: "Classic Chart Patterns Guide",
    desc: "Head & Shoulders, Double Top/Bottom, Triangles, Flags, and Pennants explained.",
    icon: FileText,
    color: "#A78BFA",
    content: `CLASSIC CHART PATTERNS

📌 Reversal Patterns (Trend Change):

• Head & Shoulders (Bearish):
  - Left shoulder, higher head, lower right shoulder
  - Neckline break = sell signal
  - Target = distance from head to neckline

• Inverse Head & Shoulders (Bullish):
  - Same structure upside down
  - Neckline break = buy signal

• Double Top (Bearish):
  - Two peaks at same resistance level
  - Break below neckline = sell

• Double Bottom (Bullish):
  - Two lows at same support level
  - Break above neckline = buy

📌 Continuation Patterns (Trend Continues):

• Bull Flag: Sharp rise, small rectangle pullback, continue up
• Bear Flag: Sharp fall, small rectangle bounce, continue down
• Ascending Triangle: Flat resistance + rising support = bullish
• Descending Triangle: Flat support + falling resistance = bearish
• Pennant: Converging lines after strong move = continuation
• Wedge: Rising wedge = bearish, Falling wedge = bullish

📌 Trading Rules:
• Always wait for the breakout confirmation
• Use volume to confirm breakouts
• Measure pattern height for price targets`,
  },
  {
    category: "Indicators",
    title: "Moving Averages Explained",
    desc: "SMA, EMA, and how to use crossovers to identify trend direction and entry points.",
    icon: BookOpen,
    color: "#FBBF24",
    content: `MOVING AVERAGES TRADING GUIDE

📌 Types of Moving Averages:

• SMA (Simple Moving Average):
  - Equal weight to all periods
  - SMA 50 and SMA 200 are most popular
  - Slower to react but less false signals

• EMA (Exponential Moving Average):
  - More weight to recent prices
  - EMA 9, 21, 50 widely used by traders
  - Faster signal, good for active trading

📌 Trend Direction Rules:
• Price above MA = Uptrend
• Price below MA = Downtrend
• MA slope up = bullish
• MA slope down = bearish

📌 Crossover Strategies:

• Golden Cross: EMA 50 crosses ABOVE EMA 200 = Strong bullish signal
• Death Cross: EMA 50 crosses BELOW EMA 200 = Strong bearish signal
• Fast/Slow: EMA 9 cross EMA 21 = Short-term entry signal

📌 Dynamic Support & Resistance:
• Price often bounces off EMA 20/50 in strong trends
• Use EMA as trailing stop loss guide
• In choppy markets, moving averages give false signals

📌 Best Settings:
• Scalping: EMA 9, 21
• Day Trading: EMA 20, 50
• Swing Trading: SMA 50, 200
• Position Trading: SMA 100, 200`,
  },
  {
    category: "Crypto",
    title: "Crypto Trading for Beginners",
    desc: "Bitcoin, Ethereum, altcoins — understand crypto market cycles and key differences from forex.",
    icon: FileText,
    color: "#F59E0B",
    content: `CRYPTO TRADING FUNDAMENTALS

📌 Major Cryptocurrencies:
• Bitcoin (BTC): Digital gold, store of value, most liquid
• Ethereum (ETH): Smart contract platform, second largest
• BNB: Binance exchange token with utility discounts
• XRP: Fast cross-border payment network
• Solana (SOL): High-speed transactions, growing ecosystem

📌 Crypto vs Forex:
• Crypto: 24/7 trading, higher volatility, more risk
• Forex: Fixed market hours, more regulated, lower volatility
• Both use technical analysis effectively
• Crypto influenced more by news/social media

📌 Market Cycles:
• Accumulation → Uptrend (Bull Run) → Distribution → Downtrend (Bear Market)
• Bitcoin halving every ~4 years drives major bull cycles
• Altcoins often follow BTC direction

📌 Key Platforms:
• Binance — largest exchange by volume
• Coinbase — most trusted in USA
• Bybit / OKX — popular for derivatives

📌 Safety Rules:
• Only invest what you can afford to lose
• Never keep all funds on exchange (use cold wallet)
• Beware of pump-and-dump schemes
• DYOR (Do Your Own Research)
• Never buy based on hype alone`,
  },
  {
    category: "Psychology",
    title: "Trading Psychology Workbook",
    desc: "Overcome fear, greed, and FOMO. Build a disciplined mindset for consistent profits.",
    icon: BookOpen,
    color: "#EC4899",
    content: `TRADING PSYCHOLOGY GUIDE

📌 The Biggest Enemies of a Trader:

• FEAR: Stops you from taking valid setups or makes you exit early
• GREED: Overtrading, moving take profit, adding to losing trades
• FOMO: Fear Of Missing Out — entering trades late, chasing price
• REVENGE TRADING: Trading emotionally after a loss
• OVERCONFIDENCE: After a winning streak, taking reckless risks

📌 Building Trading Discipline:
1. Create a trading plan and follow it religiously
2. Set daily rules: max trades, max loss, trading hours
3. Accept losses as part of the game
4. Review trades weekly in a journal
5. Meditate or exercise before trading sessions

📌 The Winner's Mindset:
• Think in probabilities, not certainties
• Focus on process, not just profits
• A bad trade can be correct; a good trade can be wrong
• Consistency beats one-time windfalls

📌 Trading Journal Template:
Date | Pair | Direction | Entry | SL | TP | Result | Emotion | Lesson

📌 Mental Rules:
• Never check P&L during open trades
• If angry or stressed — don't trade
• Celebrate good processes, not just wins
• Read market structure, not Twitter for signals`,
  },
  {
    category: "Indicators",
    title: "RSI & MACD Deep Dive",
    desc: "Use RSI for overbought/oversold signals and MACD for momentum confirmation.",
    icon: FileText,
    color: "#06B6D4",
    content: `RSI & MACD TRADING GUIDE

📌 RSI (Relative Strength Index):
• Measures momentum on a scale of 0–100
• Above 70 = Overbought (potential sell)
• Below 30 = Oversold (potential buy)
• Best timeframes: 1H, 4H, Daily

Powerful RSI Strategies:
• Divergence: Price makes new high but RSI doesn't = bearish reversal warning
• Hidden Divergence: Price higher low + RSI lower low = trend continuation
• RSI 50 Cross: Above 50 = bullish momentum, below 50 = bearish

📌 MACD (Moving Average Convergence Divergence):
• Components: MACD line, Signal line, Histogram
• Settings: 12, 26, 9 (default)

Key Signals:
• MACD line crosses above signal = buy signal
• MACD line crosses below signal = sell signal
• Histogram expanding = momentum increasing
• Histogram shrinking = momentum fading
• Zero line cross = trend change confirmation

📌 Combining RSI + MACD:
• RSI oversold + MACD bullish cross = Strong buy
• RSI overbought + MACD bearish cross = Strong sell
• Never use indicators alone — confirm with price action

📌 Common Mistakes:
• Trading every RSI 70/30 touch without confluence
• Ignoring the overall trend direction
• Using only one timeframe`,
  },
  {
    category: "Forex",
    title: "Major & Minor Currency Pairs",
    desc: "Deep dive into EUR/USD, GBP/USD, USD/JPY and the most traded pairs in the world.",
    icon: BookOpen,
    color: "#D4AF37",
    content: `CURRENCY PAIRS COMPLETE GUIDE

📌 Major Pairs (USD involved, most liquid):
• EUR/USD: Most traded, tight spreads, follows ECB/Fed news
• GBP/USD (Cable): High volatility, sensitive to UK economic data
• USD/JPY: Safe haven yen, influenced by BOJ policy
• USD/CHF: Swiss franc = safe haven in crisis
• AUD/USD: Follows commodity prices and China data
• USD/CAD: Oil-linked, follows crude oil prices
• NZD/USD: Agricultural commodity currency

📌 Cross Pairs (No USD):
• EUR/GBP: Low volatility, ECB vs BOE policy driven
• EUR/JPY: Good for trend following
• GBP/JPY (The Dragon): Extreme volatility, large moves
• AUD/JPY: Risk sentiment indicator

📌 Exotic Pairs:
• USD/INR, USD/TRY, USD/ZAR
• High spreads, less predictable, higher risk

📌 Pair Selection Strategy:
• Beginners: EUR/USD or USD/JPY
• Intermediate: GBP/USD, AUD/USD
• Advanced: GBP/JPY, cross pairs, exotics

📌 Key Trading Times by Pair:
• EUR/USD: Best during London + NY overlap (6:30–10:30 PM IST)
• GBP/USD: London session (1:30–5:30 PM IST)
• USD/JPY: Tokyo + early London (3:30–8:30 AM IST)`,
  },
];

function PdfCard({
  pdf,
  index,
}: { pdf: (typeof pdfResources)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all duration-300 group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          backgroundColor: `${pdf.color}18`,
          border: `1px solid ${pdf.color}40`,
        }}
      >
        <pdf.icon className="w-6 h-6" style={{ color: pdf.color }} />
      </div>

      <Badge
        className="mb-3 w-fit text-xs font-mono"
        style={{
          backgroundColor: `${pdf.color}15`,
          color: pdf.color,
          border: `1px solid ${pdf.color}35`,
        }}
      >
        {pdf.category}
      </Badge>

      <h3 className="font-display font-bold text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
        {pdf.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">
        {pdf.desc}
      </p>

      <Button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
        data-ocid={`basic_member.pdf.button.${index + 1}`}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Hide Content
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 mr-2" />
            View PDF Content
          </>
        )}
      </Button>

      {expanded && (
        <div className="mt-4 p-4 rounded-xl bg-background/60 border border-primary/20 text-xs font-mono text-foreground/80 whitespace-pre-line leading-relaxed">
          {pdf.content}
        </div>
      )}
    </div>
  );
}

export default function BasicMemberPage() {
  const previewPdf = pdfResources[0];
  const lockedPdfs = pdfResources.slice(1);

  return (
    <div>
      <section className="pt-24 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 right-1/3 w-[500px] h-[400px] bg-primary/8 blur-[100px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs tracking-widest">
              BASIC MEMBER AREA
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-5 leading-tight">
              Trading Education
              <br />
              <span className="gold-gradient">PDF Library</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your complete beginner-to-intermediate trading education resource
              center. Study and master the fundamentals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            data-ocid="basic_member.pdf.item.1"
            className="relative"
          >
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/40 tracking-widest">
                FREE PREVIEW
              </span>
            </div>
            <PdfCard pdf={previewPdf} index={0} />
          </motion.div>
        </div>
      </section>

      <p className="text-sm text-primary font-mono text-center py-4">
        🔒 9 more resources available with access code: ELVENOM
      </p>

      <MemberGate tier="basic">
        <section className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {lockedPdfs.map((pdf, i) => (
              <motion.div
                key={pdf.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`basic_member.pdf.item.${i + 2}`}
              >
                <PdfCard pdf={pdf} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </section>
      </MemberGate>
    </div>
  );
}
