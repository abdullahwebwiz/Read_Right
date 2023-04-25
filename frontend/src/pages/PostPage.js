import axios from "axios";
import { useEffect, useState,memo } from "react";
import { useParams } from "react-router-dom";
import GeneralLoader from "../components/generalloader/generalloader";
import PostBody from "../components/postbody/postbody";
const PostPage = () => {
  let { postid } = useParams();
  let [postdata, setpostdata] = useState("");
  let [tenpostone, settenpostone] = useState([]);
  let [tenposttwo, settenposttwo] = useState([]);
  let [postcomments, setpostcomments] = useState([]);
  let [sp, setsp] = useState(0);
  let [ep, setep] = useState(5);

  const inccomments = () => {
    setsp(sp + 5);
    setep(ep + 5);
    axios
      .post("/getonly/postcomments", {
        postid: postid,
        sp: sp + 5,
        ep: ep + 5,
      })
      .then((res) => {
        if (res.data.msg != "failed") {
          setpostcomments(postcomments.concat(res.data.msg));
        }
      });
  };

  const addcomment = (x, y, z) => {
    axios
      .post("/commentsys/addcomment", {
        userid: x,
        comment: y,
        postid: z,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong");
        } else {
          setpostcomments([
            {
              userid: x,
              username: res.data.name,
              comment: y,
            },
            ...postcomments,
          ]);
        }
      });
  };

  const deletecomment = (x, y, z) => {


    axios
      .post("/commentsys/deletecomment", {
        s_no: x,
        postid: z,
      })
      
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong");
        } else {
          postcomments.splice(y, 1);
          setpostcomments([...postcomments]);
        }
      });
  };

  useEffect(() => {
    axios
      .post("/getonly/postcomments", {
        postid: postid,
        sp: sp,
        ep: ep,
      })
      .then((res) => {
        if (res.data.msg != "failed") {
          setpostcomments(postcomments.concat(res.data.msg));
        }
      });
  }, []);

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
          console.log(res.data.msg);
          axios
            .post("/getonly/gettenrighterposts", {
              righterid: res.data.msg.righterid,
            })
            .then((res) => {
              if (res.data.msg != "failed") {
                settenpostone(res.data.msg);
              }
            });

          axios.post("/getonly/gettenranposts").then((res) => {
            if (res.data.msg != "failed") {
              settenposttwo(res.data.msg);
            }
          });
        }
      });
  }, [postid]);

  if (postid && postdata) {
    return (
      <>
        <PostBody
          postdata={postdata}
          tenpostone={tenpostone}
          tenposttwo={tenposttwo}
          postcomments={postcomments}
          inccomments={inccomments}
          postid={postid}
          addcomment={addcomment}
          deletecomment={deletecomment}
        />
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
export default memo(PostPage);
