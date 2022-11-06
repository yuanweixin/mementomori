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
          <DatePicker maxDate={new Date()} selected={this.state.bday} onChange={(date) => {storeBday(date); this.setState({bday : date});}}/>
          <div className="Message">Choose a time unit</div>
          <select className="Dropdown" value={this.state.gridType} onChange={(evt) => {storeGridType(evt.target.value); this.setState({gridType: evt.target.value});}}>
            {/* These correspond to the constants defined in Common.  */}
            <option value="0">Days</option>
            <option value="1">Weeks</option>
            <option value="2">Months</option>
            <option value="3">Years</option>
          </select>
        </div>
      </div>
    );

    // return (
    //   <div className="Config">
    //     <div className="Config-header">
    //       <div className="Message">👋 I need to know your birthday to visualize your life timeline.</div>
    //       <DatePicker  maxDate={now} selected={bday} onChange={(date) => {storeBday(date); setBday(date);}}/>
    //       <div className="Message">Choose a time unit</div>
    //       <select className="Dropdown" value={gridType} onChange={(evt) => {
    //         let gtstr = evt.target.value;
    //         storeGridType(gtstr); setGridType(GridType.toString(gtstr));
    //         }}>
    //         {/* These correspond to the constants defined in Common.  */}
    //         <option value="0">Days</option>
    //         <option value="1">Weeks</option>
    //         <option value="2">Months</option>
    //         <option value="3">Years</option>
    //       </select>
    //         <div className="Message">You can open a new tab after configuring.</div>
    //     </div>
    //   </div>
    // );
  }
}

export default Popup;
