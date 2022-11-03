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
} from "./pages";
import Layout from "./components/Layout";
import { Unauthorized } from "./components/";
import RequireAuth from "./components/RequireAuth";
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
        <Route path="liquidity/farms" element={<Farms />} />
        <Route path="liquidity/pools" element={<Pools />} />
        <Route path="management/login" element={<ManagementLogin />} />
        <Route path="management/pw" element={<ManagementForgotPassword />} />

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
