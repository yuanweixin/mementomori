import React, {useState, Component } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Popup extends Component {
  constructor() {
    super();
    this.state = {bday : new Date()};
  }

  async storeDate(bday) {
    await chrome.storage.sync.set({"mmori.bday": bday.toString()});
    this.setState({bday : bday});
  }

  async loadDate() {
    let res = await chrome.storage.sync.get(["mmori.bday"]);
    return new Date(res["mmori.bday"]); // Date(some str) returns current time. Fk javascript. 
  }

  async componentDidMount() {
    let d = await this.loadDate();
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
          <button onClick={this.loadDate}>Default</button>;
        </header>
      </div>
    );
  }
}

export default Popup;
