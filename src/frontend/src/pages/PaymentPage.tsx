import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Bitcoin, CheckCircle, Copy, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiPaypal } from "react-icons/si";
import { toast } from "sonner";

const paymentMethods = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    subtitle: "Crypto Payment",
    description:
      "Send BTC to the wallet address below. Payments are confirmed after 2 network confirmations (~20 min).",
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "BTC Wallet Address",
    icon: Bitcoin,
    iconBrand: null,
    color: "#F7931A",
    bgClass: "from-[#F7931A]/10 to-transparent",
    borderClass: "border-[#F7931A]/30",
    glowClass: "shadow-[0_0_30px_rgba(247,147,26,0.15)]",
    note: "Minimum payment: $10 USD equivalent in BTC",
  },
  {
    id: "upi",
    name: "UPI",
    subtitle: "Instant Bank Transfer (India)",
    description:
      "Open any UPI app (PhonePe, GPay, Paytm, etc.) and send to the UPI ID below. Instant processing.",
    value: "nikhilsingh@ybl",
    label: "UPI ID",
    icon: null,
    iconBrand: null,
    color: "#6C3CE1",
    bgClass: "from-[#6C3CE1]/10 to-transparent",
    borderClass: "border-[#6C3CE1]/30",
    glowClass: "shadow-[0_0_30px_rgba(108,60,225,0.15)]",
    note: "Supported apps: GPay, PhonePe, Paytm, BHIM, and all UPI apps",
  },
  {
    id: "paypal",
    name: "PayPal",
    subtitle: "Global Online Payment",
    description:
      "Send payment via PayPal Friends & Family to avoid fees. Use the email address below.",
    value: "nikhilsingh123321123@gmail.com",
    label: "PayPal Email",
    icon: null,
    iconBrand: SiPaypal,
    color: "#003087",
    bgClass: "from-[#009CDE]/10 to-transparent",
    borderClass: "border-[#009CDE]/30",
    glowClass: "shadow-[0_0_30px_rgba(0,156,222,0.12)]",
    note: 'Please use "Friends & Family" to avoid transaction fees',
  },
];

function CopyButton({ value, ocid }: { value: string; ocid: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-ocid={ocid}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/60 hover:border-primary/50 hover:bg-muted/80 transition-all duration-200 text-sm font-mono text-foreground/80 hover:text-foreground group w-full sm:w-auto"
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
      )}
      <span className="truncate max-w-[220px] sm:max-w-xs">{value}</span>
    </button>
  );
}

export default function PaymentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 left-1/3 w-[500px] h-[400px] bg-primary/8 blur-[100px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs tracking-widest">
              PAYMENT OPTIONS
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-5 leading-tight">
              Simple, Secure
              <br />
              <span className="gold-gradient">Payment Methods</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose your preferred payment method below. After sending, contact
              us with your transaction ID and we'll activate your plan within 2
              hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
              className={`glass-card rounded-2xl p-7 border ${method.borderClass} ${method.glowClass} relative overflow-hidden`}
              data-ocid={`payment.${method.id}.card`}
            >
              {/* Gradient tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.bgClass} opacity-60 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${method.color}1a`,
                      borderColor: `${method.color}40`,
                    }}
                  >
                    {method.id === "bitcoin" && (
                      <Bitcoin
                        className="w-7 h-7"
                        style={{ color: method.color }}
                      />
                    )}
                    {method.id === "upi" && (
                      <span
                        className="font-display font-black text-lg"
                        style={{ color: method.color }}
                      >
                        UPI
                      </span>
                    )}
                    {method.id === "paypal" && method.iconBrand && (
                      <method.iconBrand
                        className="w-7 h-7"
                        style={{ color: "#009CDE" }}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-black text-foreground">
                      {method.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {method.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                  {method.description}
                </p>

                {/* Value + Copy */}
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {method.label}
                  </p>
                  <CopyButton
                    value={method.value}
                    ocid={`payment.${method.id}.button`}
                  />
                </div>

                {/* Note */}
                <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-muted/30 border border-border/30">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{method.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* After payment instruction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div
            className="glass-card rounded-2xl p-7 border border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.12)] relative overflow-hidden"
            data-ocid="payment.instructions.panel"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-2">
                  After Payment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once you've sent the payment, please{" "}
                  <Link
                    to="/contact"
                    className="text-primary hover:text-primary/80 font-semibold underline underline-offset-2"
                    data-ocid="payment.contact.link"
                  >
                    contact us on the Contact page
                  </Link>{" "}
                  with your{" "}
                  <strong className="text-foreground">transaction ID</strong>{" "}
                  and the{" "}
                  <strong className="text-foreground">plan you selected</strong>
                  . We will manually verify and activate your membership within{" "}
                  <span className="text-primary font-semibold">
                    2 business hours
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Choose plan CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Not sure which plan to pick?
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-display font-bold"
            data-ocid="payment.view_plans.button"
          >
            <Link to="/membership">View Membership Plans</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
