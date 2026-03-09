import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BookOpen,
  Eye,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const team = [
  {
    name: "Alexander Voss",
    role: "Head of Forex Analysis",
    specialization: "EUR/USD, GBP/USD, Macro Analysis",
    experience: "12 years",
    initials: "AV",
  },
  {
    name: "Priya Mehta",
    role: "Crypto Markets Lead",
    specialization: "BTC, ETH, DeFi tokens, On-chain Analytics",
    experience: "7 years",
    initials: "PM",
  },
  {
    name: "James Okafor",
    role: "Risk & Technical Analyst",
    specialization: "Price Action, Risk Models, XAU/USD",
    experience: "9 years",
    initials: "JO",
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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/trading-about.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute inset-0 hero-grid opacity-30" />
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
              The Team Behind
              <br />
              <span className="gold-gradient">Your Edge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Founded by professional traders who were tired of poor-quality
              signals, we built the platform we always wanted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Badge className="mb-6 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
                OUR MISSION
              </Badge>
              <h2 className="font-display text-3xl font-black mb-6">
                Democratizing Professional Trading Intelligence
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Wall Street and institutional traders have always had the
                advantage of sophisticated analysis, real-time data, and
                experienced mentors. TradeEdge Pro was built to level the
                playing field — giving retail traders access to the same caliber
                of signals, education, and risk frameworks that professionals
                use every day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              MEET THE ANALYSTS
            </Badge>
            <h2 className="font-display text-4xl font-black">Expert Team</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 text-center group hover:scale-[1.02] transition-transform"
                data-ocid={`about.team.item.${i + 1}`}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/40 flex items-center justify-center mb-6 text-2xl font-display font-black gold-gradient">
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {member.specialization}
                </p>
                <Badge className="bg-muted/50 text-muted-foreground border-border text-xs">
                  {member.experience} experience
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trading Philosophy */}
      <section className="py-20 border-t border-border">
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
