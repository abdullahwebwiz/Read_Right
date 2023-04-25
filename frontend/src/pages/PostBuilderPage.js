import { Navigate, useLocation } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import PostBuilder from "../components/postbuilder/postbuilder";
import GeneralLoader from "../components/generalloader/generalloader";
import { useEffect, useState,memo } from "react";
const PostBuilderPage = () => {
  let cookie = useCookie;
  let navigate = useNavigate();
  let issigned = cookie("get", "user");
  let [isrighter, setisrighter] = useState("none");
  let [loading, setloading] = useState("");
  let { state } = useLocation();
  let postdata = state ? state.postdata : "";

  console.log(postdata);
  useEffect(() => {
    axios
      .post("/updaterighter/checkrighter", {
        righterid: issigned,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong.");
          navigate("/");
        } else if (res.data.msg == "notrighter") {
          setisrighter(false);
        } else {
          setisrighter(true);
        }
      });
  }, [issigned]);

  useEffect(() => {
    if (isrighter != "none") {
      setloading(false);
    }
  }, [isrighter]);

  if (!loading) {
    if (issigned) {
      if (isrighter) {
        return (
          <>
            <PostBuilder postdata={postdata} />
          </>
        );
      } else {
        alert("You are not Righter.");
        return (
          <>
            <Navigate to={"/"} />
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
export default memo(PostBuilderPage);
