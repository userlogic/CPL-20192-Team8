import Button from "@material-ui/core/Button";
import Image from "material-ui-image";
import ImageSlider from "./ImageSlider";
import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "./session";
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

export default function LandingPage(props) {
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#00b9f1",
      '&:hover': {
        backgroundColor: "#00b9f1",
      },
    },
  }))(Button);
  const session = useContext(SessionContext);
  let button1;
  let button2;
  if (!session.id) {
    button1 = (
      <ColorButton
        className="snip1535"
        variant="contained"
        color="primary"
        onClick={ev => {
          props.history.push("/login");
        }}
      >
        Login
      </ColorButton>
    );
    button2 = (
      <Button
      className="snip1535"
      variant="contained"
      color="primary"
        onClick={ev => {
          props.history.push("/tourrequests");
        }}
      >
        Tours
      </Button>
    );
  } else if (session.user_type === "guide") {
    button1 = (
      <Button
      className="snip1535"
      variant="contained"
      color="primary"
        onClick={ev => {
          props.history.push("/tourrequests");
        }}
      >
        Tours
      </Button>
    );
    button2 = <div></div>;
  } else {
    button1 = (
      <Button
      className="snip1535"
      variant="contained"
      color="primary"
        onClick={ev => {
          props.history.push("/tourform");
        }}
      >
        Let's Go
      </Button>
    );
    button2 = (
      <Button
      className="snip1535"
      variant="contained"
      color="primary"
        onClick={ev => {
          props.history.push("/tourproposals");
        }}
      >
        Tour Offers
      </Button>
    );
  }

  return (
    <div>
      <ImageSlider></ImageSlider>
      {button1}
      {button2}
    </div>
  );
}
