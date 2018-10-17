import React from 'react';
import { Button } from 'reactstrap';
import './Button.css';

const customButton = (props) => {
  return (
    <div className='button'>
      <Button onClick={props.onClick}>{props.children}</Button>
    </div>
  )
}

export default customButton
