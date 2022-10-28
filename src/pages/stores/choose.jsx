import React from "react";
import { DefaultButton } from "../../components";
import { useNavigate } from "react-router-dom";
import "./choose.scss";
import Login from "../../assets/login.svg";
const stores = ["Omnisolu", "Spotify"];

const Choose = () => {
  const navigate = useNavigate();

  return (
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
                <img src={Login} alt="Login" />
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
  );
};

export default Choose;
