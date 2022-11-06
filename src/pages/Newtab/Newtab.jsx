import React, {useState, useEffect} from 'react'; // utterly insane/stupid difference btw export default vs export. garbage language. 
import { loadBday, loadGridType, storeBday, storeGridType,  } from '../common/Common';
import './Newtab.css';
import './Newtab.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// options 
const DurationGridSetting = [
  { name: "Days", gridClass: "DayGrid", fromYear: 365},
  { name: "Weeks", gridClass: "WeekGrid", fromYear: 52},
  { name: "Months", gridClass: "MonthGrid", fromYear: 12},
  { name: "Years", gridClass: "YearGrid", fromYear: 1},
];

const numItems = (ageLimitYears, gridType) => {
  let fromYear = DurationGridSetting[gridType].fromYear;
  return ageLimitYears * fromYear; 
}

const curItem = (curAgeYears, gridType) => {
  let fromYear = DurationGridSetting[gridType].fromYear;
  return Math.floor(curAgeYears * fromYear);
}

const UNKNOWN_BDAY = -1; 

const Newtab = (arg) => { 
  let res = []
  const now = new Date();
  const [bday, setBday] = useState(null);
  useEffect(() => {
    async function set() {
      let bd = await loadBday();
      if (bd == null) {
        setBday(UNKNOWN_BDAY);
      } else {
        setBday(bd);
      }
    };
    set();
  }, []);
  
  const [gridType, setGridType] = useState(-1); 
  useEffect(() => {
    async function set() {
      let gridType = await loadGridType();
      setGridType(gridType);
    };
    set();
  }, []);

  // side note
  // unlike componentDidUpdate
  // the "newer" way of "effects" runs after render, so we have to differentiate
  // between the uninitialized state vs the initialized state. without this, user
  // will see an invalid UI flash by before the valid UI shows up. 
  if (bday == UNKNOWN_BDAY) { 
    return (
      <div className="Config">
        <div className="Config-header">
          <div className="Message">👋 I need to know your birthday to visualize your life timeline.</div>
          <DatePicker selected={bday} onChange={(date) => {storeBday(date); setBday(date);}}/>
          <div className="Message">Choose a time unit</div>
          <select className="Dropdown" value={gridType} onChange={(evt) => {
            let gtstr = evt.target.value;
            storeGridType(gtstr); setGridType(GridType.toString(gtstr));
            }}>
            {/* These correspond to the constants defined in Common.  */}
            <option value="0">Days</option>
            <option value="1">Weeks</option>
            <option value="2">Months</option>
            <option value="3">Years</option>
          </select>
            <div className="Message">You can open a new tab after configuring.</div>
        </div>
      </div>
      );
  } else if (gridType == -1 || bday == null) { // still loading. 
    return (<div></div>);
  } else {
    let curAgeYears = (now - bday) / (3600 * 1000 * 24 * 365.25);
    let nboxes = numItems(arg.ageLimitYears, gridType);
    let cbox = curItem(curAgeYears, gridType);
    for(let i=0; i<nboxes; i++) {
      if (i < cbox) {
        res.push(<div className="Box" key={i}>💀</div>);
      } else {
        res.push(<div className="Box" key={i}>🌹</div>);
      }
    }
    for (let i=nboxes; i<cbox; i++) {
      res.push(<div className="Box" key={i}>🌲</div>);
    }
    let headerClass = "App-header ";
    headerClass += DurationGridSetting[gridType].gridClass;

    return (
      <div>
      <p className="YourLife">⏳⏳⏳{DurationGridSetting[gridType].name} of your life⏳⏳⏳</p>
      <p className="YourLife">💀 = Units in Past | 🌹 = Units to life expectancy | 🌲 = Units beyond life expectancy </p>
      <div className={headerClass}>
        {res}
      </div>
      </div>
    );
  }
};

export {Newtab};
