import "./App.css";
import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Header from "./components/header/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/postbuilder" element={<PostBuilder />} />
          <Route path="/post/:postid" element={<PostPage />} />
          <Route path="/tag/:tagname" element={<TagPage />} />
          <Route path="/righter/:rname" element={<RighterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
