import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logout from "../authentications/Logout";
import SelectLanguage from "./SelectLanguage";

export default function Navbar() {
  const { t } = useTranslation();
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const userId = useSelector((state) => state.session.userId);
  const name = useSelector((state) => state.session.name);
  const [logout, setLogout] = useState(false);

  return !loggedIn ? (
    <div className="Navbar">
      <Link to="/Login">{t("Navbar.1")}</Link>
      <Link to="/SignUp">{t("Navbar.2")}</Link>
      <SelectLanguage />
    </div>
  ) : (
    <div className="Navbar">
      <Link to={"/profile/" + userId}>
        {t("Navbar.3")} {name}{" "}
      </Link>
      <button onClick={() => setLogout(true)} className="logout-btn">
        {t("Navbar.4")}
      </button>
      <SelectLanguage />
      {logout && <Logout onLogout={() => setLogout(false)} />}
    </div>
  );
}
