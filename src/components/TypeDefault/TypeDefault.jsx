/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

const TypeDefault = ({
  className,
  divClassName,
  text = "Placeholder",
}) => {
  return (
    <div className={`type-default ${className}`}>
      <div className={`placeholder ${divClassName}`}>{text}</div>
    </div>
  );
};

TypeDefault.propTypes = {
  text: PropTypes.string,
};

export default TypeDefault;