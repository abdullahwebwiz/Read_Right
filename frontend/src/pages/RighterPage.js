import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import DashboardBody from "../components/dashboardbody/dashboardbody";
import GeneralLoader from "../components/generalloader/generalloader";
import axios from "axios";
import { useState } from "react";
const righterPage = () => {
  if (DashboardBody) {
    return (
      <>
        <Header />
        <DashboardBody />
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
export default righterPage;
