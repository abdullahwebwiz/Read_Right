import React, { useState, useEffect, useRef } from "react";
const Input = ({ type, whatinput, naam, placeholder, val, fun, location }) => {
  return (
    <>
      <input
        type={type}
        style={location}
        className={whatinput}
        name={naam}
        value={val}
        onChange={(e) => {
          fun(e.target.value, e.target.name);
        }}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
