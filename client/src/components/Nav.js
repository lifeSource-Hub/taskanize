import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav extends Component
{
  render()
  {
    return (
        <nav className="devNav">
          <ul className="devNav-ul">
            <li className="devNav-item">
              <Link to="/" className="devNav-link">View List</Link>
              {/*<Link to="/src/index" className="devNav-link">Home</Link>*/}
            </li>
            <li className="devNav-item">
              <Link to="/zzz" className="devNav-link">404</Link>
              {/*<Link to="/user" className="devNav-link">Create User</Link>*/}
            </li>
            <li className="devNav-item">
              <Link to="/" className="devNav-link">Completed Items</Link>
            </li>
          </ul>
        </nav>);
  }
}

export default Nav;
