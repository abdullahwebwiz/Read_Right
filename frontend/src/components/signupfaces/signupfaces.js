import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import PropagateLoader from "react-spinners/PropagateLoader";
import Input from "../utilcomps/input";
import Button from "../utilcomps/button";
import Select from "../utilcomps/select";
import Password from "../utilcomps/password";
import axios from "axios";
const Signupface = ({ popfun }) => {
  let navigate = useNavigate();
  let [personinfo, setpersoninfo] = React.useState({
    name: "",
    email: "",
    password: "",
    country: "",
    city: "",
    otp: "",
  });
  let [countries, setcountries] = useState([]);
  let [cities, setcities] = useState([]);
  let [otpinput, setotpinput] = useState(false);
  let [loading, setloading] = useState(false);
  useEffect(() => {
    axios
      .get("/csc/country")
      .then((res) => {
        setcountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitHandle = () => {
    setloading(true);
    if (
      personinfo.name &&
      personinfo.email &&
      personinfo.country &&
      personinfo.city &&
      personinfo.password
    ) {
      if (personinfo.password.length > 7) {
        axios
          .post("/signup/checkuseravail", {
            user: personinfo.email,
          })
          .then((res) => {
            if (res.data.msg == "allgood") {
              let otp = (Math.floor(Math.random() * 10000) + 10000)
                .toString()
                .substring(1);
              let salt = bcrypt.genSaltSync(2);
              let hash = bcrypt.hashSync(otp, salt);
              localStorage.setItem("pin", hash);
              axios
                .post("/otp/verify", {
                  email: personinfo.email,
                  otp: otp,
                })

                .then((res) => {
                  if (res.data.msg == "success") {
                    setotpinput(true);
                    setloading(false);
                    localStorage.setItem("otpinput", true);
                  } else {
                    popfun("emailsendfailed");
                    setloading(false);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  setloading(false);
                  popfun("somethingwrong");
                });
            } else if (res.data.msg == "accountexist") {
              setloading(false);
              popfun("accountexist");
            } else {
              setloading(false);
              popfun("somethingwrong");
            }
          });
      } else {
        popfun("shortpass");
        setloading(false);
      }
    } else {
      popfun("incompletepop");
      setloading(false);
    }
  };

  const donehandle = () => {
    setloading(true);
    let otp_x = localStorage.getItem("pin");
    let cat = bcrypt.compareSync(personinfo.otp, otp_x);
    if (cat) {
      axios
        .post("/signup/adduser", {
          personinfo: personinfo,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            navigate("/signin");
            localStorage.clear();
          } else {
            setloading(false);
            popfun("somethingwrong");
          }
        })
        .catch((error) => {
          console.log("Failed" + error);
          setloading(false);
        });
      setloading(false);
    } else {
      popfun("wrongotp");
      setloading(false);
    }
  };

  const resendotp = () => {
    setloading(true);
    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    let salt = bcrypt.genSaltSync(2);
    let hash = bcrypt.hashSync(otp, salt);
    localStorage.setItem("pin", hash);
    axios
      .post("/otp/verify", {
        email: personinfo.email,
        otp: otp,
      })
      .then((res) => {
        if (res.data.msg == "success") {
          setotpinput(true);
          popfun("otpresend");
          setloading(false);
        } else {
          popfun("emailsendfailed");
          setloading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  const countrychange = (country) => {
    if (country) {
      axios
        .post("/csc/city", {
          country: country,
        })
        .then((res) => {
          setcities(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Input
        type={"text"}
        whatinput={"inputfirst"}
        location={{ top: "50px" }}
        naam={"name"}
        fun={(a, b) => {
          setpersoninfo((prevState) => ({
            ...prevState,
            [b]: a,
          }));
        }}
        val={personinfo.name}
        placeholder={"Enter fullName.."}
      />
      <Input
        type={"email"}
        whatinput={"inputfirst"}
        location={{ top: "100px" }}
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
      <Select
        name={"Country"}
        whatselect={"inputfirst"}
        data={countries.map((i) => ({ key1: i.name, key2: i.isoCode }))}
        location={{ top: "150px" }}
        fun={(e) => {
          if (e.split(",")[1] != "false") {
            countrychange(e.split(",")[1]);
            setpersoninfo((prevState) => ({
              ...prevState,
              country: e.split(",")[0],
            }));
          }
          return false;
        }}
      />
      <Select
        name={"City"}
        whatselect={"inputfirst"}
        data={cities.map((i) => ({ key1: i.name }))}
        location={{ top: "200px" }}
        fun={(e) => {
          if (e.split(",")[1] != "false") {
            setpersoninfo((prevState) => ({
              ...prevState,
              city: e.split(",")[0],
            }));
          } else {
            return false;
          }
        }}
      />

      <Password
        name={"password"}
        whatpass={"inputfirst"}
        location={{ top: "250px" }}
        placeholder={"Password (Double-Click to Show/Hide)"}
        fun={(a, b) => {
          setpersoninfo((prevState) => ({
            ...prevState,
            [b]: a,
          }));
        }}
        val={personinfo.password}
      />
      {otpinput || localStorage.getItem("otpinput") ? (
        <Input
          type={"text"}
          whatinput={"inputfirst"}
          location={{ top: "300px" }}
          naam={"otp"}
          fun={(a, b) => {
            setpersoninfo((prevState) => ({
              ...prevState,
              [b]: a,
            }));
          }}
          val={personinfo.otp}
          placeholder={"Enter OTP.."}
        />
      ) : (
        ""
      )}
      <Button
        whatbut={"buttonsecond"}
        location={{ bottom: "11px", left: "20px" }}
        val={"Home"}
        fun={() => navigate("/")}
        type={"button"}
      />
      <Button
        whatbut={"buttonsecond"}
        location={{ bottom: "11px", left: "85px" }}
        val={"SignIn"}
        fun={() => navigate("/signin")}
        type={"button"}
      />

      {!otpinput || !localStorage.getItem("otpinput") ? (
        <Button
          whatbut={"buttonsecond"}
          location={{ bottom: "11px", right: "10px" }}
          val={"SignUp"}
          fun={submitHandle}
          type={"button"}
        />
      ) : (
        <>
          {" "}
          <Button
            whatbut={"buttonsecond"}
            location={{ bottom: "11px", right: "70px" }}
            val={"resend"}
            fun={resendotp}
            type={"button"}
          />{" "}
          <Button
            whatbut={"buttonsecond"}
            location={{ bottom: "11px", right: "10px" }}
            val={"Done"}
            fun={donehandle}
            type={"button"}
          />
        </>
      )}
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
export default Signupface;
