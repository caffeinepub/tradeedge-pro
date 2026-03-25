import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= Math.round(rating) ? "#F97316" : "none"}
          stroke={i <= Math.round(rating) ? "#F97316" : "#6B7280"}
        />
      ))}
    </div>
  );
}

function Countdown({ secs }: { secs: number }) {
  const [s, setS] = useState(secs);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v > 0 ? v - 1 : secs)), 1000);
    return () => clearInterval(id);
  }, [secs]);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="font-mono font-bold" style={{ color: "#F97316" }}>
      {pad(m)}:{pad(sec)}
    </span>
  );
}

export default function ProductPage() {
  const params = useParams({ from: "/product/$id" });
  const product = products.find((p) => p.id === params.id) ?? products[0];
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "We deliver within 4-7 business days across India. Express delivery available in select cities.",
    },
    {
      q: "What is the return policy?",
      a: "We offer hassle-free 7-day returns. Just raise a return request and we'll pick up from your doorstep.",
    },
    {
      q: "Is Cash on Delivery available?",
      a: "Yes! COD is available across India for all orders. Pay comfortably at your doorstep.",
    },
    {
      q: "Is the product genuine?",
      a: "100% authentic products with manufacturer warranty. We source directly from verified manufacturers.",
    },
  ];

  const mockReviews = [
    {
      name: "Suresh Kumar",
      city: "Chennai",
      rating: 5,
      text: "Absolutely love this product! Exceeded my expectations in every way.",
      verified: true,
      initials: "SK",
    },
    {
      name: "Deepika Patel",
      city: "Ahmedabad",
      rating: 5,
      text: "Great value for money. Fast delivery and excellent packaging.",
      verified: true,
      initials: "DP",
    },
    {
      name: "Amit Sharma",
      city: "Pune",
      rating: 4,
      text: "Good quality. Exactly as described. Would definitely recommend.",
      verified: true,
      initials: "AS",
    },
    {
      name: "Meera Nair",
      city: "Hyderabad",
      rating: 5,
      text: "The best purchase I've made this year! Super happy with the quality.",
      verified: true,
      initials: "MN",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0A0F1C" }}>
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-xs mb-6"
          style={{ color: "#9CA3AF" }}
        >
          <Link to="/" style={{ color: "#6366F1" }}>
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" style={{ color: "#6366F1" }}>
            Shop
          </Link>
          <span>/</span>
          <span>{product.name.split(" — ")[0].slice(0, 40)}...</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Images */}
          <div>
            <div
              className="rounded-[14px] overflow-hidden aspect-square mb-3"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {[product.image, product.image, product.image].map((img, i) => (
                <div
                  key={i === 0 ? "thumb-main" : i === 1 ? "thumb-1" : "thumb-2"}
                  className="w-16 h-16 rounded-[10px] overflow-hidden cursor-pointer"
                  style={{
                    border:
                      i === 0
                        ? "2px solid #6366F1"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* COD badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22C55E",
              }}
              data-ocid="product.panel"
            >
              <CheckCircle size={11} />
              Pay after delivery available
            </div>

            <h1
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: "#F9FAFB" }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-3">
              <StarRating rating={product.rating} />
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold" style={{ color: "#F97316" }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span
                className="text-lg line-through"
                style={{ color: "#6B7280" }}
              >
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#22C55E",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Urgency */}
            <div
              className="p-3 rounded-[10px] mb-4 flex flex-wrap items-center gap-4"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
              data-ocid="product.panel"
            >
              <div className="flex items-center gap-2">
                <Zap size={14} style={{ color: "#F97316" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#F97316" }}
                >
                  Deal expires in: <Countdown secs={1800} />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={14} style={{ color: "#F97316" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#F97316" }}
                >
                  Only {product.inStock} left in stock!
                </span>
              </div>
            </div>

            {/* Stock bar */}
            <div className="mb-4">
              <div
                className="h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="progress-bar-orange"
                  style={{
                    width: `${(product.inStock / (product.inStock + 45)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Upsell */}
            <div
              className="p-3 rounded-[10px] mb-4 flex items-center gap-2"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "#6366F1" }}
              >
                Buy 2 &amp; get 10% OFF — Save an extra ₹
                {Math.floor(product.price * 0.1).toLocaleString()}
              </span>
            </div>

            {/* Benefits */}
            <div className="mb-4 space-y-1.5">
              {product.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle
                    size={13}
                    style={{ color: "#22C55E", flexShrink: 0 }}
                  />
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                Quantity:
              </span>
              <div
                className="flex items-center gap-3 rounded-[10px] px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  data-ocid="product.button"
                >
                  <Minus size={14} style={{ color: "#9CA3AF" }} />
                </button>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#F9FAFB" }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.min(product.inStock, q + 1))
                  }
                  data-ocid="product.button"
                >
                  <Plus size={14} style={{ color: "#9CA3AF" }} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-4">
              <Link
                to="/checkout"
                className="flex-1 cta-button flex items-center justify-center gap-2 py-3"
                onClick={() => addToCart(product)}
                data-ocid="product.primary_button"
              >
                <Zap size={16} /> Buy Now
              </Link>
              <button
                type="button"
                className="flex-1 py-3 rounded-[10px] font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: "rgba(99,102,241,0.2)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  color: "#6366F1",
                }}
                onClick={() => addToCart(product)}
                data-ocid="product.secondary_button"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Shield, text: "Secure Checkout", color: "#22C55E" },
                { icon: Truck, text: "Delivery in 4-7 days", color: "#6366F1" },
                {
                  icon: RotateCcw,
                  text: "7-Day Easy Returns",
                  color: "#F97316",
                },
                { icon: Package, text: "COD Available", color: "#8B5CF6" },
              ].map(({ icon: Icon, text, color }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <Icon size={13} style={{ color, flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-10">
          <h2 className="section-title mb-5">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockReviews.map((r) => (
              <div
                key={r.name}
                className="glass-card p-4"
                data-ocid="product.item.1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white"
                    style={{
                      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#F9FAFB" }}
                    >
                      {r.name}
                    </p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      {r.city}
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <StarRating rating={r.rating} />
                    {r.verified && (
                      <span
                        className="text-[10px] flex items-center gap-0.5"
                        style={{ color: "#22C55E" }}
                      >
                        <CheckCircle size={10} /> Verified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="section-title mb-5">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, faqIdx) => (
              <div
                key={faq.q}
                className="rounded-[14px] overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                data-ocid="product.item.1"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === faqIdx ? null : faqIdx)}
                  data-ocid="product.toggle"
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#F9FAFB" }}
                  >
                    {faq.q}
                  </span>
                  {openFaq === faqIdx ? (
                    <ChevronUp size={16} style={{ color: "#6366F1" }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: "#9CA3AF" }} />
                  )}
                </button>
                {openFaq === faqIdx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="section-title mb-5">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p, idx) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="product-card group block"
                  data-ocid={`related.item.${idx + 1}`}
                >
                  <div className="aspect-square overflow-hidden rounded-t-[14px]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p
                      className="text-xs font-medium line-clamp-2"
                      style={{ color: "#F9FAFB" }}
                    >
                      {p.name.split(" — ")[0]}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#F97316" }}
                      >
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span
                        className="text-xs line-through"
                        style={{ color: "#6B7280" }}
                      >
                        ₹{p.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 p-4"
        style={{
          background: "rgba(10,15,28,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>
              {product.name.split(" — ")[0].slice(0, 40)}...
            </p>
            <span className="text-base font-bold" style={{ color: "#F97316" }}>
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white"
              style={{
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                color: "#6366F1",
              }}
              onClick={() => addToCart(product)}
              data-ocid="product.secondary_button"
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white cta-button"
              onClick={() => addToCart(product)}
              data-ocid="product.primary_button"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
