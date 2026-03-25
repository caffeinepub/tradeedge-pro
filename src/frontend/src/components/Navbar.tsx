import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const RED = "oklch(0.62 0.25 25)";
const RED_BG = "oklch(0.62 0.25 25 / 0.12)";
const RED_BORDER = "oklch(0.62 0.25 25 / 0.35)";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Signals", to: "/signals" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "News", to: "/news" },
  { label: "Education", to: "/education" },
  { label: "Membership", to: "/membership" },
  { label: "Payment", to: "/payment" },
  { label: "Contact", to: "/contact" },
];

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() =>
    localStorage.getItem("tradeForexUser"),
  );
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("tradeForexUser", email);
    setLoggedInUser(email);
    setLoginOpen(false);
    setEmail("");
    setPassword("");
  }

  function handleLogout() {
    localStorage.removeItem("tradeForexUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-[0_2px_20px_oklch(0_0_0/0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.home.link"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: RED_BG,
                  border: `1px solid ${RED_BORDER}`,
                  boxShadow: "0 0 12px oklch(0.62 0.25 25 / 0.2)",
                }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: RED }} />
              </div>
              <span className="font-display font-black text-base hidden sm:block">
                <span className="neon-gradient-text">TRADEFOREX</span>
                <span className="text-foreground/60 font-normal text-sm">
                  {" "}
                  UNIVERSE
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className={`px-3 py-2 rounded-md text-xs font-semibold font-mono uppercase tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    currentPath === link.to
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    currentPath === link.to
                      ? { textShadow: "0 0 10px oklch(0.62 0.25 25 / 0.8)" }
                      : {}
                  }
                >
                  {link.label === "Dashboard" && (
                    <LayoutDashboard className="w-3.5 h-3.5" />
                  )}
                  {link.label === "News" && (
                    <Newspaper className="w-3.5 h-3.5" />
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {loggedInUser ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                    style={{
                      background: RED_BG,
                      border: `1px solid ${RED_BORDER}`,
                      color: RED,
                    }}
                  >
                    {getInitials(loggedInUser)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    data-ocid="nav.logout.button"
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLoginOpen(true)}
                  data-ocid="nav.login.button"
                  className="text-muted-foreground hover:text-foreground text-xs font-mono"
                >
                  <LogIn className="w-4 h-4 mr-1" /> Login
                </Button>
              )}
              <Button
                asChild
                size="sm"
                data-ocid="nav.cta.button"
                className="font-mono font-bold text-xs uppercase tracking-wider"
                style={{
                  background: RED,
                  color: "oklch(0.98 0.005 255)",
                  boxShadow: "0 0 15px oklch(0.62 0.25 25 / 0.3)",
                }}
              >
                <Link to="/shop">Join Now</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-md"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="nav.mobile.toggle"
              type="button"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-border"
              style={{
                background: "oklch(0.07 0.015 255 / 0.97)",
                backdropFilter: "blur(20px)",
              }}
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-2 font-mono ${
                      currentPath === link.to
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label === "Dashboard" && (
                      <LayoutDashboard className="w-4 h-4" />
                    )}
                    {link.label === "News" && <Newspaper className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-2 mt-2">
                  {loggedInUser ? (
                    <Button
                      variant="outline"
                      className="flex-1 border-primary/50 text-primary hover:bg-primary/10 font-semibold"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.mobile.logout.button"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout ({getInitials(loggedInUser)})
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex-1 border-primary/50 text-primary hover:bg-primary/10 font-semibold"
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.mobile.login.button"
                    >
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </Button>
                  )}
                  <Button
                    asChild
                    className="flex-1 font-semibold"
                    style={{ background: RED, color: "oklch(0.98 0.005 255)" }}
                    data-ocid="nav.mobile.cta.button"
                  >
                    <Link to="/shop" onClick={() => setMobileOpen(false)}>
                      Join Now
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent
          className="sm:max-w-md"
          style={{
            background: "oklch(0.09 0.015 255)",
            border: `1px solid ${RED_BORDER}`,
            boxShadow: "0 0 40px oklch(0.62 0.25 25 / 0.1)",
          }}
          data-ocid="auth.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-black">
              <span className="neon-gradient-text">Welcome Back</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Login to access your TRADEFOREX UNIVERSE CHAIN account.
            </p>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="login-email"
                className="text-sm font-medium font-mono"
              >
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="trader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="auth.input"
                className="bg-muted/50 border-border focus:border-primary font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="login-password"
                className="text-sm font-medium font-mono"
              >
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-ocid="auth.password.input"
                className="bg-muted/50 border-border focus:border-primary font-mono"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-bold font-mono uppercase tracking-wider"
              style={{
                background: RED,
                color: "oklch(0.98 0.005 255)",
                boxShadow: "0 0 20px oklch(0.62 0.25 25 / 0.25)",
              }}
              data-ocid="auth.submit_button"
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
