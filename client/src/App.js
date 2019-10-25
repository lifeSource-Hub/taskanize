import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HeaderNavbar from "./components/layout/HeaderNavbar";
import TodoList from "./components/content/TodoList";
import CompletedList from "./components/content/CompletedList";
import Login from "./components/content/Login";
// import Register from "./components/content/Register";
import PageNotFound from "./components/content/PageNotFound";
import Footer from "./components/layout/Footer";

const App = () =>
{
  const isLoggedIn = () =>
  {
    return !!(localStorage.getItem("token"));
  };

  return (
      <Router>
        <HeaderNavbar/>
        <main>
          <Switch>
            <Redirect exact from="/" to="/list"/>
            <Route exact path="/list">
              {isLoggedIn() ? <TodoList/> : <Redirect to="/login"/>}
            </Route>
            <Route exact path="/completed">
              {isLoggedIn() ? <CompletedList/> : <Redirect to="/login"/>}
            </Route>
            <Route exact path="/login">
              {isLoggedIn() ? <Redirect to="/list"/> : <Login/>}
            </Route>
            <Route component={PageNotFound}/>
          </Switch>
        </main>
        <Footer/>
      </Router>);
};

export default App;
