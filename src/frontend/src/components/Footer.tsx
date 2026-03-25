import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { SiInstagram, SiTelegram, SiX, SiYoutube } from "react-icons/si";

const RED = "oklch(0.62 0.25 25)";
const RED_BG = "oklch(0.62 0.25 25 / 0.12)";
const RED_BORDER = "oklch(0.62 0.25 25 / 0.2)";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative mt-20 border-t"
      style={{
        background:
          "linear-gradient(to top, oklch(0.04 0.01 255) 0%, oklch(0.07 0.015 25 / 0.3) 50%, transparent 100%)",
        borderColor: "oklch(0.62 0.25 25 / 0.15)",
      }}
    >
      {/* Red top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.62 0.25 25 / 0.6) 30%, oklch(0.62 0.25 25) 50%, oklch(0.62 0.25 25 / 0.6) 70%, transparent 100%)",
          boxShadow: "0 0 10px oklch(0.62 0.25 25 / 0.4)",
        }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: RED_BG,
                  border: `1px solid ${RED_BORDER}`,
                  boxShadow: "0 0 12px oklch(0.62 0.25 25 / 0.2)",
                }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: RED }} />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="neon-gradient-text">TRADEFOREX</span>
                <span className="text-foreground/60 font-normal">
                  {" "}
                  UNIVERSE CHAIN
                </span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Professional forex and crypto trading signals for consistent
              profitability. Powered by AI analysis.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://x.com",
                  icon: <SiX className="w-3.5 h-3.5" />,
                  ocid: "footer.twitter.link",
                  label: "X/Twitter",
                },
                {
                  href: "https://telegram.org",
                  icon: <SiTelegram className="w-3.5 h-3.5" />,
                  ocid: "footer.telegram.link",
                  label: "Telegram",
                },
                {
                  href: "https://instagram.com",
                  icon: <SiInstagram className="w-3.5 h-3.5" />,
                  ocid: "footer.instagram.link",
                  label: "Instagram",
                },
                {
                  href: "https://youtube.com",
                  icon: <SiYoutube className="w-3.5 h-3.5" />,
                  ocid: "footer.youtube.link",
                  label: "YouTube",
                },
              ].map((s) => (
                <a
                  key={s.ocid}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-ocid={s.ocid}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.12 0.02 255)",
                    border: `1px solid ${RED_BORDER}`,
                    color: "oklch(0.7 0.02 255)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = RED;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "oklch(0.62 0.25 25 / 0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 10px oklch(0.62 0.25 25 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "oklch(0.7 0.02 255)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      RED_BORDER;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-mono font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: RED }}
            >
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Trading Signals", to: "/signals" },
                { label: "Dashboard", to: "/dashboard" },
                { label: "Market News", to: "/news" },
                { label: "Education", to: "/education" },
                { label: "About Us", to: "/about" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "-")}.link`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h4
              className="font-mono font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: RED }}
            >
              Membership
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Basic Plan", to: "/member/basic" },
                { label: "Advance Plan", to: "/member/advance" },
                { label: "Conqueror Plan", to: "/member/conqueror" },
                { label: "Membership", to: "/membership" },
                { label: "Payment", to: "/payment" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "-")}.link`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-mono font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: RED }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground font-mono">
                nikhilsingh123321123@gmail.com
              </li>
              <li>
                <Link
                  to="/contact"
                  data-ocid="footer.contact.link"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  Contact Form
                </Link>
              </li>
              <li className="text-sm text-muted-foreground font-mono">
                Support: 24/7
              </li>
            </ul>
            <div
              className="mt-6 p-3 rounded-lg text-xs text-muted-foreground leading-relaxed"
              style={{
                background: "oklch(0.62 0.25 25 / 0.05)",
                border: "1px solid oklch(0.62 0.25 25 / 0.1)",
              }}
            >
              ⚠ Trading involves significant risk. Past performance does not
              guarantee future results.
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid oklch(0.62 0.25 25 / 0.1)" }}
        >
          <p className="text-xs text-muted-foreground font-mono">
            © {year} TRADEFOREX UNIVERSE CHAIN. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            data-ocid="footer.caffeine.link"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
