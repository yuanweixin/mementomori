import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

// input: gender, age, country
// default gender, age, country
// hard code: data for age expectancy by gender and country 

// comp: life remaining 
// visualize: days/months/years 
// colors: for past vs future life, + present day 

export let DAYS = 0;
export let WEEKS = 1; 
export let MONTHS = 2; 
export let YEARS = 3;

// options 
const DurationGridSetting = [
  { name: "Days", rowSize: 180, fromYear: 365},
  { name: "Weeks", rowSize: 52, fromYear: 52},
  { name: "Months", rowSize: 36, fromYear: 12},
  { name: "Years", rowSize: 10, fromYear: 1},
];

// const numRows = (ageLimitYears, gridType) => {
//   let rowSize = DurationGridSetting[gridType].rowSize;
//   let fromYear = DurationGridSetting[gridType].fromYear;
//   return Math.ceil(ageLimitYears * fromYear / rowSize);
// };

const numItems = (ageLimitYears, gridType) => {
  let fromYear = DurationGridSetting[gridType].fromYear;
  return ageLimitYears * fromYear; 
}

const Newtab = (arg) => { // js is such a fucking verbose language. 
  let res = []
  let nboxes = numItems(arg.ageLimitYears, arg.gridType);
  for(let i=0; i<nboxes; i++) {
    res.push(<div className="Box" key={i}>{i}</div>)
  }
  return (
    <div>
    <p className="YourLife">Your life in {DurationGridSetting[arg.gridType].name}</p>
    <header className="App-header">
    {res}
    </header>
    </div>
  );
};

const NewtabOld = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.jizzz</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export {Newtab};
