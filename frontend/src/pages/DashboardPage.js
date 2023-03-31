import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import DashboardBody from "../components/dashboardbody/dashboardbody";
const DashboardPage = () => {
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  if (issigned) {
    return (
      <>
        <Header />
        <DashboardBody />
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
export default DashboardPage;
