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
      />
    </div>
  );
  
  if (props.transformed) {
    classes = 'dynamicInput__transformed';
    if (props.checked) {
      classes = 'dynamicInput__checked dynamicInput__transformed';
    }

    dynamicInput = (
      <div className={classes}>
        {props.value}
      </div>
    )
  }

  return (
    dynamicInput
  )
}

export default DynamicInput
