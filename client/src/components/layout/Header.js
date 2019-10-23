import React, {Component} from 'react';

class Header extends Component
{
  render()
  {
    return (
        <header>
          {/*<span id="headerLink">*/}
          {/*  <Link to="/login">Login</Link>*/}
          {/*</span>*/}
          <div className="header"><h1>A MERN Stack Web Application</h1></div>
        </header>);
  }
}

export default Header;
