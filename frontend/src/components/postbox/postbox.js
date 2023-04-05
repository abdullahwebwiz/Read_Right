import "./postbox.css";
import Linker from "../utilcomps/linker";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
let dumbimg = "/assets/dumimg.png";
let profileiconimg = "/assets/profileiconimg.png";
let threedots = "/assets/threedots.png";
const PostBox = ({
  whatimg,
  imgid,
  imgtype,
  title,
  reads,
  ago,
  rightername,
  righterimg,
  todoarray,
}) => {
  let [showdropdown, setshowdropdown] = useState(false);
  let [img, setimg] = useState("");
  useEffect(() => {
    axios
      .post("/sendimg", {
        whatimg: whatimg,
        imgid: imgid,
        imgtype: imgtype,
      })
      .then((res) => {
        setimg(res.data.img);
      });
  }, [whatimg, imgid, imgtype]);

  return (
    <>
      <div className={"mainpostbox"}>
        <img
          src={img ? "data:" + imgtype + ";base64," + img : dumbimg}
          className={"postboxthumbnail"}
          alt={"Thumbnail"}
        />
        <img
          src={righterimg ? righterimg : profileiconimg}
          className={"postboxrighterimg"}
        />

        <img
          src={threedots}
          className={"postboxthreedots"}
          onClick={() => {
            if (showdropdown) {
              setshowdropdown(false);
            } else {
              setshowdropdown(true);
            }
          }}
        />
        <div className={"postboxtitle"}>{title}</div>
        <div className={"postboxinfo"}>
          <p>{rightername}</p>
          <p>{reads + " reads"}</p>
        </div>
        <p className={"postboxago"}>{ago}</p>
        {showdropdown ? (
          <div className={"postboxdropdown"}>
            <div>Edit</div>
            <div>UnPublish</div>
            <div>delete</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default PostBox;
