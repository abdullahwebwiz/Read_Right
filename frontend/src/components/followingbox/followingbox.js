import "./followingbox.css";
import { useState } from "react";
import { useEffect, memo } from "react";
import axios from "axios";
import cookie from "../../hooks/useCookie";
import Button from "../utilcomps/button";
import { Link } from "react-router-dom";
let crossicon = "/assets/crossicon.png";
const FollowingBox = ({ fun1 }) => {
  let user = cookie("get", "user");
  let [followinglist, setfollowinglist] = useState([]);
  console.log(followinglist);
  useEffect(() => {
    axios
      .post("/followingsys/getfollowinglist", {
        user: user,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          fun1();
          alert("Something went wrong.");
        } else if (res.data.msg == "nofollowing") {
          setfollowinglist([]);
        } else {
          setfollowinglist(res.data.msg);
        }
      });
  }, [user]);

  const remfoll = (x, y, z) => {
    axios
      .post("/followingsys/remfoll", {
        userid: user,
        s_no: x,
        righter: z,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong");
        } else {
          followinglist.splice(y, 1);
          setfollowinglist([...followinglist]);
          console.log(y);
        }
      });
  };

  return (
    <>
      <div className={"followingboxmaincon"}>
        <div className={"followingbox"}>
          <img
            src={crossicon}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "30px",
              cursor: "pointer",
            }}
            onClick={fun1}
          />
          <div className={"followinglist"}>
            {followinglist.length != 0 ? (
              followinglist.map((d, i) => {
                return (
                  <>
                    <div className={"followingone"} key={i}>
                      <p>
                        <Link to={"/righter/@" + d.following}>
                          {"@" + d.following}
                        </Link>
                      </p>
                      <Button
                        whatbut={"buttonfirst"}
                        location={{ postion: "absolute", right: "10px" }}
                        val={"UnRead it"}
                        fun={() => remfoll(d.s_no, i, d.following)}
                        type={"button"}
                      />
                    </div>
                  </>
                );
              })
            ) : (
              <h1>No followings</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(FollowingBox);
