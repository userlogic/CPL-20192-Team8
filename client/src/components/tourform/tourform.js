import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { SessionContext } from "../../session";
import './tourform.css';
import {Row} from 'simple-flexbox';
import "date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default class TourForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      budget: "",
      details: "",
      tourDate: new Date(),
      requester_id: -1,
      city: "",

      hasError: false,
    };
  }

  static contextType = SessionContext;

  componentDidMount() {
    const user = this.context;
    console.log(user);
    console.log(user.id);
    //console.log(getSessionCookie());
    if (user.id === undefined) {
      this.props.history.push("/login");
      return;
    } else if (user.user_type === "guide") {
      this.props.history.push("/");
      return;
    } else {
      this.state.requester_id = user.id;
    }
  }

  onSubmitForm = ev => {
    ev.preventDefault();
    console.log(this.state);

    if(!this.state.city){
      this.state.hasError = true;
      return;
    }
    fetch("/api/tour-requests", {
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
      body: JSON.stringify(this.state) // body data type must match "Content-Type" header
    });
    // TODO: Enter DB
    // TODO: Go to next component/page (Router)

    this.props.history.push("/");
  };

  incrementCount = () => {
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
  };

  decrementCount = () => {
    this.setState((prevState, props) => {
      if(prevState.count >1){
        return { count: prevState.count - 1 };
      }
    });
  };

  onChangeSet = event => {
    if (!(event.target.name === "budget" && event.target.value <= 0)) {
    this.setState({
      [event.target.name]: event.target.value, //Whats this comma?
    });
  }
    // console.log(this.state)
  };

  onChangeSetDate = newDate => {
    this.setState({
      tourDate: newDate
    });
  };

  render() {
    return (
      <div>
        {/* <ButtonAppBar /> */}
        <TourDatePicker
          onChangeSet={this.onChangeSetDate}
          tourDate={this.state.tourDate}
        />
        
        <BudgetAndDetails
        incrementCount={this.incrementCount} decrementCount={this.decrementCount}
          onChangeSet={this.onChangeSet}
          onSubmitForm={this.onSubmitForm}
          {...this.state}
        />
      </div>
    );
  }
}

function TourDatePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          autoOk
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={props.tourDate}
          onChange={date => {
            props.onChangeSet(date);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

const SelectStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"

  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function CityDropdown(props) {
  const classes = SelectStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className={classes.root}>
      <FormControl fullWidth required variant="outlined" className={classes.formControl}
      error={props.hasError}>
        <InputLabel ref={inputLabel} htmlFor="age-native-required">
          City
        </InputLabel>
        <Select
          native
          value={props.city} // Functional component: Receive props as parameter, no "this"
          onChange={props.onChange}
          labelWidth={labelWidth}
          inputProps={{
            name: "city",
            id: "age-native-required"
          }}
        >
          <option value=""/>
          <option value={"Seoul"}>Seoul</option>
          <option value={"Busan"}>Busan</option>
          <option value={"Jeju"}>Jeju</option>
          <option value={"Daegu"}>Daegu</option>
          <option value={"Jeonju"}>Jeonju</option>
          <option value={"Gyeongju"}>Gyeongju</option>
        </Select>
      </FormControl>
    </div>
  );
}

const PaxStyles = makeStyles(theme =>({

  text:{
      marginLeft:theme.spacing(3),
      color: 'black',
       fontWeight: 'bold',
  }

}));


function PaxButtons(props) {
  const classes = PaxStyles();

    return (
    
      <Grid container alignItems="center" justify="flex-start">
                <Grid item>
                <Typography className={classes.text}> Persons &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; &emsp;&emsp; &emsp; &emsp;</Typography>
                  </Grid>
              <Grid item justify="center">
                    <div className="input-number">
                      <button type="button" onClick={props.decrementCount}>&minus;</button>
                      <span>{props.count}</span>
                      <button type="button" onClick={props.incrementCount}>&#43;</button>     
                    </div>
              </Grid>
      </Grid>
    );
  
}

const BStyles = makeStyles(theme =>({

  btn:{
      marginTop: theme.spacing(2),
      background:'linear-gradient(right, #21d4fd, #b721ff)',
      color: 'white',
      fontWeight: 'bold',
  }

}));

function BudgetAndDetails(props) {
  const classes = BStyles();

    return (
      <Container>
        <form onSubmit={props.onSubmitForm}>
          <CityDropdown
          onChange={props.onChangeSet}/>
          <PaxButtons
          incrementCount={props.incrementCount} decrementCount={props.decrementCount} count={props.count}/>
          <TextField
            id="budget"
            name="budget"
            label="Budget"
            type="number"
            fullWidth
            required
            rows="1"
            value={props.budget}
            onChange={props.onChangeSet}
            //className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="details"
            name="details"
            label="Descriptions"
            multiline
            required
            rows="6"
            fullWidth
            helperText="희망 활동/관심사/주의 사항을 적어주세요"
            value={props.details}
            onChange={props.onChangeSet}
            //className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <Button type="submit" variant="contained" className={classes.btn}
                     fullWidth>
                        submit
                    </Button>
        </form>
      </Container>
    );
  
}
