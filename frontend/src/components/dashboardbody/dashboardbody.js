import { useRef } from "react";
import "./dashboardbody.css";
let profileiconimg = "/assets/profileiconimg.png";
let uploadicon = "/assets/uploadicon.png";
const DashboardBody = () => {
  let elemfile = useRef("");
  return (
    <>
      <input
        ref={elemfile}
        type={"file"}
        accept="image/png,image/jpg,image/jpeg"
        style={{ display: "none" }}
      />
      <div className={"dashboardmaincontainer"}>
        <div className={"profilesec"}>
          <div className={"profilesecimg"}>
            <img
              src={profileiconimg}
              className={"profilesecimg-1"}
              alt={"Profile image"}
            />
            <img
              src={uploadicon}
              className={"profilesecimg-2"}
              alt={"Upload icon"}
              onClick={() => elemfile.current.click()}
            />
          </div>

          <div className={"profilesecsum"}>
            <p>@abdullah</p>
            <p>12k Followers</p>
            <p>98 Posts</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardBody;
