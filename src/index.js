import koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import session from 'koa-generic-session';
import koaBunyanLogger from 'koa-bunyan-logger';
// Import defined routes
import {router} from './routes';
import lasso from 'lasso';
import {devConfig, prodConfig} from '../config';

// Config Lasso for building up the static resources
if (__DEV_MODE__) {
  lasso.configure(devConfig);
  require('../config/browser-refresh-config').enable();
} else {
  lasso.configure(prodConfig);
}

// Init the Koa application
const app = koa();
// Init the koa logger
app.use(koaBunyanLogger({
  name: 'markoa',
  level: __DEV_MODE__ ? 'debug' : 'info'
}));
if (__DEV_MODE__) {
  app.use(require('koa-logger')());
} else {
  app.use(koaBunyanLogger.requestLogger());
}
// Init the session midleware, we will use memory store in development mode
app.keys = ['markoa-4mjsd67D9s'];
app.use(session({
  key: 'markoa.sid',
  prefix: 'markoa:sess:'
}));

// Init the compress midleware
app.use(compress({
  filter: content_type => {
    return /text|json|javascript/i.test(content_type);
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));
// Init routes
app.use(router.routes());
// Apply serving static resources
app.use(serve('./static'));
// we will export the koa app for test cases
export default app.listen(__PORT__ || 3000);

if (__DEV_MODE__) {
  if (process.send) {
    process.send('online');
  }
}

console.info(`==> 🍻  Server now is listening on port ${__PORT__}`);
