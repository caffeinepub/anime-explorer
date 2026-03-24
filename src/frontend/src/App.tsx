import { AdminPage } from "@/pages/AdminPage";
import { BrowsePage } from "@/pages/BrowsePage";
import { DetailPage } from "@/pages/DetailPage";
import { MyListPage } from "@/pages/MyListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const VISIT_KEY = "animeflix_total_visits";
const LAST_VISIT_KEY = "animeflix_last_visit";
const FIRST_VISIT_KEY = "animeflix_first_visit";

function VisitTracker() {
  useEffect(() => {
    const prev = Number.parseInt(localStorage.getItem(VISIT_KEY) || "0", 10);
    localStorage.setItem(VISIT_KEY, String(prev + 1));
    const now = new Date().toISOString();
    localStorage.setItem(LAST_VISIT_KEY, now);
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
      localStorage.setItem(FIRST_VISIT_KEY, now);
    }
  }, []);
  return null;
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <VisitTracker />
      <Outlet />
    </>
  ),
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BrowsePage,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/anime/$id",
  component: DetailPage,
});

const myListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-list",
  component: MyListPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-stats",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  browseRoute,
  detailRoute,
  myListRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
