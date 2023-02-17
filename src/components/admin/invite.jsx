import React, { useState } from "react";
import { useFormik } from "formik";
import Popup from "reactjs-popup";
import * as yup from "yup";

import { GrantUserMerchantRole } from "@@/utils/request/api";
import DropdownNew from "../dropdownNew/dropdownNew";
import { select_role } from "@@/utils/config";
import Alert from "@@/components/PopUp/Alert";
import { DefaultButton } from "../";
import "./invite.scss";

const Invite = ({ setAddUser, refreshNum, setRefreshNum }) => {
  const [selectRole, setSelectRole] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  const addUser = async (did) => {
    if (typeof selectRole === "undefined") {
      setOpenAlert(true);
      setAlertData({ msg: "Please select the user's role." });
      return false;
    }
    const res = await GrantUserMerchantRole({
      target_user: did,
      role: select_role()?.[selectRole]?.key,
    });
    if (res?.code === 1000) {
      setAddUser(false);
      setRefreshNum(refreshNum + 1);
    } else {
      setOpenAlert(true);
      setAlertData({ msg: res?.msg });
    }
  };

  const onSubmit = () => {
    addUser(values.address);
  };

  const formSchema = yup.object().shape({
    address: yup
      .string()
      .trim()
      .matches(/^0x[a-fA-F0-9]{40}$/g, "The wallet address is not in correct format")
      .required("This field is requried"),
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <div className="inviteUserWrapper">
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      <div className="title">Invite your colleague</div>
      <div className="addUser">
        <div>
          <input
            id="address"
            placeholder="Wallet address"
            value={values.address}
            onChange={handleChange}
          />
        </div>
        <DropdownNew
          dropStyle={{ maxHeight: "60px", height: "60px" }}
          buttonStyle={{ width: "170px", height: "60px" }}
          options={select_role()}
          defaultTitle="Role as"
          selected={selectRole}
          setSelected={setSelectRole}
        />
      </div>
      <div className="errorMessage">{errors.address}</div>
      <div className="buttonContainer">
        <DefaultButton
          title="Confirm"
          type={1}
          click={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Invite;
