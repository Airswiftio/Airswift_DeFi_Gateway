import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Assets from "./pages/myassets";
import Settings from "./pages/settings";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
