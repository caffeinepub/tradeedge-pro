import { TrendingDown, TrendingUp } from "lucide-react";

const tickerItems = [
  { pair: "EUR/USD", price: "1.0847", change: "+0.23%", up: true },
  { pair: "BTC/USD", price: "67,420", change: "+2.14%", up: true },
  { pair: "ETH/USD", price: "3,521", change: "+1.87%", up: true },
  { pair: "GBP/USD", price: "1.2634", change: "-0.41%", up: false },
  { pair: "XAU/USD", price: "2,341", change: "+0.65%", up: true },
  { pair: "USD/JPY", price: "151.82", change: "-0.18%", up: false },
  { pair: "SOL/USD", price: "178.40", change: "+3.22%", up: true },
  { pair: "USD/CHF", price: "0.8921", change: "+0.09%", up: true },
  { pair: "BNB/USD", price: "594.30", change: "+1.45%", up: true },
  { pair: "EUR/GBP", price: "0.8582", change: "+0.31%", up: true },
];

const doubled = [...tickerItems, ...tickerItems];

export default function MarketTicker() {
  return (
    <div className="bg-background/80 border-b border-border backdrop-blur-sm overflow-hidden py-2.5">
      <div className="flex">
        <div className="flex ticker-scroll gap-0">
          {doubled.map((item, i) => (
            <div
              key={`${item.pair}-${i}`}
              className="flex items-center gap-2 px-6 border-r border-border/50 whitespace-nowrap"
            >
              <span className="font-mono text-xs font-semibold text-foreground">
                {item.pair}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {item.price}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold font-mono ${
                  item.up ? "text-signal-green" : "text-signal-red"
                }`}
              >
                {item.up ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
