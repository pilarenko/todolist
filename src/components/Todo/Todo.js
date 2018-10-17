import React from 'react';
import { Table } from 'reactstrap';
import Can from '../UI/Can/Can';
import DynamicInput from '../UI/DynamicInput/DynamicInput';
import Actions from '../../components/Actions/Actions';
import Checkbox from '../UI/Checkbox/Checkbox';


import './Todo.css';

export default class Todo extends React.Component {
  state = {
    table: [
      {
        content: {
          value: "",
          transformed: false,
        },
        deadline: {
          value: "Set deadline",
          active: false,
        },
        checked: false,
      },
    ]
  };

  populateTableHandler = (event, index) => {
    const tableObjectStructure = 
    {
      content: {
        value: "",
        transformed: false,
      },
      deadline: {
        value: "Set deadline",
        active: false,
      },
      checked: false,
    };

    const tableState = [...this.state.table];
    const inputValue = tableState[index].content.value.length;

    if (inputValue > 0) {
      const currentTable = [...this.state.table];

      currentTable[index].content.transformed = true;    
      currentTable.push(tableObjectStructure);
      this.setState({table: currentTable});
    }
  };

  activateInputHandler = () => {
    // Zamień klikniętego diva na input z textem z diva
  };

  inputChangeHandler = (event, index) => {
    const inputValue = event.target.value;
    const tableState = [...this.state.table];
    tableState[index].content.value = inputValue;
    this.setState({table: tableState});
  };

  deleteTableRowHandler = (event, index) => {
    const tableState = [...this.state.table];
    tableState.splice(index, 1);
    console.table(tableState);

    this.setState({table: tableState});
  };

  checkTableHandler = (event, index) => {
    const tableState = [...this.state.table];
    const checked = !tableState[index].checked;
    tableState[index].checked = checked;

    this.setState({table: tableState});
  };

  render() {
    const tableState = [...this.state.table];
    const tableContent = tableState.map((row, index) => (
      <tr className="todo__row" key={"row" + index}>
        <th scope="row">
          <Checkbox 
            checked={row.checked}
            onChange={(event) => this.checkTableHandler(event, index)}
          />
        </th>
        <td className="todo__content">
          <DynamicInput 
            value={row.content.value} 
            transformed={row.content.transformed}
            onChange={(event) => this.inputChangeHandler(event, index)}
            checked={row.checked}
          />
        </td>
        <td>{row.deadline.value}</td>
        <td className="todo__actions">
          <Actions 
            onClick={(event) => this.populateTableHandler(event, index)}
            transformed={row.content.transformed}
            checked={row.checked}
            deleteClick={(event) => this.deleteTableRowHandler(event, index)}
            checkClick={(event) => this.checkTableHandler(event, index)}
          />
        </td>
      </tr>
    ));

    return (
      <div className='todo'>
        <Table style={{"marginBottom": "0px"}} responsive striped>
          <thead>
            <tr className="todo__head">
              <th><Can /></th>
              <th>Content</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </Table>
      </div>
    );
  }
}