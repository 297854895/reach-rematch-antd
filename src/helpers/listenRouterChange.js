const routerChange = (cb) => {
  (function(history){
      var pushState = history.pushState;
      history.pushState = function(state, s, path, n) {
          if (typeof history.onpushstate === "function") {
              history.onpushstate({...state, path, type: 'reach/router'});
          }
          return pushState.apply(history, arguments);
      };
  })(window.history);
  window.history.onpushstate = cb
  window.onpopstate = () => {
    if (window.location) {
      cb({
        type: 'browser',
        host: window.location.host,
        hostname: window.location.hostname,
        search: window.location.search,
        href: window.location.href,
        hash: window.location.hash,
        pathname: window.location.pathname
      })
    }
  }
}
export default routerChange
