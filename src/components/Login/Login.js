import React, { useState, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { useContext } from "react/cjs/react.development";
import AuthContext from "../store/auth-context";
import Input from "../Input/Input";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchState] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassState] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP DUTY!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    dispatchState({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //         event.target.value.includes("@") && passwordState.isValid
    //       );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassState({ type: "PASSWORD_INPUT", val: event.target.value });
    // setFormIsValid(
    //         emailState.isValid && event.target.value.trim().length > 6
    //       );
  };

  const validateEmailHandler = () => {
    dispatchState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassState({ type: "PASSWORD_BLUR" });
  };
  const ctx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref = {emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
        />
        <Input
        ref = {passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.value}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
