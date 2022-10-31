import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProgressCircle } from "..";
import "./progressModal.scss";

const ProgressModal = ({ click, setIsOpen, handleSuccess }) => {
  const [percentage, setPercentage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const modal = document.getElementsByClassName("progressModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "progressModal") {
        click();
      }
    });
  }, []);

  useEffect(() => {
    const load = setInterval(() => {
      if (percentage < 99) {
        setPercentage(percentage + 33);
      } else {
        setIsOpen(false);
        handleSuccess();
        navigate("/dashboard");
      }
    }, 500);

    return () => clearInterval(load);
  });

  return (
    <div className="progressModal">
      <div className="modalContent">
        <ProgressCircle percentage={percentage} setPercentage={setPercentage} />
      </div>
    </div>
  );
};

export default ProgressModal;
