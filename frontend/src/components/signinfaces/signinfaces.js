import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import PropagateLoader from "react-spinners/PropagateLoader";
import Input from "../utilcomps/input";
import Button from "../utilcomps/button";
import Select from "../utilcomps/select";
import Password from "../utilcomps/password";
import axios from "axios";
import Cookie from "../../hooks/useCookie";
const Signinface = ({ popfun }) => {
  let navigate = useNavigate();
  let [personinfo, setpersoninfo] = React.useState({
    email: "",
    password: "",
  });
  console.log(personinfo.email);
  console.log(personinfo.password);
  let [loading, setloading] = useState(false);

  const forgotpassword = () => {
    if (personinfo.email) {
      axios
        .post("/forgotpassword/forgotpassword", {
          email: personinfo.email,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            setloading(false);
            popfun("passsend");
          } else if (res.data.msg == "failed") {
            popfun("failed");
            setloading(false);
          } else if (res.data.msg == "noaccount") {
            popfun("noaccount");
            setloading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      popfun("incompletepop");
      setloading(false);
    }
  };

  const loginhandle = () => {
    setloading(true);
    if (personinfo.email && personinfo.password) {
      axios
        .post("/login/login", {
          email: personinfo.email,
          password: personinfo.password,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            Cookie("set", "user", res.data.userid);
            navigate("/");
          } else if (res.data.msg == "noaccount") {
            popfun("noaccount");
            setloading(false);
          } else if (res.data.msg == "wrongpass") {
            popfun("wrongpass");
            setloading(false);
          } else if (res.data.msg == "failed") {
            popfun("failed");
            setloading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          popfun("failed");
        });
    } else {
      popfun("incompletepop");
      setloading(false);
    }
  };

  return (
    <>
      <Input
        type={"email"}
        whatinput={"inputfirst"}
        location={{ top: "150px" }}
        naam={"email"}
        fun={(a, b) => {
          setpersoninfo((prevState) => ({
            ...prevState,
            [b]: a,
          }));
        }}
        val={personinfo.email}
        placeholder={"Enter Your Email.."}
      />

      <Password
        name={"password"}
        whatpass={"inputfirst"}
        location={{ top: "200px" }}
        placeholder={"Password (Double-Click to Show/Hide)"}
        fun={(a, b) => {
          setpersoninfo((prevState) => ({
            ...prevState,
            [b]: a,
          }));
        }}
        val={personinfo.password}
      />
      <Button
        whatbut={"buttonsecond"}
        location={{ bottom: "11px", left: "20px" }}
        val={"Home"}
        fun={() => navigate("/")}
        type={"button"}
      />
      <Button
        whatbut={"buttonsecond"}
        location={{ bottom: "11px", right: "20px" }}
        val={"Login"}
        fun={loginhandle}
        type={"button"}
      />
      <Button
        whatbut={"buttonsecond"}
        location={{ bottom: "11px", right: "80px" }}
        val={"Forgot Password"}
        fun={forgotpassword}
        type={"button"}
      />

      {loading ? (
        <PropagateLoader
          size={10}
          color={"white"}
          cssOverride={{
            position: "absolute",
            bottom: "15px",
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Signinface;
