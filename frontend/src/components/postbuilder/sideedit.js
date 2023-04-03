import React, { useState, useEffect } from "react";
import "./editor";
import Input from "../utilcomps/input";
import Select from "../utilcomps/select";
import Button from "../utilcomps/button";
import GeneralLoader from "../generalloader/generalloader";
import { Form, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "../../hooks/useCookie";
const SideEdit = ({ popfun }) => {
  let navigate = useNavigate();
  let { state } = useLocation();
  let crossicon = "/assets/crossicon.png";
  let dumimg = "/assets/dumimg.png";

  let [loading, setloading] = useState(false);
  let [saveval, setsaveval] = useState("Save");
  let [tags, settags] = useState([]);
  let [postid, setpostid] = useState("");
  let [posttag, setposttag] = useState("");
  let [posttitle, setposttitle] = useState("");
  let [posttaglist, setposttaglist] = useState([]);
  let [postthumbnail, setpostthumbnail] = useState("");

  useEffect(() => {
    if (state) {
      setpostthumbnail(state.img);
    } else {
      setpostthumbnail("");
    }
  }, [state]);

  useEffect(() => {
    axios.get("/getonly/tagnames").then((res) => {
      let resp = res.data.msg;
      settags(resp);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("posttitle")) {
      setposttitle(localStorage.getItem("posttitle"));
    } else {
      setposttitle("");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("posttaglist")) {
      setposttaglist(localStorage.getItem("posttaglist").split(","));
    } else {
      setposttaglist([]);
    }
  }, []);

  const savepost = () => {
    setloading(true);
    if (
      postthumbnail &&
      posttitle &&
      posttaglist &&
      localStorage.getItem("postbody")
    ) {
      let fb = new FormData();
      fb.append("postthumbnail", postthumbnail);
      fb.append("posttitle", posttitle);
      fb.append("posttaglist", posttaglist);
      fb.append("postbody", localStorage.getItem("postbody"));
      fb.append("righterid", Cookie("get", "user"));
      axios
        .post("/posting/savepost", fb, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg == "success") {
            setloading(false);
            setpostid(res.data.postid);
          } else {
            setloading(false);
            popfun("sww");
          }
        })
        .catch((err) => {
          setloading(false);
          popfun("sww");
          console.log(err);
        });
    } else {
      setloading(true);
      popfun("incompleteinput");
    }
  };
  const publishpost = () => {
    setloading(true);
    if (postid) {
      axios
        .post("/posting/publishpost", {
          postid: postid,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            navigate("dashboard");
            localStorage.clear();
            setloading(false);
          } else {
            setloading(false);
            popfun("sww");
          }
        })
        .catch((err) => {
          setloading(false);
          popfun("sww");
          console.log(err);
        });
    } else {
      popfun("firstsave");
    }
  };

  const addtag = () => {
    if (posttag) {
      if (posttaglist.length <= 4) {
        if (
          posttaglist[0] != posttag &&
          posttaglist[1] != posttag &&
          posttaglist[2] != posttag &&
          posttaglist[3] != posttag &&
          posttaglist[4] != posttag &&
          posttaglist[5] != posttag
        ) {
          posttaglist.push(posttag);
          setposttaglist([...posttaglist]);
          localStorage.setItem("posttaglist", posttaglist);
        }
      }
    }
  };

  const deltag = (x) => {
    posttaglist.splice(x, 1);
    setposttaglist([...posttaglist]);
    localStorage.setItem("posttaglist", posttaglist);
  };

  return (
    <>
      <div className={"sideedit"}>
        <Button
          whatbut={"buttonsecond"}
          location={{ top: "11px", right: "170px" }}
          val={"Upload Thumbnail"}
          fun={() => {
            navigate("/imagecropper", {
              state: { aspect: 1.77777777778, sender: "postbuilder" },
            });
          }}
          type={"button"}
        />
        <Button
          whatbut={"buttonsecond"}
          location={{ top: "11px", right: "90px" }}
          val={saveval}
          fun={savepost}
          type={"button"}
        />
        <Button
          whatbut={"buttonfirst"}
          location={{ top: "11px", right: "10px" }}
          val={"Publish"}
          fun={publishpost}
          type={"button"}
        />

        <Input
          type={"text"}
          whatinput={"inputfirst"}
          location={{ top: "50px", width: "95%" }}
          naam={"title"}
          fun={(e) => {
            if (e.length <= 100) {
              setposttitle(e);
              localStorage.setItem("posttitle", e);
            }
          }}
          val={posttitle}
          placeholder={"Add title..."}
        />

        <Select
          name={"tags"}
          whatselect={"inputfirst"}
          data={tags.map((d) => ({ key1: d.tags, key2: d.tags }))}
          location={{ top: "100px", width: "80%", left: "10px" }}
          fun={(e) => {
            if (e.split(",")[0] != "false") {
              setposttag(e.split(",")[0]);
            }
          }}
        />

        <Button
          whatbut={"buttonsecond"}
          location={{
            top: "100px",
            right: "10px",
            height: "35px",
            width: "60px",
          }}
          val={"add"}
          fun={addtag}
          type={"button"}
        />
        {posttaglist.length == 0 ? (
          ""
        ) : (
          <div className={"posttagcontainer"}>
            {posttaglist.map((data, index) => {
              return (
                <>
                  <div className={"posttagitself"}>
                    {data}
                    <img src={crossicon} onClick={() => deltag(index)} />
                  </div>
                </>
              );
            })}
          </div>
        )}
        <div className={"postdemosec"}>
          <div className={"dumpost"}>
            <img
              src={postthumbnail ? URL.createObjectURL(postthumbnail) : dumimg}
            />
            <div>{posttitle}</div>
          </div>
        </div>
      </div>
      {loading ? <GeneralLoader /> : ""}
    </>
  );
};
export default React.memo(SideEdit);