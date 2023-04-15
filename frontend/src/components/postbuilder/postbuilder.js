import React, { useState, useRef } from "react";
import Editor from "./editor";
import SideEdit from "./sideedit";
import "./postbuilder.css";
import Popup from "../popup/Popup";
import GeneralLoader from "../generalloader/generalloader";
const PostBuilder = ({ postdata }) => {
  let [what, setwhat] = useState(false);
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

  const popfun = (x) => {
    if (x == "incompleteinput") {
      setmsg(true);
      setmsg(true);
      setmsgprops({
        msg: "Provide complete data.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "sww") {
      setmsg(true);
      setmsg(true);
      setmsgprops({
        msg: "Something went wrong.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "firstsave") {
      setmsg(true);
      setmsg(true);
      setmsgprops({
        msg: "First save your work.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    } else if (x == "updated") {
      setmsg(true);
      setmsg(true);
      setmsgprops({
        msg: "Work Updated.",
        buttwo: false,
        butval1: "Ok",
        fun1: () => {
          setmsg(false);
        },
      });
    }
  };

  if (Editor && SideEdit) {
    return (
      <>
        <Editor postbody={postdata ? postdata.postbody : ""} />
        <SideEdit
          popfun={popfun}
          upperposttitle={postdata ? postdata.posttitle : ""}
          upperposttags={postdata ? postdata.tags : ""}
          upperpostid={postdata ? postdata.postid : ""}
        />
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
export default PostBuilder;
