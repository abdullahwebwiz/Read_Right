import { useState, useEffect, memo } from "react";
import GeneralLoader from "../generalloader/generalloader";
import Popup from "../popup/Popup";
import "./postbody.css";
import axios from "axios";
import moment from "moment";
import PostBoxExtra from "../postboxextra/postboxextra";
import Header from "../header/Header";
import cookie from "../../hooks/useCookie";
import { Link } from "react-router-dom";
let dumimg1 = "/assets/profileiconimg.png";
let dumimg2 = "/assets/dumimg.png";
let reporticon = "/assets/reporticon.png";
let saveicon = "/assets/saveposticon2.png";
let user = cookie("get", "user");

const PostBody = ({
  postdata,
  tenpostone,
  tenposttwo,
  postcomments,
  inccomments,
}) => {
  console.log(postdata);
  let [comment, setcomment] = useState("");
  let [msg, setmsg] = useState(false);
  let [noheight1, setnoheight1] = useState(false);
  let [noheight2, setnoheight2] = useState(false);
  let [thumbnail, setthumbnail] = useState("");
  let [profileimg, setprofileimg] = useState("");
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

  useEffect(() => {
    axios
      .post("/sendimg", {
        whatimg: "postthumbnails",
        imgid: postdata.postid,
        imgtype: postdata.pfiletype,
      })
      .then((res) => {
        setthumbnail(res.data.img);
      });
  }, [postdata]);
  useEffect(() => {
    axios
      .post("/sendimg", {
        whatimg: "righterimgs",
        imgid: postdata.rightername,
        imgtype: postdata.rfiletype,
      })
      .then((res) => {
        setprofileimg(res.data.img);
      });
  }, [postdata]);

  const commentsubmit = (e) => {
    if (e.key != "Enter") {
      console.log("all good");
    }
  };

  if (postdata) {
    return (
      <>
        <Header />
        <div className={"mainpostcontainer"}>
          <div className={"posttitleblock"}>{postdata.posttitle}</div>

          <div className={"postrighterinfoanddates"}>
            <Link to={'/righter/@'+postdata.rightername}>
              <div className={"one"}>
                <img
                  src={
                    profileimg
                      ? "data:" + postdata.rfiletype + ";base64," + profileimg
                      : dumimg1
                  }
                />
                <span>
                  <p className={"one"}>{"@" + postdata.rightername}</p>
                  <p className={"two"}>{postdata.readers + " Readers"}</p>
                </span>
              </div>
            </Link>

            <div className={"two"}>
              {postdata.updated != "none" ? (
                <p className={"one"}>
                  {"Updated on: " +
                    moment.unix(postdata.epoch / 1000).format("DD MMM YYYY")}
                </p>
              ) : (
                ""
              )}

              <p className={"two"}>
                {" "}
                {"Uploaded on: " +
                  moment.unix(postdata.epoch / 1000).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
          <div className={"postbodytncon"}>
            <img
              src={
                thumbnail
                  ? "data:" + postdata.pfiletype + ";base64," + thumbnail
                  : dumimg2
              }
              className={"pbtnimg"}
            />
            <img src={reporticon} className={"pbreporticon"} />
            <img src={saveicon} className={"pbsaveicon"} />
          </div>

          <div
            className={"pbbody"}
            dangerouslySetInnerHTML={{ __html: `${postdata.postbody}` }}
          ></div>
          <div className={"topline"}>
            {"More from " + "@" + postdata.rightername}
          </div>
          <div
            className={
              "pbexpostconmain " + " " + `${noheight1 ? "noheight" : ""}`
            }
          >
            <div className={"pbexpostcon"}>
              {tenpostone.map((d, i) => {
                return (
                  <>
                    <PostBoxExtra
                      title={d.posttitle}
                      imgtype={d.filetype}
                      imgid={d.postid}
                      whatimg={"postthumbnails"}
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div
            className={"showmore"}
            onClick={() => {
              if (noheight1) {
                setnoheight1(false);
              } else {
                setnoheight1(true);
              }
            }}
          >
            {noheight1 ? "Show less" : "Show more"}
          </div>
          <div className={"spacebit"}></div>
          <div className={"topline"}>{"You May Like"}</div>

          <div
            className={
              "pbexpostconmain" + " " + `${noheight2 ? "noheight" : ""}`
            }
          >
            <div className={"pbexpostcon animedelay"}>
              {tenposttwo.map((d, i) => {
                return (
                  <>
                    <PostBoxExtra
                      title={d.posttitle}
                      imgtype={d.filetype}
                      imgid={d.postid}
                      whatimg={"postthumbnails"}
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div
            className={"showmore"}
            onClick={() => {
              if (noheight2) {
                setnoheight2(false);
              } else {
                setnoheight2(true);
              }
            }}
          >
            {noheight2 ? "Show less" : "Show more"}
          </div>

          <div className={"commentsection"}>
            {user ? (
              <textarea
                placeholder={"Enter Your comment. Press Enter to add comment."}
                value={comment}
                onKeyDown={(e) => commentsubmit(e)}
                onChange={(e) => setcomment(e.target.value)}
              ></textarea>
            ) : (
              ""
            )}

            <div className={"commentcontainer"}>
              {postcomments.length != 0
                ? postcomments.map((d, i) => {
                    return (
                      <>
                        <div className={"commentitself"} key={i}>
                          <div className={"commentusername"}>{d.username}</div>
                          <div className={"commentmessage"}>{d.comment}</div>
                        </div>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className={"showmore"} onClick={() => inccomments()}>
            Showmore
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
  } else {
    return (
      <>
        <GeneralLoader />
      </>
    );
  }
};
export default PostBody;
