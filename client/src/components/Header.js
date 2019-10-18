import React, {Component} from 'react';

// import {Link} from "react-router-dom";

class Header extends Component
{
  render()
  {
    return (
        <header>
          {/*<span id="headerLinks">*/}
          {/*  <Link to="/src/components/pages/Contact.js">Contact</Link>*/}
          {/*</span>*/}
          <div className="header"><h1>React Demo</h1></div>
        </header>);
  }
}

export default Header;