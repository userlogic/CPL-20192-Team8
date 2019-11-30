import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import IconButton from "@material-ui/core/IconButton";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import { SessionContext } from "../../session";
import { Container } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Avatar from "@material-ui/core/Avatar";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
export default class ProposalForm extends Component {
  constructor() {
    super();
    this.state = {
      user: "taylor",
      date: "11/11",
      pax: "3",
      user_budget: "123",
      description: "wewewewe",
      location: "daegu",

      theme: "",
      charge: "",
      start_time: "12:00",
      end_time: "13:00",
      details: ""
    };
  }

  submitClick = event => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state);

    fetch("/api/tour-proposals", {
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
      body: JSON.stringify({
        ...this.state,
        prop_guide_id: this.context.id,
        tour_request_id: this.props.selectedTourRequest.tour_request_id
      }) // body data type must match "Content-Type" header
    });

    this.props.history.push("/proposalcomplete");
  };

  static contextType = SessionContext;

  componentDidMount() {
    const user = this.context;
    console.log(this.props.selectedTourRequest);
    console.log(user);
    console.log(user.id);
    // console.log(getSessionCookie());
    if (user.id === undefined) {
      this.props.history.push("/login");
      return;
    } else if (user.user_type === "tourist") {
      this.props.history.push("/");
      return;
    } else {
      this.state.requester_id = user.id;
    }
  }

  onChangeSetStart = event => {
    this.setState({
      [event.target.name]: event.target.value,
      end_time: event.target.value
    });

    console.log(this.state);
  };
  onChangeSet = event => {
    this.setState({
      [event.target.name]: event.target.value //Whats this comma?
    });
    console.log(this.state.start_time);
  };

  onTimeChange(time) {
    this.setState({ time });
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <SimpleCard
            {...this.props.selectedTourRequest}
            defaultTourRequest={{
              user: "Taylor",
              date: "2017-12-31T15:00:00.000Z",
              pax: 3,
              budget: 1000,
              description: "A fun tour!",
              location: "Seoul",
              tour_request_id: 22,
              onButtonClick: "fn()"
            }}
          />
          <Selects onChangeSet={this.onChangeSet} {...this.state} />
          <BudgetAndDetails
            onChangeSet={this.onChangeSet}
            onChangeSetStart={this.onChangeSetStart}
            submitClick={this.submitClick}
            {...this.state}
          />
        </React.Fragment>
      </div>
    );
  }
}

const cardStyles = makeStyles(theme => ({
  card: {
    boxShadow: "0 3px 5px 2px lightgray",
    marginBottom: 12,
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  header: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white"
  },
  menu: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#021B79"
  },
  p2: {
    // display: "inline-block",
    marginTop: theme.spacing(2)
  },
  p2d: {
    // display: "inline-block",
    marginTop: theme.spacing(1)
  },
  dateicon: {
    color: "#56bacf"
  },
  locationicon: {
    color: "#e64353"
  },
  budgeticon: {
    color: "#70cb98"
  },
  persons: {
    marginTop: theme.spacing(2),
    color: "#021B79",
    fontWeight: "bold"
  },
  description: {
    marginTop: theme.spacing(1),
    color: "#021B79",
    fontWeight: "bold"
  },
  avatar: {
    backgroundColor: "#2F80ED"
  }
}));

function SimpleCard(props) {
  const classes = cardStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  let budget = "Budget: ";
  let props2 = props;
  if (props.pax == null) {
    props2 = props.defaultTourRequest;
  }

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title={<h5>{props2.user}</h5>} />

      <CardContent>
        <Grid container direction="row">
          <Grid item xs={4}>
            <DateRangeIcon className={classes.dateicon} fontSize="large" />
            <p className={classes.menu}>Date</p>
            <p className={classes.text}>
              {props2.date.toString().split("T")[0]}
            </p>
          </Grid>

          <Grid item xs={4}>
            <LocationOnIcon className={classes.locationicon} fontSize="large" />{" "}
            <p className={classes.menu}>Location</p>
            <p className={classes.text}>{props2.location}</p>
          </Grid>

          <Grid item xs={4}>
            <MonetizationOnIcon
              className={classes.budgeticon}
              fontSize="large"
            />
            <p className={classes.menu}>Budget</p>
            <p className={classes.text}>${props2.budget}</p>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <p className={classes.persons}>Persons &nbsp; </p>
          <p className={classes.p2}>{props2.pax}</p>
        </Grid>
        <Grid container direction="row">
          <p className={classes.description}>Description &nbsp; </p>
          <p className={classes.p2d}>{props2.description}</p>
        </Grid>
      </CardContent>
    </Card>
  );
}

const SelectStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function Selects(props) {
  const classes = SelectStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <FormControl fullWidth required className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Theme
          </InputLabel>
          <Select
            native
            value={props.theme}
            onChange={props.onChangeSet}
            labelWidth={labelWidth}
            inputProps={{
              name: "theme",
              id: "outlined-age-native-simple"
            }}
          >
            <option value="" />
            <option value={"K-POP dance"}>K-POP Dance</option>
            <option value={"Cooking class"}>Cooking Class</option>
            <option value={"temple"}>Temple Stay</option>
            <option value={"tradition"}>Tradition Tour</option>
            <option value={"arts"}>Arts</option>
            <option value={"etc"}>Etc</option>
          </Select>
        </FormControl>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },

  grid: {
    /*  padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
*/
  },
  details: {}
}));

function BudgetAndDetails(props) {
  const classes = useStyles();

  return (
    <Container className={classes.grid}>
      <form onSubmit={props.submitClick}>
        <TextField
          id="charge"
          name="charge"
          label="최종 금액"
          type="number"
          required
          rows="1"
          value={props.charge}
          onChange={props.onChangeSet}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="time"
              label="Start time"
              name="start_time"
              type="time"
              value={props.start_time}
              onChange={props.onChangeSetStart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 600 // 10 min
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="time"
              label="End time"
              name="end_time"
              type="time"
              value={props.end_time}
              onChange={props.onChangeSet}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 600 // 10 min
              }}
            />
          </Grid>
        </Grid>

        <TextField
          className={classes.details}
          id="details"
          name="details"
          label="세부 설명"
          multiline
          required
          rows="4"
          helperText="투어의 구체적인 장소, 시간, 진행 설명 등을 작성해주세요"
          value={props.details}
          onChange={props.onChangeSet}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button type="submit" variant="contained" className={classes.root}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
