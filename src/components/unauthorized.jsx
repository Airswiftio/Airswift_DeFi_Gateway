import React from "react";
import { useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <div>
        <button onClick={goBack}>Back to safety!</button>
      </div>
    </div>
  );
};

export default Unauthorized;
