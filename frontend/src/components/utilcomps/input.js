import React, { useState, useEffect } from "react";
const Input = ({ type, beauty, naam, placeholder, val, fun }) => {
  return (
    <>
      <input
        type={type}
        style={beauty}
        name={naam}
        value={val}
        onChange={(e) => fun(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};


export default Input;