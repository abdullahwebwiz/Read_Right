import "./css/signup.css";
import React, { useState } from "react";
import Button from "../components/utilcomps/button";
import Input from "../components/utilcomps/input";
import Popup from "../components/popup/Popup";
import Signupface from "../components/signupfaces/signupfaces";
let signupimg = "/assets/signupimg.png";
const SignUpPage = () => {
  let [msg, setmsg] = useState(false);
  let [msgprops, setmsgprops] = useState({
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
  const popfun = (x) => {
    setmsg(true);
    if (x == "incompletepop") {
      setmsgprops({
        msg: "Plz fill all Required.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "emailsendfailed") {
      setmsgprops({
        msg: "Something went wrong.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "wrongotp") {
      setmsgprops({
        msg: "Wrong OTP.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "otpresend") {
      setmsgprops({
        msg: "OTP resend Successfully!",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "somethingwrong") {
      setmsgprops({
        msg: "Something Went Wrong.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    }
    else if (x == "shortpass") {
      setmsgprops({
        msg: "Password must be at least 8 character long.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    }
    else if (x == "accountexist") {
      setmsgprops({
        msg: "Account already exist.",
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
      <div className={"signupmaincontainer"}>
        <div className={"signupcontainer"}>
          <div className={"signupleftface"}>
            <Signupface popfun={(x) => popfun(x)} />
          </div>
          <div className={"signuprightface"}>
            {signupimg ? (
              <img src={signupimg} alt={"Signup image"} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {msg ? (
        <Popup
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
    </>
  );
};
export default React.memo(SignUpPage);
