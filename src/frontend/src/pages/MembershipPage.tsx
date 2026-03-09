import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Check, Crown, Shield, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

const tiers = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Start your trading journey",
    price: "$29",
    period: "/month",
    icon: Shield,
    featured: false,
    badge: null,
    features: [
      "5 forex signals per week",
      "2 crypto signals per week",
      "Entry, TP & SL levels included",
      "Access to beginner courses",
      "Email support (48h response)",
      "Community Discord access",
      "Monthly market recap report",
    ],
    cta: "Get Started",
    color: "secondary",
  },
  {
    id: "advance",
    name: "Advance",
    tagline: "For serious active traders",
    price: "$79",
    period: "/month",
    icon: Star,
    featured: false,
    badge: "Popular",
    features: [
      "15 forex signals per week",
      "10 crypto signals per week",
      "Full technical analysis briefs",
      "All beginner + intermediate courses",
      "Priority email support (24h)",
      "Exclusive signals Discord channel",
      "Weekly live Q&A sessions",
      "Risk management masterclass",
      "Portfolio tracker tools",
    ],
    cta: "Get Started",
    color: "primary",
  },
  {
    id: "conqueror",
    name: "Conqueror",
    tagline: "Dominate every market condition",
    price: "$149",
    period: "/month",
    icon: Crown,
    featured: true,
    badge: "Best Value",
    features: [
      "Unlimited forex & crypto signals",
      "Real-time push notifications",
      "Deep-dive institutional analysis",
      "Full course library (all levels)",
      "1-on-1 personal mentor session/mo",
      "VIP-only Discord with Nikhil",
      "Daily live trading room access",
      "Proprietary indicator set",
      "Early access to new strategies",
      "Signal copy-trading integration",
    ],
    cta: "Join the Elite",
    color: "primary",
  },
];

export default function MembershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[400px] bg-primary/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-secondary/8 blur-[80px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs tracking-widest">
              MEMBERSHIP PLANS
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-5 leading-tight">
              Choose Your Path to
              <br />
              <span className="gold-gradient">Trading Mastery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From your first trade to institutional-grade strategies — pick the
              plan that matches your ambition. Upgrade or cancel anytime.
            </p>
          </motion.div>

          {/* Value stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { label: "Active Members", value: "4,200+" },
              { label: "Avg. Win Rate", value: "85%" },
              { label: "Signals Sent", value: "12,000+" },
              { label: "ROI This Year", value: "340%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-black gold-gradient">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.2 }}
              className="relative"
              data-ocid={`membership.${tier.id}.card`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-display font-bold tracking-wide ${
                      tier.featured
                        ? "bg-primary text-primary-foreground gold-glow"
                        : "bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div
                className={`glass-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden ${
                  tier.featured
                    ? "border border-primary/60 shadow-[0_0_40px_rgba(212,175,55,0.18)]"
                    : "border border-border/40"
                }`}
              >
                {/* Featured shimmer line */}
                {tier.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}

                {/* Header */}
                <div className="mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      tier.featured
                        ? "bg-primary/20 border border-primary/40 gold-glow"
                        : "bg-muted/50 border border-border/40"
                    }`}
                  >
                    <tier.icon
                      className={`w-6 h-6 ${
                        tier.featured ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <h2
                    className={`font-display text-2xl font-black mb-1 ${
                      tier.featured ? "gold-gradient" : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-border/30">
                  <div className="flex items-end gap-1">
                    <span
                      className={`font-display text-5xl font-black ${
                        tier.featured ? "gold-gradient" : "text-foreground"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground text-sm mb-2">
                      {tier.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed monthly · Cancel anytime
                  </p>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tier.featured
                            ? "bg-primary/20 border border-primary/40"
                            : "bg-muted/60 border border-border/40"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            tier.featured
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-foreground/80 leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full h-12 font-display font-bold text-base ${
                    tier.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 gold-glow"
                      : "bg-muted/60 text-foreground hover:bg-muted border border-border/60 hover:border-primary/50"
                  }`}
                  data-ocid={`membership.${tier.id}.primary_button`}
                >
                  <Link to="/payment">
                    <Zap className="w-4 h-4 mr-2" />
                    {tier.cta}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          All plans include a{" "}
          <span className="text-primary font-semibold">
            7-day money-back guarantee
          </span>
          . No risk. Payments processed securely via Bitcoin, UPI, and PayPal.
        </motion.p>
      </section>
    </div>
  );
}
