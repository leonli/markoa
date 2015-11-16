import marko from 'marko';
const template = marko.load(require.resolve('./template.marko'));

module.exports = function(input, out) {
  const name = input.name;
  template.render({name}, out);
};
