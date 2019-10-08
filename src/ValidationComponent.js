import React from "react";

const Validation = props => {
  const style = {
    color: "red"
  };
  let len = props.input;
  len = len.length;

  if (len < 12) {
    return <p style={style}>Password too short!</p>;
  } else return null;
};

export default Validation;
