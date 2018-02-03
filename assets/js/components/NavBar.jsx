import React from 'react';
import PropTypes from 'prop-types';
import SpellRank from './SpellRank';

import logo from '../../static/images/logo.png'

const NavBar = () => {
  return (
    <div className="centered-navigation-wrapper">
      <a href="javascript:void(0)" className="mobile-logo">
        <img src={logo} alt="Logo" />
      </a>
      <a href="javascript:void(0)" id="js-centered-navigation-mobile-menu" className="centered-navigation-mobile-menu">MENU</a>
      <nav>
        <ul id="js-centered-navigation-menu" className="centered-navigation-menu show">
          <li className="nav-link"><a href="javascript:void(0)">EU Alliance</a></li>
          <li className="nav-link"><a href="javascript:void(0)">EU Horde</a></li>
          <li className="nav-link logo">
            <a href="javascript:void(0)" className="logo">
              <img src={logo} alt="Logo" />
            </a>
          </li>
          <li className="nav-link"><a href="javascript:void(0)">NA Horde</a></li>
          <li className="nav-link"><a href="javascript:void(0)">NA Alliance</a></li>
        </ul>
      </nav>
    </div>
  );
};


export default NavBar;
