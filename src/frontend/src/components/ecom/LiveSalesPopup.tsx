import { indianCities, indianNames, products } from "@/data/products";
import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const subscriptionTypes = ["just bought", "just ordered"];

interface Notification {
  id: number;
  name: string;
  city: string;
  product: string;
}

export default function LiveSalesPopup() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);
  const [lastNameIndex, setLastNameIndex] = useState(-1);

  const showNext = useCallback(() => {
    let nameIdx = Math.floor(Math.random() * indianNames.length);
    while (nameIdx === lastNameIndex) {
      nameIdx = Math.floor(Math.random() * indianNames.length);
    }
    setLastNameIndex(nameIdx);
    const cityIdx = Math.floor(Math.random() * indianCities.length);
    const productIdx = Math.floor(Math.random() * products.length);
    const shortName = products[productIdx].name.split(" — ")[0].split(",")[0];
    setNotification({
      id: Date.now(),
      name: indianNames[nameIdx],
      city: indianCities[cityIdx],
      product: shortName,
    });
    setVisible(true);
    setTimeout(() => setVisible(false), 5500);
  }, [lastNameIndex]);

  useEffect(() => {
    const delay = Math.random() * 5000 + 5000;
    const first = setTimeout(showNext, delay);
    return () => clearTimeout(first);
  }, [showNext]);

  useEffect(() => {
    if (!visible && notification) {
      const next = setTimeout(showNext, Math.random() * 25000 + 20000);
      return () => clearTimeout(next);
    }
  }, [visible, notification, showNext]);

  if (!notification) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 max-w-[280px] transition-all duration-500"
      style={{
        transform: visible ? "translateX(0)" : "translateX(-120%)",
        opacity: visible ? 1 : 0,
      }}
      data-ocid="sales_popup.toast"
    >
      <div
        className="flex items-center gap-3 p-3 rounded-[14px]"
        style={{
          background: "rgba(17, 24, 39, 0.95)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
          <ShoppingBag size={16} color="white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold" style={{ color: "#F9FAFB" }}>
            <span style={{ color: "#6366F1" }}>{notification.name}</span> from{" "}
            <span style={{ color: "#22C55E" }}>{notification.city}</span>
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            {subscriptionTypes[0]}{" "}
            <span className="font-medium" style={{ color: "#F97316" }}>
              {notification.product.slice(0, 30)}
              {notification.product.length > 30 ? "..." : ""}
            </span>
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "#4B5563" }}>
            Just now
          </p>
        </div>
      </div>
    </div>
  );
}
