import React from 'react';
import './Check.css';

const Check = (props) => {
  let classes = 'check';
  if (props.active) {
    classes = 'check check--active';
  }
  
  return (
    <div className={classes} onClick={props.onClick}>
      <i className="fas fa-check"></i>
    </div>
  )
}

export default Check
