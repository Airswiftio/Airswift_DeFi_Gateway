import { get, post } from '@@/utils/request/http'
const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

export const challengeGenerate = p => apiPost('/challenge/generate', p);
export const challengeVerify = p => apiPost('/challenge/verify', p);
export const history = (urlP = '',p) => apiGet('/history'+urlP, p);
export const stakingPools = (urlP = '',p) => apiGet('/stakingcontracts'+urlP, p);

