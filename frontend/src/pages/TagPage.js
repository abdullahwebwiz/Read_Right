import axios from "axios";
import { useEffect, useState,memo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import GeneralLoader from "../components/generalloader/generalloader";
import PostBody from "../components/postbody/postbody";
import TagBody from "../components/tagbody/tagbody";
import Popup from "../components/popup/Popup";
const TagPage = () => {
  let [msg, setmsg] = useState(false);
  let [msgprops, setmsgprops] = useState({
    msg: "",
    twobut: false,
    butval1: "",
    butval2: "",
    fun1: () => {
      return false;
    },
    fun2: () => {
      return false;
    },
  });

  let [postarray, setpostarray] = useState([]);
  let { tagname } = useParams();
  console.log(tagname);
  useEffect(() => {
    if (tagname != "notag") {
      axios
        .post("/getonly/tagposts", {
          tagname: tagname,
        })
        .then((res) => {
          if (res.data.msg != "failed") {
            setpostarray(res.data.msg);
          } else {
            setmsg(true);
            setmsgprops({
              msg: "Something went wrong.",
              buttwo: false,
              butval1: "Ok",
              fun1: () => {
                setmsg(false);
                window.history.back();
              },
            });
          }
        });
    } else {
      alert("No tag found.");
      window.history.back();
    }
  }, []);

  if (TagBody && postarray.length != 0) {
    return (
      <>
        <TagBody postarray={postarray} tagname={tagname} />
      </>
    );
  } else {
    return (
      <>
        <GeneralLoader />
        {msg ? (
          <Popup
            closepop={() => setmsg(false)}
            msg={msgprops.msg}
            buttwo={msgprops.buttwo}
            butval1={msgprops.butval1}
            butval2={msgprops.butval2}
            fun1={msgprops.fun1}
            fun2={msgprops.fun2}
          />
        ) : (
          ""
        )}
      </>
    );
  }
};
export default memo(TagPage);
