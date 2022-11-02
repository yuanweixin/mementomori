import React from 'react';
import logo from '../../assets/img/logo.svg';
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
  let nboxes = numItems(arg.ageLimitYears, arg.gridType);
  let cbox = curItem(arg.curAgeYears, arg.gridType);
  for(let i=0; i<nboxes; i++) {
    if (i < cbox) {
      res.push(<div className="Box" key={i}>💀</div>);
    } else {
      res.push(<div className="Box" key={i}>🌹</div>);
    }
  }
  let headerClass = "App-header ";
  headerClass += DurationGridSetting[arg.gridType].gridClass;
  return (
    <div>
    <p className="YourLife">⏳⏳⏳{DurationGridSetting[arg.gridType].name} of your life⏳⏳⏳</p>
    <header className={headerClass}>
    {res}
    </header>
    </div>
  );
};

export {Newtab};
