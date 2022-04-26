import React from 'react';
import ReactDOM from 'react-dom';
import MyRouter from './router';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <MyRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
