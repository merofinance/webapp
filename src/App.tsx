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
import MeroPage from "./pages/mero/MeroPage";
import { DEBT_REPAYMENT_ACTION_ROUTE, STAKING_LIVE, TOPUP_ACTION_ROUTE } from "./lib/constants";
import CareersPage from "./pages/careers/CareersPage";
import CareerPage from "./pages/careers/CareerPage";
import PoolMigrationPage from "./pages/pool-migration/PoolMigrationPage";
import DebtRepaymentPool from "./pages/actions/register/topup/DebtRepaymentPool";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage";

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="pool/:poolName" element={<PoolPage />} />
            <Route path="pools" element={<PoolsPage />} />
            <Route path="actions" element={<ActionsPage />}>
              <Route path="register" element={<ActionRegister />}>
                <Route index element={<ActionRegisterIndex />} />
                <Route path="topup" element={<RegisterTopup />}>
                  <Route
                    index
                    element={<TopupLoan actionType="topup" nextRouteBase={TOPUP_ACTION_ROUTE} />}
                  />
                  <Route
                    path="deposit/:poolName/:address/:protocol"
                    element={
                      <TopupPoolDeposit actionType="topup" nextRouteBase={TOPUP_ACTION_ROUTE} />
                    }
                  />
                  <Route
                    path=":address/:protocol/:poolName"
                    element={<TopupConditions actionType="topup" />}
                  />
                  <Route path=":address/:protocol" element={<TopupPool />} />
                </Route>
                <Route path="debt-repayment" element={<RegisterTopup />}>
                  <Route
                    index
                    element={
                      <TopupLoan
                        actionType="debtRepayment"
                        nextRouteBase={DEBT_REPAYMENT_ACTION_ROUTE}
                      />
                    }
                  />
                  <Route
                    path="deposit/:poolName/:address/:protocol"
                    element={
                      <TopupPoolDeposit
                        actionType="debtRepayment"
                        nextRouteBase={DEBT_REPAYMENT_ACTION_ROUTE}
                      />
                    }
                  />
                  <Route
                    path=":address/:protocol/:poolName"
                    element={<TopupConditions actionType="debtRepayment" />}
                  />
                  <Route path=":address/:protocol" element={<DebtRepaymentPool />} />
                </Route>
              </Route>
              <Route index element={<ActionsIndex />} />
            </Route>
            {STAKING_LIVE && <Route path="claim" element={<ClaimPage />} />}
            {STAKING_LIVE && <Route path="stake" element={<StakePage />} />}
            {STAKING_LIVE && <Route path="mero" element={<MeroPage />} />}
            <Route path="litepaper" element={<LitepaperPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="pool-migration" element={<PoolMigrationPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="career/:careerId" element={<CareerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
