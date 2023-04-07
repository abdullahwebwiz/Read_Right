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

const BecomeRighter = ({ righterdata, isrighter }) => {
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    localStorage.removeItem("rightername");
    localStorage.removeItem("link1");
    localStorage.removeItem("link2");
    localStorage.removeItem("link3");
    localStorage.removeItem("link4");
    localStorage.removeItem("link5");
    localStorage.removeItem("desc");
    localStorage.removeItem("abc");
    return (ev.returnValue = "Are you sure you want to close?");
  });

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
    link5: "",
  });

  const submithandle = () => {
    if (
      img &&
      rightername &&
      desc &&
      links.link1 &&
      links.link2 &&
      links.link3 &&
      links.link4 &&
      links.link5
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
          fd.append("link5", links.link5);
          let endpoint1 = "/updaterighter/updaterighter";
          let endpoint2 = "/becomerighter/becomerighter";

          axios
            .post(`${isrighter ? endpoint1 : endpoint2}`, fd, {
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
                navigate("/dashboard");
                localStorage.removeItem("rightername");
                localStorage.removeItem("link1");
                localStorage.removeItem("link2");
                localStorage.removeItem("link3");
                localStorage.removeItem("link4");
                localStorage.removeItem("link5");
                localStorage.removeItem("desc");
                localStorage.removeItem("abc");
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
      if (isrighter) {
        setrightername(righterdata.rightername);
      } else {
        setdesc("");
      }
    }

    if (localStorage.getItem("desc")) {
      setdesc(localStorage.getItem("desc"));
    } else {
      if (isrighter) {
        setdesc(righterdata.desc);
      } else {
        setdesc("");
      }
    }

    if (localStorage.getItem("link1")) {
      setlinks((prevState) => ({
        ...prevState,
        link1: localStorage.getItem("link1"),
      }));
    } else {
      if (isrighter) {
        setlinks((prevState) => ({
          ...prevState,
          link1: righterdata.link1,
        }));
      } else {
        setlinks((prevState) => ({
          ...prevState,
          link1: "",
        }));
      }
    }
    if (localStorage.getItem("link2")) {
      setlinks((prevState) => ({
        ...prevState,
        link2: localStorage.getItem("link2"),
      }));
    } else {
      if (isrighter) {
        setlinks((prevState) => ({
          ...prevState,
          link2: righterdata.link2,
        }));
      } else {
        setlinks((prevState) => ({
          ...prevState,
          link2: "",
        }));
      }
    }
    if (localStorage.getItem("link3")) {
      setlinks((prevState) => ({
        ...prevState,
        link3: localStorage.getItem("link3"),
      }));
    } else {
      if (isrighter) {
        setlinks((prevState) => ({
          ...prevState,
          link3: righterdata.link3,
        }));
      } else {
        setlinks((prevState) => ({
          ...prevState,
          link3: "",
        }));
      }
    }
    if (localStorage.getItem("link4")) {
      setlinks((prevState) => ({
        ...prevState,
        link4: localStorage.getItem("link4"),
      }));
    } else {
      if (isrighter) {
        setlinks((prevState) => ({
          ...prevState,
          link4: righterdata.link4,
        }));
      } else {
        setlinks((prevState) => ({
          ...prevState,
          link4: "",
        }));
      }
    }
    if (localStorage.getItem("link5")) {
      setlinks((prevState) => ({
        ...prevState,
        link5: localStorage.getItem("link5"),
      }));
    } else {
      if (isrighter) {
        setlinks((prevState) => ({
          ...prevState,
          link5: righterdata.link5,
        }));
      } else {
        setlinks((prevState) => ({
          ...prevState,
          link5: "",
        }));
      }
    }
  }, [righterdata, isrighter]);

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
            location={{ marginTop: "100px" }}
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
            location={{ marginTop: "145px", backgroundColor: "white" }}
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
            location={{ marginTop: "182px", backgroundColor: "white" }}
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
            location={{ marginTop: "219px", backgroundColor: "white" }}
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
            location={{ marginTop: "256px", backgroundColor: "white" }}
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
          <Input
            type={"text"}
            location={{ marginTop: "293px", backgroundColor: "white" }}
            whatinput={"inputsecond"}
            naam={"link5"}
            fun={(a, b) => {
              localStorage.setItem("link5", a);
              setlinks((prevState) => ({
                ...prevState,
                [b]: a,
              }));
            }}
            val={links.link5}
            placeholder={"Profile link 5"}
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
            val={isrighter ? "Update" : "Done"}
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
