import MemberGate from "@/components/MemberGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText } from "lucide-react";
import { motion } from "motion/react";

const pdfResources = [
  {
    category: "Forex Basics",
    title: "Introduction to Forex Trading",
    desc: "Learn currency pairs, pips, lot sizes and how forex markets operate globally.",
    icon: BookOpen,
    color: "#D4AF37",
  },
  {
    category: "Chart Patterns",
    title: "Candlestick Patterns Bible",
    desc: "Master 30+ candlestick patterns including Doji, Hammer, Engulfing, and Morning Star.",
    icon: FileText,
    color: "#60A5FA",
  },
  {
    category: "Technical Analysis",
    title: "Support & Resistance Masterclass",
    desc: "Identify key price levels, breakout zones, and how to trade bounces effectively.",
    icon: FileText,
    color: "#34D399",
  },
  {
    category: "Risk Management",
    title: "Risk Management Handbook",
    desc: "Position sizing, stop-loss placement, and protecting your capital in volatile markets.",
    icon: BookOpen,
    color: "#F87171",
  },
  {
    category: "Chart Patterns",
    title: "Classic Chart Patterns Guide",
    desc: "Head & Shoulders, Double Top/Bottom, Triangles, Flags, and Pennants explained.",
    icon: FileText,
    color: "#A78BFA",
  },
  {
    category: "Indicators",
    title: "Moving Averages Explained",
    desc: "SMA, EMA, and how to use crossovers to identify trend direction and entry points.",
    icon: BookOpen,
    color: "#FBBF24",
  },
  {
    category: "Crypto",
    title: "Crypto Trading for Beginners",
    desc: "Bitcoin, Ethereum, altcoins — understand crypto market cycles and key differences from forex.",
    icon: FileText,
    color: "#F59E0B",
  },
  {
    category: "Psychology",
    title: "Trading Psychology Workbook",
    desc: "Overcome fear, greed, and FOMO. Build a disciplined mindset for consistent profits.",
    icon: BookOpen,
    color: "#EC4899",
  },
  {
    category: "Indicators",
    title: "RSI & MACD Deep Dive",
    desc: "Use RSI for overbought/oversold signals and MACD for momentum confirmation.",
    icon: FileText,
    color: "#06B6D4",
  },
  {
    category: "Forex",
    title: "Major & Minor Currency Pairs",
    desc: "Deep dive into EUR/USD, GBP/USD, USD/JPY and the most traded pairs in the world.",
    icon: BookOpen,
    color: "#D4AF37",
  },
];

function PdfCard({
  pdf,
  index,
}: { pdf: (typeof pdfResources)[0]; index: number }) {
  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col border border-border/40 hover:border-primary/40 transition-all duration-300 group">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          backgroundColor: `${pdf.color}18`,
          border: `1px solid ${pdf.color}40`,
        }}
      >
        <pdf.icon className="w-6 h-6" style={{ color: pdf.color }} />
      </div>

      {/* Category badge */}
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
        className="w-full bg-muted/60 border border-border/60 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all font-display font-semibold text-sm h-10"
        data-ocid={`basic_member.pdf.button.${index + 1}`}
      >
        <FileText className="w-4 h-4 mr-2" />
        View PDF
      </Button>
    </div>
  );
}

export default function BasicMemberPage() {
  const previewPdf = pdfResources[0];
  const lockedPdfs = pdfResources.slice(1);

  return (
    <div>
      {/* Hero — always visible */}
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
              center. Download, study, and master the fundamentals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free preview card — always visible */}
      <section className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            data-ocid="basic_member.pdf.item.1"
            className="relative"
          >
            {/* FREE PREVIEW badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/40 tracking-widest">
                FREE PREVIEW
              </span>
            </div>
            <PdfCard pdf={previewPdf} index={0} />
          </motion.div>
        </div>
      </section>

      {/* Teaser message */}
      <p className="text-sm text-primary font-mono text-center py-4">
        🔒 9 more resources available for Basic members
      </p>

      {/* Locked content */}
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
