import React from 'react';
import './Error.css';
import { Collapse, CardBody, Card } from 'reactstrap';


const Error = (props) => {
  let classes = '';

  if (props.collapse) {
    classes = 'error';
  }

  return (
    <div className={classes}>
      <Collapse isOpen={props.collapse}>
        <Card>
          <CardBody>
            {props.errorText}
          </CardBody>
        </Card>
      </Collapse>
  </div>
  )
}

export default Error;