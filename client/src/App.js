import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import TodoList from "./components/content/TodoList";
import Login from "./components/content/Login";
import Register from "./components/content/Register";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "./components/layout/Header";
import NavSidebar from "./components/layout/NavSidebar";
import PageNotFound from "./components/content/PageNotFound";
import CompletedList from "./components/content/CompletedList";
import Footer from "./components/layout/Footer";

function App()
{
  return (
      <Router>
          <Header/>
          <NavSidebar/>
          <main>
            <Switch>
              <Redirect exact from="/" to="/list"/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/list" component={TodoList}/>
              <Route exact path="/completed" component={CompletedList}/>
              <Route component={PageNotFound}/>
            </Switch>
          </main>
          <Footer/>
      </Router>);
}

export default App;
