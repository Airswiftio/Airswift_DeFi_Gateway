import { ethers } from 'ethers';

const isEth = !(typeof window?.ethereum === "undefined");
const WEthereum = isEth? window.ethereum:{};
const Web3Provider = isEth? new ethers.providers.Web3Provider(WEthereum,'any'):{};
const signer = isEth? Web3Provider.getSigner():()=>{};

export {ethers,isEth,WEthereum,Web3Provider,signer}