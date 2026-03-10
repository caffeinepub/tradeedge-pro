import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, LogIn, LogOut, Menu, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Signals", to: "/signals" },
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
    localStorage.getItem("tradeNikhilUser"),
  );
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("tradeNikhilUser", email);
    setLoggedInUser(email);
    setLoginOpen(false);
    setEmail("");
    setPassword("");
  }

  function handleLogout() {
    localStorage.removeItem("tradeNikhilUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.link"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center gold-glow">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="gold-gradient">TradeNikhil</span>
                <span className="text-foreground/80 font-normal">
                  {" "}
                  Universe Chain
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                    currentPath === link.to
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {loggedInUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-xs gold-glow hover:bg-primary/30 transition-colors"
                      data-ocid="nav.user.toggle"
                      aria-label="User menu"
                    >
                      {getInitials(loggedInUser)}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    data-ocid="nav.user.dropdown_menu"
                  >
                    <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border mb-1">
                      {loggedInUser}
                    </div>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive cursor-pointer"
                      data-ocid="nav.logout.button"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLoginOpen(true)}
                  className="border-primary/50 text-primary hover:bg-primary/10 font-semibold text-sm"
                  data-ocid="nav.login.button"
                >
                  <LogIn className="w-4 h-4 mr-1.5" />
                  Login
                </Button>
              )}
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-semibold text-sm"
                data-ocid="nav.cta.button"
              >
                <Link to="/membership">
                  Join Now <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.mobile.toggle"
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
              className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      currentPath === link.to
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
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
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  )}
                  <Button
                    asChild
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    data-ocid="nav.mobile.cta.button"
                  >
                    <Link to="/membership" onClick={() => setMobileOpen(false)}>
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
          className="sm:max-w-md bg-card border border-primary/30"
          data-ocid="auth.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-black">
              <span className="gold-gradient">Welcome Back</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Login to access your TradeNikhil Universe Chain account.
            </p>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-border focus:border-primary/60"
                data-ocid="auth.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input border-border focus:border-primary/60"
                data-ocid="auth.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-bold text-base py-5"
              data-ocid="auth.submit_button"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/membership"
                className="text-primary hover:underline"
                onClick={() => setLoginOpen(false)}
                data-ocid="auth.membership.link"
              >
                Get Membership
              </Link>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
