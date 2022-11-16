import { get, post } from '@@/utils/request/management-http'
const apiGet = (url,p)=>get(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});
const apiPost = (url,p)=>post(url, p).then((res)=>{return res;}).catch((ee)=>{return ee;});

export const AdminLogin = p => apiPost('/admin/login', p);

