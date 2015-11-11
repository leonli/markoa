import koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
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

app.listen(__PORT__ || 3000);

if (__DEV_MODE__) {
  if (process.send) {
    process.send('online');
  }
}

console.info(`==> 🍻  Server now is listening on port ${__PORT__}`);
