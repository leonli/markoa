import marko from 'marko';
const welcomeTemplate = marko.load(require.resolve('../views/welcome/index.marko'));

const getName = () => new Promise(resolve => {
  setTimeout(() => resolve('Leon'), 3000);
});

const yourName = () => new Promise(resolve => {
  setTimeout(() => resolve('Someone else'), 1000);
});

export function * welcome(next) {
  this.body = welcomeTemplate.stream({getName, yourName});
  this.type = 'text/html';
  yield next;
}
