import { useEffect, useRef } from "react";
import "./popup.css";
const Popup = ({ msg, buttwo, butval1, butval2, fun1, fun2, closepop }) => {
  let crossimg = "/assets/crossimg.png";

  return (
    <>
      <div className={"popupcontainer"}>
        <div className={"popup"}>
          <h1>Alert!</h1>
          <img src={crossimg} alt={"cross image"} onClick={closepop} />
          <div>{msg}</div>
          <span>
            <button onClick={fun1}>{butval1}</button>
            {buttwo ? <button onClick={fun2}>{butval2}</button> : ""}
          </span>
        </div>
      </div>
    </>
  );
};
export default Popup;
