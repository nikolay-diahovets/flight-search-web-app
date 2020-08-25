import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styles from "./Header.module.scss";
import { ReactComponent as BackIcon } from "../images/left-arrow.svg";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const NO_OP = () => {};

export const Header = ({ title, handleBackBtn = NO_OP }) => {
  return (
    <AppBar className="mb-4" position="static">
      <Toolbar>
        <IconButton
          className={styles.backIconContainer}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleBackBtn}
        >
          <BackIcon className={styles.backIcon}/>
        </IconButton>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
