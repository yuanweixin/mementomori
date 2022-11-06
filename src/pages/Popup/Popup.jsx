import React, {useState, Component } from 'react';
import './Popup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storeGridType, storeBday, loadBday, loadGridType, GridType } from '../common/Common.js'

class Popup extends Component {
  constructor() {
    super();
    this.state = {bday : new Date(), gridType : String(GridType.WEEKS)};
  }
  
  async componentDidMount() {
    let d = await loadBday(new Date());
    let g = await loadGridType();
    this.setState({bday : d, gridType: String(g)});
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Message">Enter birthday (for accurate visualization)</div>
          {/* date is a Date object not event. This is "thanks" to using the react-datepicker library which decides to 
          return Date types. but this is a giant pita impedence mismatch for a function tied to onChange. goes against 
          the intuition of what this should be by convention. again, goes to show that software is broken, esp in js. 
          
          For serialization, my life is much easier when I only deal with strings, because when I read back stuff from 
          chrome.storage, Date objects become invalid. So I am forced to convert them to strings or ints first anyway. 

          Plus, for UI elements like select, it's a string, so it's way easier with the 2 way binding if I just keep it stringy. 

          The only place that needs to care what the actual typed value is, would be at the use site. 

          */}
          <DatePicker selected={this.state.bday} onChange={(date) => {storeBday(date); this.setState({bday : date});}}/>
          <div className="Message">Choose a time unit</div>
          <select className="Dropdown" value={this.state.gridType} onChange={(evt) => {storeGridType(evt.target.value); this.setState({gridType: gridTypeStr});}}>
            {/* These correspond to the constants defined in Common.  */}
            <option value="0">Days</option>
            <option value="1">Weeks</option>
            <option value="2">Months</option>
            <option value="3">Years</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Popup;
