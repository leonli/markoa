import koa from 'koa';
import serve from 'koa-static';
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
