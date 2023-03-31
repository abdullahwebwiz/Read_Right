import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import BecomeRighter from "../components/becomerighter/becomerighter";
const BecomeRighterPage = () => {
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  if (issigned) {
    return (
      <>
        <BecomeRighter />
      </>
    );
  } else {
    alert("You are not signed.");
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  }
};
export default BecomeRighterPage;
