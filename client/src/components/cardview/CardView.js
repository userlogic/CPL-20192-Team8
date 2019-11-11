import React, { useContext } from 'react';
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
import { setSessionCookie, getSessionCookie, SessionContext } from '../../session';
import { Link } from "react-router-dom";


export default class CommentBox extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showTourRequests: true,
        tourRequests: []
         /* [{id: 1, user: "aaa", body: "This is my first comment on this forum",
          date:"asdfasd",pax:"3",budget:"asd",description:"33", location:"daegu"},
          {id: 2, user: "aaa", body: "This is my first comment on this forum",
          date:"asdfasd",pax:"3",budget:"asd",description:"33", location:"daegu"},]
*/
      };
    }
   
    static contextType = SessionContext;

    componentDidMount() {
      const user = this.context;
      console.log(user);
      console.log(user.id);
      console.log(getSessionCookie());
      
      if (user.id === undefined) {
        this.props.history.push("/login");
        return;
      }

      fetch('api/tour-requests/cards')
      .then(response => response.json())
      .then(json => {
        for(let step = 1; step <= json.length; step++) {
          json[step - 1]['id'] = step;
          json[step - 1]['location'] = json[step - 1]['location']['name'];
          json[step - 1]['user'] = json[step - 1]['requester']['first_name'];
        }
        console.log(json);

        this.setState({tourRequests: json});
      })      
    }
    
    
    //<CommentForm addTourRequest={this._addTourRequest.bind(this)}/>
    render () {
      const tourRequests = this._getTourRequests();
      let tourRequestNodes;
      let buttonText = 'Show tour requests';
      
      if (this.state.showTourRequests) {
        buttonText = '';
        tourRequestNodes = <div className="comment-list">{tourRequests}</div>;
      }
      
      return(
        <div className="comment-box">
          <Grid container justify="center">                    
          <h2>Tour Requests</h2>
          <Link to="/logout">Logout here</Link>
        </Grid>
          <h4 className="comment-count">
            {this._getTourRequestsTitle(tourRequests.length)}
          </h4>
          {tourRequestNodes}
        </div> 
      );
    } // end render
    
    _addTourRequest(user, body) {
      const comment = {
        id: this.state.tourRequests.length + 1,
        user,
        body
      };
      
      this.setState({ tourRequests: this.state.tourRequests.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }
    
    _handleClick() {
      this.setState({
        showTourRequests: !this.state.showTourRequests
      });
    }
    
    _getTourRequests() {    
      return this.state.tourRequests.map((tourRequest) => { 
        return (
          <div>
          <TourRequest 
            user={tourRequest.user} 
            key={tourRequest.id}
            date={tourRequest.tour_date}
            pax={tourRequest.pax}
            budget={tourRequest.budget}
            description={tourRequest.description}
            location={tourRequest.location}
            />
            <h4></h4>
            </div>
        ); 
      });
    }
    
    _getTourRequestsTitle(tourRequestCount) {
      if (tourRequestCount === 0) {
        return 'No tour requests yet';
      } else if (tourRequestCount === 1) {
        return "1 comment";
      } else {
        return `${tourRequestCount} requests`;
      }
    }
  } // end CommentBox component
  
class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input placeholder="Name" required ref={(input) => this._user = input}></input><br/>
          <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    );
  } // end render
  
  _handleSubmit(event) { 
    event.preventDefault();   // prevents page from reloading on submit
    let user = this._user;
    let body = this._body;
    this.props.addTourRequest(user.value, body.value);
  }
} // end CommentForm component

const MyCard = styled(Card) ({
  // maxWidth: 600,
  // minWidth: 600,
  border: 'warning',
  fullWidth: true
});

class TourRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      setExpanded:0,
    };
  }

  render () {
    //const [expanded, setExpanded] = React.useState(false);

    const useStyles = {
      card: {
        maxWidth: 600,
        border: 'warning',
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        /*=</coreard>transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),*/
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },

      header:{
        backgroundcolor: 'blue',
      }
    }

    return(

      <MyCard fullWidth>

      <CardHeader className={useStyles.header}
        avatar={
          <Avatar aria-label="recipe" className={useStyles.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={this.props.user}
        
      />
        <CardContent><div className="comment">
          <p><b>Date:</b> {(this.props.date).toString().split('T')[0]}</p>          
          <p><b>Budget: </b>${this.props.budget}</p>
          <p><b>Location:</b> {this.props.location}</p>
          <h3><font color="white">abc</font></h3>
          <div className="comment-footer">
            <Grid container justify="center">
            <Button variant="contained" href="#" className="comment-footer-delete" 
            onClick={this._seleteComment} color="primary">APPLY</Button>
            </Grid>
          </div> 
        </div>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(useStyles.expand, {
            [useStyles.expandOpen]: this.state.expanded,
          })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{this.props.description}</Typography>
          
        </CardContent>
      </Collapse>
      </MyCard>

    );

    
  }
  
  _seleteComment =()=> {
    alert("-- SELETE Comment Functionality COMMING SOON...");
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });

    
  };
}


  /*function CommentForm() {
      const classes=useStyles();

      const [_author, _setauthor] = React.useState("");
      const [_body, _setbody] = React.useState("");
//import { className } from 'postcss-selector-parser';

      const _handleSubmit = (event) => { 
        event.preventDefault();   // prevents page from reloading on submit
        let user = _author;
        let body = _body;
        this.props.addTourRequest(user.value, body.value);
      };

      return (
        <Card className={classes.card} >
          <CardContent>
            <form className="comment-form" onSubmit={_handleSubmit}>
              <div className="comment-form-fields">
                <input placeholder="Name" required ref={(input) => _setauthor(input)}></input><br />
                <textarea placeholder="Comment" rows="4" required ref={(textarea) => _setbody(textarea)}></textarea>
              </div>
              <div className="comment-form-actions">
                <Button type="submit">Post Comment</Button>
              </div>
            </form>

          </CardContent>
          <CardActions disableSpacing>
            <ExpandMoreIcon/>
          </CardActions>
        </Card>
      );
     // end render 
  
} // end CommentForm component
 */ 