import "./header.css";
import Input from "../utilcomps/input";
import Button from "../utilcomps/button";
import { useEffect, useMemo, useRef, useState,memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import Popup from "../popup/Popup";
let mainlogo = "/assets/mainlogo.png";
let addpostimg = "/assets/addpostimg.png";
let profileiconimg = "/assets/profileiconimg.png";
let menuicon = "/assets/menuicon.png";
let homeicon = "/assets/homeicon.png";
let exploreicon = "/assets/exploreicon.png";
let likedpostsicon = "/assets/likedpostsicon.png";
let followingicon = "/assets/followingicon.png";
let historyicon = "/assets/historyicon.png";
const Header = () => {
  let menuelem = useRef("");
  let [val, setval] = useState("");
  let [issigned, setissigned] = useState(false);
  let [msg, setmsg] = useState(false);
  let [menushow, setmenushow] = useState(false);
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
  let navigate = useNavigate();
  let cookie = useCookie;
  let user = cookie("get", "user");

  useEffect(() => {
    if (user) {
      setissigned(true);
    } else {
      setissigned(false);
    }
  }, [user]);

  return (
    <>
      <header>
        <Link to={"/"}>
          <img src={mainlogo} className={"mainlogo"} alt={"mainlogo"} />
        </Link>
        <img
          src={menuicon}
          className={"menuicon"}
          alt={"menuicon"}
          onClick={() => {
            if (!menushow) {
              menuelem.current.style.display = "block";
              setmenushow(true);
            } else {
              menuelem.current.style.display = "none";
              setmenushow(false);
            }
          }}
        />
        <div className={"menubar"} ref={menuelem}>
          <Link to={"/"}>
            <div className={"mbone"}>
              <img src={homeicon} />
              <p>Home</p>
            </div>
          </Link>
          <Link to={"/explore"}>
            {" "}
            <div className={"mbone"}>
              <img src={exploreicon} />
              <p>Explore</p>
            </div>
          </Link>
          <Link to={"/history"}>
            {" "}
            <div className={"mbone"}>
              <img src={historyicon} />
              <p>History</p>
            </div>
          </Link>
          <Link to={"/following"}>
            {" "}
            <div className={"mbone"}>
              <img src={followingicon} />
              <p>Following</p>
            </div>
          </Link>
          <Link to={"/likedposts"}>
            {" "}
            <div className={"mbone"}>
              <img src={likedpostsicon} />
              <p>Liked Posts</p>
            </div>
          </Link>
        </div>
        <Input
          type={"text"}
          whatinput={"headersearch"}
          naam={"input"}
          fun={(e) => setval(e)}
          val={val}
          placeholder={"Search..."}
        />

        <div
          className={"addpostbutton"}
          onClick={() => {
            if (user) {
              alert("Your are signedin");
            } else {
              setmsg(true);
              setmsgprops({
                msg: "You are not Signedin",
                buttwo: false,
                butval1: "Ok",
                fun1: () => {
                  setmsg(false);
                },
              });
            }
          }}
        >
          <img src={addpostimg} alt={"add post image"} />
        </div>

        {issigned ? (
          <>
            <div className={"profileicon"}>
              <img src={profileiconimg} alt={"profile icon"} />
            </div>
          </>
        ) : (
          <Button
            whatbut={"buttonsecond"}
            location={{ bottom: "11px", right: "10px" }}
            val={"SignUp"}
            fun={() => navigate("/signup")}
            type={"button"}
          />
        )}
      </header>
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

export default memo(Header);
