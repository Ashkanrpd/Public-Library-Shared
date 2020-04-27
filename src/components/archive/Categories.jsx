import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: "40px",
  },
  drawerPaper: {
    position: "inherit",
    left: "9%",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

export default function Categories() {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.base.categories);
  const categoriesOpen = useSelector((state) => state.base.categoriesOpen);
  const dispatch = useDispatch();
  const classes = useStyles();
  const getCategories = async () => {
    console.log(1);
    let response = await fetch("/categories");
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      console.log(body);
      await dispatch({
        type: "GET_CATEGORIES",
        categories: body.categories,
      });
      return;
    }
    console.log(body.success);
    console.log(body.msg);
  };
  const handleCategory = async (evt, category) => {
    evt.preventDefault();
    await dispatch({
      type: "SELECTED_CATEGORY",
      category: category,
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={categoriesOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <h3 className="red ml10">{t("Categories")}</h3>
      <List>
        {categories.map((category) => {
          return (
            <ListItem>
              <ListItemText
                primary={category}
                onClick={(e) => {
                  dispatch({ type: "CATEGORIES-CLOSE" });
                  handleCategory(e, category);
                }}
                style={{ cursor: "pointer" }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
