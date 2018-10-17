import React from 'react';
import './Logo.css';

const Logo = (props) => {
  let logoClasses = 'logo';
  if (props.isBig) {
    logoClasses = 'logo--big';
  };

  return (
    <span className={logoClasses}>
      <i className="far fa-lightbulb" />useo
    </span>
  )
}

export default Logo
