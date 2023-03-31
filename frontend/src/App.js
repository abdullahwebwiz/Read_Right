import "./App.css";
import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import PostBuilderPage from "./pages/PostBuilderPage";
import PostPage from "./pages/PostPage";
import TagPage from "./pages/TagPage";
import RighterPage from "./pages/RighterPage";
import ImgCropper from "./components/imgcropper/ImgCropper";
import ExplorePage from "./pages/explorepage";
import HistoryPage from "./pages/historypage";
import FollowingPage from "./pages/followingpage";
import LikedPostsPage from "./pages/likedpostspage";
import BecomeRighterPage from "./pages/becomerighterpage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/postbuilder" element={<PostBuilderPage />} />
          <Route path="/post/:postid" element={<PostPage />} />
          <Route path="/tag/:tagname" element={<TagPage />} />
          <Route path="/righter/:rname" element={<RighterPage />} />
          <Route path="/rec" element={<ImgCropper />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/likedposts" element={<LikedPostsPage />} />
          <Route path="/becomerighter" element={<BecomeRighterPage />} />
          <Route path="/imagecropper" element={<ImgCropper />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
