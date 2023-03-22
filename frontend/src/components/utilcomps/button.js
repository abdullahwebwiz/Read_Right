import React, { useState, useEffect } from "react";
const Button = ({fun,type,val, beauty}) => {
  return (
    <>
    <button style={beauty} onClick={fun} type={type}>{val}</button>
    </>
  );
};


export default Button;