'use strict';

import koa from 'koa';
import koaRouter from 'koa-router';
import marko from 'marko';
import serve from 'koa-static';

// init the Koa application
const app = koa();
// init the Koa router
const router = koaRouter();

app.use(router.routes());
app.use(serve('./static'));

router.get('/hello', function *(next) {
  this.body = 'Hello World';
});

app.listen(3000);
