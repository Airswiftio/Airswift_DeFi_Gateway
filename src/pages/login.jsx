import React, { useState } from "react";
import useAuth from "@@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import {DefaultButton, NameDid, ProgressModal} from "@@/components";

import "./login.scss";
import AirSwift from "@@/assets/airswift_payment_logo.svg";
import {connectWallet} from "@@/utils/chain/wallet";
import {GetUserNickname, GetUserRelatedMerchant, SetNicknameUseEthSignature} from "@@/utils/request/api";
import {dbGetUserWallet, empty} from "@@/utils/function";
import LoginSvg from "@@/assets/login.svg";
const stores = ["Omnisolu", "Spotify"];


const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');

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

  const connect = async () => {
    // setIsOpen(true);

    const res = await connectWallet();
    if(res?.code !== 1000){
      alert(res?.msg)
      return false;
    }

    //Query the user's nickname. If there is no nickname, set the nickname first
    const res1 = await GetUserNickname();
    if(res1?.code !== 1000){
      alert('获取用户昵称失败')
      return false;
    }

    res1.msg.content = '';//todo 888
    if(empty(res1?.msg?.content)){
      //set the nickname first
      setStep(1);
      return false;
    }

    //查询store信息，有信息进入选择界面，没有信息进入设置store界面，有信息进入登录选择界面
    const res2 = await GetUserRelatedMerchant();
    if(res2?.code !== 1000){
      alert('获取store信息失败')
      return false;
    }

    // res2.msg.merchant_users = [];//todo 888
    if(res2?.msg?.merchant_users?.length){
      setStep(2);
      return false;
    }
    else{
      setStep(3);
      return false;
    }
  };

  const enterNickname = async () => {
    if(nickname?.length){
      alert('Please enter your nickname!')
      return false;
    }

    // let res = beforeSen(false);
    // if(res.code !== 1000){
    //   return res;
    // }

      let signature = await Web3SignData(account,res_challenge.data.content);
      if(typeof signature?.code === 'undefined' || signature.code !== 1000 || empty(signature.data)){
        dbClearAccount();
        return signature;
      }

    const data = {
      "eth_address":dbGetUserWallet()?.account,
      "sign_data": "b90911c8d8f61ec7513525af4596be9499613c0e34df3c9b0835887a1a97002b",
      "nickname": nickname
    }
    const res1 = await SetNicknameUseEthSignature();
    if(res1?.code !== 1000){
      alert('获取用户昵称失败')
      return false;
    }

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
                <input placeholder='Enter your nickname' value={nickname} />
                <DefaultButton title="Confirm" type={1} align={1} click={enterNickname} />
              </div>
              {/*{conn ? <NameDid /> : <ProgressCircle percentage={0} />}*/}
            </div>
        )}


        {step === 2 && (
            <div className="chooseWrapper">
              <div className="choose">
                <div className="titles">
                  <div className="title">Choose</div>
                  <div className="subtitle">Existing store lists</div>
                </div>

                <div className="stores">
                  {stores.map((e, index) => (
                      <div
                          className="store"
                          key={index}
                          onClick={() => navigate("/dashboard")}
                      >
                        {e}
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
        {step === 3 && (
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
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back
                </button>
                <div className="main">
                  <div className="title">Setup Your Store</div>

                  <div className="row">
                    <div className="label">Store name</div>
                    <input type="text" placeholder=""/>
                  </div>

                  <div className="row">
                    <div className="label">Store link</div>
                    <input type="text" placeholder=""/>
                  </div>

                  <div className="row">
                    <div className="label">Callback url</div>
                    <input type="text" placeholder=""/>
                  </div>
                </div>

                <div className="buttonRow">
                  <DefaultButton
                      title="Next"
                      type={2}
                      click={() => navigate("/dashboard")}
                  />
                </div>
              </div>
            </div>

        )}

      </>

  );
};

export default Login;
