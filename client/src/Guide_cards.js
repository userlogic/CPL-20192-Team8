import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default class GuideForm extends Component {

    constructor() {
        super();
        this.state = {    
            showGuideRequests: true,
            guideRequests: [{id:1, theme:"kpop",charge:234,details:"asdfasdf"},
            {id:2, theme:"cooking",charge:100,details:"dfasdfasf"}],

            user: 'taylor',
            date: '11/11',
            pax: '3',
            user_budget: '123',
            description: 'wewewewe',
            location: 'daegu',
        }
    }

    componentDidMount() {
      fetch('api/tour-requests/cards')
      .then(response => response.json())
      .then(json => {
        for(let step = 1; step <= json.length; step++) {
          json[step - 1]['id'] = step;
          json[step - 1]['location'] = json[step - 1]['location']['name'];
          json[step - 1]['user'] = json[step - 1]['requester']['first_name'];
        }
        console.log(json);

        this.setState({guideRequests: json});
      }) 
    }
    

    submitClick = () => {
      console.log('submit')
      console.log(this.state)
    }
  
    onChangeSet = (event) => {
        this.setState({
            [event.target.name]: event.target.value, //Whats this comma?
        })
        console.log(this.state)
    }

    render() {
      const guideRequests = this._getGuideRequests();
      let guideRequestNodes;
      let buttonText = 'Show tour requests';

      if (this.state.showGuideRequests) {
        buttonText = '';
        guideRequestNodes = <div className="comment-list">{guideRequests}</div>;
      }
      return (

          <React.Fragment>
            
            <SimpleCard/>
        
              <div className="comment-box">
                <Grid container justify="center">                    
                <h2>Guide Requests</h2>
              </Grid>
                
                {guideRequestNodes}
              </div> 
          </React.Fragment>

      )

    
    }

    _addGuideRequest(user, body) {
      const comment = {
        id: this.state.guideRequests.length + 1,
        user,
        body
      };
      
      this.setState({ tourRequests: this.state.guideRequests.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }


    _getGuideRequests() {    
      return this.state.guideRequests.map((guideRequest) => { 
        return (
          <div>
          <GuideRequest 
            guide={guideRequest.guide} 
            key={guideRequest.id}
            
            theme={guideRequest.theme}
            charge={guideRequest.charge}
            details={guideRequest.details}           
            />
            <h4></h4>
            </div>
        ); 
      });
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


  const useStyles = makeStyles(theme => ({
    card: {
      minWidth: 275,
      marginLeft: theme.spacing(2),
      marginRight:  theme.spacing(2),
      boxShadow: '0 3px 5px 2px lightgray',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    button:{
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      
    }
  }));
  
  function GuideRequest(props) {
    const classes = useStyles();
  
    return (
      <Card className={classes.card}>
        <CardHeader
        avatar={
          <Avatar aria-label="avatar" src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Ariana"
        subheader="22, F"
      />
        <CardContent>
          <p><b>Theme:</b> {props.theme}</p>          
          <p><b>Charge: </b>{props.charge}</p>
          <p><b>Description: </b> {props.details}</p>
          
        </CardContent>
        <CardActions>
        <Button className={classes.button} fullWidth>
          선택</Button>
        </CardActions>
      </Card>
    );
  }