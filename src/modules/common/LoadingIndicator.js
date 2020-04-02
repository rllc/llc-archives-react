import React from "react";
import "./LoadingIndicator.css";

function LoadingIndicator({ visible }) {
  return visible ? (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  ) : null;
}

export default LoadingIndicator;
