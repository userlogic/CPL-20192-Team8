import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import "date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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
    backgroundColor: "#357a38"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  Paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  card:{
    marginTop: theme.spacing(3),
    boxShadow: "0 3px 5px 2px lightgray",
  }
}));

export default function MatchCompleted(props) {
  const classes = useStyles();

  if (!props.selectedTourProposal) {
    props.history.push("/tourproposals");
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Tour matched!
        </Typography>

        {/* <Paper className={classes.Paper}>
          <Typography component="h1" variant="h5" align="center">
            Contents
          </Typography>
          <br></br>

          {/* <Typography>Tourist: {this.props.user}</Typography>
          <Typography>Date: {this.props.date}</Typography>
          <Typography>Budget: {this.props.budget}</Typography>
          <Typography>Location: {this.props.location}</Typography>
          <Typography>description: {this.props.description}</Typography> }

          <Typography variant="subtitle1">Date : 2019-11-20</Typography>
          <Typography variant="subtitle1">
            Budget : ${props.selectedTourProposal.charge}
          </Typography>
          <Typography variant="subtitle1">Location : Seoul</Typography>
          <Typography variant="subtitle1">
            Description : delicious food
          </Typography>
        </Paper> */}

        <GuideRequest {...props.selectedTourProposal}></GuideRequest>

        <Button
          onClick={() => {
            props.history.push("/");
          }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Home
        </Button>
      </div>
    </Container>
  );
}

function GuideRequest(props) {
  const classes = useStyles();
  console.log(props);

  const avatarPath = "/" + props.guide.picture_path;
  // console.log(avatarPath);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="avatar" src={avatarPath}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.guide.first_name}
        subheader={props.guide.age + ", " + props.guide.sex}
      />
      <Divider light />
      <CardContent>
        <p>
          <b>Time : </b> {props.startTime + " - " + props.endTime}
        </p>
        <p>
          <b>Theme : </b> {props.theme}
        </p>
        <p>
          <b>Charge : </b>
          {"$" + props.charge}
        </p>
        <p>
          <b>Description : </b> {props.details}
        </p>
      </CardContent>
    </Card>
  );
}
