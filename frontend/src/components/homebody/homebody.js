import "./homebody.css";
import PostBox from "../postbox/postbox";
import GeneralLoader from "../generalloader/generalloader";
import timeAgo from "epoch-to-timeago/";
import { useState } from "react";
import axios from "axios";
const HomeBody = () => {
  let [postarray, setpostarray] = useState("");
  let [loading, setloading] = useState(true);
  var originalTime = new Date().getTime();

  axios.post("/sendpostarray/homeposts").then((res) => {
    if (res.data.msg == "failed") {
      alert("something went wrong.");
    } else {
      setpostarray(res.data.msg);
      setloading(false);
    }
  });

  if (!loading) {
    return (
      <>
        <div className={"homebodypostcontainer"}>
          {postarray.map((data, index) => {
            let ago = timeAgo.timeAgo(data.epoch, originalTime);
            axios.post('/getonly/getrighterinfo',{
            righterid: data.righterid
            })
            .then((res)=>{
            let rightername = res.data.msg.rightername;
            let rimgtype = res.data.msg.filetype;
            let rimgid = data.rightername;
            })

            return (
              <>
                <PostBox
                  key={index}
                  whatimg={"postthumbnails"}
                  imgtype={data.filetype}
                  imgid={data.postid}
                  title={data.posttitle}
                  reads={data.reads}
                  ago={ago}
                //   righterimg={righterdata.img}
                //   rightername={"@" + righterdata.rightername}
                />
              </>
            );
          })}
        </div>
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
export default HomeBody;
