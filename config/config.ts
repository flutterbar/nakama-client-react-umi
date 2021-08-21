import routes from './routes';
export default {
  antd: {
    dark: false,
    compact: true,
  },
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
    mfsu: {},
  }