import "./homebody.css";
import PostBox from "../postbox/postbox";
import GeneralLoader from "../generalloader/generalloader";
import timeAgo from "epoch-to-timeago/";
import Popup from "../popup/Popup";
import { useEffect, useState, memo } from "react";
import axios from "axios";
import ReportForm from "../reportform/reportform";
import cookie from "../../hooks/useCookie";
const HomeBody = () => {
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
  let [report, setreport] = useState(false);
  let [reportprops, setreportprops] = useState({
    title: "",
    msg: "",
    subject: "",
    fun: () => {
      return false;
    },
  });

  let [postarray, setpostarray] = useState([]);
  let [loading, setloading] = useState(true);
  var originalTime = new Date().getTime();

  useEffect(() => {  
    axios.post("/sendpostarray/homeposts").then((res) => {
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
        setloading(false);
      }
    });
  }, []);

  const todofun = (x, y) => {
    console.log(x);
    console.log(y);
    if (x == "Share") {
      navigator.clipboard.writeText(window.location.origin + "/post/" + y);
      setmsg(true);
      setmsgprops({
        msg: "Post link Copied",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "Report") {
      if (cookie("get", "user")) {
        setreport(true);
        setreportprops({
          msg: "Post ID " + y,
          title: "Report Form",
          subject: y,
          fun: () => {
            setreport(false);
          },
        });
      } else {
        setmsg(true);
        setmsgprops({
          msg: "You are not signedin",
          buttwo: false,
          butval1: "Ok",
          fun1: () => {
            setmsg(false);
          },
        });
      }
    }
  };

  if (!loading) {
    return (
      <>
        <div className={"homebodypostcontainer"}>
          {postarray.map((data, index) => {
            let ago = timeAgo.timeAgo(data.epoch, originalTime);
            return (
              <>
                <PostBox
                  key={index}
                  rightername={data.rightername}
                  righterid={data.righterid}
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
                  todoarray={["Share", "Report"]}
                  todofun={todofun}
                />
              </>
            );
          })}
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
export default memo(HomeBody);
