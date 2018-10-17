import React from 'react';
import { Table } from 'reactstrap';
import Can from '../UI/Can/Can';
import DynamicInput from '../UI/DynamicInput/DynamicInput';
import Button from '../UI/Button/Button';

import './Todo.css';

const tableObjectStructure = 
{
  content: {
    value: "",
    active: false,
  },
  deadline: {
    value: "Set deadline",
    active: false,
  },
  checked: false,
};

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

  populateTableHandler = (event) => {
    // Dodaj wiersz
    let table = this.state.table;
    table.push(tableObjectStructure);
    this.setState({table: table});
  };

  activateInputHandler = () => {
    // Zamień klikniętego diva na input z textem z diva
  };

  deactivateInputHandler = (event, index) => {
    // Zamknij input i zamień w diva
    if (event.target.value.length > 0) {
      const currentTable = this.state.table;

      currentTable[index].content.transformed = true;
      currentTable[index].content.value = event.target.value;
      
      this.setState({table: currentTable});
    }
  };

  render() {
    const tableState = this.state.table;
    console.table(tableState);
    const tableContent = tableState.map((row, index) => (
      <tr className="todo__row">
        <th scope="row"></th>
        <td className="todo__content">
          <DynamicInput 
            value={row.content.value} 
            transformed={row.content.transformed}
            onBlur={(event) => this.deactivateInputHandler(event, index)}
          />
        </td>
        <td>{row.deadline.value}</td>
        <td>
          <Button onClick={this.populateTableHandler}>Add</Button>
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