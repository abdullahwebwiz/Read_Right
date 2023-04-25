import ScaleLoader from "react-spinners/ScaleLoader";
import "./generalloader.css";
import { memo } from "react";
const GeneralLoader = () => {
  return (
    <>
      <div className={"loadercontainer"}>
        <ScaleLoader color={"#0bda51"} size={30} />
      </div>
    </>
  );
};

export default memo(GeneralLoader);
