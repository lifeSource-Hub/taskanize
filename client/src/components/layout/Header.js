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
          <div className="header"><h1>Your Online To Do List</h1></div>
        </header>);
  }
}

export default Header;
