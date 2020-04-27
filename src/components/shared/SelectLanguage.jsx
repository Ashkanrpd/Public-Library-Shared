import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function SelectLanguage() {
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.base.language);
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return language === "fr" ? (
    <button
      onClick={() => dispatch({ type: "CHANGE-LANGUAGE", language: "en" })}
      className="logout-btn"
    >
      English
    </button>
  ) : (
    <button
      onClick={() => dispatch({ type: "CHANGE-LANGUAGE", language: "fr" })}
      className="logout-btn"
    >
      Français
    </button>
  );
}
