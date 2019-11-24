import React, { useState, useContext, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
// import { useStyles } from "./tourform/tourform";
import { SessionContext } from "../session";
// import { Router, Route, Switch, Link } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const session = useContext(SessionContext);
  let loginLogoutButton;
  if (session.id) {
    loginLogoutButton = (
      <Button
        color="inherit"
        onClick={ev => {
          props.history.push("/logout");
        }}
      >
        Logout
      </Button>
    );
  } else {
    loginLogoutButton = (
      <Button
        color="inherit"
        onClick={ev => {
          props.history.push("/login");
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title}>
            <Link color="inherit" href="/" variant="h6">
              TourMatch
            </Link>
          </Typography>
          {loginLogoutButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}
