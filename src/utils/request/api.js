import { get, post } from '@@/utils/request/http'
import { get as get1, post as post1 } from '@@/utils/request/mock-http'

const app_id = 0;

const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

const apiGet1 = (url,p)=>get1(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost1 = (url,p)=>post1(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

export const challengeGenerate = p => apiGet('/merchant/sign_content', p);
// export const challengeVerify = p => apiPost('/challenge/verify', p);
export const GetUserRelatedMerchant = p => apiGet('/merchant/related_merchant', p);
export const GetUserNickname = p => apiGet('/merchant/nickname', p);
export const SetNicknameUseEthSignature = p => apiPost('/merchant/nickname', p);
export const UserRegister = p => apiPost('/merchant/register', p);
export const UserLogin = p => apiPost('/merchant/login', p);

export const GetMerchantBaseSummary = p => apiGet1('https://mock.apifox.cn/m1/1595489-0-default/merchant/summary/base', p);

export const GetMerchantPaymentStatChart = p => apiGet('/merchant/chart/payment', p);

//Income Summary
export const GetPaymentSummary = p => apiGet(`/merchant/application/${app_id}/payment/summary`, p);

//Withdraw Summary
export const GetWithdrawSummary = p => apiGet(`/merchant/application/${app_id}/withdraw/summary`, p);

//Income list
export const GetPaymentList = p => apiGet(`/merchant/application/${app_id}/payment/list`, p);

//Withdraw list
export const GetWithdrawList = p => apiGet(`/merchant/application/${app_id}/withdraw/list`, p);

//get app info
export const GetApplicationDetail = p => apiGet(`/merchant/application/${app_id}/detail`, p);
