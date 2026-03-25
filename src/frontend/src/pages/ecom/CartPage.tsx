import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

function CartTimer() {
  const [secs, setSecs] = useState(600);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 600)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span
      className="font-mono font-bold"
      style={{ color: secs < 120 ? "#EF4444" : "#F97316" }}
    >
      {pad(m)}:{pad(s)}
    </span>
  );
}

export default function CartPage() {
  const { items, total, count, removeFromCart, updateQty } = useCart();
  const upsellProduct = products[4]; // water bottle
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: "#0A0F1C" }}
        data-ocid="cart.empty_state"
      >
        <ShoppingBag size={64} style={{ color: "#6366F1", opacity: 0.5 }} />
        <h2
          className="text-2xl font-bold mt-4 mb-2"
          style={{ color: "#F9FAFB" }}
        >
          Your cart is empty
        </h2>
        <p className="mb-6" style={{ color: "#9CA3AF" }}>
          Add some products to get started
        </p>
        <Link
          to="/shop"
          className="cta-button inline-flex items-center gap-2"
          data-ocid="cart.primary_button"
        >
          Shop Now <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-8 pb-24"
      style={{ background: "#0A0F1C" }}
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="section-title mb-2">Your Cart</h1>
        <p className="text-sm mb-6" style={{ color: "#9CA3AF" }}>
          {count} item{count > 1 ? "s" : ""} in cart
        </p>

        {/* Cart Timer */}
        <div
          className="flex items-center gap-2 p-3 rounded-[10px] mb-6"
          style={{
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
          data-ocid="cart.panel"
        >
          <Clock size={14} style={{ color: "#F97316" }} />
          <span className="text-xs" style={{ color: "#9CA3AF" }}>
            Cart reserved for <CartTimer /> — Complete your order before it
            expires!
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 rounded-[14px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                data-ocid={`cart.item.${idx + 1}`}
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold line-clamp-2"
                    style={{ color: "#F9FAFB" }}
                  >
                    {item.product.name.split(" — ")[0]}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                    {item.product.category}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#F97316" }}
                    >
                      ₹{item.product.price.toLocaleString()}
                    </span>
                    <span
                      className="text-xs line-through"
                      style={{ color: "#6B7280" }}
                    >
                      ₹{item.product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="flex items-center gap-2 rounded-lg px-2 py-1"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(item.product.id, item.quantity - 1)
                        }
                        className="p-0.5"
                        data-ocid={`cart.button.${idx + 1}`}
                      >
                        <Minus size={12} style={{ color: "#9CA3AF" }} />
                      </button>
                      <span
                        className="text-sm font-semibold w-5 text-center"
                        style={{ color: "#F9FAFB" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(item.product.id, item.quantity + 1)
                        }
                        className="p-0.5"
                        data-ocid={`cart.button.${idx + 1}`}
                      >
                        <Plus size={12} style={{ color: "#9CA3AF" }} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                      style={{ color: "#9CA3AF" }}
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: "#F9FAFB" }}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Upsell */}
            <div
              className="flex items-center gap-4 p-4 rounded-[14px]"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px dashed rgba(99,102,241,0.3)",
              }}
              data-ocid="cart.panel"
            >
              <div className="w-14 h-14 rounded-[10px] overflow-hidden flex-shrink-0">
                <img
                  src={upsellProduct.image}
                  alt={upsellProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#6366F1" }}
                >
                  Add this for just ₹199
                </p>
                <p className="text-xs" style={{ color: "#F9FAFB" }}>
                  {upsellProduct.name.split(" — ")[0]}
                </p>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                style={{ background: "#6366F1" }}
                onClick={() => addToCart(upsellProduct)}
                data-ocid="cart.secondary_button"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div
              className="rounded-[14px] p-5 sticky top-36"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              data-ocid="cart.panel"
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#F9FAFB" }}
              >
                Order Summary
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>
                    Subtotal ({count} items)
                  </span>
                  <span style={{ color: "#F9FAFB" }}>
                    ₹{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Shipping</span>
                  <span style={{ color: "#22C55E" }}>
                    {total >= 499 ? "FREE" : "₹49"}
                  </span>
                </div>
                {total < 499 && (
                  <p className="text-xs" style={{ color: "#F97316" }}>
                    Add ₹{499 - total} more for free shipping!
                  </p>
                )}
              </div>
              <div
                className="flex justify-between text-base font-bold pt-3 mb-5"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  color: "#F9FAFB",
                }}
              >
                <span>Total</span>
                <span>
                  ₹{(total + (total >= 499 ? 0 : 49)).toLocaleString()}
                </span>
              </div>

              {/* Trust badges */}
              <div className="space-y-2 mb-5">
                {[
                  {
                    icon: Shield,
                    text: "Secure 256-bit SSL Checkout",
                    color: "#22C55E",
                  },
                  {
                    icon: Truck,
                    text: "Free delivery above ₹499",
                    color: "#6366F1",
                  },
                  {
                    icon: RotateCcw,
                    text: "7-Day hassle-free returns",
                    color: "#F97316",
                  },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={12} style={{ color, flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center cta-button py-3"
                data-ocid="cart.primary_button"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
