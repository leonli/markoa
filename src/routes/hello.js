import marko from 'marko';
const helloTemplate = marko.load(require.resolve('../views/hello/index.marko'));

export function * hello(next) {
  this.body = helloTemplate.stream({});
  this.type = 'text/html';
  yield next;
}
