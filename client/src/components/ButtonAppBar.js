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
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import {Row} from 'simple-flexbox';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bar: {
    
    background: "linear-gradient(to left, #e0c3fc 0%, #8ec5fc 100%)",
    color: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    align: 'center',
    background:'yellow'
  },
  Typography:{
    flexGrow: 1,
    align: 'center',
    background:'white',
    
    
  },
  icon: {
    color: 'white',
    
  },
  user:{
    color:'white',
    marginRight: theme.spacing(1),
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
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          
          <Row className={classes.title}>
          <Typography className={classes.Typography}>
            <Link color="inherit" href="/" variant="h6">
              TourMatch
            </Link>
          </Typography>
          
          <AccountCircleRoundedIcon className={classes.icon}></AccountCircleRoundedIcon>
          <div className={classes.user}>{session.first_name}</div>
          </Row>
          {loginLogoutButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}
