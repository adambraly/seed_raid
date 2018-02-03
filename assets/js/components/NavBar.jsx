import React from 'react';
import PropTypes from 'prop-types';
import SpellRank from './SpellRank';
import '../scripts/navbar';

import logo from '../../static/images/logo.png'

const NavBar = () => {
  return (
    <div className="container">
      <nav>
        <div className="nav-fostrap">
          <ul className="navigation-menu">
            <li className="nav-link logo">
              <a href="javascript:void(0)">
                <img src={logo} alt="Logo" />
                <span className="brand">Seed Raid</span>
              </a>
            </li>
            <li className="nav-link"><a href="javascript:void(0)">EU Alliance</a></li>
            <li className="nav-link"><a href="javascript:void(0)">EU Horde</a></li>
            <li className="nav-link"><a href="javascript:void(0)">NA Horde</a></li>
            <li className="nav-link"><a href="javascript:void(0)">NA Alliance</a></li>
          </ul>
        </div>
        <div className="nav-bg-fostrap">
          <div className="navbar-fostrap">
            <span /><span /><span />
          </div>
          <a href="" class="title-mobile">Seed Raid</a>
        </div>
      </nav>
    </div>
  );
};


export default NavBar;
