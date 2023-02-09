import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Login,
  MyAssets,
  Settings,
  Admin,
  Farms,
  Pools,
  Withdraw,
  ManagementLogin,
  ManagementForgotPassword,
  ManagementDashboard,
  ExpenseManagement,
  NetworkManagement,
  GatewayManagement,
  DIDManagement,
  LiquidityPoolManagement,
  Console,
  QRCode,
  ManagementSubAccount,
} from "@@/pages";
import {
  ManagementLayout,
  Layout,
  Unauthorized,
  RequireAuth,
  RequirePriv,
  LiquidityLayout,
} from "@@/components";
import { listenWallet } from "@@/utils/chain/wallet";
import "@@/App.scss";

/* Protected route codes -> user: 2000, merchant: 3000, admin: 5000 */
const ROLES = {
  Contributor: "contributor",
  ShopManager: "shop_manager",
  Admin: "admin",
};

const PRIVILEGES = {
  EXPENSE: ["expense"],
  CONSOLE: ["currency", "merchant", "liquidity-pool"],
  NETWORK: ["currency"],
  GATEWAY: ["currency"],
  DID: ["merchant"],
  LIQUIDITY: ["liquidity-pool"],
};

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    listenWallet(); //监听钱包
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Dev - Unprotected Management */}
        <Route path="management" element={<ManagementLayout title="Airswift Management" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="login" element={<ManagementLogin />} />
          <Route path="pw" element={<ManagementForgotPassword />} />
          <Route path="dashboard" element={<ManagementDashboard />} />
          <Route
            path="expense"
            element={
              <RequirePriv component={<ExpenseManagement />} requiredPrivs={PRIVILEGES.EXPENSE} />
            }
          />
          <Route path="subaccount" element={<ManagementSubAccount />} />
          <Route path="console">
            <Route
              index
              element={<RequirePriv component={<Console />} requiredPrivs={PRIVILEGES.CONSOLE} />}
            />
            <Route
              path="network"
              element={
                <RequirePriv component={<NetworkManagement />} requiredPrivs={PRIVILEGES.NETWORK} />
              }
            />
            <Route
              path="gateway"
              element={
                <RequirePriv component={<GatewayManagement />} requiredPrivs={PRIVILEGES.GATEWAY} />
              }
            />
            <Route
              path="did"
              element={<RequirePriv component={<DIDManagement />} requiredPrivs={PRIVILEGES.DID} />}
            />
            <Route
              path="liquidity-pool"
              element={
                <RequirePriv
                  component={<LiquidityPoolManagement />}
                  requiredPrivs={PRIVILEGES.LIQUIDITY}
                />
              }
            />
          </Route>
          {/* Catch other management routes */}
          <Route path="*" element={<ManagementDashboard />} />
        </Route>

        {/* Liquidity Pools & Farms */}
        <Route path="/liquidity" element={<LiquidityLayout />}>
          <Route path="farms" element={<Farms />} />
          <Route path="pools" element={<Pools />} />
        </Route>

        {/* Protected Routes Codes: */}
        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.Contributor, ROLES.ShopManager, ROLES.Admin]} />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="assets" element={<MyAssets state={state} setState={setState} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="qrcode" element={<QRCode />} />
          <Route path="withdraw" element={<Withdraw setState={setState} />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Catch all Route */}
        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.Contributor, ROLES.ShopManager, ROLES.Admin]} />
          }
        >
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
