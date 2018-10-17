import React from 'react';
import { Input } from 'reactstrap';
import './DynamicInput.css';

const DynamicInput = (props) => {
  let dynamicInput = (
    <div className='dynamicInput'>
      <Input 
        placeholder="Add some text"
        onBlur={props.onBlur}
      />
    </div>
  );
  
  if (props.transformed) {
    dynamicInput = (
      <div className='dynamicInput__transformed'>
        {props.value}
      </div>
    )
  }

  return (
    dynamicInput
  )
}

export default DynamicInput
