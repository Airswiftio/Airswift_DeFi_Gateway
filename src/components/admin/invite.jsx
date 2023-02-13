import React, {useState} from "react";
import { useNavigate } from "react-router";

import {DefaultButton, ProgressModal} from "../";
import "./invite.scss";
import {GrantUserMerchantRole} from "@@/utils/request/api";
import DropdownNew from "../dropdownNew/dropdownNew";
import {select_role} from "@@/utils/config";
import Alert from "@@/components/PopUp/Alert";
import Popup from "reactjs-popup";

const Invite = ({ setAddUser,refreshNum,setRefreshNum }) => {
    const [did, setDid] = useState('');
    const [selectRole, setSelectRole] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertData, setAlertData] = useState({});

    const addUser = async () => {
        if(did?.length <= 0){
            setOpenAlert(true)
            setAlertData({msg:'Please enter user did!'})
            return false;
        }
        if(typeof selectRole === 'undefined'){
            setOpenAlert(true)
            setAlertData({msg:"Please select the user's role."})
            return false;
        }
        const res = await GrantUserMerchantRole({ target_user:did, role:select_role()?.[selectRole]?.key });
        if(res?.code === 1000){
            setAddUser(false);
            setRefreshNum(refreshNum + 1);
        }
        else{
            setOpenAlert(true)
            setAlertData({msg:res?.msg})
        }
    }

  return (
    <div className="inviteUserWrapper">
        <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
            <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
        </Popup>
      <div className="title">Invite your colleague</div>
      <div className="addUser">
          <div>
              <input placeholder="Wallet address" onChange={(event)=>{setDid(event.target.value)}} />
          </div>
          <DropdownNew
              dropStyle={{maxHeight:'60px',height:'60px'}}
              buttonStyle={{width:'170px',height:'60px'}}
              options={select_role()}
              defaultTitle="Role as"
              selected={selectRole}
              setSelected={setSelectRole}
          />
      </div>
      <div className="buttonContainer">
        <DefaultButton
          title="Confirm"
          type={1}
          click={() => addUser()}
        />
      </div>
    </div>
  );
};

export default Invite;
