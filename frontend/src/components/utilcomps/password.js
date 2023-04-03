import './utilcomps.css'
import React, { useState, useEffect, memo } from "react";
const Password = ({ whatpass, val, fun, name, location, placeholder }) => {
  let [passtype, setpasstype] = useState("password");
  return (
    <>

        <input
          name={name}
          type={passtype}
          style={location}
          className={whatpass}
          value={val}
          onChange={(e) => fun(e.target.value, e.target.name)}
          placeholder={placeholder}
          onDoubleClick={(e) => {
            e.preventDefault();
            if (passtype == "password") {
              setpasstype("text");
            } else {
              setpasstype("password");
            }
          }}
        />
    </>
  );
};

export default  memo(Password);
