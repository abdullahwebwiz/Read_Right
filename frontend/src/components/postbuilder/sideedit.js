import React, { useState, useEffect } from "react";
import "./editor";
import Input from "../utilcomps/input";
import Select from "../utilcomps/select";
import Button from "../utilcomps/button";
import GeneralLoader from "../generalloader/generalloader";
import { Form, useLocation, useNavigate } from "react-router-dom";
import ImgCropper from "../imgcropper/ImgCropper";
import axios from "axios";
import Cookie from "../../hooks/useCookie";
const SideEdit = ({
  popfun,
  upperposttitle,
  upperposttags,
  upperpostid,
  posttags,
}) => {
  console.log(upperpostid);
  let navigate = useNavigate();
  let { state } = useLocation();
  let crossicon = "/assets/crossicon.png";
  let dumimg = "/assets/dumimg.png";

  let [loading, setloading] = useState(false);
  let [saveval, setsaveval] = useState("Save");
  let [tags, settags] = useState([]);
  let [postid, setpostid] = useState(
    localStorage.getItem("postid") ? localStorage.getItem("postid") : "none"
  );
  let [posttag, setposttag] = useState("");
  let [posttitle, setposttitle] = useState("");
  let [posttaglist, setposttaglist] = useState([]);
  let [postthumbnail, setpostthumbnail] = useState("");
  let [imgcropper, setimgcropper] = useState(false);
  const addimg = (x) => {
    setpostthumbnail(x);
    setimgcropper(false);
    console.log(x);
  };

  useEffect(() => {
    axios.get("/getonly/tagnames").then((res) => {
      let resp = res.data.msg;
      settags(resp);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("posttitle")) {
      setposttitle(localStorage.getItem("posttitle"));
    } else if (upperposttitle) {
      setposttitle(upperposttitle);
    } else {
      setposttitle("");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("posttaglist")) {
      setposttaglist(localStorage.getItem("posttaglist").split(","));
    } else if (upperposttags) {
      setposttaglist(upperposttags.split(","));
    } else {
      setposttaglist([]);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("postid")) {
      setpostid(localStorage.getItem("postid"));
    } else if (upperpostid) {
      setpostid(upperpostid);
    } else {
      setpostid("none");
    }
  }, []);

  const savepost = () => {
    console.log("lao");
    setloading(true);
    if (
      postthumbnail &&
      posttitle &&
      posttaglist &&
      localStorage.getItem("postbody") &&
      posttaglist.length != 0
    ) {
      let fb = new FormData();
      fb.append("postthumbnail", postthumbnail);
      fb.append("posttitle", posttitle);
      fb.append("posttaglist", posttaglist);
      fb.append("postbody", localStorage.getItem("postbody"));
      fb.append("righterid", Cookie("get", "user"));
      fb.append("postid", postid);
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
            localStorage.setItem("postid", res.data.postid);
          } else if (res.data.msg == "success2") {
            popfun("updated");
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
      setloading(false);
      popfun("incompleteinput");
    }
  };

  const publishpost = () => {
    setloading(true);
    if (postid != "none") {
      axios
        .post("/posting/publishpost", {
          postid: postid,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            navigate("/dashboard");
            localStorage.removeItem("posttitle");
            localStorage.removeItem("posttaglist");
            localStorage.removeItem("postbody");
            localStorage.removeItem("postid");
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
      setloading(false);
    }
  };

  const updatehandle = () => {
    if(postthumbnail && postid && posttaglist && localStorage.getItem('postbody')){
      let fb = new FormData();
      fb.append("postthumbnail", postthumbnail);
      fb.append("posttitle", posttitle);
      fb.append("posttaglist", posttaglist);
      fb.append("postbody", localStorage.getItem("postbody"));
      fb.append("postid", postid);
      axios
        .post("/posting/updatepost", fb, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.msg == "failed") {
            alert("Something went wrong.");
          } else {
            localStorage.removeItem('postid');
            localStorage.removeItem('postbody');
            localStorage.removeItem('posttaglist');
            localStorage.removeItem('posttitle');
            alert("Post Updated");
            navigate("/dashboard");
          }
        });
    }
else{
  alert('Fill all fields')
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
        {upperposttags && upperposttitle ? (
          <>
            <Button
              whatbut={"buttonsecond"}
              location={{ top: "11px", right: "10px" }}
              val={"Update"}
              fun={updatehandle}
              type={"button"}
            />
            <Button
              whatbut={"buttonsecond"}
              location={{ top: "11px", right: "170px" }}
              val={"Upload Thumbnail"}
              fun={() => setimgcropper(true)}
              type={"button"}
            />
          </>
        ) : (
          <>
            <Button
              whatbut={"buttonsecond"}
              location={{ top: "11px", right: "170px" }}
              val={"Upload Thumbnail"}
              fun={() => setimgcropper(true)}
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
          </>
        )}

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

        <div className={"dumpost"}>
          <img
            src={postthumbnail ? URL.createObjectURL(postthumbnail) : dumimg}
          />
          <div>{posttitle}</div>
        </div>
      </div>
      {loading ? <GeneralLoader /> : ""}
      {imgcropper ? (
        <ImgCropper imgaspect={1.77777777778} donefun={addimg} />
      ) : (
        ""
      )}
    </>
  );
};
export default React.memo(SideEdit);
