import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Assets from "./pages/myassets";
import Settings from "./pages/settings";
import Layout from "./components/Layout";
import Unauthorized from "./components/unauthorized";
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

        {/* Protected Routes Codes: */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Merchant]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all Route */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
