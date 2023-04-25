import Header from "../components/header/Header";
import HomeBody from "../components/homebody/homebody";
import GeneralLoader from "../components/generalloader/generalloader";
import { useEffect, useState,memo } from "react";
const HomePage = () => {



  if (HomeBody && Header) {
    return (
      <>
        <Header />
        <HomeBody />
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
export default memo(HomePage);
