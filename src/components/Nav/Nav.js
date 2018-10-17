import React from 'react';
import {
  Navbar,
  NavbarBrand,
 } from 'reactstrap';

import './Nav.css';

const Nav = (props) => {
  return (
    <header className='nav'>
      <Navbar dark expand="md">
        <NavbarBrand href="/"><i className="far fa-lightbulb"></i>useo</NavbarBrand>
      </Navbar>
    </header>
  )
}

export default Nav