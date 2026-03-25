import AnnouncementBar from "@/components/ecom/AnnouncementBar";
import EcomFooter from "@/components/ecom/EcomFooter";
import ExitPopup from "@/components/ecom/ExitPopup";
import Header from "@/components/ecom/Header";
import LiveSalesPopup from "@/components/ecom/LiveSalesPopup";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import CartPage from "@/pages/ecom/CartPage";
import CheckoutPage from "@/pages/ecom/CheckoutPage";
import ContactEcomPage from "@/pages/ecom/ContactEcomPage";
import HomePage from "@/pages/ecom/HomePage";
import ProductPage from "@/pages/ecom/ProductPage";
import ShopPage from "@/pages/ecom/ShopPage";
import TrackOrderPage from "@/pages/ecom/TrackOrderPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#0A0F1C" }}
      >
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pb-24">
          <Outlet />
        </main>
        <EcomFooter />
        <Toaster richColors position="top-right" />
        <LiveSalesPopup />
        <ExitPopup />
      </div>
    </CartProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track",
  component: TrackOrderPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactEcomPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  trackRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
