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
          {/* <Route index element={<Home />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/header" element={<Header />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
