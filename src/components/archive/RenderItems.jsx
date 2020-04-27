import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import FilteredItems from "./FilteredItems.jsx";

export default function RenderItems() {
  const { t } = useTranslation();
  const searchQ = useSelector((state) => state.base.searchQ);
  const items = useSelector((state) => state.base.items);
  const selectedCategory = useSelector((state) => state.base.selectedCategory);
  const categoriesOpen = useSelector((state) => state.base.categoriesOpen);
  const dispatch = useDispatch();
  const randomItems = useRef([]);

  const filterByQuery = (item) => {
    return searchQ.searchOn === "authors"
      ? item[searchQ.searchOn].find((author) =>
          author.toLowerCase().includes(searchQ.input.toLowerCase())
        )
      : item[searchQ.searchOn] &&
          item[searchQ.searchOn]
            .toLowerCase()
            .includes(searchQ.input.toLowerCase());
  };

  const filterByCatagory = (item) => {
    return item.categories
      .map((category) => category.toUpperCase())
      .includes(selectedCategory);
  };

  const filterByItems = items.filter((item) => {
    return (
      (searchQ.searchOn ? filterByQuery(item) : true) &&
      (selectedCategory ? filterByCatagory(item) : true)
    );
  });

  if (randomItems.current.length === 0) {
    randomItems.current = items
      .slice()
      .sort(() => Math.random() - Math.random())
      .slice(0, 21);
  }

  return (
    <div>
      <span className="pageTitle">
        {selectedCategory}
        {selectedCategory && searchQ.input && " + "}
        {searchQ.input && searchQ.input.toUpperCase()}
        {!selectedCategory && !searchQ.input && (
          <span>{t("RenderItems.recenlty-added")}</span>
        )}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "RESET-SEARCH" });
          dispatch({ type: "CATEGORIES-OPEN" });
        }}
        className="reset"
      >
        {t("RenderItems.reset-search")}
      </button>
      {categoriesOpen ? (
        <button
          onClick={() => {
            dispatch({ type: "CATEGORIES-CLOSE" });
          }}
          className="reset cats"
        >
          {t("RenderItems.hide-categories")}
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch({ type: "CATEGORIES-OPEN" });
          }}
          className="reset cats"
        >
          {t("RenderItems.show-categories")}
        </button>
      )}

      <div className="RenderItems">
        {(selectedCategory || searchQ.input
          ? filterByItems
          : randomItems.current
        ).map((item) => (
          <FilteredItems item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
