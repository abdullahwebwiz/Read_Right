import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GeneralLoader from "../components/generalloader/generalloader";
import PostBody from "../components/postbody/postbody";
const PostPage = () => {
  let { postid } = useParams();
  let [postdata, setpostdata] = useState("");

  useEffect(() => {
    axios
      .post("/getonly/postdata", {
        postid: postid,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong.");
          window.history.back();
        } else if (res.data.msg == "notfound") {
          alert("Something went wrong.");
          window.history.back();
        } else {
          setpostdata(res.data.msg);
        }
      });
  }, [postid]);

  if (postid && postdata) {
    return (
      <>
        <PostBody postdata={postdata} />
      </>
    );
  } else {
    return (
      <>
        <GeneralLoader />
      </>
    );
  }
};
export default PostPage;
