import React, { useState } from "react";
import useAuth from "@@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import {DefaultButton, NameDid, ProgressModal} from "@@/components";

import "./login.scss";
import AirSwift from "@@/assets/airswift_payment_logo.svg";
import {beforeSend, connectWallet, didCreate} from "@@/utils/chain/wallet";
import {GetUserNickname, GetUserRelatedMerchant, Register, SetNicknameUseEthSignature} from "@@/utils/request/api";
import {dbGetSignData, dbGetUserWallet, empty} from "@@/utils/function";
import LoginSvg from "@@/assets/login.svg";
import IconBack from "@@/assets/icon/back.svg";

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [stores, setStores] = useState([]);
  const [nickname, setNickname] = useState('');
  const [storeInfo, setStoreInfo] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSuccess = () => {
    setAuth({ roles: [3000] });
    navigate(from, { replace: true });
  };

  const changeStoreInfo = (key,value) => {
    const data = storeInfo;
    storeInfo[key] = value;
    setStoreInfo(storeInfo);
  };

  const connect = async () => {
    // setIsOpen(true);

    const res = await connectWallet();
    if(res?.code !== 1000){
      alert(res?.msg);
      return false;
    }

    //Query the Merchant information of the user. If there is information, enter the selection interface. If there is no information, enter the setting store interface. If there is information, enter the login selection interface
    const res_um = await GetUserRelatedMerchant();
    if(res_um?.code !== 1000){
      alert('Failed to get store information!')
      return false;
    }

    res_um.msg.merchant_users = [];//todo 888
    // console.log('res_um?.msg?.merchant_users',res_um?.msg?.merchant_users);
    if(res_um?.msg?.merchant_users?.length > 0){
      setStores(res_um?.msg?.merchant_users);
      setStep(3);
      return false;
    }

    //Query the user's nickname. If there is no nickname, set the nickname first
    const res_uu = await GetUserNickname();
    if(res_uu?.code !== 1000){
      alert('Failed to get User Nickname!')
    }

    res_uu.msg.content = '';//todo 888
    if(empty(res_uu?.msg?.content)){
      //set the nickname first
      setStep(1);
    }
    else{
      setStep(2);
    }
    return false;
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
    else{
      setStep(2);
      return false;
    }
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

    const res = await Register(data);
    if(res?.code !== 1000 || res.success !== true){
      alert('Failed to register user!')
      return false;
    }

    navigate("/dashboard")
  };
  return (
      <>
        {step === 0 && (
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

        {step === 1 && (
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
        {step === 2 && (
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

        {step === 3 && (
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
                          onClick={() => navigate("/dashboard")}
                      >
                        {vv.merchant_name} ( {vv.role} )
                        <div>
                          Login
                          <img src={LoginSvg} alt="Login" />
                        </div>
                      </div>
                  ))}
                </div>

                {/*<DefaultButton*/}
                {/*    title="Create a new store"*/}
                {/*    type={1}*/}
                {/*    click={() => navigate("/stores/setup")}*/}
                {/*/>*/}
              </div>
            </div>
        )}

      </>

  );
};

export default Login;
