import axios from "axios";
import { useEffect, useState,memo } from "react";
import "./savedpostlist.css";
import Button from "../utilcomps/button";
let dumimg = "/assets/dumimg.png";
let crossicon = "/assets/crossicon.png";
const SavedPostList = ({ fun }) => {
  let [postlist, setpostlist] = useState([]);
  console.log(postlist);

  useEffect(() => {
    if (localStorage.getItem("spc")) {
      let spc = localStorage.getItem("spc");
      let spca = spc.split(",");
      spca.map((d) => {
        axios
          .post("/getonly/savedpostlist", {
            postid: d,
          })
          .then((res) => {
            if (res.data.msg == "failed") {
              alert("Something went wrong.");
            } else {
              postlist.push(res.data.msg);
              setpostlist([]);
              setpostlist([...postlist]);
            }
          });
      });
    }
  }, [123]);

  const rsp = (x, y) => {
    let spc = localStorage.getItem("spc").split(",");
    let ii = spc.indexOf(x);
    spc.splice(ii, 1);
    localStorage.setItem("spc", spc);
    postlist.splice(y, 1);
    setpostlist([...postlist]);
  };

  return (
    <>
      <div className={"splmc"}>
      
        <div className={"splc"}>
        <img
          src={crossicon}
          style={{
            position: "absolute",
            top: "0px",
            width: "35px",
            cursor: "pointer",
            right:'0',
          }}
          onClick={() => {
            fun();
          }}
        />
          <div className={"spl"}>
            {postlist.length != 0 ? (
              postlist.map((d, i) => {
                return (
                  <>
                    <div className={"sp"} key={i}>
                      <img src={dumimg} />
                      <div onClick={() => rsp(d.postid, i)}>X</div>
                      <p>{d.posttitle}</p>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>No Posts to show</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(SavedPostList);
