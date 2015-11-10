import marko from 'marko';
const helloTemplate = marko.load(require.resolve('../views/hello/index.marko'));

export function * hello(next) {

  const getName = new Promise(resolve => {
    setTimeout(() => resolve('Leon'), 3000);
  });

  this.body = helloTemplate.stream({getName});
  this.type = 'text/html';
  yield next;
}
