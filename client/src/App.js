import React, { useEffect } from 'react';
import './App.css';

import Login from './components/login/Login';
import TourForm from './components/tourform/tourform';
import CardView from './components/cardview/CardView';
import SignUp from './components/signup/signup';

import {Router, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from "history";

import {SessionContext, getSessionCookie, setSessionCookie } from './session';

const history = createBrowserHistory();

function App() {
  // const [session, setSession] = React.useState(getSessionCookie());
  // React.useEffect(
  //   () => {
  //     setSession(getSessionCookie());
  //   }, 
  //   [session]
  // )

  return (

  // <SessionContext.Provider value={session}>
  <Router history={history}>
    <Switch>
    <Route exact path="/" component={TourForm}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/login" component={Login}/>
    <Route path="/cardview" component={CardView}/>
    <Route path="*" component={ProtectedHandler}/>
    </Switch>
</Router>
// </SessionContext.Provider>
    );
}

const ProtectedHandler = () => {
  return (
    <div>
      <Link to="/cardview">Go to cardview here</Link>
    </div>
  );
};

export default App;
