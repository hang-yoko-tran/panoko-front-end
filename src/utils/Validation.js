import validator from "validator";
import React from "react";

export const required = value => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="text-danger"> Please fill out this field.</span>;
  }
};

export const emailValidate = value => {
  if (!validator.isEmail(value)) {
    return (
      <span className="text-danger">{`${value} is not a valid email.`}</span>
    );
  }
};

export const minLength = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length < props.minLength) {
    // Return jsx
    return <span className="text-danger">Please lengthen this text to {props.minLength} or more.</span>
  }
};
