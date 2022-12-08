import React, { useState } from "react";
import { useNavigate } from "react-router";
import Popup from "reactjs-popup";
import { DefaultButton, ProgressModal } from "@@/components";
import "./login.scss";
import AirSwift from "@@/assets/airswift_payment_logo.svg";
import { beforeSend, connectWallet } from "@@/utils/chain/wallet";
import {
  CheckUserExist,
  GetUserNickname,
  GetUserRelatedMerchant,
  SetNicknameUseEthSignature,
  UserLogin,
  UserRegister,
} from "@@/utils/request/api";
import { dbSetUserWallet, empty, getOneDIDById } from "@@/utils/function";
import LoginSvg from "@@/assets/login.svg";
import Alert from "@@/components/PopUp/Alert";
import { didIDCreate } from "@@/utils/chain/did";

const Login = () => {
  const [percentage, setPercentage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("0");
  const [stores, setStores] = useState([]);
  const [nickname, setNickname] = useState("");
  const [storeInfo, setStoreInfo] = useState({ store_name: "", store_link: "", callback_url: "" });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [userData, setUserData] = useState({});
  const [signData, setSignData] = useState("");
  const [userRole, setUserRole] = useState("admin");

  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/dashboard";

  const closeProgressModal = () => {
    setIsOpen(false);
  };

  const changeStoreInfo = (key, value) => {
    const data = storeInfo;
    data[key] = value;
    setStoreInfo(data);
  };

  const connect = async () => {
    console.log("Connecting...");
    setPercentage(0);
    setIsOpen(true);
    const res = await connectWallet(setPercentage, setIsOpen);
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res?.msg });
      return false;
    }

    const userInfo = res?.data?.user;
    const signature = res?.data?.sign_data;
    const user_address = userInfo?.account;
    setUserData(userInfo);
    setSignData(signature);

    console.log("User Address: ", user_address);
    // Judge whether the user exists. If it exists, enter the login interface. Otherwise, register the user
    const res_ue = await CheckUserExist({ address: user_address });
    console.log("User Exists: ", res_ue);

    if (res_ue?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to query user!" });
      return false;
    }

    if (res_ue?.data === true) {
      // Registered, Goto login
      // Query the Merchant information of the user. If there is information, enter the selection interface. If there is no information, enter the setting store interface. If there is information, enter the login selection interface
      const res_um = await GetUserRelatedMerchant({ address: user_address });
      console.log("User Related Merchants: ", res_um);
      if (res_um?.code !== 1000 || res_um?.data?.merchant_users?.length <= 0) {
        setOpenAlert(true);
        setAlertData({ msg: "Failed to get store information!" });
        return false;
      }

      setStores(res_um?.data?.merchant_users);
      setStep("choose_store");
      return false;
    } else {
      //not register
      console.log("Regisering User...");
      setStep("set_store");
      return false;
    }
  };

  const enterNickname = async () => {
    const userInfo = userData;
    if (nickname?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "Please enter your nickname!" });
      return false;
    }

    let res = beforeSend(false);
    if (res.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res.msg });
      return false;
    }

    const data = {
      eth_address: userInfo?.account,
      sign_data: signData,
      nickname: nickname,
    };
    const res_su = await SetNicknameUseEthSignature(data);
    if (res_su?.code !== 1000 || res_su.success !== true) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to set user nickname!" });
      return false;
    }

    userInfo.roles = userRole;
    userInfo.nickname = nickname;
    dbSetUserWallet(userInfo);
    navigate("/dashboard");
  };

  const SignUp = async () => {
    const userInfo = userData;
    console.log("User Info: ", userData);
    if (storeInfo?.store_name?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "Please enter your store name!" });
      return false;
    }
    if (storeInfo?.store_link?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "Please enter your store link!" });
      return false;
    }
    if (storeInfo?.callback_url?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "Please enter your callback url!" });
      return false;
    }

    let res1 = beforeSend(false);
    if (res1.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res1.msg });
      return false;
    }

    const didDocument = await getOneDIDById(didIDCreate(userInfo?.account));
    console.log("DID Document: ", didDocument);
    const data = {
      eth_address: userInfo?.account,
      did: userInfo?.did,
      sign_data: signData,
      store_name: storeInfo.store_name,
      store_link: storeInfo.store_link,
      callback_url: storeInfo.callback_url,
      did_document: JSON.stringify(didDocument?.did_document ?? ""),
    };

    const res = await UserRegister(data);
    console.log("User Registered: ", res);
    if (res?.code !== 1000 || res?.success !== true) {
      console.log(JSON.stringify(res));
      setOpenAlert(true);
      setAlertData({ msg: "Failed to register user!" });
      return false;
    }

    // Goto login
    // Query the Merchant information of the user. If there is information, enter the selection interface. If there is no information, enter the setting store interface. If there is information, enter the login selection interface
    const res_um = await GetUserRelatedMerchant({ address: userInfo?.account });
    if (res_um?.code !== 1000 || res_um?.data?.merchant_users?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to get store information!" });
      return false;
    }

    setStores(res_um?.data?.merchant_users);
    setStep("choose_store");
  };

  const SignIn = async (storeInfo) => {
    const userInfo = userData;
    if (storeInfo?.merchant_id?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "The merchant id cannot be empty!" });
      return false;
    }
    if (storeInfo?.merchant_name?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "The store name cannot be empty!" });
      return false;
    }
    if (storeInfo?.role?.length <= 0) {
      setOpenAlert(true);
      setAlertData({ msg: "The role cannot be empty!" });
      return false;
    }

    let res1 = beforeSend(false);
    if (res1.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res1.msg });
      return false;
    }

    const data = {
      eth_address: userInfo?.account,
      sign_data: signData,
      merchant_id: storeInfo.merchant_id,
    };

    const res = await UserLogin(data);
    if (res?.code !== 1000 || res.success !== true) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to Login!" });
      return false;
    }

    //Query the user's nickname. If there is no nickname, set the nickname first
    const res_uu = await GetUserNickname({ address: userInfo?.account });
    if (res_uu?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to get User Nickname!" });
      return false;
    }

    if (empty(res_uu?.data?.nickname)) {
      //set the nickname
      setUserRole(storeInfo?.role);
      setStep("set_nickname");
      return false;
    }

    //store user info
    userInfo.roles = storeInfo?.role;
    userInfo.nickname = res_uu?.data?.nickname;
    dbSetUserWallet(userInfo);
    navigate("/dashboard");
  };
  return (
    <>
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeProgressModal}>
        <ProgressModal
          click={closeProgressModal}
          percentage={percentage}
          setPercentage={setPercentage}
        />
      </Popup>
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      {step === "0" && (
        <div className="loginWrapper">
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
              <button
                className="installMetamask"
                onClick={() => window.open("https://metamask.io/download/")}
              >
                Install Metamask Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "set_nickname" && (
        <div className="connectWrapper">
          <div className="nameDidWrapper">
            <div className="title">
              Give a nickname to <br />
              your Decentralize ID
            </div>
            <input
              placeholder="Enter your nickname"
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
            <DefaultButton title="Confirm" type={1} align={1} click={enterNickname} />
          </div>
          {/*{conn ? <NameDid /> : <ProgressCircle percentage={0} />}*/}
        </div>
      )}
      {step === "set_store" && (
        <div className="setupWrapper">
          <div className="setup">
            <button className="backButton" onClick={() => navigate("/stores/choose")}>
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
                <input
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    changeStoreInfo("store_name", event.target.value);
                  }}
                />
              </div>

              <div className="row">
                <div className="label">Store link</div>
                <input
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    changeStoreInfo("store_link", event.target.value);
                  }}
                />
              </div>

              <div className="row">
                <div className="label">Callback url</div>
                <input
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    changeStoreInfo("callback_url", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="buttonRow">
              <DefaultButton title="Next" type={2} click={() => SignUp()} />
            </div>
          </div>
        </div>
      )}

      {step === "choose_store" && (
        <div className="chooseWrapper">
          <div className="choose">
            <div className="titles">
              <div className="title">Choose</div>
              <div className="subtitle">Existing store lists</div>
            </div>

            <div className="stores">
              {stores.map((vv, kk) => (
                <div className="store" key={kk} onClick={() => SignIn(vv)}>
                  {vv.merchant_name} ( {vv.role} )
                  <div>
                    Login
                    <img src={LoginSvg} alt="Login" />
                  </div>
                </div>
              ))}
            </div>
            <DefaultButton title="Create a new store" type={1} click={() => setStep("set_store")} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
