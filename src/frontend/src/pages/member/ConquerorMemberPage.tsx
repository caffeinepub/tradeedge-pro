import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Crown,
  ExternalLink,
  FileBarChart,
  LineChart,
  MessageCircle,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const sessions = [
  {
    title: "Daily Market Analysis",
    schedule: "Mon–Fri · 8:00 AM IST",
    icon: LineChart,
    color: "#D4AF37",
  },
  {
    title: "Forex Signals Review",
    schedule: "Mon, Wed, Fri · 6:00 PM IST",
    icon: FileBarChart,
    color: "#60A5FA",
  },
  {
    title: "Crypto Deep Dive",
    schedule: "Every Tuesday · 7:00 PM IST",
    icon: LineChart,
    color: "#F59E0B",
  },
  {
    title: "Elite Strategy Masterclass",
    schedule: "Every Saturday · 7:00 PM – 9:00 PM IST",
    icon: Crown,
    color: "#A78BFA",
  },
];

const vipResources = [
  {
    title: "Institutional Order Flow Mastery",
    desc: "How banks and hedge funds move markets. Identify smart money footprints and trade alongside institutions.",
    icon: LineChart,
    color: "#D4AF37",
    content: `INSTITUTIONAL ORDER FLOW — ELITE GUIDE

📌 How Smart Money Works:
Big institutions (banks, hedge funds) cannot enter/exit positions quickly. They use manipulation to build positions.

📌 The 3 Phases:
1. Accumulation: Institutions accumulate large positions (sideways market)
2. Distribution: Institutions distribute/exit positions
3. Manipulation: Fake moves to hunt retail stop losses

📌 Identifying Order Blocks:
• Large institutional orders leave "imprints" on the chart
• Order Block = Last bearish candle before major up-move (for buys)
• Order Block = Last bullish candle before major down-move (for sells)
• Price ALWAYS returns to order blocks — high probability entry

📌 Fair Value Gaps (FVG):
• 3-candle pattern where middle candle leaves a gap
• Bullish FVG: Candle 1 low > Candle 3 high = fill gap with buy
• Bearish FVG: Candle 1 high < Candle 3 low = fill gap with sell

📌 Liquidity Concepts:
• Equal Highs/Lows = Liquidity pools (stop orders sitting there)
• Market sweeps these levels to fill institutional orders
• After sweep = immediate reversal = best entry signal

📌 Daily Bias:
• Mark HTF (Higher TimeFrame) order blocks
• Check if price is in premium or discount zone (using Fibonacci)
• Only buy in discount zones, only sell in premium zones`,
  },
  {
    title: "Advanced Liquidity Zone Trading",
    desc: "Identify where stop losses are concentrated, predict sweeps, and enter after manipulation is complete.",
    icon: BookMarked,
    color: "#60A5FA",
    content: `LIQUIDITY ZONE TRADING — ELITE GUIDE

📌 Understanding Liquidity:
Retail traders place stop losses at obvious levels. Institutions target these to fill large orders.

📌 Types of Liquidity:
• Buy-Side Liquidity: Stop losses above swing highs (short sellers)
• Sell-Side Liquidity: Stop losses below swing lows (long holders)
• Equal Highs/Lows: Double tops/bottoms — massive stop concentration

📌 The Sweep Pattern:
1. Market approaches obvious swing high/low
2. Wicks above/below to trigger stop losses
3. IMMEDIATE reversal after sweep
4. This is institutional order execution

📌 Entry After Liquidity Sweep:
1. Identify liquidity pool (swing high or equal highs)
2. Wait for price to approach and wick through
3. See a strong reversal candle close back below/above
4. Enter on next candle
5. Stop: Beyond the sweep wick
6. Target: Opposing liquidity pool

📌 Market Structure Shift (MSS):
• After sweep, price breaks the most recent internal high/low
• This confirms the reversal — MSS is your confidence signal

📌 Example:
• Price has equal highs at 1.2050
• Wicks to 1.2060, closes at 1.2040
• Break below 1.2020 (MSS) = confirmed sell entry
• Target: 1.1950 liquidity below`,
  },
  {
    title: "Elite Trade Journal & Template",
    desc: "Professional trade documentation system for tracking performance, psychology, and continuous improvement.",
    icon: FileBarChart,
    color: "#34D399",
    content: `ELITE TRADING JOURNAL SYSTEM

📌 Why Journaling is Critical:
Professional traders review every trade. Patterns in losses reveal fixable mistakes worth thousands of dollars.

📌 Trade Entry Template:
═══════════════════════════════
Date & Time: ____________
Pair: ____________
Direction: BUY / SELL
Timeframe Analysis: ____________
Entry Price: ____________
Stop Loss: ____________
Take Profit 1: ____________
Take Profit 2: ____________
Risk %: _______ R:R: _______
Setup Type: ____________
HTF Bias: BULLISH / BEARISH / NEUTRAL
Confluences: ____________
Emotion Before Entry: ____________
═══════════════════════════════

📌 Trade Exit Template:
Exit Price: ____________
Result: WIN / LOSS / BREAKEVEN
P&L (pips): ____________
Actual R:R: ____________
Emotion During Trade: ____________
Mistakes Made: ____________
What I Did Right: ____________
Lesson Learned: ____________

📌 Weekly Review Questions:
• Did I follow my trading plan? (Y/N)
• How many setups did I miss? Why?
• What was my average R:R this week?
• Did emotions affect any trades?
• What is ONE thing to improve next week?

📌 Monthly Performance Metrics:
• Win Rate: ___%
• Average Win (pips): ___
• Average Loss (pips): ___
• Best Trade: ___
• Worst Trade: ___
• Net P&L: ___`,
  },
  {
    title: "1-on-1 Mentor Session Booking",
    desc: "Book your personal mentorship with Nikhil directly via WhatsApp. Elite members only.",
    icon: Users,
    color: "#F87171",
    content: `1-ON-1 MENTORSHIP — ELITE EXCLUSIVE

📌 What's Included:
• 60-minute personal session with Nikhil
• Live chart analysis on your chosen pairs
• Strategy review tailored to your trading style
• Psychology coaching and mindset alignment
• Q&A on any trading topic

📌 How to Book:
1. Message on WhatsApp: +91 78284 96002
2. Include: "Elite Mentorship Request" in your message
3. Share your preferred date and time
4. Confirm the Google Meet link below

📌 Session Format:
• Platform: Google Meet
• Duration: 60 minutes
• Frequency: 1 session included per month
• Additional sessions available at member rates

📌 Preparation Checklist:
• Review your last 10 trades before the session
• Have 3 specific questions ready
• Screenshot your trading journal
• Mark key levels on current charts

📌 Contact:
WhatsApp: +91 78284 96002
Google Meet: https://meet.google.com/fzc-musn-eib`,
  },
];

function ResourceCard({
  res,
  index,
}: { res: (typeof vipResources)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{
          backgroundColor: `${res.color}18`,
          border: `1px solid ${res.color}40`,
        }}
      >
        <res.icon className="w-6 h-6" style={{ color: res.color }} />
      </div>
      <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
        {res.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
        {res.desc}
      </p>
      <Button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
        data-ocid={`conqueror_member.resource.button.${index + 1}`}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Hide Content
          </>
        ) : (
          <>
            <ExternalLink className="w-4 h-4 mr-2" />
            Access Resource
          </>
        )}
      </Button>
      {expanded && (
        <div className="mt-4 p-4 rounded-xl bg-background/60 border border-primary/20 text-xs font-mono text-foreground/80 whitespace-pre-line leading-relaxed">
          {res.content}
        </div>
      )}
    </div>
  );
}

export default function ConquerorMemberPage() {
  return (
    <div>
      <section className="pt-24 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 right-1/4 w-[600px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/15 text-primary border border-primary/40 font-mono text-xs tracking-widest gold-glow">
              ✦ CONQUEROR ELITE AREA ✦
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-5 leading-tight">
              Elite Trading Room
              <br />
              <span className="gold-gradient">Live &amp; Exclusive</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The most exclusive tier. Live trading sessions with Nikhil,
              proprietary tools, and VIP resources you won't find anywhere else.
            </p>
          </motion.div>

          {/* Meeting time + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-full border border-primary/40 gold-glow">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-foreground">
                Elite Meeting:{" "}
                <span className="text-primary font-bold">
                  7:00 PM – 9:00 PM IST
                </span>
              </span>
            </div>
            <a
              href="https://wa.me/917828496002"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="conqueror_member.whatsapp.button"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-display font-bold px-6 rounded-full h-11">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Session Schedule */}
      <section className="container mx-auto px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-black mb-2">
              <span className="gold-gradient">Session Schedule</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              All times in Indian Standard Time (IST)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sessions.map((session, i) => (
              <motion.div
                key={session.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                data-ocid={`conqueror_member.session.item.${i + 1}`}
              >
                <div className="glass-card rounded-2xl p-6 border border-border/40 hover:border-primary/40 transition-all flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${session.color}18`,
                      border: `1px solid ${session.color}40`,
                    }}
                  >
                    <session.icon
                      className="w-6 h-6"
                      style={{ color: session.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground font-mono">
                        {session.schedule}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-primary font-mono text-center py-4">
            🔒 Join live meetings and access Elite resources with access code:
            ELDRUGS
          </p>
        </div>
      </section>

      <MemberGate tier="conqueror">
        {/* Live Meeting Card */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="glass-card rounded-3xl p-10 border border-primary/50 text-center relative overflow-hidden"
              style={{
                boxShadow:
                  "0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(212,175,55,0.08)",
              }}
              data-ocid="conqueror_member.live_meeting.card"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-green-400 font-bold tracking-widest">
                  LIVE SESSIONS ACTIVE
                </span>
              </div>

              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center gold-glow">
                <Video className="w-10 h-10 text-primary" />
              </div>

              <h2 className="font-display text-3xl font-black gold-gradient mb-1">
                Live Trading Room
              </h2>
              <p className="text-primary font-mono text-sm mb-3 font-bold">
                7:00 PM – 9:00 PM IST
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                Join Nikhil live for real-time market analysis, institutional
                order flow breakdowns, trade setups, and Q&amp;A. Every Saturday
                7–9 PM IST.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black text-lg gold-glow"
                  data-ocid="conqueror_member.live_meeting.primary_button"
                >
                  <a
                    href="https://meet.google.com/fzc-musn-eib"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Video className="w-5 h-5 mr-3" />
                    Join Live Meeting
                    <ExternalLink className="w-4 h-4 ml-3 opacity-70" />
                  </a>
                </Button>

                <Button
                  asChild
                  className="h-14 px-8 bg-green-600 hover:bg-green-700 text-white font-display font-bold text-base"
                  data-ocid="conqueror_member.whatsapp_cta.button"
                >
                  <a
                    href="https://wa.me/917828496002"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Nikhil
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* VIP Resources */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-3xl font-black mb-2">
                <span className="gold-gradient">Exclusive Elite Resources</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Institutional-grade content available only to Conqueror members
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {vipResources.map((res, i) => (
                <motion.div
                  key={res.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  data-ocid={`conqueror_member.resource.item.${i + 1}`}
                >
                  <ResourceCard res={res} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </MemberGate>
    </div>
  );
}
