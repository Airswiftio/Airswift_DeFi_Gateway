import { Outlet } from "react-router-dom";
import { LiquidityHeader } from "./";
const LiquidityLayout = () => {
  return (
    <div className="App">
      <LiquidityHeader />
      <Outlet />
    </div>
  );
};

export default LiquidityLayout;
