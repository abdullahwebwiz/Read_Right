import "./postbox.css";
import Linker from "../utilcomps/linker";
import { useRef, useState } from "react";
let dumbimg = "/assets/dumimg.png";
let profileiconimg = "/assets/profileiconimg.png";
let threedots = "/assets/threedots.png";
const PostBox = ({
  thumbnail,
  righterimg,
  title,
  rightername,
  reads,
  ago,
  todoarray,
}) => {
  let [showdropdown, setshowdropdown] = useState(false);
  return (
    <>
      <div className={"mainpostbox"}>
        <img src={dumbimg} className={"postboxthumbnail"} />
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
        <div className={"postboxtitle"}>
          I am Abdullah son of sohail ahmad and he is son of tofail husain and i
          am a full stack developer
        </div>
        <div className={"postboxinfo"}>
          <p>{rightername}</p>
          <p>1.1K reads</p>
        </div>
        <p className={"postboxago"}>2 years ago</p>
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
