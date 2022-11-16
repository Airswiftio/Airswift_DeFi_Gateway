import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router";

import { DefaultButton } from "../";
import "./invite.scss";
import {GrantUserMerchantRole, ModifyApplicationApiKey} from "@@/utils/request/api";
import DropdownNew from "../dropdownNew/dropdownNew";
import {select_role} from "@@/utils/config";

const Invite = ({ setAddUser,refreshNum,setRefreshNum }) => {
  const navigate = useNavigate();
    const [did, setDid] = useState('');
    const [selectRole, setSelectRole] = useState();

    const addUser = async () => {
        if(did?.length <= 0){
            alert('Please enter user did!')
            return false;
        }
        if(typeof selectRole === 'undefined'){
            alert("Please select the user's role.");
            return false;
        }
        const res = await GrantUserMerchantRole({ user_did:did, role:select_role()?.[selectRole]?.key });
        if(res?.code === 1000){
            setAddUser(false);
            setRefreshNum(refreshNum + 1);
        }
        else{
            alert(res?.msg);
        }
    }

  return (
    <div className="inviteUserWrapper">
      <div className="title">Invite your colleague</div>
      <div className="addUser">
          <div>
              <input  onChange={(event)=>{setDid(event.target.value)}} />
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
