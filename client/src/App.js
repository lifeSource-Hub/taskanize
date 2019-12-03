import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import HeaderNavbar from "./components/layout/HeaderNavbar";
import Login from "./components/content/Login";
import Register from "./components/content/Register";
import Footer from "./components/layout/Footer";
import ListPage from "./components/content/todoList/ListPage";
import PageNotFound from "./components/content/PageNotFound";
import ContactPage from "./components/content/ContactPage";
import HomePage from "./components/content/HomePage";
import MapPage from "./components/content/googleMap/MapPage";
import Reminder from "./components/content/Reminder";
import VerifiedPage from "./components/content/VerifiedPage";

const App = () =>
{
  const isLoggedIn = () =>
  {
    return !!(localStorage.getItem("authToken"));
  };

  const isHashValid = () =>
  {
    return false;
  };

  return (
    <Router>
      <HeaderNavbar isLoggedIn={isLoggedIn}/>
      <main>
        <Switch>
          <Redirect exact from="/" to="/tasks"/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/contact" component={ContactPage}/>
          <Route exact path="/locations" component={MapPage}/>
          <Route exact path="/verified">
            {isHashValid() ? <VerifiedPage/> : <PageNotFound/>}
          </Route>
          <Route exact path="/tasks">
            {isLoggedIn() ? <ListPage/> : <Redirect to="/login"/>}
          </Route>
          <Route exact path="/reminders">
            {isLoggedIn() ? <Reminder/> : <Redirect to="/login"/>}
          </Route>
          <Route exact path="/login">
            {isLoggedIn() ? <Redirect to="/tasks"/> : <Login/>}
          </Route>
          <Route exact path="/register">
            {isLoggedIn() ? <Redirect to="/tasks"/> : <Register/>}
          </Route>
          <Route component={PageNotFound}/>
        </Switch>
      </main>
      <Footer/>
    </Router>);
};

export default App;
