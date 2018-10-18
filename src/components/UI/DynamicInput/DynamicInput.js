import React from 'react';
import { Input } from 'reactstrap';
import './DynamicInput.css';

const DynamicInput = (props) => {
  let classes = 'dynamicInput';

  let dynamicInput = (
    <div className={classes}>
      <Input 
        placeholder="Add some text"
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
  
  if (props.transformed) {
    classes = 'dynamicInput dynamicInput__transformed';
    if (props.checked) {
      classes = 'dynamicInput dynamicInput__checked dynamicInput__transformed';
    }

    dynamicInput = (
      <div className={classes} onClick={props.onClick}>
        {props.value}
      </div>
    )
  }

  return (
    dynamicInput
  )
}

export default DynamicInput
