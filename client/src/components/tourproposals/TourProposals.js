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
import Select from "@material-ui/core/Select";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  // setSessionCookie,
  // getSessionCookie,
  SessionContext
} from "../../session";
import "./tourproposals.css";
import { Container } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PeopleIcon from "@material-ui/icons/People";

export default class TourProposals extends Component {
  static contextType = SessionContext;

  constructor() {
    super();
    this.state = {
      sorting: "default",
      textAboveCards: "Tour offers",
      tourRequest: { tour_date: "" },
      tourProposals: [
        {
          tour_date: "",
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
          tour_date: "",
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
      location: "daegu",
      tour_date: ""
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
    if (!(event.target.name === "budget" && event.target.value <= 0)) {
      this.setState({
        [event.target.name]: event.target.value //Whats this comma?
      });
      console.log(this.state);
    }
  };

  onChangeSet_sorting = event => {
    this.setState({
      [event.target.name]: event.target.value //Whats this comma?
    });
    //console.log(this.state);

    const tourProposalscopy = []
      .concat(this.state.tourProposals)
      .sort((a, b) => {
        if (event.target.value === "default") {
          return a.id - b.id;
        }
        if (event.target.value === "Price") {
          return a.price - b.price;
        }
        if (event.target.value === "Time") {
          let start_time_a = a.start_time;
          let start_time_b = b.start_time;
          if (start_time_a.length === 4) start_time_a = "0" + start_time_a;
          if (start_time_b.length === 4) start_time_b = "0" + start_time_b;
          if (start_time_a < start_time_b) return -1;
          if (start_time_a > start_time_b) return 1;
          return 0;
        }
      })
      .map((item, i) => {
        item["key"] = i + 1;
        return item;
      });
    this.state.tourProposals = tourProposalscopy;
    console.log(tourProposalscopy);
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
          <Grid container justify="flex-end">
            <Select
              native
              value={this.state.sorting} // Functional component: Receive props as parameter, no "this"
              onChange={this.onChangeSet_sorting}
              // labelWidth={labelWidth}
              inputProps={{
                name: "sorting",
                id: "age-native-required"
              }}
              className="select"
            >
              <option value={"default"}> 🔽Submission Date</option>
              <option value={"Price"}>🔼Price</option>
              <option value={"Time"}>🔽Time</option>
            </Select>
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
            history={this.props.history}
            setSelectedTourProposal={this.props.setSelectedTourProposal}
            startTime={guideRequest.start_time}
            endTime={guideRequest.end_time}
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
  pos: {
    marginBottom: 12,
    color: "black"
  },
  header: {
    background: "linear-gradient(45deg,#91EAE4 0%,#6190E8 100%)"
    //maxHeight: "100px"
  },
  menu: {
    color: "black",
    //textAlign: "left",
    fontWeight: "bold",
    // display: "inline-block",
    textAlign: "left"
  },
  p2: {
    textAlign: "left"
    //display: "inline-block",
  },
  mytour: {
    color: "white",
    fontSize: "20px"
  },
  icon: {
    color: "#889EE7"
  }
}));

const SimpleCard = props => {
  const classes = cardStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  let budget = "Budget: ";

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={<h5 className={classes.mytour}>My Tour</h5>}
      />

      <CardContent>
        <Grid justify="flex-start" container>
          <Grid container xs={6} direction="row">
            <DateRangeIcon className={classes.icon} />
            <Typography className={classes.pos}>
              &nbsp;{props.requestInfo.tour_date.toString().split("T")[0]}
            </Typography>
          </Grid>
          <Grid container xs={6} direction="row">
            <CreditCardIcon className={classes.icon} />

            <Typography className={classes.p2}>
              &nbsp;{"$" + props.requestInfo.budget}
            </Typography>
          </Grid>

          <Grid container xs={6}>
            <PeopleIcon className={classes.icon} />
            <Typography className={classes.p2}>
              &nbsp;{props.requestInfo.pax}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography clasName={classes.p2}>
              {props.requestInfo.description}
            </Typography>
          </Grid>
        </Grid>
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
    background: "	linear-gradient(45deg,#91EAE4 0%,#6190E8 100%)"
  },
  p: {
    textAlign: "left",
    // display: "inline-block",
    fontWeight: "bold"
  },
  p2: {
    textAlign: "left",
    marginBottom: theme.spacing(1)
  },
  p3: {
    textAlign: "left",
    marginTop: theme.spacing(2)
  }
}));

function GuideRequest(props) {
  const classes = useStyles();
  //console.log(props);

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
        <Container>
          <Grid container direction="row" justify="flex-start">
            <Grid item xs={6}>
              <p className={classes.p}>Theme </p>
              <p className={classes.p2}>{props.theme} </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.p}>Time </p>
              <p className={classes.p2}>
                {props.startTime + " - " + props.endTime}{" "}
              </p>
            </Grid>
            <Grid item xs={7}>
              <p className={classes.p}>Price </p>
              <p className={classes.p2}>{"$" + props.charge}</p>
            </Grid>

            <Grid item xs={12}>
              <p className={classes.p3}>{props.details}</p>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          onClick={() => {
            props.history.push("/matchcomplete");
            props.setSelectedTourProposal(props);
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
