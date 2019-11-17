import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'




const useStyles = makeStyles(theme => ({
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
    backgroundColor: '#357a38',
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  Paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },

},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <CheckIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Matching is complete
        </Typography>
         
          
            <Paper className={classes.Paper}>
            <Typography component="h1" variant="h5" align="center">
            Contents
          </Typography>
          <br></br>

          {/* <Typography>Tourist: {this.props.user}</Typography>
          <Typography>Date: {this.props.date}</Typography>
          <Typography>Budget: {this.props.budget}</Typography>
          <Typography>Location: {this.props.location}</Typography>
          <Typography>description: {this.props.description}</Typography> */}
          
                <Typography variant="subtitle1">
                  Date : 2019-11-20
                </Typography>
                <Typography variant="subtitle1">
                  Budget : $400
                </Typography>
                <Typography variant="subtitle1">
                  Location : Seoul
                </Typography>
                 <Typography variant="subtitle1">
                  Description : delicious food
                </Typography>

              </Paper>
            

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Home
          </Button>
      </div>
    </Container>
  );
}