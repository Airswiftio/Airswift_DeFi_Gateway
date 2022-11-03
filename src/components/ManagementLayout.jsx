import { Outlet } from "react-router-dom";
import { ManagementHeader } from "./";
const ManagementLayout = () => {
  return (
    <div className="App">
      <ManagementHeader />
      <Outlet />
    </div>
  );
};

export default ManagementLayout;
