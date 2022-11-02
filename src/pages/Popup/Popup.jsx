import React, {useState, Component } from 'react';
import './Popup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GRIDTYPE_KEY, BDAY_KEY, loadBday, loadGridType, WEEKS } from '../common/Common.js'

class Popup extends Component {
  constructor() {
    super();
    this.state = {bday : new Date(), gridType : String(WEEKS)};
  }

  async storeDate(bday) {
    let obj = {} 
    obj[BDAY_KEY] = bday.toString();
    await chrome.storage.sync.set(obj);
    this.setState({bday : bday});
  }

  async storeGridType(gridTypeStr) {
    let obj = {}
    obj[GRIDTYPE_KEY] = gridTypeStr;
    await chrome.storage.sync.set(obj);
    this.setState({gridType : gridTypeStr});
  }

  async componentDidMount() {
    let d = await loadBday(new Date());
    let g = await loadGridType();
    this.setState({bday : d, gridType: String(g)});
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter your birthday for accurate visualization! 
          </p>
          {/* date is a Date object not event. This is "thanks" to using the react-datepicker library which decides to 
          return Date types. but this is a giant pita impedence mismatch for a function tied to onChange. goes against 
          the intuition of what this should be by convention. again, goes to show that software is broken, esp in js. 
          
          For serialization, my life is much easier when I only deal with strings, because when I read back stuff from 
          chrome.storage, Date objects become invalid. So I am forced to convert them to strings or ints first anyway. 

          Plus, for UI elements like select, it's a string, so it's way easier with the 2 way binding if I just keep it stringy. 

          The only place that needs to care what the actual typed value is, would be at the use site. 

          */}
          <DatePicker selected={this.state.bday} onChange={(date) => {this.storeDate(date);}}/>
          <select value={this.state.gridType} onChange={(evt) => {this.storeGridType(evt.target.value);}}>
            {/* These correspond to the constants defined in Common.  */}
            <option value="0">Show Days</option>
            <option value="1">Show Weeks</option>
            <option value="2">Show Months</option>
            <option value="3">Show Years</option>
          </select>
        </header>
      </div>
    );
  }
}

export default Popup;
