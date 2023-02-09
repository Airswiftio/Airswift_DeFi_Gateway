import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton, DropdownNew } from "@@/components";
import AuthContext from "@@/context/AuthProvider";
import "./styles/console.scss";

function Console() {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [selectedConsole, setSelectedConsole] = useState(0);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const networks = [
    {
      title: "ETHEREUM",
      tableHeader: "Ethereum",
      img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
  ];
  
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
  ].filter((el) => authCtx.privs?.includes(el.priv));
  console.log(authCtx);
  
  const handleClick = () => {
    navigate(consoles[selectedConsole].path, {
      state: {
        network: networks[selectedNetwork].tableHeader,
        console: consoles[selectedConsole].tableHeader,
      },
    });
  };
  
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
