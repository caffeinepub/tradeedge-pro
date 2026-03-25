export default function AnnouncementBar() {
  return (
    <div
      className="w-full py-2 text-center text-xs font-semibold tracking-wide sticky top-0 z-50"
      style={{
        background: "linear-gradient(90deg, #6366F1, #8B5CF6, #6366F1)",
        backgroundSize: "200% 100%",
        color: "white",
      }}
      data-ocid="announcement.panel"
    >
      <span className="hidden sm:inline">
        🚚 Free Shipping on Orders Above ₹499 | 💰 Cash on Delivery
        Available | 🔄 7-Day Easy Returns
      </span>
      <span className="sm:hidden">
        🚚 Free Shipping | 💰 COD | 🔄 7-Day Returns
      </span>
    </div>
  );
}
