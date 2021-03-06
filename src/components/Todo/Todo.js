import React from 'react';
import { Table } from 'reactstrap';
import Can from '../UI/Can/Can';
import DynamicInput from '../UI/DynamicInput/DynamicInput';
import Actions from '../../components/Actions/Actions';
import Checkbox from '../UI/Checkbox/Checkbox';
import Date from '../../components/Date/Date';


import './Todo.css';

export default class Todo extends React.Component {
  state = {
    table: [
      {
        content: {
          value: "",
          transformed: false,
          edited: false,
        },
        deadline: {
          value: null,
          focused: false,
        },
        checked: false,
        toDelete: false,
        showCheckbox: false,
      },
    ]
  };

  populateTableHandler = (event, index) => {
    const tableObjectStructure = 
    {
      content: {
        value: "",
        transformed: false,
        edited: false,
      },
      deadline: {
        value: null,
        focused: false,
      },
      checked: false,
      toDelete: false,
      showCheckbox: true,
    };

    const currentTable = [...this.state.table];
    const inputValue = currentTable[index].content.value.length;
    const isEdited = currentTable[index].content.edited;
    
    if (index === 0) {
      currentTable[0].showCheckbox = true;
    }

    if (inputValue > 0) {
      currentTable[index].content.transformed = true;
      if (!isEdited) {
        currentTable.push(tableObjectStructure);
      }    
      this.setState({table: currentTable});
    } else {
      console.log("Nie dla pustej notatki");
    }
  };

  activateInputHandler = (event, index) => {
    const tableState = [...this.state.table];
    tableState[index].content.transformed = false;
    tableState[index].content.edited = true;
    this.setState({table: tableState});
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
    let i = tableState.length;

    while (i--) {
      if (tableState[i].toDelete) {
        tableState.splice(i, 1);
      }
    }
    this.setState({table: tableState});
  }

  render() {
    const styleAlign = {"verticalAlign": "middle"};
    const tableState = [...this.state.table];
    const tableContent = tableState.map((row, index) => (
      <tr className="todo__row" key={"row" + index}>
        <th style={styleAlign} scope="row">
          <Checkbox 
            checked={row.toDelete}
            onChange={(event) => this.toDeleteHandler(event, index)}
            show={row.showCheckbox}
          />
        </th>
        <td className="todo__content" style={styleAlign} >
          <DynamicInput 
            value={row.content.value} 
            transformed={row.content.transformed}
            onChange={(event) => this.inputChangeHandler(event, index)}
            checked={row.checked}
            onClick={(event) => this.activateInputHandler(event, index)}
          />
        </td>
        <td style={styleAlign} >
          <Date 
            transformed={row.content.transformed}
            index={index}
          />
        </td>
        <td className="todo__actions" style={styleAlign}>
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