import React, { useState } from "react";
import useAuth from "@@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import {DefaultButton, ProgressModal} from "@@/components";

import "./login.scss";
import AirSwift from "@@/assets/airswift_payment_logo.svg";
import {beforeSend, connectWallet, didCreate} from "@@/utils/chain/wallet";
import {
  GetUserNickname,
  GetUserRelatedMerchant,
  SetNicknameUseEthSignature,
  UserLogin, UserRegister
} from "@@/utils/request/api";
import {array_column, dbGetSignData, dbGetUserWallet, dbSetJWTToken, dbSetUserWallet, empty} from "@@/utils/function";
import LoginSvg from "@@/assets/login.svg";

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('0');
  const [stores, setStores] = useState([]);
  const [nickname, setNickname] = useState('');
  const [storeInfo, setStoreInfo] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  let nickname_type = '';
  let role = '';
  // let user = {};
  // let sign_data = '';
  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSuccess = () => {
    // setAuth({ roles: [3000] });
    navigate(from, { replace: true });
  };

  const changeStoreInfo = (key,value) => {
    const data = storeInfo;
    data[key] = value;
    setStoreInfo(data);
  };

  const connect = async () => {
    // setIsOpen(true);

    const res = await connectWallet();
    console.log('res',res);
    if(res?.code !== 1000){
      alert(res?.msg);
      return false;
    }
    // user = res?.data?.user;
    // sign_data = res?.data?.sign_data;

    const user_address = dbGetUserWallet()?.account;

    //Query the user's nickname. If there is no nickname, set the nickname first
    const res_uu = await GetUserNickname({address:dbGetUserWallet()?.account});
    if(res_uu?.code !== 1000){
      alert('Failed to get User Nickname!')
      return false;
    }

    if(empty(res_uu?.data?.nickname)){
      //set the nickname
      setStep('set_nickname');
      return false;
    }

    // Query the Merchant information of the user. If there is information, enter the selection interface. If there is no information, enter the setting store interface. If there is information, enter the login selection interface
    const res_um = await GetUserRelatedMerchant({address:user_address});
    console.log('res_um',res_um);
    if(res_um?.code !== 1000 || res_um?.data?.merchant_users?.length <= 0){
      alert('Failed to get store information!')
      return false;
    }

    setStores(res_um?.data?.merchant_users);


    // Judge whether the user exists. If it exists, enter the login interface. Otherwise, register the user
    const user_exist = true;//todo 888 还差一个判断地址是否注册的接口
    if(user_exist){
      // login
      setStep('choose_store');
      return false;
    }
    else{
      nickname_type = 'dashboard'
      setStep('set_store');
      return false;
    }
  };

  const enterNickname = async () => {
    if(nickname?.length <= 0){
      alert('Please enter your nickname!')
      return false;
    }

    let res = beforeSend();
    if(res.code !== 1000){
      alert(res.msg)
      return false;
    }

    const data = {
      "eth_address":dbGetUserWallet()?.account,
      "sign_data": dbGetSignData(),
      "nickname": nickname
    }
    const res_su = await SetNicknameUseEthSignature(data);
    if(res_su?.code !== 1000 || res_su.success !== true){
      alert('Failed to set user nickname')
      return false;
    }

    setStep('choose_store');
    //
    // if(nickname_type === 'dashboard'){
    //   user.roles = role;
    //   console.log('user',user,role);
    //   dbSetUserWallet(user);
    //   navigate("/dashboard")
    // }
    // else{
    //   setStep('choose_store');
    // }


  };

  const SignUp = async () => {
    if(storeInfo?.store_name?.length <= 0){
      alert('Please enter your store name!')
      return false;
    }
    if(storeInfo?.store_link?.length <= 0){
      alert('Please enter your store link!')
      return false;
    }
    if(storeInfo?.callback_url?.length <= 0){
      alert('Please enter your callback url!')
      return false;
    }

    let res1 = beforeSend();
    if(res1.code !== 1000){
      alert(res1.msg)
      return false;
    }

    const data = {
      "eth_address":dbGetUserWallet()?.account,
      "did": dbGetUserWallet()?.did,
      "sign_data": dbGetSignData(),
      "store_name": storeInfo.store_name,
      "store_link": storeInfo.store_link,
      "callback_url": storeInfo.callback_url,
    }

    const res = await UserRegister(data);
    console.log('aa',res);

    if(res?.code !== 1000 || res.success !== true){
      alert('Failed to register user!')
      return false;
    }

    //store user info
    const user = dbGetUserWallet();
    user.roles = 'admin';
    dbSetUserWallet(user);
    navigate("/dashboard")
  };


  const SignIn = async (storeInfo) => {
    if(storeInfo?.merchant_id?.length <= 0){
      alert('The merchant id cannot be empty!')
      return false;
    }
    if(storeInfo?.merchant_name?.length <= 0){
      alert('The store name cannot be empty!')
      return false;
    }
    if(storeInfo?.role?.length <= 0){
      alert('The role cannot be empty!')
      return false;
    }


    let res1 = beforeSend();
    if(res1.code !== 1000){
      alert(res1.msg)
      return false;
    }

    const data = {
      "eth_address":dbGetUserWallet()?.account,
      "sign_data": dbGetSignData(),
      "merchant_id": storeInfo.merchant_id,
    }

    const res = await UserLogin(data);
    if(res?.code !== 1000 || res.success !== true){
      alert('Failed to Login!')
      return false;
    }
    let allCookies = document.cookie
    console.log('allCookies11111',allCookies);

    //store user info
    const user = dbGetUserWallet();
    user.roles = storeInfo?.role;
    dbSetUserWallet(user);
    // dbSetJWTToken(res?.data?.token)
    navigate("/dashboard")
  };
  return (
      <>
        {step === '0' && (
            <div className="loginWrapper">
              <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <ProgressModal
                    click={closeModal}
                    setIsOpen={setIsOpen}
                    handleSuccess={handleSuccess}
                />
              </Popup>
              <div className="loginForm">
                <div className="formHeader">
                  <img src={AirSwift} alt="AirSwift" />
                </div>
                <div className="formTitle">
                  <span>Welcome to</span>
                  <span className="logoTitle">AirSwift Payment Gateway</span>
                </div>

                <div className="buttons">
                  <button onClick={() => connect()} className="connectButton">
                    Connect Metamask Wallet
                  </button>
                  <button className="installMetamask">Install Metamask Wallet</button>
                </div>
              </div>
            </div>
        )}

        {step === 'set_nickname' && (
            <div className="connectWrapper">
              <div className="nameDidWrapper">
                <div className="title">
                  Give a nickname to <br />
                  your Decentralize ID
                </div>
                <input placeholder='Enter your nickname' onChange={(event)=>{setNickname(event.target.value)}} />
                <DefaultButton title="Confirm" type={1} align={1} click={enterNickname} />
              </div>
              {/*{conn ? <NameDid /> : <ProgressCircle percentage={0} />}*/}
            </div>
        )}
        {step === 'set_store' && (
            <div className="setupWrapper">
              <div className="setup">
                <button
                    className="backButton"
                    onClick={() => navigate("/stores/choose")}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  {/*<img src={IconBack} alt="IconBack" />*/}
                  Back
                </button>
                <div className="main">
                  <div className="title">Setup Your Store</div>

                  <div className="row">
                    <div className="label">Store name</div>
                    <input type="text" placeholder="" onChange={(event)=>{changeStoreInfo('store_name',event.target.value)}}/>
                  </div>

                  <div className="row">
                    <div className="label">Store link</div>
                    <input type="text" placeholder="" onChange={(event)=>{changeStoreInfo('store_link',event.target.value)}}/>
                  </div>

                  <div className="row">
                    <div className="label">Callback url</div>
                    <input type="text" placeholder="" onChange={(event)=>{changeStoreInfo('callback_url',event.target.value)}}/>
                  </div>
                </div>

                <div className="buttonRow">
                  <DefaultButton
                      title="Next"
                      type={2}
                      click={() => SignUp()}
                  />
                </div>
              </div>
            </div>

        )}

        {step === 'choose_store' && (
            <div className="chooseWrapper">
              <div className="choose">
                <div className="titles">
                  <div className="title">Choose</div>
                  <div className="subtitle">Existing store lists</div>
                </div>

                <div className="stores">
                  {stores.map((vv, kk) => (
                      <div
                          className="store"
                          key={kk}
                          onClick={() => SignIn(vv)}
                      >
                        {vv.merchant_name} ( {vv.role} )
                        <div>
                          Login
                          <img src={LoginSvg} alt="Login" />
                        </div>
                      </div>
                  ))}
                </div>
                <DefaultButton
                    title="Create a new store"
                    type={1}
                    click={() => navigate("/stores/setup")}
                />


              </div>
            </div>
        )}

      </>

  );
};

export default Login;
