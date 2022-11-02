import React, {useState, Component } from 'react';
import './Popup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BDAY_KEY, loadBday } from '../common/Common.js'

class Popup extends Component {
  constructor() {
    super();
    this.state = {bday : new Date()};
  }

  async storeDate(bday) {
    let obj = {}
    obj[BDAY_KEY] = bday.toString();
    await chrome.storage.sync.set(obj);
    this.setState({bday : bday});
  }

  async componentDidMount() {
    let d = await loadBday();
    this.setState({bday : d});
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter your birthday for accurate visualization! 
          </p>
          <DatePicker selected={this.state.bday} onChange={(date) => {this.storeDate(date);}}/>
        </header>
      </div>
    );
  }
}

export default Popup;
