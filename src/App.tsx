import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const Home = lazy(() => import("@/routes/Home"));
const Services = lazy(() => import("@/routes/Services"));
const FinancialManagement = lazy(() => import("@/routes/FinancialManagement"));
const BusinessConsulting = lazy(() => import("@/routes/BusinessConsulting"));
const About = lazy(() => import("@/routes/About"));
const Contact = lazy(() => import("@/routes/Contact"));
const Legal = lazy(() => import("@/routes/Legal"));
const NotFound = lazy(() => import("@/routes/NotFound"));

/**
 * Shared route tree, mounted twice below: once at "/" (Ukrainian, the
 * primary/default locale) and once nested under "/en" (English). Layout
 * reads the URL itself (see useLocaleSync) to decide which language to
 * render. `<Routes>` recurses into plain fragments, so this constant (not
 * a component — react-router doesn't descend into custom components when
 * building its route config) can be reused as children under both parents.
 */
const appRouteChildren = (
    <>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/financial-management" element={<FinancialManagement />} />
        <Route path="services/business-consulting" element={<BusinessConsulting />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal variant="privacy" />} />
        <Route path="terms" element={<Legal variant="terms" />} />
        <Route path="*" element={<NotFound />} />
    </>
);

function App() {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {appRouteChildren}
                </Route>
                <Route path="/en" element={<Layout />}>
                    {appRouteChildren}
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
