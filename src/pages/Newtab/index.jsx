import React from 'react';
import { render } from 'react-dom';

import {Newtab, DAYS, WEEKS, MONTHS, YEARS} from './Newtab';
import './index.css';

render(<Newtab ageLimitYears={76.61} gridType={1}/>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
