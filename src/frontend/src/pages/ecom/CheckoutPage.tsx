import { useCart } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  CheckCircle,
  CreditCard,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

type PayMethod = "cod" | "upi" | "card";

const fields = [
  {
    key: "name" as const,
    label: "Full Name",
    placeholder: "Rahul Kumar",
    type: "text",
    id: "checkout-name",
    full: false,
  },
  {
    key: "phone" as const,
    label: "Phone Number",
    placeholder: "10-digit mobile",
    type: "tel",
    id: "checkout-phone",
    full: false,
  },
  {
    key: "address" as const,
    label: "Delivery Address",
    placeholder: "House No, Street, Area",
    type: "text",
    id: "checkout-address",
    full: true,
  },
  {
    key: "city" as const,
    label: "City",
    placeholder: "Delhi",
    type: "text",
    id: "checkout-city",
    full: false,
  },
  {
    key: "pincode" as const,
    label: "Pincode",
    placeholder: "110001",
    type: "text",
    id: "checkout-pincode",
    full: false,
  },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [payMethod, setPayMethod] = useState<PayMethod>("cod");
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.match(/^[0-9]{10}$/))
      e.phone = "Enter valid 10-digit number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.match(/^[0-9]{6}$/))
      e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlace = () => {
    if (!validate()) return;
    clearCart();
    setPlaced(true);
    setTimeout(() => navigate({ to: "/track" }), 3000);
  };

  if (placed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0A0F1C" }}
        data-ocid="checkout.success_state"
      >
        <div className="text-center p-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "2px solid #22C55E",
            }}
          >
            <CheckCircle size={40} style={{ color: "#22C55E" }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#F9FAFB" }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: "#9CA3AF" }}>
            You&apos;ll receive a confirmation shortly. Redirecting to
            tracking...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0A0F1C" }}>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield size={16} style={{ color: "#22C55E" }} />
          <span className="text-sm font-semibold" style={{ color: "#22C55E" }}>
            100% Secure Checkout &mdash; SSL Encrypted
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div
              className="p-5 rounded-[14px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#F9FAFB" }}
              >
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(({ key, label, placeholder, type, id, full }) => (
                  <div key={key} className={full ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={id}
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#9CA3AF" }}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${errors[key] ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
                        color: "#F9FAFB",
                      }}
                      data-ocid="checkout.input"
                    />
                    {errors[key] && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "#EF4444" }}
                        data-ocid="checkout.error_state"
                      >
                        {errors[key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-5 rounded-[14px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#F9FAFB" }}
              >
                Payment Method
              </h2>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    {
                      id: "cod",
                      label: "Cash on Delivery",
                      icon: Banknote,
                      desc: "Pay when delivered",
                    },
                    {
                      id: "upi",
                      label: "UPI",
                      icon: Smartphone,
                      desc: "PhonePe, GPay, Paytm",
                    },
                    {
                      id: "card",
                      label: "Credit/Debit Card",
                      icon: CreditCard,
                      desc: "Visa, Mastercard",
                    },
                  ] as const
                ).map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPayMethod(id)}
                    className="flex-1 min-w-[140px] p-3 rounded-[10px] text-left transition-all"
                    style={{
                      background:
                        payMethod === id
                          ? "rgba(99,102,241,0.15)"
                          : "rgba(255,255,255,0.03)",
                      border:
                        payMethod === id
                          ? "1px solid rgba(99,102,241,0.5)"
                          : "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid="checkout.radio"
                  >
                    <Icon
                      size={18}
                      style={{
                        color: payMethod === id ? "#6366F1" : "#9CA3AF",
                        marginBottom: 4,
                      }}
                    />
                    <p
                      className="text-xs font-semibold"
                      style={{
                        color: payMethod === id ? "#F9FAFB" : "#9CA3AF",
                      }}
                    >
                      {label}
                    </p>
                    <p className="text-[10px]" style={{ color: "#6B7280" }}>
                      {desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div
              className="rounded-[14px] p-5 sticky top-36"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              data-ocid="checkout.panel"
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#F9FAFB" }}
              >
                Order Summary
              </h3>
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span
                      className="flex-1 text-xs line-clamp-1"
                      style={{ color: "#9CA3AF" }}
                    >
                      {item.product.name.split(" — ")[0]}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#F9FAFB" }}
                    >
                      &#8377;
                      {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
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
                  &#8377;{(total + (total >= 499 ? 0 : 49)).toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                className="w-full cta-button py-3 flex items-center justify-center gap-2"
                onClick={handlePlace}
                data-ocid="checkout.submit_button"
              >
                Place Order
              </button>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Shield size={11} style={{ color: "#22C55E" }} />
                <span className="text-[10px]" style={{ color: "#6B7280" }}>
                  Secured by SSL Encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
