import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "../shared/Snackbar.jsx";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectPath = useSelector((state) => state.session.redirectPath);
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const initialSnack = { isOpen: false, msg: "", severity: "" };
  const [snack, setSnack] = useState(initialSnack);

  const handleForm = (evt) => {
    evt.preventDefault();
    handleLogin(user);
  };
  const handleLogin = async (user) => {
    const data = new FormData();
    data.append("user", JSON.stringify(user));
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
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
  };
  const responseFacebook = async (response) => {
    console.log(response);
    if (!response.email) {
      return;
    }
    const newUser = { email: response.email, password: response.id };
    setUser(newUser);
    handleLogin(newUser);
  };
  const responseGoogle = async (response) => {
    console.log(response);
    const newUser = {
      email: response.profileObj.email,
      password: response.googleId,
    };
    setUser(newUser);
    handleLogin(newUser);
  };

  return (
    <div className="Login">
      <div className="pageTitle">{t("Login.pageTitle")}</div>
      <div className="pageContents">
        <div className="FB-G-Section">
          <h3>{t("Login.box1-title")}</h3>
          <div className="Details1">
            <FacebookLogin
              appId="2746486032249962"
              autoLoad
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
              textButton={t("Login.fb-text")}
            />
            <div>or</div>
            <GoogleLogin
              clientId=""
              buttonText={t("Login.g-text")}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="emailSection">
          <h3>{t("Login.box2-title")} </h3>
          <form onSubmit={handleForm}>
            <div>Email:</div>
            <input
              type="email"
              // value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>
            <div>{t("Login.pass")}:</div>
            <input
              type="password"
              // value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
            <div>
              <button type="submit" className="submit">
                {" "}
                {t("Login.submit")}
              </button>
              <button
                onClick={() => {
                  setUser(initialState);
                  history.push("/");
                  return;
                }}
                className="submit"
              >
                {t("Login.cancel")}
              </button>
            </div>
          </form>
          <div className="redirect-link">
            {t("Login.new-member")}
            <Link to={"/SignUp"}>{t("Login.start-here")}</Link>
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
