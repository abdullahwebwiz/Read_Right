import "./postboxextra.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
let dumbimg = "/assets/dumimg.png";
const PostBoxExtra = ({ whatimg, imgid, imgtype, title }) => {
  let [img, setimg] = useState("");
  useEffect(() => {
    if ((whatimg, imgid, imgtype)) {
      axios
        .post("/sendimg", {
          whatimg: whatimg,
          imgid: imgid,
          imgtype: imgtype,
        })
        .then((res) => {
          setimg(res.data.img);
        });
    }
  }, [whatimg, imgid, imgtype]);

  return (
    <>
      <div className={"mainpostboxextra"}>
        <img
          src={img ? "data:" + imgtype + ";base64," + img : dumbimg}
          className={"postboxextrathumbnail"}
          alt={"Thumbnail"}
        />
        <div className={"postboxextratitle"}>{title}</div>
        <div className={"learnmore"}>Learn more...</div>
      </div>
    </>
  );
};
export default PostBoxExtra;
