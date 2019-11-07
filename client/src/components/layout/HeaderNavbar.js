import React from "react";
import { Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

const HeaderNavbar = ({ isLoggedIn }) => {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.replace("/login");
  };

  const getNavItem = () => {
    if (isLoggedIn()) {
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
          A MERN Stack Web Application
        </NavbarBrand>
        <NavItem>
          <NavLink className="navLink" href="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/list">List</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink" href="/contact">Contact</NavLink>
        </NavItem>
      </Navbar>
      <div className="loginTab">{getNavItem()}</div>
    </header>
  );
};

export default HeaderNavbar;
