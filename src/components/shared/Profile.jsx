import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "./Snackbar.jsx";

export default function Profile() {
  const { t } = useTranslation();
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const [user, setUser] = useState();
  const [itemsHistory, setHistory] = useState([]);
  const [itemsToReturn, setToReturn] = useState([]);
  const [reservedItems, setReserved] = useState([]);
  const initialSnack = { isOpen: false, msg: "", severity: "" };
  const [snack, setSnack] = useState(initialSnack);

  const userInfo = async () => {
    let response = await fetch("/profile");
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      console.log(body.user);
      console.log(body.itemsHistory);
      setUser(body.user);
      setHistory(body.itemsHistory);
      setToReturn(body.itemsToReturn);
      setReserved(body.reservedItems);
      return;
    }
    console.log(body.success, body.msg);
  };
  const convertDate = (epochDate) => {
    const dateObj = new Date(epochDate);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "/" + month + "/" + day;
    return newdate;
  };
  const handleReturn = async (itemId, borrowedDate) => {
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: "You Should Login First!",
        severity: "error",
      });
    let data = new FormData();
    data.append("id", itemId);
    data.append("borrowedDate", borrowedDate);
    let response = await fetch("/return", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      userInfo();
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };
  const handleCancelReserve = async (itemId) => {
    if (!loggedIn)
      return setSnack({
        isOpen: true,
        msg: "You Should Login First!",
        severity: "error",
      });
    let data = new FormData();
    data.append("id", itemId);
    let response = await fetch("/cancelReserve", {
      method: "POST",
      body: data,
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      setSnack({ isOpen: true, msg: body.msg, severity: "success" });
      userInfo();
      return;
    }
    setSnack({ isOpen: true, msg: body.msg, severity: "error" });
  };

  useEffect(() => {
    userInfo();
  }, []);

  return !user ? (
    <div className="Profile"></div>
  ) : (
    <div className="Profile">
      <div className="pageTitle">{t("Profile.pageTitle")}</div>
      <div className="user-info">
        <img src={user.img} width="100px" height="100px" alt="" />
        <div>
          <div className="profile-title">
            {t("Profile.name")}: {user.name}
          </div>
          <div>
            <div className="profile-title">Email: {user.email}</div>
          </div>
        </div>
      </div>
      {itemsHistory.length === 0 &&
        itemsToReturn.length === 0 &&
        reservedItems.length === 0 && (
          <div className="nothingToShow">{t("Profile.nothing-to-show")}!</div>
        )}
      <div className="tables">
        {itemsHistory.length === 0 ? (
          <div></div>
        ) : (
          <table>
            <caption>{t("Profile.items-history")}</caption>
            <tr>
              <th className="th1">ISBN</th>
              <th className="th2">{t("Profile.title")}</th>
              <th className="th3">{t("Profile.b-date")}</th>
              <th className="th4">{t("Profile.r-date")}</th>
            </tr>
            {itemsHistory.map((item) => (
              <tr>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.isbn}</Link>
                </td>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.title}</Link>
                </td>
                <td>{convertDate(item.borrowedDate)}</td>
                <td>{convertDate(item.returnedDate)}</td>
              </tr>
            ))}
          </table>
        )}
        {itemsToReturn.length === 0 ? (
          <div></div>
        ) : (
          <table>
            <caption>{t("Profile.items-to-return")}</caption>
            <tr>
              <th className="th1">ISBN</th>
              <th className="th2">{t("Profile.title")}</th>
              <th className="th3">{t("Profile.b-date")}</th>
              <th className="th4">{t("Profile.return?")}</th>
            </tr>
            {itemsToReturn.map((item) => (
              <tr>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.isbn}</Link>
                </td>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.title}</Link>
                </td>
                <td>{convertDate(item.borrowedDate)}</td>
                <td>
                  <button
                    onClick={() => handleReturn(item.itemId, item.borrowedDate)}
                    className="green-btn"
                  >
                    {t("Profile.return")}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )}
        {reservedItems.length === 0 ? (
          <div></div>
        ) : (
          <table>
            <caption>{t("Profile.reserved-items")}</caption>
            <tr>
              <th className="th1">ISBN</th>
              <th className="th2">{t("Profile.title")}</th>
              <th className="th3">{t("Profile.estimate")}</th>
              <th className="th4">{t("Profile.cancel-reserve")}?</th>
            </tr>
            {reservedItems.map((item) => (
              <tr>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.isbn}</Link>
                </td>
                <td>
                  <Link to={"/Item-Details/" + item._id}>{item.title}</Link>
                </td>
                <td>{convertDate(item.estimatedAvailability)}</td>
                <td>
                  <button
                    onClick={() => handleCancelReserve(item.itemId)}
                    className="green-btn"
                  >
                    {t("Profile.cancel")}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )}
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

// const handleReturnItem = async id => {
//   if (!loggedIn) return alert("You should login first!");
//   console.log(id);
//   let response = await fetch("/borrow?id=" + id);
//   let body = await response.text();
//   body = JSON.parse(body);
//   if (body.success) {
//     setItem(body.item);
//     return;
//   }
//   console.log(body.success, body.msg);
// };

//{
/* <div>
          {user.itemsHistory.map(historyItem => {
            const item = fullReducedData.find(
              book => book._id === historyItem.itemId
            );
            console.log(item);
            return <div> {item && item.title}</div>;
          })}
        </div> */
//}
