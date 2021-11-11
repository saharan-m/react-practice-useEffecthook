import classes from "./Input.module.css";
import React from "react";
import {  useRef,useImperativeHandle } from "react";
const Input = React.forwardRef((props,ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref,()=>{
   return {activate:activate}
  })
  const activate = () =>{
    inputRef.current.focus();
  }
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
