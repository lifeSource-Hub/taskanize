import React from 'react';
import {Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";

const HeaderNavbar = () =>
{
  const logout = () =>
  {
    localStorage.removeItem("authToken");
  };

  return (
      <header>
        <Navbar className="nav">
          <NavbarBrand href="/" className="navBrand">
            A MERN Stack Web Application
          </NavbarBrand>
          <NavItem className="navItem">
            <NavLink href="/" className="navLink">My List</NavLink>
          </NavItem>
          {/*<NavItem className="navItem">*/}
          {/*  <NavLink href="/completed" className="navLink">Completed</NavLink>*/}
          {/*</NavItem>*/}
          {!!(localStorage.getItem("authToken")) ?
              <NavItem className="navItem">
                <NavLink active href="/login" onClick={logout} className="navLink">Logout</NavLink>
              </NavItem>
              :
              <NavItem className="navItem">
                <NavLink active href="/login" className="navLink">Login</NavLink>
              </NavItem>}
          {/*<NavItem className="navItem">*/}
          {/*  <NavLink href="/register" className="navLink">Register</NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="navItem">*/}
          {/*  <NavLink href="/badURI" className="navLink">404 Page</NavLink>*/}
          {/*</NavItem>*/}
        </Navbar>
      </header>);
};

export default HeaderNavbar;
