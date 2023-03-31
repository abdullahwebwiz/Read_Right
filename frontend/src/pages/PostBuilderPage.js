import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from '../components/header/Header';
const PostBuilderPage = () =>{
    let cookie = useCookie;
    let issigned = cookie("get", "user");
    if (issigned) {
      return (
        <>
          <Header />
          <h1>Post Builder Page</h1>
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
    }
    export default PostBuilderPage;