import { Navigate } from "react-router-dom";
import { memo } from "react";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import DashboardBody from "../components/dashboardbody/dashboardbody";
import GeneralLoader from "../components/generalloader/generalloader";
import axios from "axios";
import ReportForm from "../components/reportform/reportform";
import Popup from "../components/popup/Popup";
import cookie from "../hooks/useCookie";
import { useState } from "react";

const RighterPage = () => {
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

  if (DashboardBody) {
    return (
      <>
        <Header />
        <DashboardBody
          todoarray={["Share", "Report"]}
          todofun={todofun}
          iamrighterpage={true}
        />
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
export default memo(RighterPage);
