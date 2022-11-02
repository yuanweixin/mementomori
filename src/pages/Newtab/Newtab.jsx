import React, {useState, useEffect} from 'react'; // utterly insane/stupid difference btw export default vs export. garbage language. 
import { WEEKS, loadBday, loadGridType } from '../common/Common';
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

const Newtab = (arg) => { // js is such a fucking verbose language. 
  let res = []
  const [curAgeYears, setCurAgeYears] = useState(0);
  useEffect(() => {
    async function set() {
      let now = new Date();
      let bday = await loadBday(now);
      setCurAgeYears((now - bday) / (3600 * 1000 * 24 * 365.25));
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

  
  // now we have to have a stupid check here because unlike componentDidUpdate
  // the "newer" way of "effects" runs after render, so we have to differentiate
  // between the uninitialized state vs the initialized state. without this, user
  // will see an invalid UI flash by before the valid UI shows up. 
  if (curAgeYears == 0 || gridType == -1) { 
    return (<div></div>);
  } else {
    let nboxes = numItems(arg.ageLimitYears, gridType);
    let cbox = curItem(curAgeYears, gridType);
    for(let i=0; i<nboxes; i++) {
      if (i < cbox) {
        res.push(<div className="Box" key={i}>💀</div>);
      } else {
        res.push(<div className="Box" key={i}>🌹</div>);
      }
    }
    let headerClass = "App-header ";
    headerClass += DurationGridSetting[gridType].gridClass;

    return (
      <div>
      <p className="YourLife">⏳⏳⏳{DurationGridSetting[gridType].name} of your life⏳⏳⏳</p>
      <header className={headerClass}>
      {res}
      </header>
      </div>
    );
  }
};

export {Newtab};
