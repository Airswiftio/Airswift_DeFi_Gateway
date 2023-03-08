import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import ForwardButton from "@@/components/buttons/ForwardButton";
import { DefaultButton, DropdownNew } from "@@/components";
import { post as httpPost } from "@@/utils/request/http";
import { select_currency } from "@@/utils/config";
import "./styles/qrcode.scss";

function QRCodeGenerate() {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const navigate = useNavigate();

  const networkList = select_currency("tree");
  const currencyList = select_currency();

  const onSubmit = (values, { setSubmitting }) => {
    const fetchData = async () => {
      await httpPost("merchant/application/0/payment/create", {
        amount_in_cent: Math.round(values.amount * 100),
        chain_id: 1,
        currency: currencyList[selectedCurrency].title,
      });
    };
    toast
      .promise(fetchData(), {
        loading: "Generating ...",
        success: "Generate succeeded!",
        error: "Generate failed!",
      })
      .then(() => {
        setTimeout(() => {
          navigate("./transaction");
        }, 500);
      }).catch(error => {
        setSubmitting(false);
      });
  };

  const formSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Please enter a number")
      .min(0.01, "The minimal order amount is 0.01 USD")
      .required("This field is requried"),
  });

  const { values, handleChange, handleSubmit, isSubmitting, errors } = useFormik({
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
        <ForwardButton style={{ width: "800px", textAlign: "right" }} path="./transaction" text="Transaction History" />
        <div className="managementTableWrapper">
          <div className="main">
            <>
              <div className="title">Select Network and Cryptocurrency</div>
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
                    placeholder="Minimal order amount is 0.01"
                    onChange={handleChange}
                    value={values.amount}
                    autoComplete="off"
                  />
                  USD
                </label>
              </div>
              <span className="errorMessage">{errors.amount}</span>
              <div className="buttonRow">
                <DefaultButton
                  title="Generate QR Code"
                  type={2}
                  click={isSubmitting ? null : handleSubmit}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerate;
