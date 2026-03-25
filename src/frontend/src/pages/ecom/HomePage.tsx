import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Package,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.round(rating) ? "#F97316" : "none"}
          stroke={i <= Math.round(rating) ? "#F97316" : "#6B7280"}
        />
      ))}
    </div>
  );
}

function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(
      () => setSecs((s) => (s > 0 ? s - 1 : initialSeconds)),
      1000,
    );
    return () => clearInterval(id);
  }, [initialSeconds]);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-2">
      {[
        { v: h, l: "HRS" },
        { v: m, l: "MIN" },
        { v: s, l: "SEC" },
      ].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="countdown-digit">{pad(v)}</div>
          <div
            className="text-[10px] font-semibold mt-1"
            style={{ color: "#9CA3AF" }}
          >
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { addToCart } = useCart();
  const bestSellers = products.slice(0, 6);
  const flashDeal = products[0];
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      {/* HERO */}
      <section
        className="relative overflow-hidden px-4 pt-6 pb-10"
        ref={heroRef}
      >
        <div
          className="relative mx-auto max-w-7xl rounded-[20px] overflow-hidden min-h-[460px] md:min-h-[520px] flex items-center"
          style={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* BG image */}
          <img
            src="/assets/generated/hero-nexcartify.dim_1200x600.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          {/* Overlay */}
          <div className="absolute inset-0 hero-gradient-overlay" />
          {/* Indigo glow orb */}
          <div
            className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full px-8 md:px-16 py-12">
            <div className="flex-1 max-w-xl animate-fade-up">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  color: "#F97316",
                }}
              >
                <TrendingUp size={12} />
                Trending in India
              </div>
              <h1
                className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-4"
                style={{ color: "#F9FAFB", letterSpacing: "-0.01em" }}
              >
                Upgrade Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lifestyle
                </span>{" "}
                with Smart Essentials
              </h1>
              <p className="text-base mb-6" style={{ color: "#9CA3AF" }}>
                Trending gadgets &amp; daily-use products at unbeatable prices.
                Free delivery above ₹499.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="cta-button inline-flex items-center gap-2"
                  data-ocid="hero.primary_button"
                >
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] text-sm font-semibold transition-all hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#F9FAFB",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  View Deals <ChevronRight size={16} />
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} style={{ color: "#22C55E" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} style={{ color: "#22C55E" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    COD Available
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} style={{ color: "#22C55E" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>

            {/* Hero product visual */}
            <div className="hidden md:block flex-shrink-0">
              <div
                className="w-72 h-72 rounded-[20px] overflow-hidden"
                style={{
                  border: "1px solid rgba(99,102,241,0.3)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.2)",
                }}
              >
                <img
                  src="/assets/generated/product-earbuds.dim_600x600.jpg"
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-4 py-4">
        <div
          className="mx-auto max-w-7xl rounded-[14px] px-6 py-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                label: "Secure Payment",
                sub: "100% Protected",
                color: "#22C55E",
              },
              {
                icon: Package,
                label: "COD Available",
                sub: "Pay on Delivery",
                color: "#F97316",
              },
              {
                icon: Truck,
                label: "Fast Delivery",
                sub: "4-7 Business Days",
                color: "#6366F1",
              },
              {
                icon: RotateCcw,
                label: "Easy Returns",
                sub: "7-Day Policy",
                color: "#8B5CF6",
              },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={22} style={{ color, flexShrink: 0 }} />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#F9FAFB" }}
                  >
                    {label}
                  </p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Shop by Category</h2>
            <Link
              to="/shop"
              className="text-sm flex items-center gap-1 transition-colors hover:text-white"
              style={{ color: "#6366F1" }}
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                className="category-card p-4 text-center group"
                data-ocid="categories.link"
              >
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl bg-gradient-to-br ${cat.color}`}
                  style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
                >
                  {cat.icon}
                </div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#F9FAFB" }}
                >
                  {cat.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Best Sellers</h2>
            <Link
              to="/shop"
              className="text-sm flex items-center gap-1"
              style={{ color: "#6366F1" }}
            >
              See All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestSellers.map((p, idx) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="product-card group block"
                data-ocid={`bestsellers.item.${idx + 1}`}
              >
                <div className="relative overflow-hidden rounded-t-[14px] aspect-square">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 discount-badge">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p
                    className="text-xs font-medium leading-tight line-clamp-2"
                    style={{ color: "#F9FAFB" }}
                  >
                    {p.name.split(" — ")[0]}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <StarRating rating={p.rating} />
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      ({p.reviews.toLocaleString()})
                    </span>
                  </div>
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
                  <button
                    type="button"
                    className="mt-2 w-full text-xs py-1.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "#6366F1" }}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(p);
                    }}
                    data-ocid={`bestsellers.button.${idx + 1}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    color: "#F97316",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  THE PROBLEM
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: "#F9FAFB" }}
                >
                  Tired of <span style={{ color: "#F97316" }}>overpriced</span>{" "}
                  gadgets that don&apos;t deliver?
                </h2>
                <p
                  style={{ color: "#9CA3AF" }}
                  className="text-sm leading-relaxed mb-4"
                >
                  Most brands charge 3x the actual price, deliver subpar
                  quality, and make returns a nightmare.
                </p>
                <div className="space-y-3">
                  {[
                    "Overpriced by 200-300%",
                    "Poor after-sales support",
                    "Fake reviews & misleading specs",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="text-red-400 font-bold">✗</span>
                      <span className="text-sm" style={{ color: "#9CA3AF" }}>
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="p-8 md:p-12 flex flex-col justify-center"
                style={{
                  background: "rgba(99,102,241,0.05)",
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "#22C55E",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  THE SOLUTION
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: "#F9FAFB" }}
                >
                  We bring{" "}
                  <span style={{ color: "#6366F1" }}>premium quality</span> at
                  affordable prices
                </h2>
                <p
                  style={{ color: "#9CA3AF" }}
                  className="text-sm leading-relaxed mb-4"
                >
                  Direct from manufacturers. No middlemen. Real quality tested
                  by 10,000+ happy customers.
                </p>
                <div className="space-y-3">
                  {[
                    "Up to 60% below market price",
                    "Verified quality + 7-day returns",
                    "Real reviews from real buyers",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <CheckCircle
                        size={14}
                        style={{ color: "#22C55E", flexShrink: 0 }}
                      />
                      <span className="text-sm" style={{ color: "#9CA3AF" }}>
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/shop"
                  className="mt-6 cta-button inline-flex items-center gap-2 self-start"
                  data-ocid="solution.primary_button"
                >
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLASH DEAL */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-[20px] p-6 md:p-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #111827 0%, #1a1040 100%)",
              border: "1px solid rgba(99,102,241,0.3)",
              boxShadow: "0 0 40px rgba(99,102,241,0.1)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, #6366F1, transparent)",
              }}
            />
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} style={{ color: "#F97316" }} />
                  <span
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: "#F97316" }}
                  >
                    Flash Deal
                  </span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "#F9FAFB" }}
                >
                  Deal Ends In:
                </h2>
                <div className="mb-4">
                  <CountdownTimer initialSeconds={86400} />
                </div>
                <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>
                  Limited time offer. Don&apos;t miss out on this exclusive
                  deal!
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(249,115,22,0.15)",
                      color: "#F97316",
                    }}
                  >
                    Only {flashDeal.inStock} units left!
                  </span>
                </div>
                {/* Stock bar */}
                <div className="mb-4">
                  <div
                    className="flex justify-between text-xs mb-1"
                    style={{ color: "#9CA3AF" }}
                  >
                    <span>Stock remaining</span>
                    <span style={{ color: "#F97316" }}>
                      {flashDeal.inStock}/{flashDeal.inStock + 44} left
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="progress-bar-orange"
                      style={{
                        width: `${(flashDeal.inStock / (flashDeal.inStock + 44)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Flash deal product card */}
              <div
                className="w-full md:w-72 rounded-[14px] overflow-hidden flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="relative aspect-square">
                  <img
                    src={flashDeal.image}
                    alt={flashDeal.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 discount-badge">
                    {flashDeal.badge}
                  </span>
                </div>
                <div className="p-4">
                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ color: "#F9FAFB" }}
                  >
                    {flashDeal.name.split(" — ")[0]}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#F97316" }}
                    >
                      ₹{flashDeal.price.toLocaleString()}
                    </span>
                    <span
                      className="text-sm line-through"
                      style={{ color: "#6B7280" }}
                    >
                      ₹{flashDeal.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full cta-button py-2.5 flex items-center justify-center gap-2"
                    onClick={() => addToCart(flashDeal)}
                    data-ocid="flashdeal.primary_button"
                  >
                    <ShoppingCart size={16} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title mb-6 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                city: "Mumbai",
                rating: 5,
                text: "Absolutely love the wireless earbuds! Crystal clear sound and arrived in just 3 days. Nex Cartify is now my go-to for tech.",
                product: "Wireless Earbuds Pro X1",
                initials: "PS",
              },
              {
                name: "Rahul Kumar",
                city: "Delhi",
                rating: 5,
                text: "The air fryer is a game-changer! My family is so happy. Quality is way better than what I expected at this price point.",
                product: "Digital Air Fryer 5L",
                initials: "RK",
              },
              {
                name: "Anjali Singh",
                city: "Bangalore",
                rating: 5,
                text: "COD option was a big relief for me. The smart fitness band tracks everything perfectly. Will definitely shop again!",
                product: "Smart Fitness Tracker",
                initials: "AS",
              },
            ].map((r, i) => (
              <div
                key={r.name}
                className="glass-card-hover p-5"
                data-ocid={`reviews.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
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
                  <div className="ml-auto">
                    <StarRating rating={r.rating} />
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9CA3AF" }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-xs mt-2" style={{ color: "#6366F1" }}>
                  Verified buyer • {r.product}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEX CARTIFY */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title mb-6 text-center">
            Why Choose Nex Cartify?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                sub: "Rigorously tested products",
                color: "#6366F1",
              },
              {
                icon: CreditCard,
                title: "Affordable Pricing",
                sub: "Up to 60% off always",
                color: "#F97316",
              },
              {
                icon: Users,
                title: "10,000+ Customers",
                sub: "Trust & verified reviews",
                color: "#22C55E",
              },
              {
                icon: Truck,
                title: "Fast Shipping",
                sub: "4-7 days pan-India",
                color: "#8B5CF6",
              },
            ].map(({ icon: Icon, title, sub, color }) => (
              <div key={title} className="glass-card p-5 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#F9FAFB" }}
                >
                  {title}
                </p>
                <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-[20px] p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #4F46E5 100%)",
              boxShadow: "0 0 60px rgba(99,102,241,0.3)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p className="text-indigo-200 mb-6">
              Join 10,000+ happy customers. Use code <strong>NEXFIRST10</strong>{" "}
              for 10% off your first order.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-[10px] font-semibold text-indigo-900 bg-white hover:bg-indigo-50 transition-all hover:scale-105"
              data-ocid="cta.primary_button"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
