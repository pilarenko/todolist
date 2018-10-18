import React from 'react';
import { Table } from 'reactstrap';
import Can from '../UI/Can/Can';
import DynamicInput from '../UI/DynamicInput/DynamicInput';
import Actions from '../../components/Actions/Actions';
import Checkbox from '../UI/Checkbox/Checkbox';
import Date from '../UI/Date/Date';


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
          value: null,
          focused: false,
        },
        checked: false,
        toDelete: false,
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
        value: null,
        focused: false,
      },
      checked: false,
      toDelete: false,
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

    this.setState({table: tableState});
  };

  checkTableHandler = (event, index) => {
    const tableState = [...this.state.table];
    const checked = !tableState[index].checked;
    tableState[index].checked = checked;

    this.setState({table: tableState});
  };

  toDeleteHandler = (event, index) => {
    const tableState = [...this.state.table];
    const toDelete = !tableState[index].toDelete;
    tableState[index].toDelete = toDelete;
    this.setState({table: tableState});
  };

  deleteCheckedHandler = (event) => {
    const tableState = [...this.state.table];

    console.log(tableState);
    const indexes = [];
    for (let i = 0; i < tableState.length; i++) {
      if (tableState[i].toDelete) {
        indexes.push(i);
        tableState.splice(i, 1);
      }
    }
    this.setState({table: tableState});
  }

  render() {
    const tableState = [...this.state.table];
    const tableContent = tableState.map((row, index) => (
      <tr className="todo__row" key={"row" + index}>
        <th scope="row">
          <Checkbox 
            checked={row.toDelete}
            onChange={(event) => this.toDeleteHandler(event, index)}
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
        <td>
          <Date 
            transformed={row.content.transformed}
            index={index}
          />
        </td>
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
        <Table style={{"marginBottom": "0px"}} striped>
          <thead>
            <tr className="todo__head">
              <th><Can onClick={this.deleteCheckedHandler} /></th>
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