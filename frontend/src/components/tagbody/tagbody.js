import "./tagbody.css";
import timeAgo from "epoch-to-timeago/";
import PostBox from "../postbox/postbox";
import { memo } from "react";
const TagBody = ({ postarray, tagname }) => {
  console.log(postarray);
  let originalTime = Date.now();
  return (
    <>
      <div className={"tagname"}>{"#" + tagname + " | " + postarray.length + " post(s)"}</div>
      <div className={"homebodypostcontainer"}>
        {postarray.map((data, index) => {
          let ago = timeAgo.timeAgo(data.epoch, originalTime);
          return (
            <>
              <PostBox
                key={index}
                rightername={data.rightername}
                righterid={data.righterid}
                whatimg={"postthumbnails"}
                imgtype={data.pfiletype}
                imgid={data.postid}
                whatrimg={"righterimgs"}
                rimgtype={data.rfiletype}
                rimgid={data.rightername}
                title={data.posttitle}
                postid={data.postid}
                reads={data.reads}
                ago={ago}
              />
            </>
          );
        })}
      </div>
    </>
  );
};
export default memo(TagBody);
