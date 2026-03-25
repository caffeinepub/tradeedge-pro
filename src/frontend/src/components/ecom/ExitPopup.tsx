import { Tag, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 30000);
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      data-ocid="exit_popup.modal"
    >
      <div
        className="relative max-w-sm w-full p-6 rounded-[14px] animate-scale-in text-center"
        style={{
          background: "#111827",
          border: "1px solid rgba(99,102,241,0.4)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.2)",
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-colors"
          style={{ color: "#9CA3AF", background: "rgba(255,255,255,0.05)" }}
          data-ocid="exit_popup.close_button"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div
          className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #F97316, #FBBF24)" }}
        >
          <Tag size={22} color="white" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#F9FAFB" }}>
          Wait! Don&apos;t Leave Yet
        </h2>
        <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>
          Get exclusive <span style={{ color: "#F97316" }}>10% OFF</span> on
          your first order!
        </p>
        <div
          className="px-4 py-3 rounded-[10px] mb-4 font-mono font-bold text-lg tracking-widest"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px dashed #F97316",
            color: "#F97316",
          }}
        >
          NEXFIRST10
        </div>
        <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
          Use this code at checkout. Valid for 24 hours.
        </p>
        <button
          type="button"
          className="w-full cta-button"
          onClick={dismiss}
          data-ocid="exit_popup.confirm_button"
        >
          Claim My 10% OFF
        </button>
        <button
          type="button"
          className="mt-3 text-xs w-full"
          style={{ color: "#6B7280" }}
          onClick={dismiss}
          data-ocid="exit_popup.cancel_button"
        >
          No thanks, I&apos;ll pay full price
        </button>
      </div>
    </div>
  );
}
