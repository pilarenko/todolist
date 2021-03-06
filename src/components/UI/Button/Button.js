import React from 'react';
import { Button } from 'reactstrap';
import './Button.css';

const customButton = (props) => {
  let classes = 'button';
  if (props.actions) {
    classes = 'button button--actions';
  }

  if (props.goBack) {
    classes = 'button button--goBack';
  };
  
  return (
    <div className={classes}>
      <Button onClick={props.onClick}>{props.children}</Button>
    </div>
  )
}

export default customButton
