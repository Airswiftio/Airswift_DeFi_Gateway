import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import { DefaultButton, DropdownNew } from "@@/components";
import { post as httpPost } from "@@/utils/request/http";
import { select_currency } from "@@/utils/config";
import Info from "@@/assets/info.svg";
import "./styles/qrcode.scss";

function QRCodeGenerate() {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const navigate = useNavigate();

  const networkList = [
    {
      key: "Ethereum",
      title: "ETHEREUM",
      img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
  ];

  const currencyList = select_currency();

  const onSubmit = () => {
    const fetchData = async () => {
      const res = await httpPost("merchant/application/0/payment/create", {
        amount_in_cent: Math.round(values.amount * 100),
        chain_id: 1,
        currency: currencyList[selectedCurrency].title,
      });
    };
    toast.promise(fetchData(), {
      loading: "Generating ...",
      success: "Generate succeeded!",
      error: "Generate failed!",
    }).then(() => navigate("./transaction"));
  };

  const formSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Please enter a number")
      .min(0, "Amount must greater 0")
      .required("This field is requried"),
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <div className="qrcodeManagementWrapper">
      <div className="management">
        <div className="managementTableWrapper">
          <div className="main">
            <>
              <div className="title">Select Network and Cryptocurrency</div>
              <div className="tip">
                <span className="tip__title">TIPS:</span>
                <img src={Info} alt="info" />
                <span className="tip__text">
                  ETH is the currency for making transaction on Ethereum chain, please make sure you
                  have enough ETH to support your transaction
                </span>
              </div>
              <div className="selectors">
                <div className="select">
                  <span>Network</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={networkList}
                    defaultTitle="Network"
                    selected={selectedNetwork}
                    setSelected={setSelectedNetwork}
                  />
                </div>
                <div className="select">
                  <span>Currency</span>
                  <DropdownNew
                    buttonStyle={{ width: "180px" }}
                    options={currencyList}
                    defaultTitle="Currency"
                    selected={selectedCurrency}
                    setSelected={setSelectedCurrency}
                  />
                </div>
              </div>
              <div className="inputWrapper">
                <label>
                  <input
                    id="amount"
                    placeholder="Order amount"
                    onChange={handleChange}
                    value={values.amount}
                  />
                  USD
                </label>
              </div>
              <span className="errorMessage">{errors.amount}</span>
              <div className="buttonRow">
                <DefaultButton title="Generate QR Code" type={2} click={handleSubmit} />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerate;
