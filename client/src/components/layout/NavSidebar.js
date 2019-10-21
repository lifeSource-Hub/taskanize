import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

class NavSidebar extends Component
{
  render()
  {
    return (
        <Nav className="nav">
          <NavItem className="navItem w-100">
            <NavLink href="/" className="navLink">View List</NavLink>
          </NavItem>
          <NavItem className="navItem w-100">
            <NavLink href="/completed" className="navLink">Completed Items</NavLink>
          </NavItem>
          <NavItem className="navItem w-100">
            <NavLink href="/zzz" className="navLink">404 Page</NavLink>
          </NavItem>
        </Nav>);
  }
}

export default NavSidebar;
