const contractConfig = {
  lpManagerAddr: "0x5918cC2A6D456aD06B0E70eC2350C1e657792D9C",
  lpManagerABI: `[
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
      ]`,
  liquidityTokenList: [
    { name: "USDC", address: "0x4600029b3b2426d627dFde7d57AbCFdC96aEC147" },
    { name: "DAI", address: "0x581857409579161Dabd2C4994f78b2F1B3671bc2" },
    { name: "ETH", address: "0x0000000000000000000000000000000000000000" },
  ],
};

export default contractConfig;
