/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

const StylePrimarySmall = ({
  className,
  divClassName,
  text = "Button",
}) => {
  return (
    <div className={`style-primary-small ${className}`}>
      <div className={`button ${divClassName}`}>{text}</div>
    </div>
  );
};

StylePrimarySmall.propTypes = {
  text: PropTypes.string,
};

export default StylePrimarySmall;