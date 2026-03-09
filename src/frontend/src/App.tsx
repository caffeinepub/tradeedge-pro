import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import EducationPage from "@/pages/EducationPage";
import HomePage from "@/pages/HomePage";
import MembershipPage from "@/pages/MembershipPage";
import PaymentPage from "@/pages/PaymentPage";
import SignalsPage from "@/pages/SignalsPage";
import AdvanceMemberPage from "@/pages/member/AdvanceMemberPage";
import BasicMemberPage from "@/pages/member/BasicMemberPage";
import ConquerorMemberPage from "@/pages/member/ConquerorMemberPage";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const signalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signals",
  component: SignalsPage,
});

const educationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/education",
  component: EducationPage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: MembershipPage,
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const basicMemberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/basic",
  component: BasicMemberPage,
});

const advanceMemberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/advance",
  component: AdvanceMemberPage,
});

const conquerorMemberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/conqueror",
  component: ConquerorMemberPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  signalsRoute,
  educationRoute,
  membershipRoute,
  paymentRoute,
  contactRoute,
  basicMemberRoute,
  advanceMemberRoute,
  conquerorMemberRoute,
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
