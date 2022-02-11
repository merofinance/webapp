import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import PoolsPage from "./pages/pools/PoolsPage";
import StakePage from "./pages/stake/StakePage";
import LitepaperPage from "./pages/litepaper/LitepaperPage";
import ClaimPage from "./pages/claim/ClaimPage";
import PoolPage from "./pages/pool/PoolPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import ActionsPage from "./pages/actions/ActionsPage";
import ActionRegister from "./pages/actions/register/ActionRegister";
import ActionsIndex from "./pages/actions/ActionsIndex";
import ActionRegisterIndex from "./pages/actions/register/ActionRegisterIndex";
import RegisterTopup from "./pages/actions/register/topup/RegisterTopup";
import TopupPoolDeposit from "./pages/actions/register/topup/TopupPoolDeposit";
import TopupConditions from "./pages/actions/register/topup/TopupConditions";
import TopupPool from "./pages/actions/register/topup/TopupPool";
import TopupLoan from "./pages/actions/register/topup/TopupLoan";
import Layout from "./Layout";
import BkdPage from "./pages/bkd/BkdPage";
import { ACTIONS_LIVE, STAKING_LIVE } from "./lib/constants";

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="pool/:poolName" element={<PoolPage />} />
            <Route path="pools" element={<PoolsPage />} />
            {ACTIONS_LIVE && (
              <Route path="actions" element={<ActionsPage />}>
                <Route path="register" element={<ActionRegister />}>
                  <Route index element={<ActionRegisterIndex />} />
                  <Route path="topup" element={<RegisterTopup />}>
                    <Route index element={<TopupLoan />} />
                    <Route
                      path="deposit/:poolName/:address/:protocol"
                      element={<TopupPoolDeposit />}
                    />
                    <Route path=":address/:protocol/:poolName" element={<TopupConditions />} />
                    <Route path=":address/:protocol" element={<TopupPool />} />
                  </Route>
                </Route>
                <Route index element={<ActionsIndex />} />
              </Route>
            )}
            {STAKING_LIVE && <Route path="claim" element={<ClaimPage />} />}
            {STAKING_LIVE && <Route path="stake" element={<StakePage />} />}
            {STAKING_LIVE && <Route path="bkd" element={<BkdPage />} />}
            <Route path="litepaper" element={<LitepaperPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
