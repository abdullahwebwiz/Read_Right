import "./reportform.css";
import Button from "../utilcomps/button";
import axios from "axios";
import { useState,memo } from "react";
import Cookie from "../../hooks/useCookie";
const ReportForm = ({ title, msg, subject,fun }) => {
  let [val, setval] = useState("");
  const sumbitreport = () => {
    axios
      .post("/getonly/submitreport", {
        user: Cookie("get", "user"),
        subject: subject,
        message: val,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong");
          fun();
        } else {
          alert("Message successfully recivied.");
          fun();
        }
      });
  };
  return (
    <>
      <div className={"reportformcontainer"}>
        <div className={"reportform"}>
          <h1>{title}</h1>
          <div>{msg}</div>
          <textarea
            onChange={(e) => setval(e.target.value)}
            value={val}
            placeholder={"Write your Message..."}
          ></textarea>
          <span>
            <Button
              whatbut={"buttonfirst"}
              location={{ position: "relative" }}
              val={"Done"}
              fun={sumbitreport}
              type={"button"}
            />
            <Button
              whatbut={"buttonsecond"}
              location={{ position: "relative", marginLeft: "5px" }}
              val={"Cancel"}
              fun={fun}
              type={"button"}
            />
          </span>
        </div>
      </div>
    </>
  );
};
export default memo(ReportForm);
