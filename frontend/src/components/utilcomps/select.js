import React, { useState, useEffect, useRef } from "react";
const Select = ({ data, whatselect, location, name, fun }) => {
  return (
    <>
      <select
        className={whatselect}
        style={location}
        onChange={(e) => {
          fun(e.target.value);
        }}
      >
        <option selected={true} disabled={true}>
          {"Select " + name}
        </option>
        <option value={`${false},${false}`}>None</option>

        {data ? (
          data.map((data, index) => {
            return (
              <>
                <option key={index} value={`${data.key1},${data.key2}`}>
                  {data.key1}
                </option>
              </>
            );
          })
        ) : (
          <>
            <option disabled={true}>Plz wait...</option>
          </>
        )}
      </select>
    </>
  );
};

export default Select;
