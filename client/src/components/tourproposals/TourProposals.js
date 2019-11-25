import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import "date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  // setSessionCookie,
  // getSessionCookie,
  SessionContext
} from "../../session";

export default class TourProposals extends Component {
  static contextType = SessionContext;

  constructor() {
    super();
    this.state = {
      textAboveCards: "Tour offers",
      tourRequest: {},
      tourProposals: [
        {
          id: 1,
          theme: "kpop",
          price: 234,
          description: "asdfasdf",
          application: {},
          guide: {
            age: 19,
            first_name: "Bob",
            guide_id: 7,
            guide_location_id: 50,
            picture_path: "avatars/man_20.png",
            sex: "M"
          }
        },
        {
          id: 2,
          theme: "cooking",
          price: 100,
          description: "dfasdfasf",
          guide: {
            age: 19,
            first_name: "asdf",
            guide_id: 7,
            guide_location_id: 50,
            picture_path: "avatars/woman_20.png",
            sex: "F"
          }
        }
      ],
      user: "taylor",
      date: "11/11",
      pax: "1",
      user_budget: "123",
      description: "wewewewe",
      location: "daegu"
    };
  }

  componentDidMount() {
    const user = this.context;
    console.log(user);
    console.log(user.id);
    // console.log(getSessionCookie());
    if (user.id === undefined) {
      this.props.history.push("/login");
      return;
    } else if (user.user_type === "guide") {
      this.props.history.push("/");
      return;
    } else {
      this.state.requester_id = user.id;
    }

    fetch("api/tour-proposals/" + user.id)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.length === 0) {
          this.setState({ textAboveCards: "No tour offers yet :(" });
        }

        for (let step = 1; step <= json.length; step++) {
          json[step - 1]["id"] = step;
          // json[step - 1]["location"] = json[step - 1]["location"]["name"];
          // json[step - 1]["user"] = json[step - 1]["requester"]["first_name"];
        }

        this.setState({ tourProposals: json });
        // console.log(json[0].application);
        // this.setState({ ...json[0].application });
      });

    fetch("api/tour-requests/" + user.id)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        for (let step = 1; step <= json.length; step++) {
          json[step - 1]["id"] = step;
          // json[step - 1]["location"] = json[step - 1]["location"]["name"];
          // json[step - 1]["user"] = json[step - 1]["requester"]["first_name"];
        }

        this.setState({ tourRequest: json });
        // console.log(json[0].application);
        // this.setState({ ...json[0].application });
      });
  }

  onChangeSet = event => {
    this.setState({
      [event.target.name]: event.target.value //Whats this comma?
    });
    console.log(this.state);
  };

  render() {
    const tourProposals = this._getTourProposals();

    return (
      <React.Fragment>
        <SimpleCard requestInfo={this.state.tourRequest} />
        <div className="comment-box">
          <Grid container justify="center">
            <h2>{this.state.textAboveCards}</h2>
          </Grid>
          <div className="comment-list">{tourProposals}</div>
          {/* {guideRequestNodes} */}
        </div>
      </React.Fragment>
    );
  }

  _addGuideRequest(user, body) {
    const comment = {
      id: this.state.tourProposals.length + 1,
      user,
      body
    };

    this.setState({ tourRequests: this.state.tourProposals.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }

  _getTourProposals() {
    return this.state.tourProposals.map(guideRequest => {
      return (
        <div>
          <GuideRequest
            guide={guideRequest.guide}
            key={guideRequest.id}
            theme={guideRequest.theme}
            charge={guideRequest.price}
            details={guideRequest.description}
          />
          <h4></h4>
        </div>
      );
    });
  }
}

const cardStyles = makeStyles(theme => ({
  card: {
    boxShadow: "0 3px 5px 2px lightgray",
    marginLeft: theme.spacing(2),
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  header: {
    background: "linear-gradient(to right, #48c6ef 0%, #6f86d6 100%);"
  },
  menu: {
    color: "black",
    display: "inline-block"
  },
  p2: {
    display: "inline-block"
  }
}));

const SimpleCard = props => {
  const classes = cardStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  let budget = "Budget: ";

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title={props.requestInfo.user} />

      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {props.requestInfo.date}
        </Typography>

        <b className={classes.menu}> Budget : </b>
        <Typography className={classes.p2}>
          {props.requestInfo.budget}
        </Typography>
        <br />
        <b className={classes.menu}>Persons : </b>
        <p className={classes.p2}>{props.requestInfo.pax}</p>
        <br />
        <b className={classes.menu}>Description : </b>
        <p className={classes.p2}>{props.requestInfo.description}</p>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: "0 3px 5px 2px lightgray"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    color: "white",
    background: "linear-gradient(45deg, #008af7 30%, #48d0f0 90%)"
  }
}));

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
          <b>Theme : </b> {props.theme}
        </p>
        <p>
          <b>Charge : </b>
          {props.charge}
        </p>
        <p>
          <b>Description : </b> {props.details}
        </p>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          onClick={() => {
            props.history.push("/matchcomplete");
          }}
          fullWidth
        >
          choose this guide
        </Button>
      </CardActions>
    </Card>
  );

  function onClickChoose(props) {
    props.history.push("/matchcomplete");
  }
}
