const routerChange = (cb) => {
  if (window.history.onpushstate && window.onpopstate) {
    const oldPushState = window.history.onpushstate
    window.history.onpushstate = function(path) {
      oldPushState(path)
      cb(path)
    }
    const oldPopState = window.onpopstate
    window.onpopstate = function(state) {
      oldPopState({
        type: 'browser',
        pathname: window.location.pathname
      })
      cb({
        type: 'browser',
        pathname: window.location.pathname
      })
    }
    return
  }
  (function(history){
    const pushState = history.pushState;
    history.pushState = function(state, s, path) {
      if (typeof history.onpushstate === "function") {
        history.onpushstate({ ...state, pathname: path, type: 'reach/router' });
      }
      return pushState.apply(history, arguments);
    };
  })(window.history)
  window.history.onpushstate = cb
  window.onpopstate = (event, s) => {
    if (window.location) {
      cb({
        ...event.state,
        type: 'browser',
        pathname: window.location.pathname
      })
    }
  }
}
export default routerChange
