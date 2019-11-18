import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ThemeProvider} from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Container } from "@material-ui/core";

export default class GuideForm extends Component {

    constructor() {
        super();
        this.state = {    
            user: 'taylor',
            date: '11/11',
            pax: '3',
            user_budget: '123',
            description: 'wewewewe',
            location: 'daegu',

            
            theme: '',       
            charge: 0,
            start_time: '00:00',
            end_time:'',
            details: '',
   
        }
    }

    submitClick = () => {
      console.log('submit')
      console.log(this.state)
    }
  
    onChangeSet = (event) => {
        this.setState({
            [event.target.name]: event.target.value, //Whats this comma?
        })
        console.log(this.state.start_time)
    }

      
    onTimeChange(time) {
      this.setState({time});
    }

    render() {
      return (
        <div>
          <React.Fragment>
            <SimpleCard {...this.state}/>
            <Selects onChangeSet={this.onChangeSet} {...this.state}/>
            <BudgetAndDetails onChangeSet={this.onChangeSet} start_time={this.start_time}
            submitClick={this.submitClick}/>
          </React.Fragment>
        </div>
      )

    
    }
  }

  
  const cardStyles = makeStyles(theme => ({
    card: {
      
      boxShadow: '0 3px 5px 2px lightgray',
      marginBottom: 12,
      width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop:  theme.spacing(3),
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      
    },
    header:{
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    menu:{
      color:'blue',
      fontweight: 70,
      display: 'inline-block'
      
    },
    p2:{
      display: 'inline-block'
    }
  }));
  
 function SimpleCard(props) {
    const classes = cardStyles();
   // const bull = <span className={classes.bullet}>•</span>;
   let budget = 'Budget: ';

    return (
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={props.user}/>
        
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            {props.date}
          </Typography>
          
            <p className={classes.menu}> Budget : </p>
            <Typography className={classes.p2}>{props.user_budget}</Typography>
            <br/>
            <p className={classes.menu} >Pax : </p> 
            <p className={classes.p2}>{props.pax}</p>
            <br/>
            <p className={classes.menu} >Description : </p> 
            <p className={classes.p2}>{props.description}</p>
                 
          
        </CardContent>
        <CardActions>
        
        </CardActions>
      </Card>
    );
  }

  const SelectStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft : theme.spacing(1),
      marginRight : theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
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
        <Grid
            container                          
            >

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
              name: 'theme',
              id: 'outlined-age-native-simple',
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
      color: 'white',
      height: 48,
      padding: '0 30px',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      marginTop: theme.spacing(2),
      marginBottom : theme.spacing(2),
    },

    grid:{
    /*  padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
*/
    },
    details:{
      
    }
  }));
  

function BudgetAndDetails(props) {
    const classes = useStyles();

        return (

            <Container
                className={classes.grid}
                container
                >
                <form onSubmit={props.submitClick}>

                    <TextField
                        id="budget"
                        name="budget"
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
                          format='00:00'
                          type="time"
                          defaultValue="12:00"
                          value={props.start_time}
                          onChange={props.onTimeChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 600, // 10 min
                          }}
                        />
                        
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="time"
                          label="End time"
                          type="time"
                          defaultValue="13:00"
                          value={props.end_time}
                          onChange={props.onChangeSet}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 600, // 10 min
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
                   

                    <Button type="submit" variant="contained"
                    className={classes.root}
                    >
                        Submit
                    </Button>
                   
                </form>
                </Container>
        );

    
}