import "./postbox.css";
import Linker from "../utilcomps/linker";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
let dumbimg = "/assets/dumimg.png";
let profileiconimg = "/assets/profileiconimg.png";
let threedots = "/assets/threedots.png";
const PostBox = ({
  whatimg,
  imgid,
  imgtype,
  postid,
  righterid,
  whatrimg,
  rimgid,
  rimgtype,
  title,
  reads,
  ago,
  rightername,
  righterimg,
  todoarray,
  todoarray2,
  published,
  todofun,
  iamrighterpage,
}) => {
  console.log(todoarray2);
  let [showdropdown, setshowdropdown] = useState(false);
  let [img, setimg] = useState("");
  let [rimg, setrimg] = useState("");
  console.log(rightername);
  useEffect(() => {
    axios
      .post("/sendimg", {
        whatimg: whatimg,
        imgid: imgid,
        imgtype: imgtype,
      })
      .then((res) => {
        setimg(res.data.img);
      });
  }, [whatimg, imgid, imgtype]);

  useEffect(() => {
    axios
      .post("/sendimg", {
        whatimg: whatrimg,
        imgid: rimgid,
        imgtype: rimgtype,
      })
      .then((res) => {
        setrimg(res.data.img);
      });
  }, [whatrimg, rimgid, rimgtype]);

  return (
    <>
      <div className={"mainpostbox"}>
        <Link to={"/post/" + postid}>
          <img
            src={img ? "data:" + imgtype + ";base64," + img : dumbimg}
            className={"postboxthumbnail"}
            alt={"Thumbnail"}
          />
        </Link>
        <Link to={"/righter/@" + rightername}>
          <img
            src={rimg ? "data:" + rimgtype + ";base64," + rimg : profileiconimg}
            className={"postboxrighterimg"}
          />
        </Link>

        <img
          src={threedots}
          className={"postboxthreedots"}
          onClick={() => {
            if (showdropdown) {
              setshowdropdown(false);
            } else {
              setshowdropdown(true);
            }
          }}
        />
        <Link to={"/post/" + postid} className={"postboxtitle"}>
          {title}
        </Link>
        <div className={"postboxinfo"}>
          <Link to={"/righter/@" + rightername}>
            <p>{rightername}</p>
          </Link>
          <p>{reads + " reads"}</p>
        </div>
        <p className={"postboxago"}>{ago}</p>
        {showdropdown ? (
          <div className={"postboxdropdown"}>
            {iamrighterpage
              ? todoarray.map((d, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        onClick={() => {
                          todofun(d, postid, imgtype);
                        }}
                      >
                        {d}
                      </div>
                    </>
                  );
                })
              : published == "yes"
              ? todoarray.map((d, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        onClick={() => {
                          todofun(d, postid, imgtype);
                        }}
                      >
                        {d}
                      </div>
                    </>
                  );
                })
              : todoarray2.map((d, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        onClick={() => {
                          todofun(d, postid, imgtype);
                        }}
                      >
                        {d}
                      </div>
                    </>
                  );
                })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default PostBox;
