import React from 'react';
import { render } from 'react-dom';

import {Newtab} from './Newtab';
import './index.css';

render(<Newtab ageLimitYears={76.61}/>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
