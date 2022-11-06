import React, {useState, Component } from 'react';
import './Popup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storeGridType, storeBday, loadBday, loadGridType, GridType, storeAgeExpectancy, loadAgeExpectancy } from '../common/Common.js'
import NumericInput from 'react-numeric-input';

class Popup extends Component {
  constructor() {
    super();
    this.state = {bday : new Date(), gridType : String(GridType.WEEKS), ageExpectancy : 76.61};
  }
  
  async componentDidMount() {
    let d = await loadBday(new Date());
    let g = await loadGridType();
    let ae = await loadAgeExpectancy();
    this.setState({bday : d, gridType: String(g), ageExpectancy: ae});
  }

  render () {
    return (
      <div className="Popup">
        <div className="Popup-header">
          <div className="Message">👋 I need to know your birthday to visualize your life timeline.</div>
          <DatePicker maxDate={new Date()} selected={this.state.bday} onChange={(date) => {storeBday(date); this.setState({bday : date});}}/>
          <div className="Message">Choose a time unit</div>
          <select className="Dropdown" value={this.state.gridType} onChange={(evt) => {storeGridType(evt.target.value); this.setState({gridType: evt.target.value});}}>
            {/* These correspond to the constants defined in Common.  */}
            <option value="0">Days</option>
            <option value="1">Weeks</option>
            <option value="2">Months</option>
            <option value="3">Years</option>
          </select>
          <div className="Message">Choose a time unit</div>
          <NumericInput step={1} precision={2} min={0} max={130} value={this.state.ageExpectancy} onChange={(valAsNum, valAsStr, ele) => { storeAgeExpectancy(valAsNum); this.setState({ageExpectancy : valAsNum}); }}/>
          <div className="Message">Setting takes effect in new tabs.</div>
        </div>
      </div>
    );
  }
}

export default Popup;
