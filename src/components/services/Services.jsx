import React from "react";
import { useTranslation } from "react-i18next";
import Search from "../shared/Search.jsx";

export default function Services() {
  const { t } = useTranslation();
  return (
    <div className="Services">
      <Search />
      <div className="pageTitle">Services</div>
      <div className="services-contents">
        <div className="service">
          <img src="/images/rent-ipad.jpg" alt="" />
          <div className="service-details">
            <div className="service-title">{t("Services.title1")}</div>
            <div className="service-text">{t("Services.text1")} </div>
          </div>
        </div>
        <div className="service">
          <div className="service-details">
            <div className="service-title">{t("Services.title2")}</div>
            <div className="service-text">{t("Services.text2")} </div>
          </div>
          <img src="/images/computer.jpg" alt="" />
        </div>
        <div className="service">
          <img src="/images/copy.jpg" alt="" />
          <div className="service-details">
            <div className="service-title">{t("Services.title3")}</div>
            <div className="service-text">
              {t("Services.text3")}
              <div>{t("Services.text3-1")} </div>{" "}
              <div>{t("Services.text3-2")} </div>{" "}
              <div>{t("Services.text3-3")} </div>{" "}
              <div>{t("Services.text3-4")} </div>{" "}
            </div>
          </div>
        </div>
        <div className="service">
          <div className="service-details">
            <div className="service-title">{t("Services.title4")}</div>
            <div className="service-text">{t("Services.text4")} </div>
          </div>
          <img src="/images/wifi.jpeg" alt="" />
        </div>
        <div className="service">
          <img src="/images/room.jpg" alt="" />
          <div className="service-details">
            <div className="service-title">{t("Services.title5")}</div>
            <div className="service-text">{t("Services.text5")} </div>
          </div>
        </div>
        <div className="service">
          <div className="service-details">
            <div className="service-title">{t("Services.title6")}</div>
            <div className="service-text">{t("Services.text6")} </div>
          </div>
          <img src="/images/card.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
