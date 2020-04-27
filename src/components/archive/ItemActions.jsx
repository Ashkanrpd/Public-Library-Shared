import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "../shared/Snackbar.jsx";

export default function ItemActions() {
  const { t } = useTranslation();
  const userId = useSelector((state) => state.session.userId);
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const actionItem = useSelector((state) => state.session.actionItem);
  const dispatch = useDispatch();
  const initialSnack = { isOpen: false, msg: "", severity: "" };
  const [snack, setSnack] = useState(initialSnack);

  const handleBorrow = async () => {
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: (
          <div>
            {t("ItemActions.you-should")}{" "}
            <Link
              to="/Login"
              onClick={() =>
                dispatch({
                  type: "REDIRECT-PATH",
                  path: "/Item-Details/" + actionItem._id,
                })
              }
            >
              {t("ItemActions.login")}
            </Link>{" "}
            {t("ItemActions.first")}!
          </div>
        ),
        severity: "error",
      });
    let data = new FormData();
    data.append("id", actionItem._id);
    let response = await fetch("/borrow", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body.success, body.msg);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      await dispatch({
        type: "ITEM-UPDATED",
        item: body.book,
      });
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };
  const handleReturn = async () => {
    console.log(actionItem);
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: (
          <div>
            {t("ItemActions.you-should")}{" "}
            <Link
              to="/Login"
              onClick={() =>
                dispatch({
                  type: "REDIRECT-PATH",
                  path: "/Item-Details/" + actionItem._id,
                })
              }
            >
              {t("ItemActions.login")}
            </Link>{" "}
            {t("ItemActions.first")}!
          </div>
        ),
        severity: "error",
      });
    let data = new FormData();
    data.append("id", actionItem._id);
    data.append("borrowedDate", actionItem.borrowedDate);
    let response = await fetch("/return", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body.success, body.msg);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      await dispatch({
        type: "ITEM-UPDATED",
        item: body.book,
      });
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };
  const handleReserve = async () => {
    console.log(actionItem);
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: (
          <div>
            {t("ItemActions.you-should")}{" "}
            <Link
              to="/Login"
              onClick={() =>
                dispatch({
                  type: "REDIRECT-PATH",
                  path: "/Item-Details/" + actionItem._id,
                })
              }
            >
              {t("ItemActions.login")}
            </Link>{" "}
            {t("ItemActions.first")}!
          </div>
        ),
        severity: "error",
      });

    if (actionItem.availability)
      return alert("Can't reserve an available item!");
    let data = new FormData();
    data.append("id", actionItem._id);
    let response = await fetch("/reserve", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body.success, body.msg);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      await dispatch({
        type: "ITEM-UPDATED",
        item: body.book,
      });
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };
  const handleCancelReserve = async () => {
    console.log(actionItem);
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: (
          <div>
            {t("ItemActions.you-should")}{" "}
            <Link
              to="/Login"
              onClick={() =>
                dispatch({
                  type: "REDIRECT-PATH",
                  path: "/Item-Details/" + actionItem._id,
                })
              }
            >
              {t("ItemActions.login")}
            </Link>{" "}
            {t("ItemActions.first")}!
          </div>
        ),
        severity: "error",
      });
    let data = new FormData();
    data.append("id", actionItem._id);
    let response = await fetch("/cancelReserve", {
      method: "POST",
      body: data,
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body.success, body.msg, body.book);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      await dispatch({
        type: "ITEM-UPDATED",
        item: body.book,
      });
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };

  return (
    <div>
      {" "}
      {actionItem.availability ? (
        <div className="ItemActions">
          <div>
            <span className="field">{t("ItemActions.available")}:</span>
            <span className="green">{t("ItemActions.yes")}</span>
          </div>
          <button onClick={() => handleBorrow()} className="b-btn">
            {" "}
            {t("ItemActions.borrow")}{" "}
          </button>
        </div>
      ) : (
        <div className="ItemActions">
          <div>
            <span className="field">{t("ItemActions.available")}:</span>
            <span className="red">{t("ItemActions.no")}</span>
            <span className="hint">
              ({t("ItemActions.people-on-list")}:{" "}
              {actionItem.reservations.length})
            </span>{" "}
          </div>
          {!actionItem.reservations.includes(userId) &&
            !(actionItem.borrower === userId) && (
              <button onClick={() => handleReserve()} className="r-btn">
                {t("ItemActions.reserve")}
              </button>
            )}
          {actionItem.borrower === userId && (
            <button onClick={() => handleReturn()} className="r-btn">
              {t("ItemActions.return")}
            </button>
          )}
          {actionItem.reservations.includes(userId) && (
            <button onClick={() => handleCancelReserve()} className="r-btn">
              {t("ItemActions.cancel-reserve")}
            </button>
          )}
        </div>
      )}
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
