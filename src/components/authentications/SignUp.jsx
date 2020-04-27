import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import CustomizedSnackbars from "../shared/Snackbar.jsx";

export default function SignUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectPath = useSelector((state) => state.session.redirectPath);
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };
  const [user, setUser] = useState(initialState);
  const initialSnack = { isOpen: false, msg: "", severity: "" };
  const [snack, setSnack] = useState(initialSnack);

  const handleForm = (evt) => {
    evt.preventDefault();
    handleSignup(user);
  };

  const handleSignup = async (user) => {
    // the next line is for check if signup form is empty and component did mount
    console.log(user);
    if (!user.email) {
      return;
    }
    if (user.password !== user.confirmPassword) {
      setSnack({
        isOpen: true,
        msg: t("Signup.pass-not-match"),
        severity: "error",
      });
      return;
    }
    const data = new FormData();
    console.log(user);
    data.append("user", JSON.stringify(user));
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body);
    if (body.success) {
      await dispatch({
        type: "LOGIN",
        username: body.email,
        name: body.name,
        userId: body.id,
      });
      if (redirectPath) {
        history.push(redirectPath);
        dispatch({ type: "REDIRECT-PATH", path: "" });
        return;
      }

      history.push("/");
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
    setUser(initialState);
    return;
  };
  const responseFacebook = async (response) => {
    console.log(response);
    if (!response.email) {
      return;
    }
    const newUser = {
      name: response.name,
      email: response.email,
      password: response.id,
      confirmPassword: response.id,
      image: response.picture.data.url,
    };
    setUser(newUser);
    handleSignup(newUser);
  };
  const responseGoogle = async (response) => {
    console.log(response);
    const newUser = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      password: response.googleId,
      confirmPassword: response.googleId,
      image: response.profileObj.imageUrl,
    };
    setUser(newUser);
    handleSignup(newUser);
  };

  return (
    <div className="SignUp">
      <div className="pageTitle">{t("Signup.pageTitle")}</div>
      <div className="pageContents">
        <div className="FB-G-Section">
          <h3>{t("Signup.box1-title")}</h3>
          <div className="Details1">
            <FacebookLogin
              appId=""
              autoLoad
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
              textButton={t("Signup.fb-text")}
            />
            <div>or</div>
            <GoogleLogin
              clientId=""
              buttonText={t("Signup.g-text")}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>

        <div className="emailSection">
          <h3> {t("Signup.box2-title")}</h3>

          <form onSubmit={handleForm}>
            <div>{t("Signup.full-name")}:</div>
            <input
              type="text"
              // value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
            <div>Email:</div>
            <input
              type="email"
              // value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <div>{t("Signup.pass")}:</div>
            <input
              type="password"
              // value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <div>{t("Signup.confirm-pass")}:</div>
            <input
              type="password"
              // value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              required
            />
            <div>
              <button type="submit" className="submit">
                {t("Signup.submit")}
              </button>
              <button
                onClick={() => {
                  setUser(initialState);
                  history.push("/");
                  return;
                }}
                className="submit"
              >
                {t("Signup.cancel")}
              </button>
            </div>
          </form>
          <div className="redirect-link">
            {t("Signup.already-member")}
            <Link to={"/Login"}>{t("Signup.start-here")}</Link>
          </div>
        </div>
      </div>
      {snack.isOpen && (
        <CustomizedSnackbars
          isOpen={snack.isOpen}
          msg={snack.msg}
          severity={snack.severity}
          onClose={() => setSnack(initialSnack)}
        />
      )}
    </div>
  );
}
