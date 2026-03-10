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

      {/* Boss Card — Nikhil Singh */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="relative rounded-3xl p-1 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.18 85 / 0.6), oklch(0.45 0.12 85 / 0.2), oklch(0.75 0.18 85 / 0.5))",
              }}
              data-ocid="about.team.item.1"
            >
              {/* Glow bg */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-black/80 to-black/90" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />

              <div className="relative z-10 rounded-3xl bg-black/70 backdrop-blur-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className="relative w-28 h-28 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.75 0.18 85 / 0.3), oklch(0.55 0.14 85 / 0.15))",
                        border: "2px solid oklch(0.75 0.18 85 / 0.5)",
                        boxShadow:
                          "0 0 40px oklch(0.75 0.18 85 / 0.25), inset 0 0 20px oklch(0.75 0.18 85 / 0.1)",
                      }}
                    >
                      <span className="font-display font-black text-3xl gold-gradient">
                        NS
                      </span>
                      {/* Crown badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <Crown className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                      <Badge
                        style={{
                          background: "oklch(0.75 0.18 85 / 0.15)",
                          borderColor: "oklch(0.75 0.18 85 / 0.4)",
                          color: "oklch(0.85 0.15 85)",
                        }}
                        className="font-mono text-xs border"
                      >
                        ♛ FOUNDER & CEO
                      </Badge>
                      <Badge className="bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
                        RISK MANAGEMENT & PSYCHOLOGY
                      </Badge>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl font-black mb-1">
                      Nikhil Singh
                    </h2>
                    <p className="text-primary text-sm font-mono font-medium mb-4 opacity-80">
                      Founder & CEO — TradeNikhil Universe Chain
                    </p>

                    <p className="text-muted-foreground leading-relaxed text-base max-w-2xl">
                      Nikhil Singh founded TradeNikhil Universe Chain with a
                      single vision: to give every trader the
                      institutional-grade edge. Starting as a self-taught market
                      analyst, he spent years decoding the hidden mechanics of
                      professional trading floors before building this platform
                      from the ground up. As CEO, he oversees all operations,
                      risk management frameworks, and trader psychology coaching
                      — ensuring every member trades with discipline, precision,
                      and unshakeable confidence.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-6 justify-center md:justify-start">
                      <div className="text-center">
                        <div className="font-display font-black text-2xl gold-gradient">
                          ∞
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Founder
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-display font-black text-2xl gold-gradient">
                          2K+
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Members Mentored
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-display font-black text-2xl gold-gradient">
                          100%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Commitment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom tagline */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-sm text-muted-foreground/60 italic font-mono">
                    "The market rewards discipline. Everything else is noise."
                    <span className="ml-2 text-primary/60 not-italic">
                      — Nikhil Singh
                    </span>
                  </p>
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
                  levels — never arbitrary pips. This ensures you're stopped out
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
