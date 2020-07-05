import React from "react";
import "./Input.sass";
const Input = (props) => {
  return (
    <div className="Input">
      {props.label ? <p className="Input__label">{props.label}</p> : null}
      <input
        {...props}
        className={`${props.className ? props.className : ""} Input__field`}
      />
    </div>
  );
};

export default Input;
