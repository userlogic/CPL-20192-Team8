import Button from "@material-ui/core/Button";
import Image from "material-ui-image";
import ImageSlider from "./ImageSlider";
import React, { Component } from "react";

export default function LandingPage() {
  return (
    <div>
      <ImageSlider></ImageSlider>
      <Button type="submit">Post Comment</Button>
    </div>
  );
}
