import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const socialLinks = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
];

export default function EcomFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16 pt-12 pb-6"
      style={{
        background: "#111827",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nex Cartify
            </span>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              India&apos;s premium destination for smart gadgets and everyday
              essentials.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://nexcartify.in"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#9CA3AF",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#F9FAFB" }}
            >
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {["About Us", "Blog", "Careers", "Press"].map((l) => (
                <a
                  key={l}
                  href="https://nexcartify.in"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#9CA3AF" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#F9FAFB" }}
            >
              Support
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/contact"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "#9CA3AF" }}
              >
                Contact Us
              </Link>
              <Link
                to="/track"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "#9CA3AF" }}
              >
                Track Order
              </Link>
              {["Return Policy", "Shipping Policy", "Privacy Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="https://nexcartify.in"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#9CA3AF" }}
                  >
                    {l}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#F9FAFB" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#6366F1" }} />
                <a
                  href="mailto:support@nexcartify.in"
                  className="text-sm"
                  style={{ color: "#9CA3AF" }}
                >
                  support@nexcartify.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#22C55E" }} />
                <a
                  href="tel:+918800000000"
                  className="text-sm"
                  style={{ color: "#9CA3AF" }}
                >
                  +91 88000 00000
                </a>
              </div>
            </div>
            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
                Get exclusive deals:
              </p>
              <div className="flex gap-2">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F9FAFB",
                  }}
                />
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white"
                  style={{ background: "#6366F1" }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment badges */}
        <div
          className="py-4 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            {[
              "💳 UPI",
              "🏦 Net Banking",
              "💰 COD",
              "📱 Paytm",
              "🔐 Secure SSL",
            ].map((b) => (
              <span
                key={b}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#9CA3AF",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <p className="text-xs" style={{ color: "#4B5563" }}>
            &copy; {year}. Built with &hearts; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: "#6366F1" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
