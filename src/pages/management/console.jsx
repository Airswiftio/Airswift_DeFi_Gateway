import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultButton, DropdownNew } from "@@/components";
import { get as httpGet } from "@@/utils/request/http";
import AuthContext from "@@/context/AuthProvider";
import "./styles/console.scss";

function Console() {
  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [selectedConsole, setSelectedConsole] = useState(0);

  const authCtx = useContext(AuthContext);
  const consoles = [
    { title: "All", path: "network", tableHeader: "Network", priv: "currency" },
    { title: "Gateway", path: "gateway", tableHeader: "Token", priv: "currency" },
    { title: "DID", path: "did", tableHeader: "DID", priv: "merchant" },
    {
      title: "Liquidity Pool",
      path: "liquidity-pool",
      tableHeader: "Pool",
      priv: "liquidity-pool",
    },
  ].filter((console) => authCtx.privs?.includes(console.priv));
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(consoles[selectedConsole].path);
  };
    
  useEffect(() => {
    (async () => {
      const res = await httpGet("admin/blockchain/list", {
        page: 1,
        size: 10,
        status: "all",
      });
      if (res.code === 1000) {
        const networkList = res.data.blockchains.map(chain => {
          const network = { title: chain.name, img: chain.image_url }; 
          return network; 
        });
        setNetworks(networkList);
      }
    })()
  }, []);
  
  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="consoleWrapper managementTableWrapper">
          <div className="main">
            <>
              <div className="title">Select Network and Console Type</div>
              <div className="selectors">
                <div className="select">
                  <span>Network</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={networks}
                    defaultTitle="Network"
                    selected={selectedNetwork}
                    setSelected={setSelectedNetwork}
                  />
                </div>
                <div className="select">
                  <span>Console Type</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={consoles}
                    defaultTitle="Console Type"
                    selected={selectedConsole}
                    setSelected={setSelectedConsole}
                  />
                </div>
              </div>

              <div className="buttonRow">
                <DefaultButton title="Next" type={2} click={handleClick} />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Console;
