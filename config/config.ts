import routes from './routes';
export default {
    // base: '/docs/',
    routes: routes,
    publicPath: '/static/',
    hash: true,
    history: {
      type: 'hash',
    },
    dva: {
      immer: true,
      hmr: false,
      disableModelsReExport: true,
      lazyLoad: true,
    },
  }