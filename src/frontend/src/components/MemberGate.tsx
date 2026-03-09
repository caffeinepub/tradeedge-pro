import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Lock, LogOut, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

const ACCESS_CODES: Record<string, string> = {
  basic: "BASIC2024",
  advance: "ADVANCE2024",
  conqueror: "CONQUEROR2024",
};

const TIER_LABELS: Record<string, string> = {
  basic: "Basic",
  advance: "Advance",
  conqueror: "Conqueror",
};

const BACKDROP_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

function getStorageKey(tier: string) {
  return `membership_${tier}`;
}

function isUnlocked(tier: string) {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getStorageKey(tier)) === ACCESS_CODES[tier];
}

interface MemberGateProps {
  tier: "basic" | "advance" | "conqueror";
  children: ReactNode;
}

export default function MemberGate({ tier, children }: MemberGateProps) {
  const [unlocked, setUnlocked] = useState(() => isUnlocked(tier));
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const tierLabel = TIER_LABELS[tier];

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === ACCESS_CODES[tier]) {
      localStorage.setItem(getStorageKey(tier), ACCESS_CODES[tier]);
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid access code. Please check and try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(getStorageKey(tier));
    setUnlocked(false);
    setCode("");
  };

  if (unlocked) {
    return (
      <div className="relative">
        {/* Member badge */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full border border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary font-bold">
              {tierLabel} Member
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Log out"
              data-ocid={`member_gate.${tier}.toggle`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Blurred preview backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95" />
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div
          className="grid grid-cols-3 gap-4 p-8 opacity-20 select-none"
          aria-hidden="true"
        >
          {BACKDROP_KEYS.map((k) => (
            <div
              key={k}
              className="glass-card rounded-xl h-32 border border-border/20"
            />
          ))}
        </div>
      </div>

      {/* Gate overlay */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md mx-auto px-4"
          data-ocid={`member_gate.${tier}.panel`}
        >
          <div className="glass-card rounded-3xl p-10 border border-primary/30 shadow-[0_0_60px_rgba(212,175,55,0.15)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Lock icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <Lock className="w-9 h-9 text-primary" />
            </motion.div>

            <h2 className="font-display text-3xl font-black mb-2 gold-gradient">
              Members Only
            </h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Purchase the{" "}
              <span className="text-foreground font-semibold">{tierLabel}</span>{" "}
              membership to access this exclusive content.
            </p>

            {/* Code input */}
            <div className="space-y-3 mb-4">
              <Input
                type="text"
                placeholder="Enter Access Code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                className="text-center font-mono tracking-widest uppercase bg-muted/40 border-border/60 focus:border-primary/60 h-12"
                data-ocid={`member_gate.${tier}.input`}
              />
              {error && (
                <p
                  className="text-red-400 text-xs font-mono"
                  data-ocid={`member_gate.${tier}.error_state`}
                >
                  {error}
                </p>
              )}
              <Button
                onClick={handleUnlock}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold gold-glow"
                data-ocid={`member_gate.${tier}.primary_button`}
              >
                Unlock Access
              </Button>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-card text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
              data-ocid={`member_gate.${tier}.secondary_button`}
            >
              <Link to="/membership">Purchase {tierLabel} Membership →</Link>
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
