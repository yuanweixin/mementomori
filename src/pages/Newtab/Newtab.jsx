import React, {useState, useEffect} from 'react'; // utterly insane/stupid difference btw export default vs export. garbage language. 
import { loadBday, loadGridType, storeBday, storeGridType, loadAgeExpectancy  } from '../common/Common';
import Popup from "../Popup/Popup"
import "react-datepicker/dist/react-datepicker.css";
import './Newtab.css';
import './Newtab.scss';

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

const Newtab = () => { 
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

  const [ageExpectancy, setAgeExpectancy] = useState(-1);
  useEffect(() => {
    async function set() {
      let ae = await loadAgeExpectancy();
      setAgeExpectancy(ae);
    };
    set();
  }, []);

  // side note
  // unlike componentDidUpdate
  // the "newer" way of "effects" runs after render, so we have to differentiate
  // between the uninitialized state vs the initialized state. without this, user
  // will see an invalid UI flash by before the valid UI shows up. 
  if (bday == UNKNOWN_BDAY) { 
    return (<Popup/>);
  } else if (gridType == -1 || bday == null) { // still loading. 
    return (<div></div>);
  } else {
    let curAgeYears = (now - bday) / (3600 * 1000 * 24 * 365.25);
    let nboxes = numItems(ageExpectancy, gridType);
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
