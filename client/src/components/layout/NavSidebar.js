import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

class NavSidebar extends Component
{
  render()
  {
    return (
        <Nav className="nav">
          <NavItem className="navItem w-100">
            <NavLink href="/" className="navLink">To Do</NavLink>
          </NavItem>
          <NavItem className="navItem w-100">
            <NavLink href="/completed" className="navLink">Completed</NavLink>
          </NavItem>
          <NavItem className="navItem w-100">
            <NavLink href="/login" className="navLink">Login</NavLink>
          </NavItem>
          {/*<NavItem className="navItem w-100">*/}
          {/*  <NavLink href="/register" className="navLink">Register</NavLink>*/}
          {/*</NavItem>*/}
          <NavItem className="navItem w-100">
            <NavLink href="/baduri" className="navLink">404 Page</NavLink>
          </NavItem>
        </Nav>);
  }
}

export default NavSidebar;
