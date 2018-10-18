import React from 'react';
import DynamicInput from '../../UI/DynamicInput/DynamicInput';
import Actions from '../../../components/Actions/Actions';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { Table } from 'reactstrap';

import './Row.css';

const Row = (props) => {
  return (
    <tbody>
      <tr className="row">
        <th scope="row">
          <Checkbox 
            checked={props.checkboxChecked}
            onChange={props.checkboxOnChange}
          />
        </th>
        <td className="row__content">
          <DynamicInput 
            value={props.inputValue} 
            transformed={props.inputTransformed}
            onChange={props.inputOnChange}
            checked={props.inputChecked}
          />
        </td>
        <td>{props.deadlineValue}</td>
        <td className="row__actions">
          <Actions 
            onClick={props.actionsOnClick}
            transformed={props.actionsTransformed}
            checked={props.actionsChecked}
            deleteClick={props.actionsDeleteClick}
            checkClick={props.actionsCheckClick}
          />
        </td>
      </tr>
    </tbody>
  )
}

export default Row
