import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "../store/auth-slice";
import classes from "./Login.module.css";
import { ReactComponent as EyeIcon } from "../assets/eye.svg";
import { ReactComponent as EyeOffIcon } from "../assets/eye-off.svg";

const apikey = process.env["REACT_APP_AUTH_APIKEY"];

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clickHandler = () => {
    setVisible((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        const remainingTime = calculateRemainingTime(
          expirationTime.toISOString()
        );
        dispatch(
          authActions.login({
            token: data.idToken,
            localId: data.localId,
            userEmail: data.email,
            logoutTimerId: setTimeout(() => {
              dispatch(authActions.logout());
            }, remainingTime),
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label className={classes.label} htmlFor='email'>
            Email Address
          </label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label className={classes.label} htmlFor='password'>
            Password
          </label>
          <input
            type={!visible ? "password" : "text"}
            id='password'
            required
            ref={passwordInputRef}
          />
          {!visible && (
            <EyeOffIcon
              className={classes.eyeIcon}
              onClick={() => clickHandler()}
            />
          )}
          {visible && (
            <EyeIcon
              className={classes.eyeIcon}
              onClick={() => clickHandler()}
            />
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
