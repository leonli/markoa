import marko from 'marko';
const helloTemplate = marko.load(require.resolve('../views/hello/index.marko'));

const getName = () => new Promise(resolve => {
  setTimeout(() => resolve('Leon'), 3000);
});

const yourName = () => new Promise(resolve => {
  setTimeout(() => resolve('Leon'), 1000);
});

export function * hello(next) {
  this.body = helloTemplate.stream({getName, yourName});
  this.type = 'text/html';
  yield next;
}
