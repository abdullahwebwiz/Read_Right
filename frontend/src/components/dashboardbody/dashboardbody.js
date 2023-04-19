import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./dashboardbody.css";
import timeAgo from "epoch-to-timeago/";
import { useNavigate, useParams } from "react-router-dom";
import PostBox from "../postbox/postbox";
import GeneralLoader from "../generalloader/generalloader";
import BounceLoader from "react-spinners/BounceLoader";
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
const DashboardBody = ({ todoarray, todofun, iamrighterpage }) => {
  let todoarray2 = ["Edit", "Publish", "Delete"];
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
    link5: "plz wait...",
    pimg: "",
    img: "",
    filetype: "",
  });
  let [readbutval, setreadbutval] = useState("Readit");
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
  let [postfilter, setpostfilter] = useState("Recent");
  let elemfile = useRef("");
  let righterid = cookie("get", "user");
  let { rname } = useParams();

  console.log(postarray);
  useEffect(() => {
    if (righterid) {
      axios
        .post("/followingsys/checkfollowing", {
          user: righterid,
          righter: righterdata.rightername,
        })
        .then((res) => {
          if (res.data.msg != "failed") {
            if (res.data.msg == "yesfollowing") {
              setreadbutval("UnReadit");
            } else {
              setreadbutval("Readit");
            }
          }
        });
    }
  }, [righterid, righterdata]);

  useEffect(() => {
    console.log("get righter data.");
    axios
      .post("/getonly/getrighterdata", {
        righterid: righterid,
        rname: rname,
      })
      .then((res) => {
        console.log("lolo:" + res.data.msg);
        if (res.data.msg == "failed") {
          setmsg(true);
          setmsgprops({
            msg: "Something went wrong.",
            buttwo: false,
            butval1: "Ok",
            fun1: () => {
              setmsg(false);
              window.history.back();
            },
          });
        } else if (res.data.msg == "notfound") {
          setmsg(true);
          setmsgprops({
            msg: "No Righter Found.",
            buttwo: false,
            butval1: "Ok",
            fun1: () => {
              setmsg(false);
              window.history.back();
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
            link5: res.data.msg.link5,
            pimg: res.data.pimg,
            filetype: res.data.msg.filetype,
            img: "data:" + res.data.msg.filetype + ";base64," + res.data.pimg,
          }));
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post("/getonly/getposts", {
        righterid: righterid,
        rname: rname,
        postfilter: postfilter,
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
          console.log("");
        } else {
          setpostarray(res.data.msg);
        }
      });
  }, [righterid, postfilter]);

  const followhandle = () => {
    if (righterid) {
      axios
        .post("/followingsys/followact", {
          user: righterid,
          righter: righterdata.rightername,
        })
        .then((res) => {
          if (res.data.msg != "failed") {
            if (res.data.msg == "readsuccess") {
              setreadbutval("UnReadit");
            } else if (res.data.msg == "unreadsuccess") {
              setreadbutval("Readit");
            }
          } else {
            setmsg(true);
            setmsgprops({
              msg: "Something went wrong.",
              buttwo: false,
              butval1: "Ok",
              fun1: () => {
                setmsg(false);
              },
            });
          }
        });
    } else {
      setmsg(true);
      setmsgprops({
        msg: "Signin to do the following action.",
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
      <div className={"dashboardmaincontainer"}>
        <div className={"profilesec"}>
          <div className={"profilesecimg"}>
            <img
              src={righterdata.img ? righterdata.img : profileiconimg}
              className={"profilesecimg-1"}
              alt={"Profile image"}
            />
          </div>
          <div className={"profilerightername"}>
            {"@" + righterdata.rightername}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {" "}
            {rname ? (
              <Button
                whatbut={"buttonfirst"}
                location={{ position: "relative" }}
                val={readbutval}
                fun={followhandle}
                type={"button"}
              />
            ) : (
              <Button
                whatbut={"buttonfirst"}
                location={{ position: "relative" }}
                val={"Update"}
                fun={() => navigate("/becomerighter")}
                type={"button"}
              />
            )}
          </div>
          <div className={"pqrs"}>
            <p>
              {righterdata.readers +
                " Readers" +
                " | " +
                postarray.length +
                " Posts"}
            </p>
          </div>
          <div className={"linkcon"}>
            <img
              src={"/assets/facebookicon.png"}
              onClick={() => {
                if (righterdata.link1) {
                  window.open("https://" + righterdata.link1, "__blank");
                } else {
                  setmsg(true);
                  setmsgprops({
                    msg: "No link provided by righter",
                    buttwo: false,
                    butval1: "Ok",
                    fun1: () => {
                      setmsg(false);
                    },
                  });
                }
              }}
            />
            <img
              src={"/assets/youtubeicon.png"}
              onClick={() => {
                if (righterdata.link2) {
                  window.open("https://" + righterdata.link2, "__blank");
                } else {
                  setmsg(true);
                  setmsgprops({
                    msg: "No link provided by righter",
                    buttwo: false,
                    butval1: "Ok",
                    fun1: () => {
                      setmsg(false);
                    },
                  });
                }
              }}
            />
            <img
              src={"/assets/instagramicon.png"}
              onClick={() => {
                if (righterdata.link3) {
                  window.open("https://" + righterdata.link3, "__blank");
                } else {
                  setmsg(true);
                  setmsgprops({
                    msg: "No link provided by righter",
                    buttwo: false,
                    butval1: "Ok",
                    fun1: () => {
                      setmsg(false);
                    },
                  });
                }
              }}
            />
            <img
              src={"/assets/linkedinicon.png"}
              onClick={() => {
                if (righterdata.link4 != "nolink") {
                  window.open("https://" + righterdata.link4, "__blank");
                } else {
                  setmsg(true);
                  setmsgprops({
                    msg: "No link provided by righter",
                    buttwo: false,
                    butval1: "Ok",
                    fun1: () => {
                      setmsg(false);
                    },
                  });
                }
              }}
            />
            <img
              src={"/assets/websiteicon.png"}
              onClick={() => {
                if (righterdata.link5) {
                  window.open("https://" + righterdata.link5, "__blank");
                } else {
                  setmsg(true);
                  setmsgprops({
                    msg: "No link provided by righter",
                    buttwo: false,
                    butval1: "Ok",
                    fun1: () => {
                      setmsg(false);
                    },
                  });
                }
              }}
            />
          </div>
          <div className={"descon"}>{righterdata.desc}</div>
        </div>
        <div className={"dashbutcon"}>
          <Select
            name={""}
            whatselect={"inputsecond"}
            data={["Recent", "Popular"].map((i) => ({ key1: i, key2: i }))}
            location={{ width: "100px", left: "10px", marginRight: "20px" }}
            fun={(e) => {
              if (e.split(",")[1] != "false") {
                setpostfilter(e.split(",")[1]);
              }
              return false;
            }}
          />
          <Button
            whatbut={"buttonfirst"}
            location={{
              width: "100px",
              height: "40px",
              left: "120px",
              marginRight: "20px",
            }}
            val={"New Post"}
            fun={() => {
              window.open("/postbuilder", "__black");
            }}
            type={"button"}
          />
        </div>
        <div className={"dashboardpostcontainer"}>
          {postarray ? (
            postarray.map((data, index) => {
              let ago = timeAgo.timeAgo(data.epoch, originalTime);
              return (
                <>
                  <PostBox
                    iamrighterpage={iamrighterpage}
                    published={data.ispublished}
                    key={index}
                    rightername={data.rightername}
                    whatimg={"postthumbnails"}
                    imgtype={data.pfiletype}
                    imgid={data.postid}
                    whatrimg={"righterimgs"}
                    rimgtype={data.rfiletype}
                    rimgid={data.rightername}
                    title={data.posttitle}
                    postid={data.postid}
                    reads={data.reads}
                    ago={ago}
                    todoarray={todoarray}
                    todoarray2={todoarray2}
                    todofun={todofun}
                  />
                </>
              );
            })
          ) : (
            <GeneralLoader />
          )}
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
