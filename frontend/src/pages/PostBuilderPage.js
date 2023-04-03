import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import Header from "../components/header/Header";
import PostBuilder from "../components/postbuilder/postbuilder";
const PostBuilderPage = () => {
  let cookie = useCookie;
  let issigned = cookie("get", "user");
  if (issigned) {
    return (
      <>
        <PostBuilder />
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
export default PostBuilderPage;
