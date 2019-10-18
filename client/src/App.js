import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import List from "./components/List";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import PageNotFound from "./components/PageNotFound";

function App()
{
  return (
      <Router>
        <Header/>
        <Nav/>
        <main>
        <Switch>
          <Redirect exact from="/" to="/list"/>
          <Route exact path="/list" component={List}/>
          <Route component={PageNotFound}/>
          {/*<Route path="/issues/:id" component={IssueEdit} />*/}
        </Switch>
        </main>
      </Router>);
}

export default App;
