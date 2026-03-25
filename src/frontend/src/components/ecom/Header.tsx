import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Categories", to: "/shop" },
    { label: "Track Order", to: "/track" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky z-40 w-full px-4 py-2" style={{ top: "2rem" }}>
      <div
        className="mx-auto max-w-7xl rounded-[14px] px-4 py-3"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" data-ocid="header.link">
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nex Cartify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "#9CA3AF" }}
                activeProps={{ style: { color: "#6366F1" } }}
                data-ocid="header.link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#9CA3AF" }}
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#9CA3AF" }}
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </button>
            <Link
              to="/cart"
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: "#9CA3AF" }}
              data-ocid="header.link"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#F97316" }}
                >
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#9CA3AF" }}
              aria-label="Account"
            >
              <User size={18} />
            </button>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#9CA3AF" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="mt-3 animate-scale-in">
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-search"
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-[10px] text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F9FAFB",
              }}
              data-ocid="header.search_input"
            />
          </div>
        )}

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden mt-3 flex flex-col gap-2 pb-2 animate-fade-up">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium py-2 px-3 rounded-lg"
                style={{
                  color: "#9CA3AF",
                  background: "rgba(255,255,255,0.04)",
                }}
                onClick={() => setMenuOpen(false)}
                data-ocid="header.link"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
