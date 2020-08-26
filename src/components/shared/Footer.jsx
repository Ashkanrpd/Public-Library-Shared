import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="Footer">
      <img src={t("logo")} alt="" className="logo" />
      <ul>
        <div className="footer-title">{t("Footer.about-us.0")}</div>
        <li>{t("Footer.about-us.1")}</li>
        <li>{t("Footer.about-us.2")}</li>
        <li>{t("Footer.about-us.3")}</li>
        <li>{t("Footer.about-us.4")}</li>
        <li>{t("Footer.about-us.5")}</li>
        <li>{t("Footer.about-us.6")}</li>
        <li>{t("Footer.about-us.7")}</li>
      </ul>
      <ul>
        <div className="footer-title">{t("Footer.friends.0")}</div>
        <li>{t("Footer.friends.1")}</li>
        <li>{t("Footer.friends.2")}</li>
        <li>{t("Footer.friends.3")}</li>
        <li>{t("Footer.friends.4")}</li>
        <li>{t("Footer.friends.5")}</li>
      </ul>
      <ul>
        <div className="footer-title">{t("Footer.montreal.0")}</div>
        <li>{t("Footer.montreal.1")}</li>
        <li>{t("Footer.montreal.2")}</li>
        <li>{t("Footer.montreal.3")}</li>
        <li>{t("Footer.montreal.4")}</li>
      </ul>
      <img src="/images/montreal-logo.png" alt="" className="logo" />
    </div>
  );
}
