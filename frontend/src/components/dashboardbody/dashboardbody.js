import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./dashboardbody.css";
import Popup from "../popup/Popup";
import Cookie from "../../hooks/useCookie";
let profileiconimg = "/assets/profileiconimg.png";
let uploadicon = "/assets/uploadicon.png";
const DashboardBody = () => {
  let cookie = Cookie;
  let [righterdata, setrighterdata] = useState({
    righername: "plz wait...",
    followers: "",
    desc: "plz wait...",
    link1: "plz wait...",
    link2: "plz wait...",
    link3: "plz wait...",
    link4: "plz wait...",
    pimg: "",
    pimgtype: "",
    img: "",
  });
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
  let elemfile = useRef("");
  let righterid = cookie("get", "user");
  useEffect(() => {
    axios
      .post("/getonly/getrighterdata", {
        righterid: righterid,
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
        } else if (res.data.msg == "notfound") {
          setmsg(true);
          setmsgprops({
            msg: "Not able to find you.",
            buttwo: false,
            butval1: "Ok",
            fun1: () => {
              setmsg(false);
            },
          });
        } else {
          setrighterdata((prevState) => ({
            ...prevState,
            righername: res.data.msg.rightername,
            followers: res.data.msg.followers,
            desc: res.data.msg.desc,
            link1: res.data.msg.link1,
            link2: res.data.msg.link2,
            link3: res.data.msg.link3,
            link4: res.data.msg.link4,
            pimg: res.data.pimg,
            pimgtype: res.data.msg.filetype,
            img: "data:" + res.data.msg.filetype + ";base64," + res.data.pimg,
          }));
        }
      });
  }, []);

  return (
    <>
      <input
        ref={elemfile}
        type={"file"}
        accept="image/png,image/jpg,image/jpeg"
        style={{ display: "none" }}
      />
      <div className={"dashboardmaincontainer"}>
        <div className={"profilesec"}>
          <div className={"profilesecimg"}>
            <img
              src={righterdata.img ? righterdata.img : profileiconimg}
              className={"profilesecimg-1"}
              alt={"Profile image"}
            />
            <img
              src={uploadicon}
              className={"profilesecimg-2"}
              alt={"Upload icon"}
              onClick={() => elemfile.current.click()}
            />
          </div>

          <div className={"profilesecsum"}>
            <p>{"@" + righterdata.righername}</p>
            <p>{righterdata.followers + " followers"}</p>
            <p>98 Posts</p>
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
export default DashboardBody;
