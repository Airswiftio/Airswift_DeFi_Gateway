import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import { ManagementCreateAccount, ManagementLogin } from "../../components";
import "./login.scss";
import {AdminLogin} from "@@/utils/request/management-api";
import {dbClearAccount, empty} from "@@/utils/function";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const authenticate = async (username, password) => {
        /* demo 1 */
        const form_data = {
            username: username,
            password: password,
            captcha_id: "HRzGVk4MJJq0eYD4xSUk",
            captcha_code: "n4hkm6",
        };
        const res = await AdminLogin(form_data)
        if(res?.success !== true){
            alert('Login fail!')
            return false;
        }

        //login success
        console.log('res',res);

        /* demo 2 */
        axios
            .post(
                "/api/admin/login",
                {
                    username: username,
                    password: password,
                    captcha_id: "HRzGVk4MJJq0eYD4xSUk",
                    captcha_code: "n4hkm6",
                },
                { withCredentials: true, credentials: "same-origin" }
            )
            .then(function (response) {
                console.log(response.data);
                navigate("/management/merchant");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="managementLoginWrapper">
            {isLogin ? (
                <ManagementLogin setIsLogin={setIsLogin} authenticate={authenticate} />
            ) : (
                <ManagementCreateAccount
                    setIsLogin={setIsLogin}
                    authenticate={authenticate}
                />
            )}
        </div>
    );
};

export default Login;
