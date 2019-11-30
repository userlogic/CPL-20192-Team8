import Button from "@material-ui/core/Button";
import Image from "material-ui-image";
import Avatar from "@material-ui/core/Avatar";
import ImageSlider from "./ImageSlider";
import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../session";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

export default function LandingPage(props) {
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#6417a1",
      "&:hover": {
        backgroundColor: "#fdb965"
      }
    }
  }))(Button);

  const session = useContext(SessionContext);
  let button1;
  let button2;
  if (!session.id) {
    button1 = (
      <ColorButton
        className="snip1535"
        variant="contained"
        onClick={ev => {
          props.history.push("/login");
        }}
      >
        Login
      </ColorButton>
    );
    button2 = <div></div>;
  } else if (session.user_type === "guide") {
    button1 = (
      <ColorButton
        className="snip1535"
        variant="contained"
        onClick={ev => {
          props.history.push("/tourrequests");
        }}
      >
        Tours
      </ColorButton>
    );
    button2 = <div></div>;
  } else {
    button1 = (
      <ColorButton
        className="snip1535"
        variant="contained"
        onClick={ev => {
          props.history.push("/tourform");
        }}
      >
        Let's Go!
      </ColorButton>
    );
    button2 = (
      <ColorButton
        className="snip1535"
        variant="contained"
        onClick={ev => {
          props.history.push("/tourproposals");
        }}
      >
        Tour Offers
      </ColorButton>
    );
  }

  return (
    <div>
      <ImageSlider></ImageSlider>
      <Image src="/slide1.PNG" aspectRatio="1.778"></Image>
      {/* <Avatar aria-label="avatar" src={"/slide1.PNG"}></Avatar> */}

      <Grid container direction="column" spacing={2}>
        <Grid item>{button1}</Grid>
        <Grid item>{button2}</Grid>
      </Grid>
    </div>
  );
}
