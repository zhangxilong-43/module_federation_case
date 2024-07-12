const getErrorMessage = (id, error) => `remote ${id} is offline due to error: ${error}`;

const getModule = (pg, from) => {
  if (from === 'build') {
    return () => ({
      __esModule: true,
      default: pg,
    });
  } else {
    return {
      default: pg,
    };
  }
};

const runtimePlugin = function () {
  return {
    name: 'my-runtime-plugin',
    beforeInit(args) {
      console.log('beforeInit: ',window, window.app_2, args);
      return args;
    },
    beforeRequest(args) {
      console.log('beforeRequest: ',window, window.app_2, args);
      return args;
    },
    afterResolve(args) {
      console.log('afterResolve',window, window.app_2, args);
      return args;
    },
    onLoad(args) {
      console.log('onLoad: ', args);
      return args;
    },
    async loadShare(args) {
      console.log('loadShare:', args);
    },
    async beforeLoadShare(args) {
      console.log('beforeloadShare:', args);
      return args;
    },
    errorLoadRemote({ id, error, from, origin }) {
        console.error(id, 'offline');
        const pg = function () {
          console.error(id, 'offline', error);
          return getErrorMessage(id, error);
        };
  
        return getModule(pg, from);
      },
  };
};
export default runtimePlugin;