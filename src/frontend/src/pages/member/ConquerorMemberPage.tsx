import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  Calendar,
  Crown,
  ExternalLink,
  FileBarChart,
  LineChart,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

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
    title: "Strategy Masterclass",
    schedule: "Every Saturday · 10:00 AM IST",
    icon: Crown,
    color: "#A78BFA",
  },
];

const vipResources = [
  {
    title: "Proprietary Indicator Guide",
    desc: "Nikhil's custom indicator suite with setup and parameter tuning guide.",
    icon: LineChart,
    color: "#D4AF37",
  },
  {
    title: "Institutional Order Flow PDF",
    desc: "Understand how smart money moves markets and trade alongside institutions.",
    icon: BookMarked,
    color: "#60A5FA",
  },
  {
    title: "Personal Trade Journal Template",
    desc: "A professional Excel/Sheets journal template for tracking every trade and improving over time.",
    icon: FileBarChart,
    color: "#34D399",
  },
  {
    title: "1-on-1 Session Booking",
    desc: "Book your personal mentorship session directly with Nikhil — included with Conqueror membership.",
    icon: Users,
    color: "#F87171",
  },
];

export default function ConquerorMemberPage() {
  return (
    <div>
      {/* Hero — always visible */}
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
        </div>
      </section>

      {/* Session Schedule — always visible as teaser */}
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

          {/* Teaser note */}
          <p className="text-sm text-primary font-mono text-center py-4">
            🔒 Join live meetings and access VIP resources with Conqueror
            membership
          </p>
        </div>
      </section>

      {/* Locked: Live Meeting Card + VIP Resources */}
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

              {/* Live indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-green-400 font-bold tracking-widest">
                  LIVE NOW
                </span>
              </div>

              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center gold-glow">
                <Video className="w-10 h-10 text-primary" />
              </div>

              <h2 className="font-display text-3xl font-black gold-gradient mb-3">
                Live Trading Room
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                Join Nikhil live for real-time market analysis, trade setups,
                and Q&amp;A. Sessions run throughout the week — see schedule
                above.
              </p>

              <Button
                asChild
                className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black text-lg gold-glow"
                data-ocid="conqueror_member.live_meeting.primary_button"
              >
                <a
                  href="https://meet.google.com/tradenikhil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video className="w-5 h-5 mr-3" />
                  Join Live Meeting
                  <ExternalLink className="w-4 h-4 ml-3 opacity-70" />
                </a>
              </Button>
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
                <span className="gold-gradient">Exclusive VIP Resources</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Proprietary tools and content available only to Conqueror
                members
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
                  <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${res.color}18`,
                        border: `1px solid ${res.color}40`,
                      }}
                    >
                      <res.icon
                        className="w-6 h-6"
                        style={{ color: res.color }}
                      />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                      {res.desc}
                    </p>
                    <Button
                      className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
                      data-ocid={`conqueror_member.resource.button.${i + 1}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Resource
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </MemberGate>
    </div>
  );
}
