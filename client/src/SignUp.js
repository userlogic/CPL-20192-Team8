import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from '@material-ui/core/Select';




const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


class ContentCreate extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age:''
    }
    changeFormHandler(ev){

        this.setState({[ev.target.name]:ev.target.value});
    }

    

    


    render(){
        
        return(
            <article>
                <form onSubmit={function(ev){
                    ev.preventDefault();
                    this.props.onSubmit(this.state);
                }.bind(this)}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value= {this.state.firstName}
                                onChange={this.changeFormHandler.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value= {this.state.lastName}
                                onChange={this.changeFormHandler.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value= {this.state.email}
                                onChange={this.changeFormHandler.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value= {this.state.password}
                                onChange={this.changeFormHandler.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        required
                        fullWidth
                        rows="1"
                        value={this.props.age}
                        onChange={this.changeFormHandler.bind(this)}
                        variant="outlined"
                    />
                    </Grid>
                    </Grid>
                    <p></p>
                    <Typography  variant="h6" align="center">
                      City
                    </Typography>
                    
                    <Select
                        native
                       fullWidth
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
    ​
                    </Select>
                    <p></p>
                    <Typography  variant="h6" align="center">
                      Job
                    </Typography>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend"></FormLabel>
                        <RadioGroup aria-label="job" name="job1" >
                            <FormControlLabel value="Guest" control={<Radio />} label="Guest" />
                            <FormControlLabel value="Guide" control={<Radio />} label="Guide" />
                        </RadioGroup>
                    </FormControl>
                    <p></p>
                    <Typography variant="h6" align="center">
                      Gender
                    </Typography>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend"></FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" >
                            <FormControlLabel value="Man" control={<Radio />} label="Man" />
                            <FormControlLabel value="Woman" control={<Radio />} label="Woman" />
                        </RadioGroup>
                    </FormControl>
                    <p></p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </article>



        );
    }
}





export default function SignUp() {

    const [value, setValue] = React.useState('female');

    const handleChange = event => {
        setValue(event.target.value);
    }; const classes = useStyles();

   



    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form className={classes.form} noValidate>

                    <ContentCreate onSubmit={function(formData){
                             console.log(formData);
                    }
                    }></ContentCreate>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}