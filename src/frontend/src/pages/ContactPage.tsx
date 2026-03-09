import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import { CheckCircle, Clock, Loader2, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const faqs = [
  {
    id: "faq-signals",
    q: "How often are trading signals sent?",
    a: "We typically send 3–5 high-quality signals per day across forex and crypto markets. We prioritize quality over quantity — every signal must meet strict confluence criteria before being published.",
  },
  {
    id: "faq-winrate",
    q: "What is your average win rate?",
    a: "Our trailing 12-month win rate is 85%. We publish our full signal history publicly — every win and loss — so you can verify this independently.",
  },
  {
    id: "faq-platforms",
    q: "Which trading platforms do your signals work on?",
    a: "Our signals are platform-agnostic and work on MetaTrader 4/5, TradingView, Binance, Coinbase, and any other broker that offers the pairs we trade.",
  },
  {
    id: "faq-experience",
    q: "Do I need prior trading experience?",
    a: "Not at all. Our Trading Academy starts from absolute basics and progresses to advanced strategies. Many of our most successful members started with zero experience.",
  },
  {
    id: "faq-results",
    q: "How quickly will I see results?",
    a: "Results depend on your starting capital, position sizing, and discipline. Most active members with proper risk management see consistent positive returns within 30–60 days.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent! We'll respond within 24 hours.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/30 font-mono text-xs">
              GET IN TOUCH
            </Badge>
            <h1 className="font-display text-5xl font-black mb-4">
              We&apos;re Here to
              <br />
              <span className="gold-gradient">Help You Trade Better</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Questions about signals, education, or membership? Our team
              responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-base mb-1">
                Email Support
              </h3>
              <p className="text-sm text-muted-foreground">
                support@tradeedgepro.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-base mb-1">
                Response Time
              </h3>
              <p className="text-sm text-muted-foreground">
                Within 24 hours on business days
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-base mb-1">
                Support Hours
              </h3>
              <p className="text-sm text-muted-foreground">
                Mon–Fri: 9AM–6PM GMT
                <br />
                Weekends: 10AM–4PM GMT
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div
                className="glass-card rounded-2xl p-16 text-center flex flex-col items-center"
                data-ocid="contact.success_state"
              >
                <div className="w-20 h-20 rounded-full bg-signal-green/15 border border-signal-green/30 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-signal-green" />
                </div>
                <h3 className="font-display font-black text-2xl mb-3">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 border-border hover:border-primary hover:text-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  data-ocid="contact.reset.button"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 space-y-6 relative"
                data-ocid="contact.form.panel"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                <h2 className="font-display font-black text-2xl">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm text-muted-foreground font-display"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-muted/30 border-border focus:border-primary font-body"
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm text-muted-foreground font-display"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-muted/30 border-border focus:border-primary font-body"
                      data-ocid="contact.email.input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground font-display">
                    Subject
                  </Label>
                  <Select
                    value={form.subject}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, subject: v }))
                    }
                  >
                    <SelectTrigger
                      className="bg-muted/30 border-border focus:border-primary"
                      data-ocid="contact.subject.select"
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="signals">Trading Signals</SelectItem>
                      <SelectItem value="education">
                        Education Courses
                      </SelectItem>
                      <SelectItem value="membership">
                        Membership / Billing
                      </SelectItem>
                      <SelectItem value="technical">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm text-muted-foreground font-display"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-muted/30 border-border focus:border-primary resize-none font-body"
                    data-ocid="contact.message.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-display font-bold text-base h-12"
                  disabled={submitMutation.isPending}
                  data-ocid="contact.submit.button"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-secondary/10 text-secondary border border-secondary/30 font-mono text-xs">
              FAQ
            </Badge>
            <h2 className="font-display text-4xl font-black">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="glass-card rounded-xl border border-border/50 px-6"
                  data-ocid={`contact.faq.item.${i + 1}`}
                >
                  <AccordionTrigger className="font-display font-semibold text-left hover:text-primary hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
