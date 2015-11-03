'use strict';

const prodMode = process.env.NODE_ENV === 'production';

const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const marko = require('marko');
const serve = require('koa-static');

app.use(router.routes());
app.use(serve('./static'));

router.get('/hello', function *(next) {
  this.body = 'Hello World';
});

app.listen(3000);
