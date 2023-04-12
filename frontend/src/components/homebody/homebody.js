import "./homebody.css";
import PostBox from "../postbox/postbox";
import GeneralLoader from "../generalloader/generalloader";
import timeAgo from "epoch-to-timeago/";
import Popup from "../popup/Popup";
import { useEffect, useState } from "react";
import axios from "axios";
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
export default HomeBody;
