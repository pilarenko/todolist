import React, { Component } from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import './Date.css';


export default class Date extends Component {
  state = {
    date: null,
    focused: false,
  };

  render() {
    let classes = 'date';
    const transformed = this.props.transformed;
    const index = this.props.index + 1;
    const isOdd = (index % 2) ? true : false;
  
    if (transformed) {
      if (isOdd) {
        classes = 'date date--transformed date--odd';
      } else {
        classes = 'date date--transformed date--even';
      }    
    };

    return (
      <div className={classes}>
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="datePicker"
          placeholder="Select a date"
          numberOfMonths={1}
          withPortal
        />
      </div>
    )
  }
}
