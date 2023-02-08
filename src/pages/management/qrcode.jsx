import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton, DropdownNew } from "@@/components";
import { select_currency } from "@@/utils/config";
import AuthContext from "@@/context/AuthProvider";
import "./styles/qrcode.scss";

function QRCode() {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const networkList = [
    {
      key: "Ethereum",
      title: "ETHEREUM",
      img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
  ];
  
  const currencyList = select_currency();
  currencyList.unshift({ key: "all", title: "All"});
  console.log(currencyList, "currencyList");

  // const consoles = [
  //   { title: "All", path: "network", alias: "Network", priv: "currency" },
  //   { title: "Gateway", path: "gateway", alias: "Token", priv: "currency" },
  //   { title: "DID", path: "did", alias: "DID", priv: "merchant" },
  //   { title: "Liquidity Pool", path: "liquidity-pool", alias: "Pool", priv: "liquidity-pool" },
  // ].filter((el) => authCtx.privs?.includes(el.priv));
  // console.log(authCtx);

  const handleClick = () => {
    navigate(currencyList[selectedCurrency].key, {
      state: {
        network: networkList[selectedNetwork].key,
        currency: currencyList[selectedCurrency].key,
      },
    });
  };

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper" style={{ visibility: "hidden" }}>
          <div className="searchWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              className="input"
              placeholder="Search Pools or Token"
              //   onChange={(event) => {
              //     search(event.target.value);
              //   }}
            />
          </div>
        </div>

        <div className="consoleWrapper managementTableWrapper" style={{ justifyContent: "start" }}>
          <div className="main">
            <>
              <div className="title">Select Network and Cryptocurrency</div>
              <div className="selectors">
                <div className="select">
                  <span>Network</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={networkList}
                    defaultTitle="Network"
                    selected={selectedNetwork}
                    setSelected={setSelectedNetwork}
                  />
                </div>
                <div className="select">
                  <span>Currency</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={currencyList}
                    defaultTitle="Currency"
                    selected={selectedCurrency}
                    setSelected={setSelectedCurrency}
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

export default QRCode;
