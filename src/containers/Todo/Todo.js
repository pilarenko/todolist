import React from 'react';
import { Table } from 'reactstrap';
import Can from '../../components/UI/Can/Can';
import DynamicInput from '../../components/UI/DynamicInput/DynamicInput';
import Actions from '../../components/Actions/Actions';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import DatePicker from '../../components/Date/Date';
import Button from '../../components/UI/Button/Button';
import Error from '../../components/UI/Error/Error';
import axios from 'axios';
import moment from 'moment';

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
        created: null,
        id: null,
      },
    ],
    page: 1,
    pages: null,
    error: false,
  };

  componentDidMount() {
    const currentPage = this.state.page;
    this.loadNotes(currentPage);
  }

  loadNotes = (page) => {
    axios.get('/notes?page=' + page)
    .then(response => {
      console.log(response);
      const notes = response.data.notes;
      const totalPages = response.data['total_pages'];
      const newNotes = notes.map((note) => {
        let deadlineDate = note.deadline;
        if (!moment.isMoment(note.deadline)) {
          deadlineDate = moment(note.deadline);
        } 

        return ({
          content: {
            value: note.content,
            transformed: true,
            edited: false,
          }, 
          deadline: {
            value: deadlineDate,
            focused: false,
          },
          checked: note.completed,
          toDelete: false,
          showCheckbox: true,
          created: moment(note['created_at']),
          id: note.id,
        });
      }

      );
      let currentTable = [...this.state.table];
      const cleanedNotes = [];
      newNotes.forEach(note => {
        if (note.deadline.value) {
          cleanedNotes.push(note);
        }
      });

      if (page === 1) {
        cleanedNotes.forEach(note => {
          currentTable.unshift(note);
        })
      } else {
        currentTable = cleanedNotes;
      }


      this.setState({
        table: currentTable,
        pages: totalPages,
      });
    }); 
  }

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
      created: new Date(),
      id: null,
    };

    const currentTable = [...this.state.table];
    const inputValue = currentTable[index].content.value.length;
    const isEdited = currentTable[index].content.edited;
    
    if (index === 0) {
      currentTable[0].showCheckbox = true;
      currentTable[0].created = new Date();
    }

    if (inputValue > 0) {
      currentTable[index].content.transformed = true;
      if (!isEdited) {
        currentTable.push(tableObjectStructure);
      }    

      const params = {
        id: index,
        content: currentTable[index].content.value,
        deadline: currentTable[index].deadline.value,
        completed: currentTable[index].checked,
        "created_at": currentTable[index].created,
      };
      
      axios.post('/notes/', params)
      .then(response => {
        currentTable[index].id = response.data.note.id;
        this.setState({table: currentTable});
      });


    } else {
      this.errorHandler();
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
    console.log(tableState[index]);
    const id = tableState[index].id;

    axios.delete('/notes/' + id)
    .then(response => {
      tableState.splice(index, 1);
      console.log(response);
      this.setState({table: tableState});
    });

  };

  checkTableHandler = (event, index) => {
    const tableState = [...this.state.table];
    const checked = !tableState[index].checked;
    tableState[index].checked = checked;
    const completion = (checked) ? '/completed' : '/uncompleted';
    const id = tableState[index].id;

    axios.put('/notes/' + id + completion)
    .then(response => {
      console.log(response);
    });

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
    const indexes = [];
    while (i--) {
      if (tableState[i].toDelete) {
        indexes.push(tableState[i].id);
        tableState.splice(i, 1);
      }
    }

    indexes.forEach(index => {
      axios.delete('/notes/' + index)
      .then(response => {
        console.log(response);
      });
    });

    this.setState({table: tableState});
  }

  dateChangeHandler = (date, index) => {
    const tableState = [...this.state.table];
    tableState[index].deadline.value = date;
    this.setState({table: tableState});
  }

  focusChangeHandler = (focus, index) => {
    const tableState = [...this.state.table];
    const prevFocus = tableState[index].deadline.focused;
    tableState[index].deadline.focused = !prevFocus;
    this.setState({table: tableState});
  };

  loadMoreHandler = () => {
    let nextPage = this.state.page;
    const totalPages = this.state.pages;

    if (nextPage + 1 <= totalPages) {
      nextPage += 1;
      this.loadNotes(nextPage);
      this.setState({page: nextPage});
    }
    
  }

  errorHandler() {
    this.setState({error: true});
    setTimeout(() => {
      this.setState({error: false});
    }, 3000);
  }

  render() {
    const styleAlign = {"verticalAlign": "middle"};
    const tableState = [...this.state.table];
    const tableContent = tableState.map((row, index) => {
      let error = [null, null, null];
      if (index === tableState.length - 1) {
        error = [
          <Error collapse={this.state.error} errorText={"Content can't be empty."} />, 
          <Error collapse={this.state.error} empty errorText={""} />,
        ];
      }
      return (
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
            {error[0]}
          </td>
          <td className="todo__date" style={styleAlign} >
            <DatePicker
              date={row.deadline.value}
              focused={row.deadline.focused} 
              transformed={row.content.transformed}
              index={index}
              onDateChange={(date) => this.dateChangeHandler(date, index)}
              onFocusChange={(focus) => this.focusChangeHandler(focus, index)}
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
      )
    });

    return (
      <div className='todo'>
        <Table style={{"marginBottom": "0px", "border": "1px solid #bcbcbc9c"}} striped responsive>
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
        <div className='todo__button'>
          <Button onClick={this.loadMoreHandler}>Load more</Button>
        </div>
      </div>
    );
  }
}