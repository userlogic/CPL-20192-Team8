import React, { useContext } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import {
  // setSessionCookie,
  // getSessionCookie,
  SessionContext
} from "../../session";
import { Link } from "react-router-dom";
import { textAlign } from "@material-ui/system";
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
export default class TourRequestPage extends React.Component {
  static contextType = SessionContext;

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

  componentDidMount() {
    const user = this.context;
    console.log(user);
    console.log(user.id);
    // console.log(getSessionCookie());

    if (user.id === undefined) {
      this.props.history.push("/login");
      return;
    } else if (user.user_type === "tourist") {
      this.props.history.push("/");
      return;
    }

    fetch("api/tour-requests/cards")
      .then(response => response.json())
      .then(json => {
        for (let step = 1; step <= json.length; step++) {
          json[step - 1]["id"] = step;
          json[step - 1]["location"] = json[step - 1]["location"]["name"];
          json[step - 1]["user"] = json[step - 1]["requester"]["first_name"];
        }
        console.log(json);

        this.setState({ tourRequests: json });
      });
  }

  applyButtonClick = tourRequestId => {
    this.props.setSelectedTourRequest(tourRequestId);
    this.props.history.push("/proposalform");

    return;
  };

  //<CommentForm addTourRequest={this._addTourRequest.bind(this)}/>
  render() {
    const tourRequests = this._getTourRequests();
    let tourRequestNodes;

    if (this.state.showTourRequests) {
      tourRequestNodes = <div className="comment-list">{tourRequests}</div>;
    }

    console.log(tourRequests);

    return (
      <div className="comment-box">
        <Grid container justify="center">
          <Typography>Tour Requests</Typography>
        </Grid>
        <Typography className="comment-count">
          {this._getTourRequestsTitle(tourRequests.length)}
        </Typography>
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
    return this.state.tourRequests.map(tourRequest => {
      return (
        <div>
          <TourRequestCard
            user={tourRequest.user}
            key={tourRequest.id}
            date={tourRequest.tour_date}
            pax={tourRequest.pax}
            budget={tourRequest.budget}
            description={tourRequest.description}
            location={tourRequest.location}
            tour_request_id={tourRequest.tour_request_id}
            onButtonClick={this.applyButtonClick}
          />
          <h4></h4>
        </div>
      );
    });
  }

  _getTourRequestsTitle(tourRequestCount) {
    if (tourRequestCount === 0) {
      return "No tour requests yet";
    } else if (tourRequestCount === 1) {
      return "1 comment";
    } else {
      return `${tourRequestCount} requests`;
    }
  }
} // end CommentBox component

const cardStyles = makeStyles(theme => ({
  card: {
    
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: "0 3px 5px 2px lightgray"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#2F80ED"
  },
  text:{
    marginTop: theme.spacing(1),
    textAlign:"center",
  },
  menu:{
    fontWeight: "bold",
    textAlign:"center",
    color:"#021B79"
  },
  icons:{
    //color:"#021B79"
  },
  dateicon:{
    color: "#56bacf",
  },
   locationicon:{
    color: "#e64353",
  }, 
    budgeticon:{
    color: "#70cb98",
  },
  btn: {
    background: "linear-gradient(60deg, #56CCF2 0%, #2F80ED 100%);",
    color:'white'
  },
  

}));

function TourRequestCard(props) {
  const session = useContext(SessionContext);
  const classes = cardStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card} fullWidth>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.user[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      title={<h3>{props.user}</h3>}
      />
       <Divider fullWidth/>
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={4}>
            <DateRangeIcon className={classes.dateicon} fontSize="large"/><p className={classes.menu}>Date</p> 
          <p className={classes.text}>{props.date.toString().split("T")[0]}</p></Grid>
          
          <Grid item xs={4}>
           <LocationOnIcon className={classes.locationicon} fontSize="large"/> <p className={classes.menu}>Location</p> 
           <p className={classes.text}>{props.location}</p>
            </Grid>
          
          <Grid item xs={4}>
            <MonetizationOnIcon className={classes.budgeticon} fontSize="large"/> 
            <p className={classes.menu}>Budget</p> 
            <p className={classes.text}>${props.budget}</p>
          </Grid>
          
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.description}</Typography>
          <Button
            variant="contained"
            href="#"
            className={classes.btn}
            onClick={() => props.onButtonClick(props)}
            fullWidth
          >
            APPLY
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
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

// class CommentForm extends React.Component {
//   render() {
//     return (
//       <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
//         <div className="comment-form-fields">
//           <input
//             placeholder="Name"
//             required
//             ref={input => (this._user = input)}
//           ></input>
//           <br />
//           <textarea
//             placeholder="Comment"
//             rows="4"
//             required
//             ref={textarea => (this._body = textarea)}
//           ></textarea>
//         </div>
//         <div className="comment-form-actions">
//           <button type="submit">Post Comment</button>
//         </div>
//       </form>
//     );
//   } // end render

//   _handleSubmit(event) {
//     event.preventDefault(); // prevents page from reloading on submit
//     let user = this._user;
//     let body = this._body;
//     this.props.addTourRequest(user.value, body.value);
//   }
// } // end CommentForm component
