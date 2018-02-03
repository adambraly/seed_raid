import React from 'react';
import { Link } from 'react-router-dom';
import '../scripts/navbar';

import logo from '../../static/images/logo.png';

const NavBar = () => {
  return (
    <div className="menu-container">
      <nav>
        <div className="nav-fostrap">
          <ul className="navigation-menu">
            <li className="nav-link logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
                <span className="brand">Seed Raid</span>
              </Link>
            </li>
            <li className="nav-link"><Link to="/calendar/eu-alliance">EU Alliance</Link></li>
            <li className="nav-link"><a href="javascript:void(0)">EU Horde</a></li>
            <li className="nav-link"><a href="javascript:void(0)">NA Horde</a></li>
            <li className="nav-link"><a href="javascript:void(0)">NA Alliance</a></li>
          </ul>
        </div>
        <div className="nav-bg-fostrap">
          <div className="navbar-fostrap">
            <span /><span /><span />
          </div>
          <a href="" className="title-mobile">Seed Raid</a>
        </div>
      </nav>
    </div>
  );
};


export default NavBar;
