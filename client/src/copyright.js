import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useState, useContext } from "react";
import Link from "@material-ui/core/Link";

export default function Footer() {
    return (
        <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="">
            TourMatch
            </Link>{" "}
            {new Date().getFullYear()}
            
        </Typography>
      </Box>
    );
  }
  