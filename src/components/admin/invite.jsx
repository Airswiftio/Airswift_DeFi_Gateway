import React from "react";
import { useNavigate } from "react-router";

import { Dropdown, DefaultButton } from "../";
import "./invite.scss";

const Invite = ({ setAddUser }) => {
  const navigate = useNavigate();
  return (
    <div className="inviteUserWrapper">
      <div className="title">Invite your colleague</div>
      <div className="addUser">
        <input />
        <Dropdown
          options={["Admin", "Shop Manager", "Contributor"]}
          defaultTitle="Role as"
        />
      </div>
      <div className="buttonContainer">
        <DefaultButton
          title="Confirm"
          type={1}
          click={() => setAddUser(false)}
        />
      </div>
    </div>
  );
};

export default Invite;
