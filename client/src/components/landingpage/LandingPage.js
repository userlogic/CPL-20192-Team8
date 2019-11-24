import Button from "@material-ui/core/Button";
import Image from "material-ui-image";
import ImageSlider from "./ImageSlider";
import Slide from "./Slide";
import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../session";

export default function LandingPage(props) {
  const session = useContext(SessionContext);
  let button1;
  let button2;
  if (!session.id) {
    button1 = (
      <Button
        color="inherit"
        onClick={ev => {
          props.history.push("/login");
        }}
      >
        Login
      </Button>
    );
    button2 = <div></div>;
  } else if (session.user_type === "guide") {
    button1 = (
      <Button
        color="inherit"
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
        color="inherit"
        onClick={ev => {
          props.history.push("/tourform");
        }}
      >
        Let's Go
      </Button>
    );
    button2 = (
      <Button
        color="inherit"
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
