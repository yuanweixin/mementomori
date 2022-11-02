import React, {useState, useEffect} from 'react'; // utterly insane/stupid difference btw export default vs export. garbage language. 
import logo from '../../assets/img/logo.svg';
import { loadBday } from '../common/Common';
import './Newtab.css';
import './Newtab.scss';

export let DAYS = 0;
export let WEEKS = 1; 
export let MONTHS = 2; 
export let YEARS = 3;

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
      let bday = await loadBday();
      setCurAgeYears((new Date() - bday) / (3600 * 1000 * 24 * 365.25));
    };
    set();
  }, []);

  let nboxes = numItems(arg.ageLimitYears, arg.gridType);
  let cbox = curItem(curAgeYears, arg.gridType);
  for(let i=0; i<nboxes; i++) {
    if (i < cbox) {
      res.push(<div className="Box" key={i}>💀</div>);
    } else {
      res.push(<div className="Box" key={i}>🌹</div>);
    }
  }
  let headerClass = "App-header ";
  headerClass += DurationGridSetting[arg.gridType].gridClass;

  // now we have to have a stupid check here because unlike componentDidUpdate
  // the "newer" way of "effects" runs after render, so we have to differentiate
  // between the uninitialized state vs the initialized state. without this, user
  // will see an invalid UI flash by before the valid UI shows up. 
  if (curAgeYears == 0) { 
    return (<div></div>);
  } else {
    return (
      <div>
      <p className="YourLife">⏳⏳⏳{DurationGridSetting[arg.gridType].name} of your life⏳⏳⏳</p>
      <header className={headerClass}>
      {res}
      </header>
      </div>
    );
  }
};

export {Newtab};
