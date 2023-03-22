import "./header.css";
import Input from "../utilcomps/input";
import Button from "../utilcomps/button";
import { useState } from "react";
let mainlogo = "/assets/mainlogo.png";
let addpostimg = "/assets/addpostimg.png";
const Header = () => {
  let [val, setval] = useState("");
  return (
    <>
      <header>
        <img src={mainlogo} className={"mainlogo"} alt={"mainlogo"} />
        <Input
          type={"text"}
          beauty={{
            color: "red",
            position: "absolute",
            left: "300px",
            top: "5px",
            backgroundColor: "#577d82",
            height: "35px",
            width: "660px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            paddingLeft: "20px",
            color: " #1fd12e",
            fontSize: "20px",
            letterSpacing: "2px",
          }}
          naam={"input"}
          fun={(e) => setval(e)}
          val={val}
          placeholder={"Search..."}
        />
        <Button
          beauty={{
            backgroundColor: "White",
            color: "#0bda51",
            fontSize: "17px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            position: "absolute",
            right: "15px",
            top: "7px",
            width: "65px",
            height: "35px",
            fontStyle: "Calibri",
            cursor: "pointer",
          }}
          val={"SignIn"}
          fun={() => alert()}
          type={"button"}
        />

        <div className={"addpostbutton"}>
          <img src={addpostimg} alt={"add post image"} />
        </div>
      </header>
    </>
  );
};

export default Header;

