import { useState, useEffect } from "react";
import { ethers, signer } from "@@/utils/chain/chainBase";
import { get as httpGet } from "@@/utils/request/http";

export default function useLiquidityPoolTokens() {
  const [tokens, setTokens] = useState([]);

  const lpManagerAddr = "0x5918cC2A6D456aD06B0E70eC2350C1e657792D9C";
  const abi = `[
      {
          "inputs":[
              {
                  "internalType":"address",
                  "name":"token",
                  "type":"address"
                }
            ],
            "name":"getPoolBalanceViaToken",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"balance",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"getEthPoolBalance",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"balance",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }
    ]`;
  const Contract = new ethers.Contract(lpManagerAddr, abi, signer);

  useEffect(() => {
    (async () => {
      let tokens = [
        { name: "USDC", address: "0x4600029b3b2426d627dFde7d57AbCFdC96aEC147" },
        { name: "DAI", address: "0x581857409579161Dabd2C4994f78b2F1B3671bc2" },
        { name: "ETH", address: "0x0000000000000000000000000000000000000000" },
      ];

      // available tokens
      const poolList = await httpGet("admin/pool/list", {
        page: 1,
        size: 10,
        status: "unavailable",
      });
      if (poolList.data.total > 0) {
        poolList.data.pools.forEach((pool) => {
          tokens = tokens.filter((token) => token.address !== pool.currency.contract_address);
        });
      }

      // pools balance
      await Promise.all(
        tokens.map(async (token) => {
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
      console.log(tokens, "poolsBalance");

      // exchange rate
      const rates = await fetch("https://api.coinbase.com/v2/exchange-rates")
        .then((res) => res.json())
        .then((resJson) => resJson.data.rates);

      // convert to usd
      tokens.forEach((token) => {
        token.balance = token.balance * rates[token.name];
        console.log("rate:", rates[token.name]);
      });

      setTokens(tokens);
      console.log(tokens, "poolsBalance * rate");
    })();
  }, []);

  return tokens;
}
