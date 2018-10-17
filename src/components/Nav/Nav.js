import React from 'react';
import {
  Navbar,
  NavbarBrand,
 } from 'reactstrap';
import Logo from '../UI/Logo/Logo';

import './Nav.css';

const navStyle = {
  display: "block"
};

const Nav = (props) => {
  return (
    <header className='nav' style={navStyle}>
      <Navbar style={navStyle} dark expand="md">
        <NavbarBrand href="/">
          <Logo isBig/>
        </NavbarBrand>
      </Navbar>
    </header>
  )
}

export default Nav