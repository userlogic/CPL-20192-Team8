import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Login from '../login/Login'
import {Container} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default class TourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            budget: 0,
            details: '',
            tourDate: new Date(),
        };
    }

    onSubmitForm = (ev) => {
        ev.preventDefault();
        console.log(this.state);

                             fetch('/api/tour-requests', {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                // mode: 'cors', // no-cors, *cors, same-origin
                                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                // credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                  'Content-Type': 'application/json'
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                // redirect: 'follow', // manual, *follow, error
                                // referrer: 'no-referrer', // no-referrer, *client
                                body: JSON.stringify(this.state) // body data type must match "Content-Type" header
                              })
        // TODO: Enter DB
        // TODO: Go to next component/page (Router)
    }


    incrementCount = () => {
        this.setState((prevState, props) => {
            return {count: prevState.count + 1}
        })
    }

    decrementCount = () => {
        this.setState((prevState, props) => {
            return {count: prevState.count - 1}
        })
    }

    onChangeSet = (event) => {
        this.setState({
            [event.target.name]: event.target.value, //Whats this comma?
        })
        // console.log(this.state)
    }

    onChangeSetDate = (newDate) => {
        this.setState({
            tourDate: newDate
        });
    }

    render() {
        return (
            <div>
                <ButtonAppBar/>
                <TourDatePicker onChangeSet={this.onChangeSetDate} tourDate={this.state.tourDate}/>
                <CityDropdown onChangeSet={this.onChangeSet}/>
                <GroupedButtons/>
                <PaxButtons incrementCount={this.incrementCount} decrementCount={this.decrementCount} {...this.state}/>
                <BudgetAndDetails onChangeSet={this.onChangeSet} onSubmitForm={this.onSubmitForm} {...this.state}/>
            </div>
        )
    }
}

function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        GPOON
                    </Typography>
                    <Button color="inherit" onClick={() => window.open(<Login/>)}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
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
                    label="여행 일자"
                    value={props.tourDate}
                    onChange={date => {
                        props.onChangeSet(date)
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />


            </Grid>
        </MuiPickersUtilsProvider>
    );
}


const SelectStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    City
                </InputLabel>
                <Select
                    native
                    value={props.city}  // Functional component: Receive props as parameter, no "this"
                    onChange={props.onChangeSet}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'city',
                        id: 'outlined-age-native-simple',
                    }}
                >

                    <option value=""/>
                    <option value={"Seoul"}>서울</option>
                    <option value={"Busan"}>부산</option>
                    <option value={"Jeju"}>제주</option>
                    <option value={"Daegu"}>대구</option>
                    <option value={"Jeonju"}>전주</option>
                    <option value={"Gyeongju"}>경주</option>

                </Select>

            </FormControl>

        </div>


    );
}


function GroupedButtons() {
    return (
        <Grid container spacing={20}>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <ButtonGroup fullWidth color="primary" aria-label="outlined primary button group">
                        <Button>서울</Button>
                        <Button>부산</Button>
                        <Button>제주</Button>
                        <Button>대구</Button>
                        <Button>경주</Button>
                        <Button>전주</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>


        </Grid>

    );
}

class PaxButtons extends React.Component {
    render() {
        return (

            <Grid container direction="row">
                <Button title={"-"} onClick={this.props.decrementCount}>-</Button>
                <h2>인원 수:{this.props.count}</h2>
                <Button title={"+"} onClick={this.props.incrementCount}>+</Button>
            </Grid>
        );
    }
}

class BudgetAndDetails extends Component {

    render() {
        return (

            <Container>
                <form onSubmit={this.props.onSubmitForm}>

                    <TextField
                        id="budget"
                        name="budget"
                        label="예산"
                        type="number"
                        required
                        rows="1"
                        value={this.props.budget}
                        onChange={this.props.onChangeSet}
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        id="details"
                        name="details"
                        label="희망 활동"
                        multiline
                        required
                        rows="6"
                        fullWidth
                        helperText="희망 활동/관심사/주의 사항을 적어주세요"
                        value={this.props.details}
                        onChange={this.props.onChangeSet}
                        //className={classes.textField}
                        margin="normal" a
                        variant="outlined"
                    />

                    <Button type="submit" variant="contained" color="primary">
                        제출
                    </Button>
                </form>
            </Container>
        );

    }
}

