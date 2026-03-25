import { useEffect, useState } from "react";

type Asset = {
  symbol: string;
  name: string;
  change: number;
  price: string;
  span: number;
};

const initialAssets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", change: 2.14, price: "$67,420", span: 2 },
  { symbol: "ETH", name: "Ethereum", change: 1.87, price: "$3,521", span: 2 },
  { symbol: "BNB", name: "BNB", change: 1.45, price: "$594", span: 1 },
  { symbol: "SOL", name: "Solana", change: 3.22, price: "$178", span: 1 },
  { symbol: "XRP", name: "XRP", change: -0.55, price: "$0.623", span: 1 },
  { symbol: "ADA", name: "Cardano", change: -1.2, price: "$0.452", span: 1 },
  { symbol: "DOT", name: "Polkadot", change: 0.8, price: "$8.94", span: 1 },
  { symbol: "AVAX", name: "Avalanche", change: 4.1, price: "$38.2", span: 1 },
  { symbol: "DOGE", name: "Dogecoin", change: -2.3, price: "$0.142", span: 1 },
  { symbol: "LINK", name: "Chainlink", change: 2.7, price: "$14.8", span: 1 },
  { symbol: "MATIC", name: "Polygon", change: -0.9, price: "$0.89", span: 1 },
  { symbol: "UNI", name: "Uniswap", change: 1.3, price: "$9.12", span: 1 },
  { symbol: "ATOM", name: "Cosmos", change: -1.8, price: "$10.3", span: 1 },
  { symbol: "LTC", name: "Litecoin", change: 0.4, price: "$82.1", span: 1 },
  { symbol: "NEAR", name: "NEAR", change: 5.6, price: "$5.48", span: 1 },
  { symbol: "FTM", name: "Fantom", change: -3.1, price: "$0.531", span: 1 },
  { symbol: "ARB", name: "Arbitrum", change: 2.9, price: "$1.21", span: 1 },
  { symbol: "OP", name: "Optimism", change: -0.4, price: "$2.14", span: 1 },
  { symbol: "INJ", name: "Injective", change: 6.8, price: "$28.4", span: 1 },
  { symbol: "SUI", name: "Sui", change: -1.5, price: "$1.03", span: 1 },
];

function getCellColor(change: number): string {
  if (change >= 5) return "oklch(0.82 0.22 142 / 0.85)";
  if (change >= 2) return "oklch(0.72 0.18 145 / 0.65)";
  if (change >= 0.5) return "oklch(0.6 0.14 145 / 0.45)";
  if (change >= -0.5) return "oklch(0.18 0.02 255 / 0.8)";
  if (change >= -2) return "oklch(0.55 0.18 25 / 0.45)";
  if (change >= -5) return "oklch(0.62 0.2 25 / 0.65)";
  return "oklch(0.68 0.22 25 / 0.85)";
}

function getTextColor(change: number): string {
  if (change >= 0.5) return "oklch(0.96 0.05 142)";
  if (change >= -0.5) return "oklch(0.7 0.02 255)";
  return "oklch(0.96 0.05 25)";
}

export default function CryptoHeatmap() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => ({
          ...a,
          change: Number.parseFloat(
            (a.change + (Math.random() - 0.5) * 0.8).toFixed(2),
          ),
        })),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
    >
      {assets.map((asset, i) => (
        <div
          key={asset.symbol}
          data-ocid={`heatmap.item.${i + 1}`}
          className="relative rounded-lg p-2 cursor-default transition-all duration-700 hover:scale-105 hover:z-10"
          style={{
            background: getCellColor(asset.change),
            gridColumn: asset.span > 1 ? `span ${asset.span}` : undefined,
            minHeight: asset.span > 1 ? "90px" : "70px",
            transition: "background 0.8s ease, transform 0.2s ease",
            boxShadow:
              Math.abs(asset.change) >= 3
                ? `0 0 12px ${asset.change > 0 ? "oklch(0.82 0.22 142 / 0.3)" : "oklch(0.62 0.2 25 / 0.3)"}`
                : "none",
          }}
        >
          <div
            className="font-mono font-bold text-xs leading-none mb-1"
            style={{
              color: getTextColor(asset.change),
              fontSize: asset.span > 1 ? "14px" : "11px",
            }}
          >
            {asset.symbol}
          </div>
          <div
            className="font-mono font-bold leading-none"
            style={{
              color: getTextColor(asset.change),
              fontSize: asset.span > 1 ? "16px" : "12px",
            }}
          >
            {asset.change > 0 ? "+" : ""}
            {asset.change.toFixed(2)}%
          </div>
          {asset.span > 1 && (
            <div
              className="text-xs mt-1 font-mono opacity-80"
              style={{ color: getTextColor(asset.change) }}
            >
              {asset.price}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
