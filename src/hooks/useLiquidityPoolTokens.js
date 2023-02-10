import { useState, useEffect } from "react";
import { ethers, signer } from "@@/utils/chain/chainBase";
import contractConfig from "@@/contract.config";

export default function useLiquidityPoolTokens() {
  const [tokens, setTokens] = useState([]);

  let liquidityTokenList = contractConfig.liquidityTokenList;
  const Contract = new ethers.Contract(contractConfig.lpManagerAddr, contractConfig.lpManagerABI, signer);

  useEffect(() => {
    (async () => {
      // pools balance
      await Promise.all(
        liquidityTokenList.map(async (token) => {
          if (token.address === "0x0000000000000000000000000000000000000000") {
            // ether pool
            token["balance"] = ethers.utils.formatEther(await Contract.getEthPoolBalance());
          } else {
            // other pools
            token["balance"] = ethers.utils.formatEther(
              await Contract.getPoolBalanceViaToken(token.address)
            );
          }
        })
      );
      console.log(liquidityTokenList, "poolsBalance");

      // exchange rate
      const rates = await fetch("https://api.coinbase.com/v2/exchange-rates")
        .then((res) => res.json())
        .then((resJson) => resJson.data.rates);

      // convert to usd
      liquidityTokenList.forEach((token) => {
        token.balance = token.balance * rates[token.name];
        console.log("rate:", rates[token.name]);
      });

      setTokens(liquidityTokenList);
      console.log(tokens, "poolsBalance * rate");
    })();
  }, []);

  return tokens;
}
