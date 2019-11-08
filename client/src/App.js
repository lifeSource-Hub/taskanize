import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HeaderNavbar from "./components/layout/HeaderNavbar";
import ListPage from "./components/content/ListPage";
import Login from "./components/content/Login";
import Register from "./components/content/Register";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import PageNotFound from "./components/content/PageNotFound";
import Footer from "./components/layout/Footer";
import ContactPage from "./components/content/ContactPage";
import HomePage from "./components/content/HomePage";
import MapPage from "./components/content/MapPage";

const App = () =>
{
  const isLoggedIn = () =>
  {
    return !!(localStorage.getItem("authToken"));
  };

  return (
      <Router>
        <HeaderNavbar isLoggedIn={isLoggedIn}/>
        <main>
          <Switch>
            <Redirect exact from="/" to="/list"/>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/contact" component={ContactPage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/map" component={MapPage}/>
            <Route exact path="/list">
              {isLoggedIn() ? <ListPage/> : <Redirect to="/login"/>}
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
