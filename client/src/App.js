import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Header from "./components/layout/Header";
import NavSidebar from "./components/layout/NavSidebar";
import TodoList from "./components/content/TodoList";
import CompletedList from "./components/content/CompletedList";
import Login from "./components/content/Login";
// import Register from "./components/content/Register";
import PageNotFound from "./components/content/PageNotFound";
import Footer from "./components/layout/Footer";
import {AppProvider} from "./components/content/AppContext"  ;

function App()
{
  return (
      <Router>
        <AppProvider>
        <Header/>
        <NavSidebar/>
        <main>
          <Switch>
            <Redirect exact from="/" to="/list"/>
            <Route exact path="/login" component={Login}/>
            {/*<Route exact path="/register" component={Register}/>*/}
            <Route exact path="/list" component={TodoList}/>
            <Route exact path="/completed" component={CompletedList}/>
            <Route component={PageNotFound}/>
          </Switch>
        </main>
        <Footer/>
        </AppProvider>
      </Router>);
}

export default App;
