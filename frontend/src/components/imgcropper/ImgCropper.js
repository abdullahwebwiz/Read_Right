import React from "react";
import "./imgcropper.css";
import Cropper from "react-easy-crop";
import Button from "../utilcomps/button";
import { useLocation, useNavigate } from "react-router-dom";
import getCroppedImg, { generateDownload } from "./cropImage";
import { dataURLtoFile } from "./dataURLtoFile";
import PopUp from "../popup/Popup";
import axios from "axios";

const ImgCropper = ({ imgaspect, donefun }) => {
  let { state } = useLocation();
  let navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [imgtype, setimgtype] = React.useState("");
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  let [msg, setmsg] = React.useState(false);
  let [msgprops, setmsgprops] = React.useState({
    msg: "",
    twobut: false,
    butval1: "",
    butval2: "",
    fun1: () => {
      return false;
    },
    fun2: () => {
      return false;
    },
  });

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const onSelectFile = (event) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setimgtype(event.target.files[0].type);
      });
    }
  };

  const sendimg = async () => {
    if (image) {
      let canvas = await getCroppedImg(image, croppedArea);
      let canvadataurl = canvas.toDataURL("image/jpg");
      let x = dataURLtoFile(canvadataurl, "img." + imgtype);
      console.log(x);
      donefun(x);
    } else {
      setmsg(true);
      setmsgprops({
        msg: "select an image to proceed",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    }
  };

  return (
    <>
      <div className={"cropmaincontainer"}>
        <div className={"croppercontainer"}>
          {" "}
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={imgaspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className={"croprange"}>
          <input
            type={"range"}
            min={0.9}
            max={3}
            step={0.001}
            value={zoom}
            onChange={(e, zoom) => setZoom(e.target.value)}
          />
        </div>
        <input
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />

        <div className={"cropbuttons"}>
          <Button
            beauty={{
              backgroundColor: "#0bda51",
              color: "white",
              fontSize: "17px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
              padding: "0 5px 0 5px",
              height: "35px",
              fontStyle: "Calibri",
              cursor: "pointer",
            }}
            val={"Choose"}
            fun={triggerFileSelectPopup}
            type={"button"}
          />
          <Button
            beauty={{
              backgroundColor: "#0bda51",
              color: "white",
              fontSize: "17px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
              height: "35px",
              fontStyle: "Calibri",
              cursor: "pointer",
              padding: "0 5px 0 5px",
            }}
            val={"Close"}
            fun={() => setImage(null)}
            type={"button"}
          />
          <Button
            beauty={{
              backgroundColor: "#0bda51",
              color: "white",
              fontSize: "17px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
              height: "35px",
              fontStyle: "Calibri",
              cursor: "pointer",
              padding: "0 5px 0 5px",
            }}
            val={"done"}
            fun={sendimg}
            type={"button"}
          />
        </div>
        {msg ? (
          <PopUp
            closepop={() => setmsg(false)}
            msg={msgprops.msg}
            buttwo={msgprops.buttwo}
            butval1={msgprops.butval1}
            butval2={msgprops.butval2}
            fun1={msgprops.fun1}
            fun2={msgprops.fun2}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default React.memo(ImgCropper);
