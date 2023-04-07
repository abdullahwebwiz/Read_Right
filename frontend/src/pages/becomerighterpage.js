import { Navigate, useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import axios from "axios";
import BecomeRighter from "../components/becomerighter/becomerighter";
import { useEffect, useState } from "react";
const BecomeRighterPage = () => {
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  let navigate = useNavigate();
  let [righterdata, setrighterdata] = useState({});
  let [isrighter, setisrighter] = useState(false);
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
          setrighterdata({});
          setisrighter(false);
        } else {
          setrighterdata(res.data);
          setisrighter(true);
        }
      });
  }, []);

  if (issigned) {
    return (
      <>
        <BecomeRighter righterdata={righterdata} isrighter={isrighter} />
      </>
    );
  } else {
    alert("You are not signed.");
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  }
};
export default BecomeRighterPage;
