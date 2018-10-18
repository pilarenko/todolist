import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
  let classes = "checkbox--hidden";

  if (props.show) {
    classes = "checkbox";
  };

  return (
    <div className={classes}>
      <input type='checkbox' checked={props.checked} onChange={props.onChange}/>
    </div>
  )
}

export default Checkbox
