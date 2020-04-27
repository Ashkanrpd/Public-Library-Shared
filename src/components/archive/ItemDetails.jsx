import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemActions from "./ItemActions.jsx";
import { useTranslation } from "react-i18next";

export default function ItemDetails() {
  const { t } = useTranslation();
  const actionItem = useSelector((state) => state.base.actionItem);
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const getItem = async () => {
    let response = await fetch("/item?id=" + itemId);
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      dispatch({ type: "ACTION_ITEM", item: body.item });
      console.log(body.item);
      return;
    }
    console.log(body.success, body.msg);
  };
  useEffect(() => {
    getItem();
  }, []);

  return !actionItem ? (
    <div className="ItemDetails"></div>
  ) : (
    <div className="ItemDetails" key={actionItem._id}>
      <div className="pageTitle">{t("ItemDetails.pageTitle")}</div>
      <div className="ItemDetails-contents">
        <div>
          <img src={actionItem.thumbnailUrl} width="250px" height="300px" />
        </div>
        <div className="ItemDetails-contents-2">
          <div>
            <span className="field">Code:</span>
            <span> {actionItem.isbn}</span>{" "}
          </div>
          <div>
            <span className="field">{t("ItemDetails.title")}:</span>{" "}
            <span> {actionItem.title}</span>
          </div>
          <div>
            <span className="field">{t("ItemDetails.author")}(s): </span>
            {actionItem.authors.map((author, index) => (
              <span>
                {author}
                {actionItem.authors.length > 0 &&
                  index + 1 !== actionItem.authors.length &&
                  ", "}
              </span>
            ))}
          </div>
          <div>
            <span className="field">Pages:</span>
            <span> {actionItem.pageCount}</span>
          </div>
          <div>
            <span className="field">{t("ItemDetails.categories")}:</span>
            {actionItem.categories.map((category) => (
              <span>{category}</span>
            ))}
          </div>
          {actionItem.publishedDate.date && (
            <div>
              <span className="field">{t("ItemDetails.p-date")}: </span>
              <span>
                {new Date(actionItem.publishedDate.date).toLocaleDateString()}
              </span>
            </div>
          )}
          <ItemActions />
        </div>
      </div>
      {actionItem.shortDescription && (
        <div>
          <div className="field">{t("ItemDetails.short-des")}:</div>
          <div className="desc"> {actionItem.shortDescription}</div>
        </div>
      )}
      {actionItem.longDescription && (
        <div>
          <div className="field">{t("ItemDetails.long-des")}:</div>
          <div className="desc"> {actionItem.longDescription}</div>
        </div>
      )}
    </div>
  );
}
