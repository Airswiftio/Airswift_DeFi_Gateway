import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router";

import { Dropdown, DefaultButton } from "../";
import "./invite.scss";
import {GrantUserMerchantRole, ModifyApplicationApiKey} from "@@/utils/request/api";

const Invite = ({ setAddUser }) => {
  const navigate = useNavigate();
    const [did, setDid] = useState('');
    const addUser = async () => {
        if(did?.length <= 0){
            alert('Please enter user did!')
            return false;
        }
        const res = await GrantUserMerchantRole({user_did:did,role:'Shop Manager'})
        if(res?.code === 1000){
            setAddUser(false)
        }
        else{
            alert('单击事件');
        }
    }

    useEffect(() => {

    }, []);
  return (
    <div className="inviteUserWrapper">
      <div className="title">Invite your colleague</div>
      <div className="addUser">
        <input  onChange={(event)=>{setDid(event.target.value)}} />
        <Dropdown
          options={[ "Shop Manager", "Contributor"]}
          defaultTitle="Role as"
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
