import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import DashboardBody from "../components/dashboardbody/dashboardbody";
import GeneralLoader from "../components/generalloader/generalloader";
import axios from "axios";
import { useEffect, useState } from "react";
const DashboardPage = () => {
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  let [isrighter, setisrighter] = useState(false);
  let [loading, setloading] = useState(true);

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

  
  if (loading == false && Header && DashboardBody) {
    if (issigned) {
      if (isrighter) {
        return (
          <>
            <Header />
            <DashboardBody />
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
export default DashboardPage;
