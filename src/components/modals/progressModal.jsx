import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProgressCircle } from "..";
import "./progressModal.scss";

const ProgressModal = ({ click, percentage,setPercentage }) => {

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
    // const load = setInterval(() => {
    //   if (percentage < 99) {
    //     setPercentage(percentage + 11);
    //   }
    // }, 500);
    //
    // return () => clearInterval(load);
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
