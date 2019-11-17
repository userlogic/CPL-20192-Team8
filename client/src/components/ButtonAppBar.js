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
  const [loginLogoutButton, setLoginLogoutButton] = useState(false);
  let setLoginLogoutButton2;
  // let loginLogoutButton;

  const session = useContext(SessionContext);

  // useEffect(() => {
  //   let s = session;
  //   if (s.id) {
  //     setLoginLogoutButton(
  //       <Button
  //         color="inherit"
  //         onClick={ev => {
  //           props.history.push("/logout");
  //         }}
  //       >
  //         Logout
  //       </Button>
  //     );
  //   } else {
  //     setLoginLogoutButton(
  //       <Button
  //         color="inherit"
  //         onClick={ev => {
  //           props.history.push("/login");
  //         }}
  //       >
  //         Login
  //       </Button>
  //     );
  //   }
  // }, [session]);

  // console.log(session);

  if (session.id) {
    setLoginLogoutButton2 = (
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
    setLoginLogoutButton2 = (
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
          <Typography variant="h6" className={classes.title}>
            GPOON
          </Typography>
          {/* <Button
            color="inherit"
            onClick={ev => {
              setToLogin(true);
            }}
          >
            Login
          </Button> */}
          {setLoginLogoutButton2}
        </Toolbar>
      </AppBar>
    </div>
  );
}
