import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { post as httpPost } from "@@/utils/request/http";
import "./slippageTolerance.scss";

const SlippageTolerance = () => {
  const onSubmit = () => {
    httpPost("merchant/application/slippage", {
      app_id: 0,
      slippage: parseInt(values.slippage),
    });
  };

  const formSchema = yup.object().shape({
    slippage: yup
      .number()
      .typeError("Please enter a number between 0 and 100")
      .min(0, "Slippage must betwen 0% and 100%")
      .max(100, "Slippage must betwen 0% and 100%")
      .required("This field is requried"),
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      slippage: 1,
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="slippageToleranceWrapper">
        <div className="inputWrapper">
          <label>
            <input id="slippage" value={values.slippage} onChange={handleChange} />%
          </label>
        </div>
        <div className="slippage-btn" onClick={handleSubmit}>
          Save
        </div>
      </div>
      <span className="errorMessage">{errors.slippage}</span>
    </>
  );
};

export default SlippageTolerance;
