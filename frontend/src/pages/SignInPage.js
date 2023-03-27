import "./css/signup.css";
import React, { useState } from "react";
import Popup from "../components/popup/Popup";
import Signinface from "../components/signinfaces/signinfaces";
let signupimg = "/assets/signupimg.png";
const SignInPage = () => {
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
    if (x == "wrongpass") {
      setmsgprops({
        msg: "Wrong Password",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "noaccount") {
      setmsgprops({
        msg: "Account not Exist.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "failed") {
      setmsgprops({
        msg: "Something went wrong",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "passsend") {
      setmsgprops({
        msg: "Your password was sent to your email",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "incompletepop") {
      setmsgprops({
        msg: "Fill all required fields.",
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
            <Signinface popfun={(x) => popfun(x)} />
          </div>
          <div className={"signuprightface"}>
            {signupimg ? <img src={signupimg} alt={"Signup image"} /> : ""}
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
export default SignInPage;
