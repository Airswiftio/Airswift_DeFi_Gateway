import { Routes, Route } from "react-router-dom";
import Dashboard from "@@/pages/dashboard";
import Login from "@@/pages/login";
import Assets from "@@/pages/myassets";
import Settings from "@@/pages/settings";
import Withdraw from "@@/pages/withdraw";
import Admin from "@@/pages/admin";
import Layout from "@@/components/Layout";
import Unauthorized from "@@/components/unauthorized";
import RequireAuth from "@@/components/RequireAuth";
import "@@/App.scss";

/* Protected route codes -> user: 2000, merchant: 3000, admin: 5000 */
const ROLES = {
  Contributor: 'contributor',
  ShopManager: 'shop_manager',
  Admin: 'admin',
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes Codes: */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Contributor,ROLES.ShopManager,ROLES.Admin]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Catch all Route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Contributor,ROLES.ShopManager,ROLES.Admin]} />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
