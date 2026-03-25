import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TickerItem = {
  pair: string;
  price: number;
  displayPrice: string;
  change: number;
  up: boolean;
  flash: "green" | "red" | null;
  decimals: number;
};

function formatPrice(price: number, decimals: number): string {
  if (decimals === 0) {
    return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return price.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const initialItems: Omit<TickerItem, "flash">[] = [
  {
    pair: "EUR/USD",
    price: 1.0847,
    displayPrice: "1.0847",
    change: 0.23,
    up: true,
    decimals: 4,
  },
  {
    pair: "BTC/USDT",
    price: 67420,
    displayPrice: "67,420",
    change: 2.14,
    up: true,
    decimals: 0,
  },
  {
    pair: "ETH/USDT",
    price: 3521,
    displayPrice: "3,521",
    change: 1.87,
    up: true,
    decimals: 0,
  },
  {
    pair: "GBP/USD",
    price: 1.2634,
    displayPrice: "1.2634",
    change: -0.41,
    up: false,
    decimals: 4,
  },
  {
    pair: "XAU/USD",
    price: 2341,
    displayPrice: "2,341",
    change: 0.65,
    up: true,
    decimals: 0,
  },
  {
    pair: "USD/JPY",
    price: 151.82,
    displayPrice: "151.82",
    change: -0.18,
    up: false,
    decimals: 2,
  },
  {
    pair: "SOL/USDT",
    price: 178.4,
    displayPrice: "178.40",
    change: 3.22,
    up: true,
    decimals: 2,
  },
  {
    pair: "BNB/USDT",
    price: 594.3,
    displayPrice: "594.30",
    change: 1.45,
    up: true,
    decimals: 2,
  },
  {
    pair: "EUR/GBP",
    price: 0.8582,
    displayPrice: "0.8582",
    change: 0.31,
    up: true,
    decimals: 4,
  },
  {
    pair: "XRP/USDT",
    price: 0.6231,
    displayPrice: "0.6231",
    change: -0.55,
    up: false,
    decimals: 4,
  },
];

export default function MarketTicker() {
  const [items, setItems] = useState<TickerItem[]>(() =>
    initialItems.map((i) => ({ ...i, flash: null })),
  );
  const flashTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.45) return item;
          const delta = (Math.random() - 0.49) * (item.price * 0.0015);
          const newPrice = Math.max(0.0001, item.price + delta);
          const up = delta >= 0;
          const newChange = Number.parseFloat(
            (item.change + (Math.random() - 0.5) * 0.1).toFixed(2),
          );
          if (flashTimers.current[item.pair]) {
            clearTimeout(flashTimers.current[item.pair]);
          }
          flashTimers.current[item.pair] = setTimeout(() => {
            setItems((p) =>
              p.map((x) => (x.pair === item.pair ? { ...x, flash: null } : x)),
            );
          }, 700);
          return {
            ...item,
            price: newPrice,
            displayPrice: formatPrice(newPrice, item.decimals),
            change: newChange,
            up,
            flash: up ? "green" : "red",
          };
        }),
      );
    }, 2500);
    return () => {
      clearInterval(interval);
      Object.values(flashTimers.current).forEach(clearTimeout);
    };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div
      className="border-b border-border/60 overflow-hidden py-2.5"
      style={{
        background: "oklch(0.07 0.015 255 / 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <style>{`
        @keyframes price-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        .price-pop { animation: price-pop 0.35s ease-out; }
        .ticker-flash-green { background: oklch(0.82 0.22 142 / 0.15); transition: background 0.6s; }
        .ticker-flash-red { background: oklch(0.62 0.2 25 / 0.15); transition: background 0.6s; }
      `}</style>
      <div className="flex">
        <div className="flex ticker-scroll gap-0">
          {doubled.map((item, i) => (
            <div
              key={`${item.pair}-${i}`}
              className={`flex items-center gap-2 px-5 border-r border-border/40 whitespace-nowrap rounded-sm transition-all duration-300 ${
                item.flash === "green" && i < items.length
                  ? "ticker-flash-green"
                  : item.flash === "red" && i < items.length
                    ? "ticker-flash-red"
                    : ""
              }`}
            >
              <span className="font-mono text-xs font-semibold text-foreground">
                {item.pair}
              </span>
              <span
                className={`font-mono text-xs text-muted-foreground transition-all duration-200 ${
                  item.flash && i < items.length ? "price-pop" : ""
                }`}
              >
                {item.displayPrice}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold font-mono transition-colors duration-300 ${
                  item.up ? "signal-green" : "signal-red"
                }`}
              >
                {item.up ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.change > 0 ? "+" : ""}
                {item.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
