import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
  return (
    <div className='checkbox'>
      <input type='checkbox' checked={props.checked} onChange={props.onChange}/>
    </div>
  )
}

export default Checkbox
