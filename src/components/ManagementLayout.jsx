import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "@@/context/AuthProvider";
import { ManagementHeader } from "./";
const ManagementLayout = ({ title }) => {
  const [url, setUrl] = useState(window.location.pathname);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setUrl(window.location.pathname);
  }, [authCtx.auth]);

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className="App">
      {!url.includes("/login") ? <ManagementHeader url={url} setUrl={setUrl} /> : null}
      <Outlet />
    </div>
  );
};

export default ManagementLayout;
