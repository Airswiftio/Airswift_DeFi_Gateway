import {
  Dashboard,
  Login,
  MyAssets,
  Settings,
  Connect,
  ChooseStore,
  SetupStore,
  Admin,
  Farms,
  Pools,
  Withdraw,
  ManagementLogin,
  ManagementForgotPassword,
  ManagementDashboard,
  MerchantManagement,
  LiquidityManagement,
} from "./pages";
import {
  ManagementLayout,
  Layout,
  Unauthorized,
  RequireAuth,
} from "./components/";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

/* Protected route codes -> user: 2000, merchant: 3000, admin: 5000 */
const ROLES = {
  User: 2000,
  Merchant: 3000,
  Admin: 5000,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="connect" element={<Connect />} />

        {/* Dev - Unprotected Management */}
        <Route path="/management" element={<ManagementLayout />}>
          <Route path="login" element={<ManagementLogin />} />
          <Route path="pw" element={<ManagementForgotPassword />} />
          <Route path="dashboard" element={<ManagementDashboard />} />
          <Route path="merchant" element={<MerchantManagement />} />
          <Route path="liquidity" element={<LiquidityManagement />} />
        </Route>

        {/* Liquidity Pools & Farms */}
        <Route path="/liquidity" element={<ManagementLayout />}>
          <Route path="farms" element={<Farms />} />
          <Route path="pools" element={<Pools />} />
        </Route>

        {/* Protected Routes Codes: */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Merchant]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="assets" element={<MyAssets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="stores/choose" element={<ChooseStore />} />
          <Route path="stores/setup" element={<SetupStore />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Catch all Route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Merchant]} />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
