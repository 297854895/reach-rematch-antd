import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Web from './web'

ReactDOM.render(
  Web,
  document.getElementById('root')
);
registerServiceWorker();
if (module.hot) {
  module.hot.accept()
};
