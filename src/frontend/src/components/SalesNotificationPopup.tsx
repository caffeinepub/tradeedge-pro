import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAMES = [
  "Daniel",
  "Arjun",
  "Lucas",
  "Ahmed",
  "Sofia",
  "Marcus",
  "Priya",
  "Liam",
  "Yuki",
  "Carlos",
  "Emma",
  "Ravi",
  "Noah",
  "Fatima",
  "Oliver",
  "Chen",
  "Isabella",
  "Amir",
  "Ethan",
  "Nadia",
  "James",
  "Kavya",
  "Zara",
  "Tyler",
  "Mei",
  "Hassan",
  "Olivia",
  "Santiago",
  "Aarav",
  "Grace",
];

const COUNTRIES = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "India", flag: "🇮🇳" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
];

const PLANS = [
  "Basic Subscription",
  "Advanced Subscription",
  "Elite Subscription",
];
const TIME_PHRASES = ["just now", "2 min ago", "a moment ago", "1 min ago"];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickDifferent<T>(arr: T[], exclude: T | null): T {
  const pool = arr.filter((x) => x !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

interface SaleNotification {
  id: number;
  name: string;
  country: { name: string; flag: string };
  plan: string;
  timeAgo: string;
}

let uid = 0;

export default function SalesNotificationPopup() {
  const [notification, setNotification] = useState<SaleNotification | null>(
    null,
  );
  const lastNameRef = useRef<string | null>(null);
  const lastCountryRef = useRef<string | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    const name = pickDifferent(NAMES, lastNameRef.current);
    const countryName = pickDifferent(
      COUNTRIES.map((c) => c.name),
      lastCountryRef.current,
    );
    const countryObj = COUNTRIES.find((c) => c.name === countryName)!;
    const plan = PLANS[Math.floor(Math.random() * PLANS.length)];
    const timeAgo =
      TIME_PHRASES[Math.floor(Math.random() * TIME_PHRASES.length)];
    lastNameRef.current = name;
    lastCountryRef.current = countryName;
    setNotification({ id: ++uid, name, country: countryObj, plan, timeAgo });
    const dismissDelay = randomBetween(6000, 8000);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(
      () => setNotification(null),
      dismissDelay,
    );
    const nextDelay = randomBetween(15000, 40000);
    if (nextTimer.current) clearTimeout(nextTimer.current);
    nextTimer.current = setTimeout(show, nextDelay);
  }, []);

  useEffect(() => {
    const initial = setTimeout(show, randomBetween(4000, 8000));
    return () => {
      clearTimeout(initial);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      if (nextTimer.current) clearTimeout(nextTimer.current);
    };
  }, [show]);

  function dismiss() {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setNotification(null);
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-[9999] pointer-events-none"
      style={{ maxWidth: 340 }}
    >
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ x: -80, opacity: 0, scale: 0.92 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{
              x: -40,
              opacity: 0,
              scale: 0.94,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="pointer-events-auto"
            style={{
              background: "oklch(0.07 0.015 255 / 0.97)",
              backdropFilter: "blur(18px)",
              border: "1px solid oklch(0.62 0.25 25 / 0.35)",
              borderRadius: 14,
              padding: "14px 16px",
              boxShadow:
                "0 0 0 1px oklch(0.62 0.25 25 / 0.1), 0 8px 32px oklch(0 0 0 / 0.6), 0 0 24px oklch(0.62 0.25 25 / 0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="sales-popup-glow-border" />
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-0.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base sales-popup-pulse"
                  style={{
                    background: "oklch(0.62 0.25 25 / 0.15)",
                    border: "1.5px solid oklch(0.62 0.25 25 / 0.5)",
                    boxShadow: "0 0 12px oklch(0.62 0.25 25 / 0.4)",
                  }}
                >
                  {notification.country.flag}
                </div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "oklch(0.62 0.25 25)",
                    boxShadow: "0 0 8px oklch(0.62 0.25 25)",
                    animation: "neon-pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{
                      color: "oklch(0.75 0.22 25)",
                      textShadow: "0 0 8px oklch(0.62 0.25 25 / 0.6)",
                    }}
                  >
                    New Purchase
                  </span>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs leading-none"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
                <p
                  className="text-sm leading-snug"
                  style={{ color: "oklch(0.92 0.005 255)" }}
                >
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.96 0.005 255)" }}
                  >
                    {notification.name}
                  </span>
                  <span className="text-muted-foreground"> from </span>
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.96 0.005 255)" }}
                  >
                    {notification.country.name}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    just purchased{" "}
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      color: "oklch(0.75 0.22 25)",
                      textShadow: "0 0 10px oklch(0.62 0.25 25 / 0.5)",
                    }}
                  >
                    {notification.plan}
                  </span>
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "oklch(0.62 0.25 25)",
                      boxShadow: "0 0 4px oklch(0.62 0.25 25)",
                    }}
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {notification.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
