import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';
import tourForm from './components/tourform/tourform';


ReactDOM.render(    <Router>
    <Switch>
    <Route exact path="/" component={tourForm}/>
    <Route path="/login" component={Login}/>
    </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
     