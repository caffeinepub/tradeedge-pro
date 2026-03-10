import MarketTicker from "@/components/MarketTicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const stats = [
  { label: "Active Members", value: "2,000+", icon: Users },
  { label: "Win Rate", value: "85%", icon: Target },
  { label: "Signals Delivered", value: "500+", icon: TrendingUp },
  { label: "Years Experience", value: "5+", icon: Award },
];

const features = [
  {
    icon: TrendingUp,
    title: "Precision Signals",
    desc: "Algorithmically-verified entry, TP, and SL levels backed by our senior analysts' expertise.",
    color: "gold",
  },
  {
    icon: BookOpen,
    title: "Expert Education",
    desc: "From beginner to advanced — structured courses, live analysis, and pattern libraries.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "24/7 Market Coverage",
    desc: "Round-the-clock monitoring of forex sessions and crypto markets across all major pairs.",
    color: "gold",
  },
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Every signal includes calculated risk/reward ratios — we protect your capital first.",
    color: "blue",
  },
];

const starKeys = ["s1", "s2", "s3", "s4", "s5"];

const testimonials = [
  {
    name: "Marcus Thornton",
    role: "Professional Forex Trader",
    text: "TradeNikhil Universe Chain transformed my trading. The signal accuracy is unmatched — I've grown my account 140% in six months following their setups.",
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Crypto Investor",
    text: "I was skeptical at first, but the BTC and ETH signals hit consistently. The education modules helped me understand the WHY behind each trade.",
    rating: 5,
  },
  {
    name: "Sophia Reinholt",
    role: "Part-Time Trader",
    text: "The risk management framework alone was worth the subscription. I sleep better knowing my positions are protected with proper stop losses.",
    rating: 5,
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

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/trading-hero.dim_1600x900.jpg')",
          }}
        />
        {/* Deep darkness overlays */}
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        {/* Subtle gold glow blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[140px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/8 blur-[140px] translate-x-1/2 translate-y-1/2" />
        {/* Extra dark vignette at edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/10 font-mono text-xs">
                ⬡ LIVE SIGNALS ACTIVE
              </Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
            >
              Trade Smarter.
              <br />
              <span className="gold-gradient">Profit Consistently.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            >
              Professional forex and cryptocurrency trading signals, expert
              education, and real-time market analysis — everything you need to
              gain the institutional edge.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-semibold text-base px-8"
                data-ocid="home.view_signals.button"
              >
                <Link to="/signals">
                  View Signals <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/5 hover:border-secondary hover:text-secondary hover:bg-secondary/5 font-semibold text-base px-8 backdrop-blur-sm"
                data-ocid="home.start_learning.button"
              >
                <Link to="/education">
                  <BookOpen className="w-4 h-4 mr-2" /> Start Learning
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating stats — darker cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center bg-black/60 border border-white/10 backdrop-blur-md"
              >
                <div className="font-display font-black text-2xl gold-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10">
          <MarketTicker />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
              WHY TRADENIKHIL UNIVERSE CHAIN
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-black mb-4">
              Your Complete{" "}
              <span className="gold-gradient">Trading Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything professional traders need — signals, education, and
              risk management — in one platform.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className={`glass-card${f.color === "blue" ? "-blue" : ""} rounded-2xl p-8 group hover:scale-[1.02] transition-transform duration-300 bg-black/20`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    f.color === "gold"
                      ? "bg-primary/15 border border-primary/30"
                      : "bg-secondary/15 border border-secondary/30"
                  }`}
                >
                  <f.icon
                    className={`w-6 h-6 ${f.color === "gold" ? "text-primary" : "text-secondary"}`}
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar — very dark */}
      <section className="py-16 bg-black/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary opacity-60" />
                <div className="font-display font-black text-4xl gold-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              TRADER TESTIMONIALS
            </Badge>
            <h2 className="font-display text-4xl font-black">
              Results That Speak
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 bg-black/40"
                data-ocid={`home.testimonial.item.${i + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {starKeys.slice(0, t.rating).map((k) => (
                    <Star
                      key={k}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div>
                  <div className="font-semibold font-display text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — intense dark */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-primary/3" />
        <div className="absolute inset-0 hero-grid opacity-30" />
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 blur-[120px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl font-black mb-6">
              Ready to Trade Like a{" "}
              <span className="gold-gradient">Professional?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Join 2,000+ traders who rely on TradeNikhil Universe Chain signals
              every day. Start with education or dive straight into live
              signals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-semibold text-base px-10"
                data-ocid="home.cta.signals.button"
              >
                <Link to="/signals">View Live Signals</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/5 hover:border-primary hover:text-primary font-semibold text-base px-10"
                data-ocid="home.cta.contact.button"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
