import { get, post } from '@@/utils/request/http'
import { get as get1, post as post1 } from '@@/utils/request/mock-http'
const apiGet1 = (url,p)=>get1(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost1 = (url,p)=>post1(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

const app_id = 0;
const payment_id = 1;
const withdraw_id = 2;

const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});


//mock - data
export const challengeGenerate = p => apiGet('/merchant/sign_content', p);
export const GetUserRelatedMerchant = p => apiGet('/merchant/related_merchant', p);
export const GetUserNickname = p => apiGet('/merchant/nickname', p);
export const SetNicknameUseEthSignature = p => apiPost('/merchant/nickname', p);
export const UserRegister = p => apiPost('/merchant/register', p);
export const UserLogin = p => apiPost('/merchant/login', p);

// export const GetMerchantBaseSummary = p => apiGet('/merchant/summary/base', p); todo 888
export const GetMerchantBaseSummary = p => apiGet('/merchant/summary/base', p);

export const GetMerchantPaymentStatChart = p => apiGet('/merchant/chart/payment', p);

//Income Summary
export const GetPaymentSummary = p => apiGet(`/merchant/application/${app_id}/payment/summary`, p);

//Withdraw Summary
export const GetWithdrawSummary = p => apiGet(`/merchant/application/${app_id}/withdraw/summary`, p);

//Income list
export const GetPaymentList = p => apiGet(`/merchant/application/${app_id}/payment/list`, p);

//Withdraw list
export const GetWithdrawList = p => apiGet1(`/merchant/application/${app_id}/withdraw/list`, p);

//get app info
export const GetApplicationDetail = p => apiGet(`/merchant/application/${app_id}/detail`, p);






// export const CreateApplication = p => apiPost('/merchant/application/create', p);
// export const GetApplicationList = p => apiGet(`/merchant/${merchant_id}/application/list`, p);

export const ModifyApplicationBase = p => apiPost('/merchant/application/base', p);
export const ModifyApplicationCurrency = p => apiPost('/merchant/application/currency', p);
export const ModifyApplicationApiKey = p => apiPost('/merchant/application/api_key', p);
export const ModifyApplicationIpnKey = p => apiPost('/merchant/application/ipn_key', p);
export const GetAvailableCurrency = p => apiGet(`/merchant/config/all_currency`, p);
export const GetPaymentDetail = p => apiGet(`/merchant/application/${app_id}/payment/${payment_id}`, p);
export const GetWithdrawDetail = p => apiGet(`/merchant/application/withdraw/${withdraw_id}`, p);

// export const PaymentRefund = p => apiPost('/merchant/payment/refund', p);
// export const PaymentWithdraw = p => apiPost('/merchant/payment/withdraw', p);

export const GetMerchantUserList = p => apiGet(`/merchant/user/list`, p);
export const GrantUserMerchantRole = p => apiPost('/merchant/user/role/grant', p);
export const RevokeUserMerchantRole = p => apiPost('/merchant/user/role/revoke', p);
export const ChangeUserMerchantRole = p => apiPost('/merchant/user/role/change', p);
