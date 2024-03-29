import {ethers, WEthereum, Web3Provider, signer, isEth} from '@@/utils/chain/chainBase';
import md5 from 'js-md5';
import {
  dbClearAccount,
  dbGetUserWallet, dbSetJWTToken, dbSetSignData, dbSetUserWallet,
  empty,
  hideStr,
  json_to_obj
} from "@@/utils/function";
import {challengeGenerate, challengeVerify} from "@@/utils/request/api";
// import BaseConfig from "@@/config.json";
// import {popupAlert} from "@@/components/PopAlert/Index";

const metamaskUrl = "https://metamask.app.link/dapp/m.metablox.rome9.com/";

let WalletRequest = class  {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}


const analysisErrorMsg =  (error) => {
  // console.log('error1',error);
  // console.log('error2',error.code);
  // console.log('error3',error.message);
  // console.log('error4',error.data);
  // console.log('error5',typeof error);

  if(!error?.code){
    return {code:-999,msg:error}
  }
  if(error.code === 4001){
    return {code:4001,msg:error.message}
  }
  else if(error.code === -32603){
    error.msg = error.data.message;
    return error;
  }
  else if(error.code === 'ACTION_REJECTED'){
    let msg = error.message.split(' (action=')[0];
    return {code:4002,msg:msg};
  }

  else if(error.code === 'UNPREDICTABLE_GAS_LIMIT'){
    let res = error.message.split(', error=')[1].split(', code=')[0];
    res = json_to_obj(res);
    res.msg = res.data.message;
    return res;
  }

  else{
    return {code:-9999,msg:error.message};
  }
}

export const Web3SignData = async (account, data) => {
  if(!isEth){
    return {code:-1,msg:'Ethereum Provider not exist!'};
  }

  return await signer.signMessage(data)
      .then((res)=>{
        return {code:1000,data:res};
      })
      .catch((ee)=>{
        return analysisErrorMsg(ee);
      });
  /*return await Web3Provider.send('eth_signTypedData_v4',[account, JSON.stringify(data)])
      .then((res)=>{
        return {code:1000,data:res};
      })
      .catch((ee)=>{
        return analysisErrorMsg(ee);
      });*/
  // return await signer._signTypedData(domain, types, message); //_signTypedData功能不完善，是实验中的功能，只能签名特定的数据结构
}

//Check the environment, whether ethernet is supported, and whether MetaMask plug-ins are installed
export const detectionEnvironment = async () => {
  if (!isEth) {
    return {code:100,msg:'Ethereum Provider not exist!',url:metamaskUrl};
  }
  if (!WEthereum.isMetaMask) {
    return {code:100,msg:'MetaMask not install!',url:metamaskUrl};
  }
  if(!checkNetwork((await getNetwork()).chainId)){
    return {code:101,msg:'Chain error'}
  }
  return {code:1000,msg:'ok'};
}

//Monitor wallet
export const listenWallet = () => {
  if(!isEth) return false;
  const userWallet = dbGetUserWallet();

  WEthereum.on("accountsChanged", function(accounts) {
    if(userWallet){
      //Once the account is switched, it will be executed here
      dbClearAccount();
      window.location.reload();
    }
  });

  Web3Provider.on("disconnect", function(accounts) {
    //Once disconnected, it will be executed here
  });

  // The "any" network will allow spontaneous network changes
  Web3Provider.on("network", function(newNetwork, oldNetwork){
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network

    //Detect the user's network, which is not a supported network, and send the user a request to switch networks
    if (oldNetwork && userWallet) {
      //Once the network is switched, log out of the login information and log in again
      dbClearAccount();
      window.location.reload();
    }
  });
}


// Request to access wallet and get account list
const requestAccounts =  async () => {
  return await Web3Provider.send("eth_requestAccounts", [])
      .then((res)=>{
        return res;
      })
      .catch((ee)=>{
        return [];
      });
}

//Formatted coins
export const formatEther = (balance) => {
  return ethers.utils.formatEther(balance);
}

//get account balance
const getBalance = (account) => {
  return Web3Provider.getBalance(account)
      .then((res)=>{
        return formatEther(res);
      })
      .catch((ee)=>{
        console.log('ee',ee);
        return 0;
      });
}

export const getNetwork = () => {
  return Web3Provider.getNetwork();
}

export const getChainId = () => {
  return dbGetUserWallet().chainId;
}

export const getChain = () => {
  return '0x' + Number.parseInt(dbGetUserWallet()?.chainId ?? 0, 10).toString(16);
}

export const getChainName = () => {
  let chainId = getChainId();
  let name = '';
  if(chainId === 1){
    name = 'Ethereum';
  }
  else if(chainId === 5){
    name = 'ETH(Goerli)';
  }
  else if(chainId === 56){
    name = 'Binance';
  }
  else if(chainId === 97){
    name = 'Binance(test)';
  }
  return name;
}

export const checkNetwork = (chainId) => {
  if(!chainId){
    return false;
  }
  if(process.env.REACT_APP_MODE === 'production'){
    if (chainId === 1) {
      return true;
    }
    if (chainId === 56) {
      return true;
    }
  }
  else {
    //test mode
    if(chainId  === 5){
      return true;
    }
    if(chainId  === 97){
      return true;
    }
  }
  return false;
}

export const switchNetwork = async (chainId = 0) => {
  if(chainId <= 0 || !WEthereum){
    return{code:-1,msg:'Change network failed!'}
  }

  if(![1,5,56,97].includes(chainId)){
    return{code:-1,msg:'Chain error!'}
  }

  const chainData = {
    'chain_1':{
      method: 'wallet_switchEthereumChain',
      params: [{chainId: '0x1'}],
    },
    'chain_5':{
      method: 'wallet_switchEthereumChain',
      params: [{chainId: '0x5'}],
    },
    'chain_56':{
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x38',
          chainName: 'Binance Smart Chain Mainnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed1.binance.org'],
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    },
    'chain_97':{
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x61',
          chainName: 'Binance Smart Chain Testnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'tBNB',
            decimals: 18,
          },
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
          blockExplorerUrls: ['https://testnet.bscscan.com'],
        },
      ],
    },
  }
  return await WEthereum
      .request(chainData['chain_'+chainId])
      .then(() => {
        // dbClearAccount();
        return {code:1000,msg:'Change network success'}
      })
      .catch((e) => {
        return analysisErrorMsg(e)
      })
}


export const connectWallet = async () => {
  //First, check whether the environment supports and whether metamask plug-ins are installed
  let res = beforeSend(false);
  if(res.code !== 1000){
    return res;
  }

  if(!dbGetUserWallet()?.account) {
    let res1 = await detectionEnvironment();
    if(res1.code === 100){
      // popupAlert({type:'wentWrong',data:{msg:res.msg}}); //todo 999
      window.open(res1.url);
      return res1;
    }
    else if(res1.code === 101){
      // popupAlert({type:'switchingNetwork',data:{msg:res.msg}});//todo 999
      return res1;
    }

    //Get account address
    let accounts = await requestAccounts();
    if(empty(accounts) || empty(accounts[0])){
      return {code:-1,msg:'Account not exist!'};
    }
    let account =  accounts[0];

    //Get account balance and connect to the network
    let balance = await getBalance(account);//Get the account balance and format it
    let network = await getNetwork();
    let networkName = network.chainId === 1 ? 'Mainnet':network.name;
    let chainId = network.chainId.toString();

    //Get the signature verification message from the back end
    let res2 = await challengeGenerate({address:account,chainId: chainId});
    if(typeof res2?.code === 'undefined' || res2.code !== 1000 || empty(res2.msg.content)){
      dbClearAccount();
      res2.msg = 'Failed to get sign message! '
      return res2;
    }

    let res3 = await Web3SignData(account,res2.msg.content);
    if(typeof res3?.code === 'undefined' || res3.code !== 1000 || empty(res3.data)){
      dbClearAccount();
      return res3;
    }

    dbSetSignData(res3?.data)
    let userWallet = {
      balance:balance,
      chainId:network.chainId,
      network:networkName,
      account:account,
      simple_account:hideStr(account,5,4,'.',3),
      did:didCreate(account),
    };
    dbSetUserWallet(userWallet)
  }

  return {code:1000,msg:'ok'};
}
export const connectWallet1 = async () => {
  // //First, check whether the environment supports and whether metamask plug-ins are installed
  // let res = beforeSend(false);
  // if(res.code !== 1000){
  //   return res;
  // }
  //
  // if(!dbGetUserWallet()?.account) {
  //   let signature = await Web3SignData(account,res_challenge.data.content);
  //   if(typeof signature?.code === 'undefined' || signature.code !== 1000 || empty(signature.data)){
  //     dbClearAccount();
  //     return signature;
  //   }
  //
  //   //Verify signature
  //   let res_verity = await challengeVerify({eth_address:account,chainId: chainId,signature: signature.data.slice(2)});
  //   if(typeof res_verity?.code === 'undefined' || res_verity.code !== 1000 || empty(res_verity.data) || empty(res_verity.data.token)){
  //     dbClearAccount();
  //     return res_verity;
  //   }
  //
  //   dbSetJWTToken(res_verity.data.token);
  //   return {code:1000,msg:'ok',data:userWallet};
}


export const beforeSend = (checkUser = true)=>{
  if (!isEth) {
    return {code:-1,msg:'Ethereum Provider not exist!'};
  }
  if (!WEthereum.isMetaMask) {
    return {code:-1,msg:'MetaMask not install!'};
  }
  if(checkUser){
    let userWallet = dbGetUserWallet();
    if(!userWallet || typeof userWallet.account === 'undefined'){
      return {code:-1,msg:'Not find account'};
    }
  }
  return {code:1000,msg:'ok'};
}


export function didCreate(account = '') {
  //todo 999
  account = empty(account) ? dbGetUserWallet()?.account : account;
  const didAddress =`did:veric:${account}`;
  return  didAddress
}



export {Web3Provider,signer}