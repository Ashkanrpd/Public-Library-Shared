import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeContents() {
  const { t } = useTranslation();

  return (
    <div className="HomeContents">
      <div className="home-ps">
        <div>
          <div className="header"> {t("HomeContents.header1")}</div>
          <p>{t("HomeContents.p1")}</p>
        </div>
        <div>
          <div className="header"> {t("HomeContents.header2")}</div>
          <p>{t("HomeContents.p2")} </p>
        </div>
      </div>
      <div className="home-InfoBar">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dailyhive.com/montreal/quebec-rainbows-postivie-campaign"
          className="covid"
        >
          <img src={t("HomeContents.cvba-img")} alt="" />
          <p>{t("HomeContents.box1")}</p>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ctvnews.ca/health/coronavirus/eight-essential-tips-for-working-from-home-during-the-coronavirus-pandemic-1.4874662"
          className="covid"
        >
          <img src="/images/covid.jpg" alt="" />
          <p>{t("HomeContents.box2")}</p>
        </a>
      </div>
    </div>
  );
}
