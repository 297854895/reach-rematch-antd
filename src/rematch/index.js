import { init } from '@rematch/core'
import * as models from './models'
// 初始化状态
const store = init({
  models
})
if (module.hot) {
  module.hot.accept('./models', () => {
    const nextRootReducer = require('./models/index');
    store.replaceReducer(nextRootReducer);
  });
}
export default store
