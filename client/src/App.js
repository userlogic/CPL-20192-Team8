import React, { useEffect, useState, useContext} from 'react';
import './App.css';

import Login from './components/login/Login';
import TourForm from './components/tourform/tourform';
import CardView from './components/cardview/CardView';
import SignUp from './components/signup/signup';
import Logout from './components/logout/logout';

import {Router, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from "history";

import {SessionContext, getSessionCookie, setSessionCookie } from './session';

const history = createBrowserHistory();

const Routes = () => {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session]
  );

  return (

    <SessionContext.Provider value={session}>
    <Router history={history}>
      <Switch>
      <Route exact path="/" component={TourForm}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={Login}/>
      <Route path="/cardview" component={CardView}/>
      <Route path="/logout" component={Logout} />
      <Route path="*" component={ProtectedHandler}/>
      </Switch>
  </Router>
  </SessionContext.Provider>
      );
};

function App() {
  // const [session, setSession] = useState(getSessionCookie());
  // useEffect(
  //   () => {
  //     setSession(getSessionCookie());
  //   },
  //   // [session]
  //   []
  // );

  return (
    <div className="App">
    <Routes />
  </div>
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
