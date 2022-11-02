import React from 'react'
import { Navigate} from 'react-router-dom'
import {dbGetUserWallet} from "@@/utils/function";

//这个组件将根据登录的情况, 返回一个路由
const PrivateRoute = ({Component})=> {
    const address = dbGetUserWallet()?.account ?? null;
    return !address === false ? Component : <Navigate to="/staking" />;
}

export default PrivateRoute;

