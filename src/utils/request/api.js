import { get, post } from '@@/utils/request/http'
const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

const apiGet1 = (response)=> {response.code = 1000; return response};
const apiPost1 = (response)=> {response.code = 1000; return response};

export const challengeGenerate = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/sign_content', p);
export const challengeVerify = p => apiPost('/challenge/verify', p);
export const GetUserRelatedMerchant = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/related_merchant', p);
export const GetUserNickname = p => apiGet('https://mock.apifox.cn/m1/1595489-0-default/merchant/nickname', p);
export const SetNicknameUseEthSignature = p => apiPost('https://mock.apifox.cn/m1/1595489-0-default/merchant/nickname', p);
export const UserRegister = p => apiPost('https://mock.apifox.cn/m1/1595489-0-default/merchant/register', p);
export const UserLogin = p => apiPost1(
    {
        "success": true,
        "data": {
            "token": "uUeTXh9NgdNN!7hute@Qb)jySXkU)&Zo"
        }
    }
);

export const GetMerchantBaseSummary = p => apiGet1(
    {
        "success": true,
        "data": {
            "total_balance": 69.5343,
            "total_withdraw": 63.87440634880781
        }
    }
);

export const GetMerchantPaymentStatChart = p => apiGet1(
    {
        "success": true,
        "msg": {
            "gap": "7d",
            "payment_amount_stat": [
                {
                    "title": "2022-10-28",
                    "amount": 0
                },
                {
                    "title": "2022-10-29",
                    "amount": 0
                },
                {
                    "title": "2022-10-30",
                    "amount": 0
                },
                {
                    "title": "2022-10-31",
                    "amount": 0
                },
                {
                    "title": "2022-11-01",
                    "amount": 205840
                },
                {
                    "title": "2022-11-02",
                    "amount": 158471
                },
                {
                    "title": "2022-11-03",
                    "amount": 0
                }
            ]
        }
    }
);

//Income Summary
export const GetPaymentSummary = p => apiGet1(
    {
        "success": true,
        "msg": {
            "latest_90_days_total_payment": 364480.39,
            "today_total_payment": 156478.06
        }
    }
);

//Withdraw Summary
export const GetWithdrawSummary = p => apiGet1(
    {
        "success": true,
        "msg": {
            "latest_90_days_total_withdraw": 356718,
            "today_total_withdraw": 202260
        }
    }
);

//Income list
export const GetPaymentList = p => apiGet1(
    {
        "success": true,
        "msg": {
            "total": 2,
            "payments": [
                {
                    "transId": "IN7",
                    "status": "Pending",
                    "currency": "USDC",
                    "amount": 2222.1,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN6",
                    "status": "Pending",
                    "currency": "USDT",
                    "amount": 222,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN5",
                    "status": "Finished",
                    "currency": "USDC",
                    "amount": 123,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN4",
                    "status": "Finished",
                    "currency": "USDT",
                    "amount": 1199,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 0
                },
                {
                    "transId": "IN3",
                    "status": "Finished",
                    "currency": "USDC",
                    "amount": 5412.3,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN2",
                    "status": "Finished",
                    "currency": "USDT",
                    "amount": 11002.2,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN7",
                    "status": "Pending",
                    "currency": "USDC",
                    "amount": 2019.1,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN6",
                    "status": "Pending",
                    "currency": "USDT",
                    "amount": 222,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN5",
                    "status": "Finished",
                    "currency": "USDC",
                    "amount": 123,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN4",
                    "status": "Finished",
                    "currency": "USDT",
                    "amount": 1199,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 0
                },
                {
                    "transId": "IN3",
                    "status": "Finished",
                    "currency": "USDC",
                    "amount": 5412.3,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                },
                {
                    "transId": "IN2",
                    "status": "Finished",
                    "currency": "USDT",
                    "amount": 11002.2,
                    "time": "12:20 Sept 28",
                    "viewMore": 1,
                    "vc": 1
                }
            ]
        }
    }
);


//Withdraw list
export const GetWithdrawList = p => apiGet1(
    {
        "success": true,
        "msg": {
            "total": 2,
            "withdraws": [
                {
                    "transId": "OUT3",
                    "status": "Pending",
                    "currency": "USDT",
                    "amount": 400,
                    "time": "12:20 Sept 28",
                    "viewMore": 1
                },
                {
                    "transId": "OUT2",
                    "status": "Confirmed",
                    "currency": "USDT",
                    "amount": 620,
                    "time": "12:20 Sept 28",
                    "viewMore": 1
                },
                {
                    "transId": "OUT1",
                    "status": "Confirmed",
                    "currency": "USDT",
                    "amount": 1125,
                    "time": "12:20 Sept 28",
                    "viewMore": 1
                }
            ]
        }
    }
);