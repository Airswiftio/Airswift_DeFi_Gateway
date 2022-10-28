import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Assets from "./pages/myassets";
import Settings from "./pages/settings";
import Connect from "./pages/connect";
import Withdraw from "./pages/withdraw";
import Choose from "./pages/stores/choose";
import Setup from "./pages/stores/setup";
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

        {/* Protected Routes Codes: */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Merchant]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="stores/choose" element={<Choose />} />
          <Route path="stores/setup" element={<Setup />} />
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
