import React, { useState, useEffect } from "react";
const Button = ({ whatbut, fun, type, val, location }) => {
  return (
    <>
      <button style={location} className={whatbut} onClick={fun} type={type}>
        {val}
      </button>
    </>
  );
};

export default Button;
