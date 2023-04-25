import axios from "axios";
import { useEffect, useState,memo } from "react";

const Image = ({ whatimg, imgid, imgtype, className, alt }) => {
  let [img, setimg] = useState("");
  useEffect(() => {
    axios
      .post("/sendimg/" + whatimg + "/" + imgid + "/" + imgtype)
      .then((res) => {
        let img = res.data.img;
        setimg(img);
      });
  }, []);
  return (
    <>
      <img
        src={"data:" + imgtype + ";base64" + img}
        className={className}
        alt={alt}
      />
    </>
  );
};
export default memo(Image);
