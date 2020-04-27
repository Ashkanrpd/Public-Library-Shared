import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Search from "../shared/Search.jsx";
import Categories from "./Categories.jsx";
import RenderItems from "./RenderItems.jsx";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function ItemsList() {
  const categoriesOpen = useSelector((state) => state.base.categoriesOpen);
  const classes = useStyles();

  return (
    <div className="ItemsList">
      <Search />
      <div className="display">
        <Categories />
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: categoriesOpen,
          })}
        >
          <RenderItems />{" "}
        </div>
      </div>
    </div>
  );
}
