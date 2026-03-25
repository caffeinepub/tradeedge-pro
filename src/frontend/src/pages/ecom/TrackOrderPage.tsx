import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react";
import { useState } from "react";

interface TrackingStep {
  label: string;
  sub: string;
  date: string;
  done: boolean;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(false);

  const steps: TrackingStep[] = [
    {
      label: "Order Placed",
      sub: "Your order has been confirmed",
      date: "Mar 23, 2:30 PM",
      done: true,
    },
    {
      label: "Order Confirmed",
      sub: "Seller has confirmed your order",
      date: "Mar 23, 4:00 PM",
      done: true,
    },
    {
      label: "Shipped",
      sub: "In transit with Blue Dart",
      date: "Mar 24, 9:00 AM",
      done: true,
    },
    {
      label: "Out for Delivery",
      sub: "Will be delivered today",
      date: "Mar 25, 8:00 AM",
      done: false,
    },
    {
      label: "Delivered",
      sub: "Delivered to your address",
      date: "Expected: Mar 26",
      done: false,
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#0A0F1C" }}>
      <div className="mx-auto max-w-lg">
        <h1 className="section-title mb-2 text-center">Track Your Order</h1>
        <p className="text-sm text-center mb-8" style={{ color: "#9CA3AF" }}>
          Enter your order details to track shipment
        </p>

        <div
          className="p-6 rounded-[14px] mb-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="track-order-id"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#9CA3AF" }}
              >
                Order ID
              </label>
              <input
                id="track-order-id"
                type="text"
                placeholder="e.g. NXC-2024-001"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F9FAFB",
                }}
                data-ocid="track.input"
              />
            </div>
            <div>
              <label
                htmlFor="track-phone"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#9CA3AF" }}
              >
                Phone Number
              </label>
              <input
                id="track-phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F9FAFB",
                }}
                data-ocid="track.input"
              />
            </div>
            <button
              type="button"
              className="w-full cta-button py-3"
              onClick={() => setResult(true)}
              data-ocid="track.submit_button"
            >
              Track Order
            </button>
          </div>
        </div>

        {result && (
          <div
            className="p-6 rounded-[14px] animate-fade-up"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            data-ocid="track.panel"
          >
            <div
              className="flex items-center gap-3 mb-6 p-3 rounded-[10px]"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <Package size={20} style={{ color: "#6366F1" }} />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#F9FAFB" }}
                >
                  Order NXC-2024-001
                </p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                  Wireless Earbuds Pro X1 &bull; Est. delivery: Mar 26
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute left-4 top-4 bottom-4 w-0.5"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex items-start gap-4"
                    data-ocid={`track.item.${i + 1}`}
                  >
                    <div
                      className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: step.done
                          ? "rgba(34,197,94,0.2)"
                          : "rgba(255,255,255,0.05)",
                        border: step.done
                          ? "2px solid #22C55E"
                          : "2px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {step.done ? (
                        <CheckCircle size={14} style={{ color: "#22C55E" }} />
                      ) : i === 3 ? (
                        <Truck size={14} style={{ color: "#6366F1" }} />
                      ) : i === 4 ? (
                        <MapPin size={14} style={{ color: "#9CA3AF" }} />
                      ) : (
                        <Clock size={14} style={{ color: "#9CA3AF" }} />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: step.done ? "#F9FAFB" : "#6B7280" }}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {step.sub}
                      </p>
                      <p
                        className="text-[10px] mt-0.5"
                        style={{ color: step.done ? "#6366F1" : "#4B5563" }}
                      >
                        {step.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
