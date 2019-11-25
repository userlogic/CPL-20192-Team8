import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as Link2 } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { setSessionCookie, SessionContext } from "../../session";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Column, Row } from "simple-flexbox";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("tourist");

  const session = useContext(SessionContext);
  if (session.id !== undefined) {
    props.history.push("/tourrequests");
  }

  const verifyUserLogin = async userDetails => {
    console.log(userDetails);
    let apiUrl;
    if (userType === "tourist") {
      apiUrl = "/api/login";
    } else {
      apiUrl = "/api/login/guide";
    }
    const loginResponse = await fetch(apiUrl, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(userDetails) // body data type must match "Content-Type" header
    });

    const json = await loginResponse.json();
    return json;
  };

  const onlogin = ev => {
    ev.preventDefault();

    verifyUserLogin({
      email: email,
      password: password,
      user_type: userType
    }).then(json => {
      console.log(json);

      if (json["success"]) {
        console.log(json["user_id"]);

        let mutableSession = session;
        mutableSession["id"] = json["user_id"];
        mutableSession["user_type"] = json["user_type"];
        mutableSession["first_name"] = json["first_name"];
        props.setSessionDown(mutableSession);

        setSessionCookie({
          id: json["user_id"],
          user_type: json["user_type"],
          first_name: json["first_name"]
        });
        console.log("Login: Set the session cookie.");
        // setToCardView(true);
        if (mutableSession["user_type"] === "guide") {
          // props.history.push("/tourrequests");
          props.history.push("/");
        } else {
          // props.history.push("/tourform");
          props.history.push("/");
        }
      } else {
        return;
      }
    });
  };

  // if (toCardView === true) {
  // return <Redirect to="/tourrequests" />;
  // } else {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <Link2 to="/tourrequests">Cardview</Link2> */}
        <form className={classes.form} onSubmit={onlogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={ev => {
              setEmail(ev.target.value);
            }}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={ev => {
              setPassword(ev.target.value);
            }}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup
              aria-label="gender"
              name="userType"
              defaultValue="tourist"
              onChange={ev => {
                setUserType(ev.target.value);
              }}
            >
              <Row>
                <FormControlLabel
                  value="tourist"
                  control={<Radio />}
                  label="Tourist"
                />
                <FormControlLabel
                  value="guide"
                  control={<Radio />}
                  label="Guide"
                />
              </Row>
            </RadioGroup>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ev => onlogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
  // }
}
