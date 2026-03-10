import { Badge } from "@/components/ui/badge";
import { BookOpen, Crown, Eye, Shield, Star, Target } from "lucide-react";
import { type Variants, motion } from "motion/react";

const specialists = [
  {
    name: "Hardik Pandey",
    role: "Crypto Expert Lead",
    specialization: "BTC, ETH, Altcoins, DeFi Tokens, On-chain Analytics",
    experience: "4 Years",
    initials: "HP",
    accent: "gold",
    description:
      "Hardik brings deep on-chain expertise and a sharp eye for emerging DeFi narratives. He tracks whale wallets, liquidity shifts, and blockchain-level signals before they reach mainstream charts.",
  },
  {
    name: "Karan Gujar",
    role: "Forex Expert Lead",
    specialization: "EUR/USD, GBP/USD, XAU/USD, Macro Analysis",
    experience: "6 Years",
    initials: "KG",
    accent: "blue",
    description:
      "Karan specializes in macro-driven forex setups, combining central bank policy analysis with institutional order flow. His EUR/USD and gold calls have consistently beaten market benchmarks.",
  },
];

const values = [
  {
    icon: Target,
    title: "Precision Over Volume",
    desc: "We send fewer, higher-quality signals rather than flooding your feed with noise.",
  },
  {
    icon: Shield,
    title: "Capital Protection First",
    desc: "Every setup is evaluated by risk-adjusted return. If the R:R isn't compelling, we skip it.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    desc: "We publish our full signal history including losses — no cherry-picking or hidden track records.",
  },
  {
    icon: BookOpen,
    title: "Education-First",
    desc: "We want you to understand why each trade is taken, building your own edge over time.",
  },
];

const journeyMilestones = [
  {
    year: "2016",
    title: "Started Trading",
    description: "Self-taught journey begins — studying global markets, price action, and the hidden mechanics of institutional order flow from scratch.",
  },
  {
    year: "2018",
    title: "Institutional Methodology",
    description: "Mastered ICT, Smart Money Concepts, and Wyckoff theory. Discovered the patterns that institutional desks use every single day.",
  },
  {
    year: "2020",
    title: "Founded the Platform",
    description: "Launched TradeNikhil Universe Chain with a vision to make institutional-grade intelligence accessible to every retail trader in India.",
  },
  {
    year: "2022",
    title: "2,000+ Members",
    description: "Community grew to thousands of traders — signals, education, and live sessions transforming how retail India approaches the market.",
  },
  {
    year: "2024",
    title: "Market Leader",
    description: "Recognized as one of India's most trusted retail trading educators, with an 85% documented win rate across all published signals.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Injected golden shimmer keyframe */}
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes goldGlowPulse {
          0%, 100% { box-shadow: 0 0 20px oklch(0.75 0.18 85 / 0.35), 0 0 50px oklch(0.75 0.18 85 / 0.15); }
          50% { box-shadow: 0 0 35px oklch(0.75 0.18 85 / 0.6), 0 0 80px oklch(0.75 0.18 85 / 0.25); }
        }
        @keyframes crownPulse {
          0%, 100% { filter: drop-shadow(0 0 6px oklch(0.78 0.18 85 / 0.7)); }
          50% { filter: drop-shadow(0 0 14px oklch(0.78 0.18 85)); }
        }
        @keyframes borderShimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .gold-shimmer-border {
          animation: borderShimmer 2.5s ease-in-out infinite;
        }
        .crown-pulse {
          animation: crownPulse 2s ease-in-out infinite;
        }
        .ceo-card-glow {
          animation: goldGlowPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('/assets/generated/trading-about.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              ABOUT US
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-black mb-6">
              The Minds Behind
              <br />
              <span className="gold-gradient">Your Edge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by institutional-grade traders who turned their expertise
              into a platform every serious trader deserves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== ULTRA-PREMIUM CEO CARD ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto"
          >
            {/* Outer glow wrapper */}
            <div
              className="relative rounded-3xl p-[2px] ceo-card-glow"
              style={{
                background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.45 0.12 75) 30%, oklch(0.88 0.12 90) 50%, oklch(0.45 0.12 75) 70%, oklch(0.78 0.18 85))",
                backgroundSize: "300% 300%",
                animation: "goldShimmer 4s linear infinite, goldGlowPulse 3s ease-in-out infinite",
              }}
              data-ocid="about.team.item.1"
            >
              {/* Gold particle dots */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: i % 3 === 0 ? "3px" : "2px",
                    height: i % 3 === 0 ? "3px" : "2px",
                    background: `oklch(0.88 0.12 90 / ${0.3 + (i % 4) * 0.1})`,
                    top: `${8 + (i * 7) % 85}%`,
                    left: `${3 + (i * 13) % 94}%`,
                    boxShadow: `0 0 4px oklch(0.78 0.18 85 / 0.5)`,
                  }}
                />
              ))}

              {/* Inner card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, oklch(0.06 0.02 80), oklch(0.07 0.025 78) 40%, oklch(0.05 0.015 82))",
                }}
              >
                {/* Top animated gold beam */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] gold-shimmer-border"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, oklch(0.78 0.18 85) 30%, oklch(0.88 0.12 90) 50%, oklch(0.78 0.18 85) 70%, transparent 100%)",
                  }}
                />

                {/* Warm golden vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 0%, oklch(0.65 0.18 80 / 0.08) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 p-8 md:p-12">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div
                        className="relative w-32 h-32 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.65 0.18 80 / 0.25), oklch(0.45 0.12 75 / 0.12))",
                          border: "2px solid oklch(0.78 0.18 85 / 0.6)",
                          boxShadow: "0 0 40px oklch(0.75 0.18 85 / 0.3), inset 0 0 24px oklch(0.75 0.18 85 / 0.08)",
                        }}
                      >
                        <span
                          className="font-display font-black text-4xl"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.88 0.12 90) 50%, oklch(0.65 0.20 75))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          NS
                        </span>
                        {/* Crown badge */}
                        <div
                          className="absolute -top-4 -right-2 w-10 h-10 rounded-full flex items-center justify-center crown-pulse"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.65 0.18 80 / 0.4), oklch(0.45 0.12 75 / 0.2))",
                            border: "1.5px solid oklch(0.78 0.18 85 / 0.7)",
                          }}
                        >
                          <Crown
                            className="w-5 h-5"
                            style={{ color: "oklch(0.82 0.16 85)" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                        <Badge
                          style={{
                            background: "oklch(0.65 0.18 80 / 0.2)",
                            borderColor: "oklch(0.78 0.18 85 / 0.5)",
                            color: "oklch(0.88 0.12 90)",
                          }}
                          className="font-mono text-xs border"
                        >
                          ♛ FOUNDER & CEO
                        </Badge>
                        <Badge className="bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
                          RISK MANAGEMENT & PSYCHOLOGY
                        </Badge>
                      </div>

                      <h2
                        className="font-display text-4xl md:text-5xl font-black mb-1"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.88 0.12 90), oklch(0.78 0.18 85) 40%, oklch(0.65 0.20 75) 70%, oklch(0.78 0.18 85))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Nikhil Singh
                      </h2>
                      <p
                        className="text-sm font-mono font-medium mb-6"
                        style={{ color: "oklch(0.65 0.18 80 / 0.9)" }}
                      >
                        Founder & CEO — TradeNikhil Universe Chain
                      </p>

                      {/* Achievement stats */}
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                        {[
                          { value: "8+ Years", label: "Experience" },
                          { value: "2,000+", label: "Members" },
                          { value: "85%", label: "Win Rate" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="px-4 py-2 rounded-xl text-center"
                            style={{
                              background: "oklch(0.65 0.18 80 / 0.1)",
                              border: "1px solid oklch(0.65 0.18 80 / 0.3)",
                            }}
                          >
                            <div
                              className="font-display font-black text-xl"
                              style={{
                                background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.88 0.12 90))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs font-mono mt-0.5" style={{ color: "oklch(0.55 0.05 80)" }}>
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-8 h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(0.65 0.18 80 / 0.4), transparent)",
                    }}
                  />

                  {/* Expanded biography */}
                  <div className="space-y-5 text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 80)" }}>
                    <p>
                      Nikhil Singh began his journey as a self-taught market analyst, driven by an obsession with understanding what truly moves price. Long before algorithmic trading became mainstream, he was manually charting institutional footprints — mapping order blocks, liquidity sweeps, and the engineered traps that separate professional traders from retail participants.
                    </p>
                    <p>
                      Over years of rigorous study, Nikhil mastered ICT methodology, Smart Money Concepts, and the Wyckoff accumulation-distribution framework — building an analytical system so precise it could identify institutional intent across any market or timeframe. This framework became the intellectual backbone of everything TradeNikhil Universe Chain offers today.
                    </p>
                    <p>
                      In founding TradeNikhil Universe Chain, Nikhil had one mission: to democratize institutional-grade trading intelligence for retail traders across India. What was once exclusive to proprietary trading desks and hedge funds is now available to every serious trader willing to put in the work. Under his leadership, the platform has guided over 2,000 members to trade with the precision and discipline of professionals.
                    </p>
                  </div>

                  {/* Journey Timeline */}
                  <div className="mt-10">
                    <h3
                      className="font-display font-bold text-lg mb-6 flex items-center gap-2"
                      style={{ color: "oklch(0.82 0.16 85)" }}
                    >
                      <span
                        className="w-6 h-px inline-block"
                        style={{ background: "oklch(0.65 0.18 80 / 0.6)" }}
                      />
                      Journey Timeline
                      <span
                        className="flex-1 h-px"
                        style={{ background: "linear-gradient(90deg, oklch(0.65 0.18 80 / 0.4), transparent)" }}
                      />
                    </h3>
                    <div className="relative">
                      {/* Timeline line */}
                      <div
                        className="absolute left-[52px] top-3 bottom-3 w-px"
                        style={{ background: "linear-gradient(180deg, oklch(0.65 0.18 80 / 0.5), oklch(0.65 0.18 80 / 0.1))" }}
                      />
                      <div className="space-y-6">
                        {journeyMilestones.map((milestone, i) => (
                          <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex items-start gap-5"
                          >
                            {/* Year badge */}
                            <div
                              className="flex-shrink-0 w-[104px] text-right"
                            >
                              <span
                                className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                                style={{
                                  background: "oklch(0.65 0.18 80 / 0.15)",
                                  color: "oklch(0.82 0.16 85)",
                                  border: "1px solid oklch(0.65 0.18 80 / 0.35)",
                                }}
                              >
                                {milestone.year}
                              </span>
                            </div>
                            {/* Dot */}
                            <div
                              className="flex-shrink-0 w-3 h-3 rounded-full mt-1"
                              style={{
                                background: "oklch(0.78 0.18 85)",
                                boxShadow: "0 0 8px oklch(0.78 0.18 85 / 0.7)",
                              }}
                            />
                            {/* Content */}
                            <div className="flex-1 pb-2">
                              <h4
                                className="font-display font-bold text-sm mb-1"
                                style={{ color: "oklch(0.85 0.08 85)" }}
                              >
                                {milestone.title}
                              </h4>
                              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.5 0.03 80)" }}>
                                {milestone.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Signature quote */}
                  <div
                    className="mt-10 pt-8 relative"
                    style={{
                      borderTop: "1px solid oklch(0.65 0.18 80 / 0.2)",
                    }}
                  >
                    {/* Decorative quotation mark */}
                    <div
                      className="absolute -top-6 left-0 font-display text-8xl leading-none select-none pointer-events-none"
                      style={{ color: "oklch(0.65 0.18 80 / 0.2)" }}
                    >
                      &ldquo;
                    </div>
                    <blockquote className="relative z-10 text-center px-8">
                      <p
                        className="font-display italic text-xl md:text-2xl font-bold leading-relaxed mb-4"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.88 0.12 90), oklch(0.78 0.18 85) 50%, oklch(0.65 0.20 75))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        &ldquo;The institutional edge is not a secret — it&apos;s a skill. I built this platform so every trader can learn it.&rdquo;
                      </p>
                      <cite
                        className="font-mono text-sm not-italic"
                        style={{ color: "oklch(0.55 0.08 80)" }}
                      >
                        — Nikhil Singh, Founder & CEO
                      </cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expert Team Section Header */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              SPECIALIST ANALYSTS
            </Badge>
            <h2 className="font-display text-4xl font-black">
              Expert <span className="gold-gradient">Column</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Each specialist owns their domain — delivering institutional-grade
              analysis where it matters most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specialist Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {specialists.map((member, i) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 group hover:scale-[1.02] transition-transform relative overflow-hidden"
                data-ocid={`about.team.item.${i + 2}`}
              >
                {/* Accent top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${
                    member.accent === "gold"
                      ? "bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                      : "bg-gradient-to-r from-transparent via-secondary/70 to-transparent"
                  }`}
                />

                <div className="flex items-start gap-5">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-xl ${
                      member.accent === "gold"
                        ? "bg-primary/15 border border-primary/40"
                        : "bg-secondary/15 border border-secondary/40"
                    }`}
                  >
                    <span
                      className={
                        member.accent === "gold"
                          ? "gold-gradient"
                          : "text-secondary"
                      }
                    >
                      {member.initials}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-0.5">
                      {member.name}
                    </h3>
                    <p
                      className={`text-sm font-medium mb-3 ${
                        member.accent === "gold"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    >
                      {member.role}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        className={`text-xs border ${
                          member.accent === "gold"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-secondary/10 text-secondary border-secondary/30"
                        }`}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {member.experience} Experience
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                  {member.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs text-muted-foreground/60 font-mono">
                    <span
                      className={
                        member.accent === "gold"
                          ? "text-primary/70"
                          : "text-secondary/70"
                      }
                    >
                      SPECIALIZATION:
                    </span>{" "}
                    {member.specialization}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Badge className="mb-6 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
                OUR MISSION
              </Badge>
              <h2 className="font-display text-3xl font-black mb-6">
                Democratizing Professional Trading Intelligence
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Wall Street and institutional traders have always had the
                advantage of sophisticated analysis, real-time data, and
                experienced mentors. TradeNikhil Universe Chain was built to
                level the playing field — giving retail traders access to the
                same caliber of signals, education, and risk frameworks that
                professionals use every day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trading Philosophy */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
                APPROACH
              </Badge>
              <h2 className="font-display text-4xl font-black mb-6">
                Our Trading
                <br />
                <span className="gold-gradient">Philosophy</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We operate on a strict confluence-first model: no trade is
                  signaled unless multiple independent technical and fundamental
                  factors align in the same direction. This approach
                  dramatically reduces false signals.
                </p>
                <p>
                  We use multi-timeframe analysis (HTF bias → LTF entry), key
                  institutional levels, volume profile, and macroeconomic data
                  as our core framework. Each signal includes context so you
                  understand the reasoning, not just the numbers.
                </p>
                <p>
                  Our stop losses are always placed at structurally meaningful
                  levels — never arbitrary pips. This ensures you&apos;re stopped out
                  only when the trade thesis is genuinely invalidated.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="glass-card rounded-xl p-6"
                  data-ocid={`about.value.item.${i + 1}`}
                >
                  <v.icon className="w-6 h-6 text-primary mb-3" />
                  <h4 className="font-display font-bold text-sm mb-2">
                    {v.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
