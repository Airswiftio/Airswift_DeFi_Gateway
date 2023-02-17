import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import QRCode from "qrcode";

import BackButton from "@@/components/buttons/BackButton";
import { copy_text } from "@@/utils/function";
import Download from "@@/assets/download.svg";
import Copy from "@@/assets/copy.svg";
import "./styles/qrcode.scss";

function QRCodeScan({ payoutAddress, setOpenScan }) {
  const canvasRef = useRef(null);

  const saveQrcode = () => {
    const canvas = canvasRef.current;
    window.open(canvas.toDataURL("image/png"));
    const gh = canvas.toDataURL("png");
    const a = document.createElement("a");
    a.href = gh;
    a.download = "QR Code.png";
    a.click();
  };

  const copyText = () => {
    const cope_res = copy_text(payoutAddress);
    cope_res === true ? toast.success("Copy succeeded!") : toast.error("Copy failed!");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    QRCode.toCanvas(canvas, payoutAddress, { scale: 8 }, function (error) {
      if (error) console.error(error);
      // console.log('success!');
    });
  });

  return (
    <div className="qrcodeManagementWrapper">
      <div className="management">
        <BackButton setOpen={setOpenScan} style={{ widht: "100%", textAlign: "left" }} />
        <div className="qrcodeWrapper managementTableWrapper">
          <div className="main">
            <div className="title">QR CODE</div>
            <div className="button button__svg" onClick={saveQrcode}>
              Save QR Code <img src={Download} alt="download" />
            </div>
            <div className="qrcode">
              <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
            <div className="button button__svg" onClick={copyText}>
              {payoutAddress} <img src={Copy} alt="copy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeScan;
