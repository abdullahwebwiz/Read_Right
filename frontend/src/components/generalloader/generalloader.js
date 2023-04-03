import ScaleLoader from "react-spinners/ScaleLoader";
import "./generalloader.css";
const GeneralLoader = () => {
  return (
    <>
      <div className={"loadercontainer"}>
        <ScaleLoader color={"#0bda51"} size={30} />
      </div>
    </>
  );
};

export default GeneralLoader;
