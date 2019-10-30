import React from 'react';
import {Navbar, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";

const HeaderNavbar = ({isLoggedIn}) =>
{
  const logout = (e) =>
  {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.replace("/login");
  };

  const getNavItem = () =>
  {
    if (isLoggedIn())
    {
      return (
          <Link to="/logout" className="accountLink" onClick={logout}>
            Logout
          </Link>);
    }

    return (
        <div>
          <Link to="/register" className="accountLink">
            Register
          </Link>
          <Link to="/login" className="accountLink">
            Login
          </Link>
        </div>);
  };

  return (
      <header>
        <Navbar className="nav">
          <NavbarBrand href="/" className="navBrand">
            A MERN Stack Web Application
          </NavbarBrand>
          {getNavItem()}
          {/*<NavItem className="navItem">*/}
          {/*  <NavLink href="/register" className="navLink">Register</NavLink>*/}
          {/*</NavItem>*/}
        </Navbar>
      </header>);
};

export default HeaderNavbar;
