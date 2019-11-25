import React from "react";
import {Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import Octicon, {Person} from "@primer/octicons-react";

const HeaderNavbar = ({isLoggedIn}) =>
{
  const logout = e =>
  {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.replace("/login");
  };

  const getUsername = () =>
  {
    if (isLoggedIn())
    {
      return (
        <div className="currentUser">
          <Octicon icon={Person}/>
          <p>{localStorage.getItem("currentUser")}</p>
        </div>
      );
    }
  };

  const getNavItem = () =>
  {
    if (isLoggedIn())
    {
      return (
        <NavLink href="" className="logLink" onClick={logout}>
          Logout
        </NavLink>
      );
    }

    return (
      <NavLink href="/login" className="logLink">
        Login
      </NavLink>
    );
  };

  return (
    <header>
      <Navbar className="nav">
        <NavbarBrand className="navBrand">
          LifeSource
        </NavbarBrand>
        <NavItem>
          <NavLink className="navLink" href="/home">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/list">
            My Tasks
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/reminder">
            Set Reminder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/map">
            Google Map
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/contact">
            Contact
          </NavLink>
        </NavItem>
      </Navbar>
      {getUsername()}
      <div className="loginTab">{getNavItem()}</div>
    </header>
  );
};

export default HeaderNavbar;
