import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './static/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import store from './rematch'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
if (module.hot) {
  module.hot.accept()
};
