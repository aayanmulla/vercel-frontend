/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

const StyleSecondary = ({
  className,
  divClassName,
  text = "Button",
}) => {
  return (
    <div className={`style-secondary ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>{text}</div>
    </div>
  );
};

StyleSecondary.propTypes = {
  text: PropTypes.string,
};

export default StyleSecondary;