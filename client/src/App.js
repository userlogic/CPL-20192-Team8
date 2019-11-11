import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/login/Login";
import TourForm from "./components/tourform/tourform";
import CardView from "./components/cardview/CardView";
import SignUp from "./components/signup/signup";
import Logout from "./components/logout/logout";

import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { SessionContext, getSessionCookie } from "./session";

const history = createBrowserHistory();

const Routes = () => {
  // const [test, setTest] = useState(3);
  const [session, setSession] = useState(getSessionCookie());
  // const [session, setSession] = useState(69);
  // console.log(session);
  // setInterval(() => {
  //   setTest(test + 1);
  // }, 5000);

  useEffect(() => {
    const newSessionCookie = getSessionCookie();

    console.log("useEffect being called.");
    console.log(newSessionCookie);
    console.log("session State variable before setSession:");
    console.log(session);
    console.log(newSessionCookie.id === session.id);

    // setSession(getSessionCookie());

    if (newSessionCookie.id !== session.id) {
      setSession(getSessionCookie());
      console.log("New cookie differs from old cookie -> Set.");
      console.log("session State variable after setSession:");
      console.log(session);
    } else {
      console.log("New cookie equal to old cookie -> Not set.");
    }

    // Below array meaning: Not on every render, but only on renders where one of the below state variables has changed.
  }, [session.id]);

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} setSessionDown={setSession} />}
          />
          <Route path="/tourform" component={TourForm} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/login"
            render={props => <Login {...props} setSessionDown={setSession} />}
          />
          <Route path="/cardview" component={CardView} />
          <Route
            path="/logout"
            render={props => <Logout {...props} setSessionDown={setSession} />}
          />
          {/* <Route path="*" component={ProtectedHandler} /> */}
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
