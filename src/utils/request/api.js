import { get, post } from '@@/utils/request/http'
const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

export const challengeGenerate = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/sign_content', p);
export const challengeVerify = p => apiPost('/challenge/verify', p);
export const GetUserNickname = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/nickname', p);
export const SetNicknameUseEthSignature = p => apiPost('https://mock.apifox.cn/m1/1595489-0-default/merchant/nickname', p);
export const GetUserRelatedMerchant = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/related_merchant', p);

