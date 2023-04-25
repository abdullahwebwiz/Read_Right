import { Navigate, useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import DashboardBody from "../components/dashboardbody/dashboardbody";
import GeneralLoader from "../components/generalloader/generalloader";
import axios from "axios";
import Popup from "../components/popup/Popup";
import { useEffect, useState,memo } from "react";
const DashboardPage = () => {
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
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  let [isrighter, setisrighter] = useState(false);
  let [loading, setloading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/getonly/checkisrighter", {
        userid: issigned,
      })
      .then((res) => {
        setisrighter(res.data.msg);
        setloading(false);
      });
  }, []);

  const todofun = (x, y, z) => {
    if (x == "Edit") {
      axios
        .post("/getonly/gpdfu", {
          postid: y,
        })
        .then((res) => {
          if (res.data.msg == "failed") {
            setmsg(true);
            setmsgprops({
              msg: "Something went wrong",
              buttwo: false,
              butval1: "Ok",
              fun1: () => {
                setmsg(false);
              },
            });
          } else {
            let postdata = res.data.msg;
            navigate("/postbuilder", {
              state: { postdata: postdata },
            });
          }
        });
    } else if (x == "Delete") {
      alert(y);
      setmsg(true);
      setmsgprops({
        msg: "Are you sure you want to delete.",
        buttwo: true,
        butval1: "Delete",
        butval2: "Cancel",
        fun2: () => {
          setmsg(false);
        },
        fun1: () => {
          axios
            .post("/posting/deletepost", {
              postid: y,
              imgtype: z,
            })
            .then((res) => {
              if (res.data.msg == "failed") {
                setmsg(false);
                alert("Something went wrong.");
              } else {
                alert("Post deleted successfully");
                navigate("/");
              }
            });
        },
      });
    } else if (x == "UnPublish") {
      axios
        .post("/posting/unpublishpost", {
          postid: y,
        })
        .then((res) => {
          if (res.data.msg == "failed") {
            setmsg(false);
            alert("Something went wrong.");
          } else {
            alert("Post UnPublished successfully");
          }
        });
    }
    else if (x == "Publish") {
      axios
        .post("/posting/publishpostnow", {
          postid: y,
        })
        .then((res) => {
          if (res.data.msg == "failed") {
            setmsg(false);
            alert("Something went wrong.");
          } else {
            alert("Post Published successfully");
          }
        });
    }
  };
  if (loading == false && Header && DashboardBody) {
    if (issigned) {
      if (isrighter) {
        return (
          <>
            <Header />
            <DashboardBody
              todoarray={["Edit", "UnPublish", "Delete"]}
              todofun={todofun}
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
        alert("You are not righter yet");
        return (
          <>
            <Navigate to={"/becomerighter"} />
          </>
        );
      }
    } else {
      alert("You are not signed.");
      return (
        <>
          <Navigate to={"/"} />
        </>
      );
    }
  } else {
    return (
      <>
        <GeneralLoader />
      </>
    );
  }
};
export default memo(DashboardPage);
