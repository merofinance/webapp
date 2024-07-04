import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import PoolsPage from "./pages/pools/PoolsPage";
import PoolPage from "./pages/pool/PoolPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import Layout from "./Layout";
import PoolMigrationPage from "./pages/pool-migration/PoolMigrationPage";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/terms-of-service/TermsOfService";

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="pool/:poolName" element={<PoolPage />} />
            <Route path="pools" element={<PoolsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="tos" element={<TermsOfServicePage />} />
            <Route path="pool-migration" element={<PoolMigrationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
