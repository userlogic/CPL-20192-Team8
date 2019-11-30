import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/login/Login";
import TourForm from "./components/tourform/tourform";
import TourRequestPage from "./components/tourrequests/TourRequests";
import SignUp from "./components/signup/signup";
import Logout from "./components/logout/logout";
import ButtonAppBar from "./components/ButtonAppBar";
import LandingPage from "./components/landingpage/LandingPage";
import LandingPage2 from "./components/landingpage/LandingPage2";
import TourProposals from "./components/tourproposals/TourProposals";

import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { SessionContext, getSessionCookie } from "./session";
import ProposalForm from "./components/proposalform/ProposalForm";
import MatchCompleted from "./components/tourproposals/MatchCompleted";
import ProposalCompleted from "./components/proposalform/ProposalCompleted";

const history = createBrowserHistory();

const Routes = () => {
  // const [test, setTest] = useState(3);
  const [session, setSession] = useState(getSessionCookie());
  const [selectedTourRequest, setSelectedTourRequest] = useState(null);
  const [selectedTourProposal, setSelectedTourProposal] = useState(null);

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

    if (
      newSessionCookie.id !== session.id ||
      newSessionCookie.user_type !== session.user_type
    ) {
      setSession(getSessionCookie());
      console.log("New cookie differs from old cookie -> Set.");
      console.log("session State variable after setSession:");
      console.log(session);
    } else {
      console.log("New cookie equal to old cookie -> Not set.");
    }

    // Below array meaning: Not on every render, but only on renders where one of the below state variables has changed.
  }, [session.id, session.user_type]);

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <Route path="/" component={ButtonAppBar}></Route>
        <Switch>
          {/* <Route
            exact
            path="/"
            render={props => <Login {...props} setSessionDown={setSession} />}
          /> */}
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/tourproposals"
            render={props => (
              <TourProposals
                {...props}
                setSelectedTourProposal={setSelectedTourProposal}
              />
            )}
          />
          <Route
            path="/matchcomplete"
            render={props => (
              <MatchCompleted
                history={history}
                selectedTourProposal={selectedTourProposal}
              />
            )}
          />
          <Route path="/tourform" component={TourForm} />
          <Route path="/signup" component={SignUp} />
          <Route path="/proposalcomplete" component={ProposalCompleted} />
          <Route
            path="/proposalform"
            render={props => (
              <ProposalForm
                {...props}
                selectedTourRequest={selectedTourRequest}
              />
            )}
          />
          <Route
            path="/login"
            render={props => <Login {...props} setSessionDown={setSession} />}
          />
          <Route
            path="/tourrequests"
            render={props => (
              <TourRequestPage
                {...props}
                setSelectedTourRequest={setSelectedTourRequest}
              />
            )}
          />
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
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
