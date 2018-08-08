import React from 'react';
import { Provider } from 'react-redux'
import './static/css/index.css';
import App from './App'
import store from './rematch'

const Web =
<Provider store={store}>
  <App />
</Provider>

export default Web
