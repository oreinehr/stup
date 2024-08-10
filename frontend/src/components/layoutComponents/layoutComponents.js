// src/components/LayoutComponents/index.js
import React from "react";
import "./style.css";

export const LayoutComponents = (props) => {
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">{props.children}</div>
      </div>
    </div>
  );
};
