import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import TodoList from "./components/TodoList";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import PageNotFound from "./components/PageNotFound";
import CompletedList from "./components/CompletedList";

function App()
{
  return (
      <Router>
        <Header/>
        <Nav/>
        <main>
        <Switch>
          <Redirect exact from="/" to="/list"/>
          <Route exact path="/list" component={TodoList}/>
          <Route exact path="/completed" component={CompletedList}/>
          <Route component={PageNotFound}/>
          {/*<Route path="/issues/:id" component={IssueEdit} />*/}
        </Switch>
        </main>
      </Router>);
}

export default App;
