import "./becomerighter.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../utilcomps/input";
import Button from "../utilcomps/button";
import Popup from "../popup/Popup";
import useCookie from "../../hooks/useCookie";
import { useNavigate, useLocation } from "react-router-dom";
let profileiconimg = "/assets/profileiconimg.png";
let uploadicon = "/assets/uploadicon.png";

const BecomeRighter = () => {
  let cookie = useCookie;
  let user = cookie("get", "user");

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
  let [img, setimg] = useState("");
  let [rightername, setrightername] = useState("");
  let [desc, setdesc] = useState("");
  let [links, setlinks] = useState({
    link1: "",
    link2: "",
    link3: "",
    link4: "",
  });

  const submithandle = () => {
    if (
      img &&
      rightername &&
      desc &&
      links.link1 &&
      links.link2 &&
      links.link3 &&
      links.link4
    ) {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let cat = format.test(rightername);
      if (!cat) {
        if (desc.length <= 300) {
          let fd = new FormData();
          fd.append("userid", user);
          fd.append("rightername", rightername);
          fd.append("desc", desc);
          fd.append("img", img);
          fd.append("link1", links.link1);
          fd.append("link2", links.link2);
          fd.append("link3", links.link3);
          fd.append("link4", links.link4);
          axios
            .post("/becomerighter/becomerighter", fd, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.msg == "failed") {
                setmsg(true);
                setmsgprops({
                  msg: "Something went wrong.",
                  buttwo: false,
                  butval1: "Ok",
                  fun1: () => {
                    setmsg(false);
                  },
                });
              } else if (res.data.msg == "accountexist") {
                setmsg(true);
                setmsgprops({
                  msg: "Righter name already exist.",
                  buttwo: false,
                  butval1: "Ok",
                  fun1: () => {
                    setmsg(false);
                  },
                });
              } else if (res.data.msg == "success") {
                alert("all good");
                navigate("/");
                localStorage.clear();
              }
            });
        } else {
          setmsg(true);
          setmsgprops({
            msg: "Message must be maximum 300 characters.",
            buttwo: false,
            butval1: "Ok",
            fun1: () => {
              setmsg(false);
            },
          });
        }
      } else {
        setmsg(true);
        setmsgprops({
          msg: "Symbols and space not allowed in rightername.",
          buttwo: false,
          butval1: "Ok",
          fun1: () => {
            setmsg(false);
          },
        });
      }
    } else {
      setmsg(true);
      setmsgprops({
        msg: "Fill all fields to Proceed.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    }
  };

  let navigate = useNavigate();
  let { state } = useLocation();

  useEffect(() => {
    if (state) {
      setimg(state.img);
      console.log(state.img);
    } else {
      setimg("");
    }
  }, [state]);

  useEffect(() => {
    if (localStorage.getItem("rightername")) {
      setrightername(localStorage.getItem("rightername"));
    } else {
      setrightername("");
    }

    if (localStorage.getItem("desc")) {
      setdesc(localStorage.getItem("desc"));
    } else {
      setdesc("");
    }

    if (localStorage.getItem("link1")) {
      setlinks((prevState) => ({
        ...prevState,
        link1: localStorage.getItem("link1"),
      }));
    } else {
      setlinks((prevState) => ({
        ...prevState,
        link1: "",
      }));
    }

    if (localStorage.getItem("link2")) {
      setlinks((prevState) => ({
        ...prevState,
        link2: localStorage.getItem("link2"),
      }));
    } else {
      setlinks((prevState) => ({
        ...prevState,
        link2: "",
      }));
    }

    if (localStorage.getItem("link3")) {
      setlinks((prevState) => ({
        ...prevState,
        link3: localStorage.getItem("link3"),
      }));
    } else {
      setlinks((prevState) => ({
        ...prevState,
        link3: "",
      }));
    }
    if (localStorage.getItem("link4")) {
      setlinks((prevState) => ({
        ...prevState,
        link4: localStorage.getItem("link4"),
      }));
    } else {
      setlinks((prevState) => ({
        ...prevState,
        link4: "",
      }));
    }
  }, []);

  return (
    <>
      <div className={"becomerighterformcontainer"}>
        <div className={"becomerighterform"}>
          <p>
            {
              "Provide the following information to become a Righter. First select a unique your Display name, then provide 4 different Profile links (facebook, Github, linkedin, Instagram or any other). Then describe your content through a short message."
            }
          </p>
          <div className={"brfimg"}>
            <img
              src={!img ? profileiconimg : `${URL.createObjectURL(img)}`}
              className={"brfimg-1"}
            />
            <img
              src={uploadicon}
              className={"brfimg-2"}
              onClick={() => {
                navigate("/imagecropper", {
                  state: { aspect: 1, sender: "becomerighter" },
                });
              }}
            />
          </div>

          <Input
            type={"text"}
            whatinput={"inputsecond"}
            location={{ marginTop: "120px" }}
            naam={"rightername"}
            fun={(e) => {
              localStorage.setItem("rightername", e);
              setrightername(e);
            }}
            val={rightername}
            placeholder={"Righter Name.."}
          />

          <Input
            type={"text"}
            whatinput={"inputsecond"}
            location={{ marginTop: "180px", backgroundColor: "white" }}
            naam={"link1"}
            fun={(a, b) => {
              localStorage.setItem("link1", a);
              setlinks((prevState) => ({
                ...prevState,
                [b]: a,
              }));
            }}
            val={links.link1}
            placeholder={"Profile link 1"}
          />
          <Input
            type={"text"}
            whatinput={"inputsecond"}
            location={{ marginTop: "220px", backgroundColor: "white" }}
            naam={"link2"}
            fun={(a, b) => {
              localStorage.setItem("link2", a);
              setlinks((prevState) => ({
                ...prevState,
                [b]: a,
              }));
            }}
            val={links.link2}
            placeholder={"Profile link 2"}
          />
          <Input
            type={"text"}
            whatinput={"inputsecond"}
            location={{ marginTop: "260px", backgroundColor: "white" }}
            naam={"link3"}
            fun={(a, b) => {
              localStorage.setItem("link3", a);
              setlinks((prevState) => ({
                ...prevState,
                [b]: a,
              }));
            }}
            val={links.link3}
            placeholder={"Profile link 3"}
          />
          <Input
            type={"text"}
            location={{ marginTop: "300px", backgroundColor: "white" }}
            whatinput={"inputsecond"}
            naam={"link4"}
            fun={(a, b) => {
              localStorage.setItem("link4", a);
              setlinks((prevState) => ({
                ...prevState,
                [b]: a,
              }));
            }}
            val={links.link4}
            placeholder={"Profile link 4"}
          />
          <textarea
            placeholder={"Write a Message for your readers.."}
            onChange={(e) => {
              setdesc(e.target.value);
              localStorage.setItem("desc", e.target.value);
            }}
            value={desc}
          ></textarea>

          <Button
            whatbut={"buttonsecond"}
            location={{ bottom: "11px", right: "10px" }}
            val={"Done"}
            fun={submithandle}
            type={"button"}
          />
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
export default BecomeRighter;
