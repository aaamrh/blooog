import React from 'react';
import ReactDOM from 'react-dom';
import MyRouter from './router';
import { Provider } from 'react-redux'
import store from './store';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);