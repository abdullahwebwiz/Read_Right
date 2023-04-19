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
import ReportForm from "../reportform/reportform";
let dumimg1 = "/assets/profileiconimg.png";
let dumimg2 = "/assets/dumimg.png";
let reporticon = "/assets/reporticon.png";
let saveicon = "/assets/saveposticon2.png";
let crossicon = "/assets/crossicon.png";
let shareicon = "/assets/shareicon.png";
let threedots = "/assets/threedots.png";
let user = cookie("get", "user");

const PostBody = ({
  postdata,
  tenpostone,
  tenposttwo,
  postcomments,
  inccomments,
  postid,
  addcomment,
  deletecomment,
}) => {
  console.log(postdata);
  let [commentmenu, setcommentmenu] = useState(false);
  let [comment, setcomment] = useState("");
  let [msg, setmsg] = useState(false);
  let [noheight1, setnoheight1] = useState(false);
  let [noheight2, setnoheight2] = useState(false);
  let [thumbnail, setthumbnail] = useState("");
  let [profileimg, setprofileimg] = useState("");
  let [report, setreport] = useState(false);
  let [reportprops, setreportprops] = useState({
    title: "",
    msg: "",
    subject: "",
    fun: () => {
      return false;
    },
  });
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
    axios.post("/harc/addhistory", {
      user: user,
      postid: postid,
      posttitle: postdata.posttitle,
    });
  }, [postdata, postid]);

  useEffect(() => {
    setTimeout(() => {
      axios.post("/harc/readsinc", {
        postid: postid,
      });
    }, 1000 * 10);
  }, [postdata, postid]);

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
    if (e.key == "Enter") {
      addcomment(user, comment, postid);
      setcomment("");
    }
  };

  if (postdata) {
    return (
      <>
        <Header />
        <div className={"mainpostcontainer"}>
          <div className={"posttitleblock"}>{postdata.posttitle}</div>

          <div className={"postrighterinfoanddates"}>
            <Link to={"/righter/@" + postdata.rightername}>
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
          <div className={"tagconpb"}>
            {postdata.tags.split(",").map((data, index) => {
              return (
                <>
                  <div
                    className={"posttagitself"}
                    key={index}
                    onClick={() => {
                      window.open("/tag/" + data, "__blank");
                    }}
                  >
                    {data}
                  </div>
                </>
              );
            })}
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
            <img
              src={reporticon}
              className={"pbreporticon"}
              onClick={() => {
                setreport(true);
                setreportprops({
                  msg: "Post ID " + postid,
                  title: "Report Form",
                  subject: postid,
                  fun: () => {
                    setreport(false);
                  },
                });
              }}
            />
            <img
              src={saveicon}
              className={"pbsaveicon"}
              onClick={() => {
                let spc = localStorage.getItem("spc");
                if (spc) {
                  let spcarray = spc.split(",");
                  if (spcarray.includes(postid)) {
                    let ii = spcarray.indexOf(postid);
                    spcarray.splice(ii, 1);
                    localStorage.setItem("spc", spcarray);
                    setmsg(true);
                    setmsgprops({
                      msg: "Post Unsaved successfully",
                      buttwo: false,
                      butval1: "Ok",
                      fun1: () => {
                        setmsg(false);
                      },
                    });
                  } else {
                    spcarray.push(postid);
                    localStorage.setItem("spc", spcarray);
                    setmsg(true);
                    setmsgprops({
                      msg: "Post Saved successfully",
                      buttwo: false,
                      butval1: "Ok",
                      fun1: () => {
                        setmsg(false);
                      },
                    });
                  }
                } else {
                  let sp = [];
                  sp.push(postid);
                  localStorage.setItem("spc", sp);
                  setmsg(true);
                  setmsgprops({
                    msg: "Post Saved successfully",
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
              src={shareicon}
              className={"pbshareicon"}
              onClick={() => {
                window.navigator.clipboard.writeText(window.location.href);
                setmsg(true);
                setmsgprops({
                  msg: "Post link as been copied.",
                  buttwo: false,
                  butval1: "Ok",
                  fun1: () => {
                    setmsg(false);
                  },
                });
              }}
            />
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
                          {user == d.userid && d.s_no ? (
                            <>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "15px",
                                  position: "absolute",
                                  right: "10px",
                                }}
                                onClick={() => {
                                  deletecomment(d.s_no, i, postid);
                                }}
                              >
                                DELETE
                              </div>
                            </>
                          ) : (
                            ""
                          )}

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
        {report ? (
          <>
            <ReportForm
              title={reportprops.title}
              msg={reportprops.msg}
              subject={reportprops.subject}
              fun={reportprops.fun}
            />
          </>
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
