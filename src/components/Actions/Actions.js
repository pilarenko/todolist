import React from 'react'
import Check from '../UI/Check/Check';
import Button from '../UI/Button/Button';
import Can from '../UI/Can/Can';

import './Actions.css';

const Actions = (props) => {
  let actions = <Button actions onClick={props.onClick}>Add</Button>;
  if (props.transformed) {
    actions = (
      <div className='actions actions__set'>
        <Check onClick={props.checkClick} active={props.checked} />
        <Can onClick={props.deleteClick} />
      </div>
    );
  }

  return (
    <div className='actions'>
      {actions}
    </div>
  )
}

export default Actions
