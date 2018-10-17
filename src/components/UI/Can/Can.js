import React from 'react';
import './Can.css';

const Can = (props) => {
  return (
    <div className='can' onClick={props.onClick}>
     <i className="fas fa-trash-alt" />
    </div>
  )
}

export default Can
