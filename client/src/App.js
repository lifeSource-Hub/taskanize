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
import TaskPage from "./components/content/taskList/TaskPage";
import PageNotFound from "./components/content/PageNotFound";
import ContactPage from "./components/content/ContactPage";
import HomePage from "./components/content/HomePage";
import MapPage from "./components/content/googleMap/MapPage";
import Reminder from "./components/content/Reminder";
import VerificationLandingPage from "./components/content/VerificationLandingPage";

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
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/contact" component={ContactPage}/>
          <Route exact path="/locations" component={MapPage}/>
          <Route exact strict path="/user/email/verify" component={VerificationLandingPage}/>
          <Route exact path="/tasks">
            {isLoggedIn() ? <TaskPage/> : <Redirect to="/login"/>}
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
