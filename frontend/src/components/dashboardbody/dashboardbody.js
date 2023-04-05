import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./dashboardbody.css";
import timeAgo from "epoch-to-timeago/";
import { useNavigate } from "react-router-dom";
import PostBox from "../postbox/postbox";
import GeneralLoader from "../generalloader/generalloader";
import Popup from "../popup/Popup";
import Cookie from "../../hooks/useCookie";
import Button from "../utilcomps/button";
import Input from "../utilcomps/input";
import Link from "../utilcomps/linker";
import Select from "../utilcomps/select";
let profileiconimg = "/assets/profileiconimg.png";
let uploadicon = "/assets/uploadicon.png";
let facebookicon = "/assets/facebookicon.png";
let instagramicon = "/assets/instagramicon.png";
let youtubeicon = "/assets/youtubeicon.png";
let linkedinicon = "/assets/linkedinicon.png";
let websiteicon = "/assets/websiteicon.png";
const DashboardBody = () => {
  let cookie = Cookie;
  let navigate = useNavigate();
  var originalTime = new Date().getTime();

  let [righterdata, setrighterdata] = useState({
    rightername: "plz wait...",
    readers: "",
    desc: "plz wait...",
    link1: "plz wait...",
    link2: "plz wait...",
    link3: "plz wait...",
    link4: "plz wait...",
    pimg: "",
    pimgtype: "",
    img: "",
  });
  let [postarray, setpostarray] = useState([]);

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
  let [postfilter, setpostfilter] = useState("recent");
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
            rightername: res.data.msg.rightername,
            readers: res.data.msg.readers,
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

  useEffect(() => {
    axios
      .post("/getonly/getposts", {
        righterid: righterid,
      })
      .then((res) => {
        console.log(res.data.msg);
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
            msg: "You have no posts yet.",
            buttwo: false,
            butval1: "Ok",
            fun1: () => {
              setmsg(false);
            },
          });
        } else {
          setpostarray(res.data.msg);
        }
      });
  }, [righterid]);

  return (
    <>
      <div className={"dashboardmaincontainer"}>
        <div className={"profilesec"}>
          <div className={"profilesecimg"}>
            <img
              src={righterdata.img ? righterdata.img : profileiconimg}
              className={"profilesecimg-1"}
              alt={"Profile image"}
            />
          </div>

          <div className={"profilesecsum"}>
            <p>{"@" + righterdata.rightername}</p>
            <p>{righterdata.readers + " readers"}</p>
            <p>{postarray.length + " Posts"}</p>
          </div>
        </div>
      </div>
      <div className={"profiledesc"}>{righterdata.desc}</div>
      <div className={"linkcontainer"}>
        <img src={facebookicon} alt={"facebook icon"} />
        <img src={instagramicon} alt={"instagram icon"} />
        <img src={youtubeicon} alt={"youtube icon"} />
        <img src={linkedinicon} alt={"linkedin icon"} />
        <img src={websiteicon} alt={"website icon"} />
      </div>
      <div className={"dashboardbuttons"}>
        <Select
          name={"postfilter"}
          whatselect={"inputfirst"}
          data={[{ key1: "Most Viewed" }, { key1: "Recent" }]}
          location={{
            top: "10px",
            left: "10px",
            width: "100px",
            backgroundColor: "#0bda51",
            color: "white",
            fontSize: "15px",
          }}
          fun={(e) => {
            if (e.split(",")[1] != "false") {
              setpostfilter(e.split(",")[0]);
            } else {
              return false;
            }
          }}
        />

        <Button
          whatbut={"buttonsecond"}
          location={{ top: "10px", left: "120px", height: "35px" }}
          val={"New Post"}
          fun={() => {
            navigate("/postbuilder");
          }}
          type={"button"}
        />
        <Button
          whatbut={"buttonsecond"}
          location={{ top: "10px", left: "220px", height: "35px" }}
          val={"Update Profile"}
          fun={""}
          type={"button"}
        />
      </div>

      <div className={"dashboardpostcontainers"}>
        {postarray ? (
          postarray.map((data, index) => {
            let ago = timeAgo.timeAgo(data.epoch, originalTime);
            return (
              <>
                <PostBox
                  key={index}
                  whatimg={"postthumbnails"}
                  imgtype={data.filetype}
                  imgid={data.postid}
                  title={data.posttitle}
                  reads={data.reads}
                  ago={ago}
                  righterimg={righterdata.img}
                  rightername={"@" + righterdata.rightername}
                />
              </>
            );
          })
        ) : (
          <GeneralLoader />
        )}
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
