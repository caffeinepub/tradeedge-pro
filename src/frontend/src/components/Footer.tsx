import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { SiInstagram, SiTelegram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="gold-gradient">TradeNikhil</span>
                <span className="text-foreground/80 font-normal">
                  {" "}
                  Universe Chain
                </span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Professional forex and crypto trading signals for consistent
              profitability.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="X/Twitter"
                data-ocid="footer.twitter.link"
              >
                <SiX className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-blue/20 hover:text-blue transition-colors"
                aria-label="Telegram"
                data-ocid="footer.telegram.link"
              >
                <SiTelegram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Instagram"
                data-ocid="footer.instagram.link"
              >
                <SiInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-colors"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <SiYoutube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Trading Signals", to: "/signals" },
                { label: "Education", to: "/education" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Forex Signals</li>
              <li>Crypto Signals</li>
              <li>Technical Analysis</li>
              <li>Risk Management</li>
              <li>Market Updates</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Trading Academy</li>
              <li>Market Analysis</li>
              <li>Economic Calendar</li>
              <li>Trading Glossary</li>
              <li>Community Forum</li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground/60">Risk Disclaimer:</strong>{" "}
            Trading forex and cryptocurrencies involves significant risk of loss
            and is not suitable for all investors. Past performance is not
            indicative of future results. TradeNikhil Universe Chain does not
            provide investment advice. All signals are for educational purposes
            only. Never invest more than you can afford to lose.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {year}. Built with &hearts; using{" "}
              <a
                href={caffeineUrl}
                className="hover:text-primary transition-colors underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {year} TradeNikhil Universe Chain. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
